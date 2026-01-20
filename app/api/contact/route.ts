import { NextRequest, NextResponse } from 'next/server'
import { sanitizeInput, validateEmail, validateFormData, checkRateLimit, generateCSRFToken } from '@/lib/security'
import { securityConfig } from '@/lib/security-config'

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-Token',
      'Access-Control-Max-Age': '86400',
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting check
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '127.0.0.1'
    const rateLimitConfig = securityConfig.rateLimit.contact
    
    if (!checkRateLimit(ip, rateLimitConfig.maxRequests, rateLimitConfig.windowMs)) {
      return NextResponse.json(
        { error: 'Muitas tentativas. Tente novamente mais tarde.' },
        { status: 429 }
      )
    }

    // Validate content type
    const contentType = request.headers.get('content-type')
    if (!contentType?.includes('application/json')) {
      return NextResponse.json(
        { error: 'Content-Type deve ser application/json' },
        { status: 400 }
      )
    }

    // Safe JSON parse with size limit
    let body: any
    try {
      const text = await request.text()
      if (text.length > 10000) {
        return NextResponse.json(
          { error: 'Payload muito grande' },
          { status: 413 }
        )
      }
      body = JSON.parse(text)
    } catch (error) {
      return NextResponse.json(
        { error: 'JSON inválido' },
        { status: 400 }
      )
    }

    // Sanitize and validate input
    const { name, email, subject, message } = body
    
    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      )
    }

    // Validate field lengths
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        { error: 'Nome deve ter entre 2 e 100 caracteres' },
        { status: 400 }
      )
    }

    if (subject.length < 5 || subject.length > 200) {
      return NextResponse.json(
        { error: 'Assunto deve ter entre 5 e 200 caracteres' },
        { status: 400 }
      )
    }

    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Mensagem deve ter entre 10 e 5000 caracteres' },
        { status: 400 }
      )
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    // Sanitize inputs to prevent XSS
    const sanitizedName = sanitizeInput(name)
    const sanitizedEmail = sanitizeInput(email)
    const sanitizedSubject = sanitizeInput(subject)
    const sanitizedMessage = sanitizeInput(message)

    // Verify environment variables
    if (!process.env.NEXT_PUBLIC_BREVO_API_KEY) {
      console.error('BREVO_API_KEY não configurada')
      return NextResponse.json(
        { error: 'Serviço de email não configurado' },
        { status: 503 }
      )
    }

    if (!process.env.ADMIN_EMAIL) {
      console.error('ADMIN_EMAIL não configurada')
      return NextResponse.json(
        { error: 'Email do administrador não configurado' },
        { status: 503 }
      )
    }

    if (!process.env.SENDER_EMAIL) {
      console.error('SENDER_EMAIL não configurada')
      return NextResponse.json(
        { error: 'Email do remetente não configurado' },
        { status: 503 }
      )
    }

    const adminEmail = process.env.ADMIN_EMAIL
    const senderEmail = process.env.SENDER_EMAIL

    // Importar Brevo dynamicamente
    const { TransactionalEmailsApi, SendSmtpEmail } = await import('@getbrevo/brevo')
    
    // Configurar cliente Brevo
    const apiInstance = new TransactionalEmailsApi()
    
    // Configurar API key usando a forma correta da SDK v3
    try {
      // Usar o método interno correto
      const auth = (apiInstance as any).client.authentications.apiKey
      auth.apiKey = process.env.BREVO_API_KEY
    } catch (e) {
      // Alternativa: usar via headers se necessário
      ;(apiInstance as any).defaultHeaders = {
        'api-key': process.env.BREVO_API_KEY
      }
    }

    // Email para o visitante (confirmação)
    const sendSmtpEmailUser = new SendSmtpEmail()
    sendSmtpEmailUser.subject = '✅ Mensagem Recebida com Sucesso!'
    sendSmtpEmailUser.htmlContent = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
          .content { padding: 40px 30px; color: #333; }
          .greeting { font-size: 18px; color: #667eea; font-weight: 600; margin-bottom: 20px; }
          .message-box { background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 25px 0; border-radius: 6px; }
          .message-label { color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; font-weight: 600; }
          .message-content { color: #333; line-height: 1.6; white-space: pre-wrap; word-wrap: break-word; }
          .subject-box { background-color: #e8f0fe; border-left: 4px solid #1f2937; padding: 15px; margin: 20px 0; border-radius: 6px; }
          .footer { background-color: #f8f9fa; padding: 30px; text-align: center; color: #666; font-size: 14px; border-top: 1px solid #eee; }
          .footer-text { margin: 0; }
          .signature { color: #667eea; font-weight: 600; margin-top: 10px; }
          .button { display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; border-radius: 6px; text-decoration: none; margin-top: 20px; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Mensagem Recebida!</h1>
          </div>
          
          <div class="content">
            <p class="greeting">Olá, ${sanitizedName}!</p>
            
            <p style="font-size: 16px; color: #555; line-height: 1.8;">
              Obrigado por entrar em contato! Recebemos sua mensagem com sucesso e entraremos em contato em breve.
            </p>
            
            <div class="subject-box">
              <div class="message-label">📌 Assunto</div>
              <div style="color: #1f2937; font-weight: 600; font-size: 16px;">${sanitizedSubject}</div>
            </div>
            
            <div class="message-box">
              <div class="message-label">💬 Sua Mensagem</div>
              <div class="message-content">${sanitizedMessage}</div>
            </div>
            
            <p style="font-size: 14px; color: #666; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              ⏱️ Recebido em: <strong>${new Date().toLocaleString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</strong>
            </p>
          </div>
          
          <div class="footer">
            <p class="footer-text">👨‍💻 Estamos analisando sua mensagem e entraremos em contato assim que possível.</p>
            <p class="signature">Equipe Camponez DEV</p>
          </div>
        </div>
      </body>
      </html>
    `
    sendSmtpEmailUser.sender = { name: 'CamponezDEV', email: senderEmail }
    sendSmtpEmailUser.to = [{ email: sanitizedEmail, name: sanitizedName }]

    // Email para o administrador (notificação)
    const sendSmtpEmailAdmin = new SendSmtpEmail()
    sendSmtpEmailAdmin.subject = `🎯 Novo Contato: ${sanitizedSubject}`
    sendSmtpEmailAdmin.htmlContent = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
          .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
          .badge { display: inline-block; background-color: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 20px; font-size: 12px; margin-top: 10px; }
          .content { padding: 40px 30px; color: #333; }
          .info-section { margin-bottom: 30px; }
          .info-label { color: #667eea; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; font-weight: 600; }
          .info-value { font-size: 16px; color: #1f2937; font-weight: 500; }
          .divider { border: none; border-top: 2px solid #f0f0f0; margin: 25px 0; }
          .message-box { background: linear-gradient(135deg, #f8f9fa 0%, #e8f0fe 100%); border-left: 4px solid #667eea; padding: 25px; border-radius: 6px; }
          .message-title { color: #667eea; font-weight: 600; margin-bottom: 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
          .message-content { color: #333; line-height: 1.8; white-space: pre-wrap; word-wrap: break-word; font-size: 15px; }
          .meta-info { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 25px; padding-top: 25px; border-top: 1px solid #eee; }
          .meta-item { }
          .meta-label { color: #666; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; font-weight: 600; }
          .meta-value { color: #1f2937; font-weight: 600; word-break: break-all; }
          .footer { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 25px 30px; text-align: center; color: white; }
          .footer-text { margin: 5px 0; font-size: 14px; }
          .action-button { display: inline-block; background-color: #fff; color: #667eea; padding: 12px 24px; border-radius: 6px; text-decoration: none; margin-top: 15px; font-weight: 600; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 Novo Contato Recebido</h1>
            <div class="badge">Responda dentro de 24h</div>
          </div>
          
          <div class="content">
            <div class="info-section">
              <div class="info-label">👤 Visitante</div>
              <div class="info-value">${sanitizedName}</div>
            </div>
            
            <div class="info-section">
              <div class="info-label">📧 Email</div>
              <div class="info-value" style="color: #667eea; word-break: break-all;">
                <a href="mailto:${sanitizedEmail}" style="color: #667eea; text-decoration: none; font-weight: 600;">${sanitizedEmail}</a>
              </div>
            </div>
            
            <hr class="divider">
            
            <div class="message-box">
              <div class="message-title">📌 Assunto da Mensagem</div>
              <div style="color: #1f2937; font-weight: 600; font-size: 18px; margin-bottom: 15px;">${sanitizedSubject}</div>
              
              <div class="message-title" style="margin-top: 20px;">💬 Conteúdo da Mensagem</div>
              <div class="message-content">${sanitizedMessage}</div>
            </div>
            
            <div class="meta-info">
              <div class="meta-item">
                <div class="meta-label">🕐 Data & Hora</div>
                <div class="meta-value">${new Date().toLocaleString('pt-BR', { weekday: 'short', year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</div>
              </div>
              <div class="meta-item">
                <div class="meta-label">⏱️ IP do Cliente</div>
                <div class="meta-value">${ip}</div>
              </div>
            </div>
          </div>
          
          <div class="footer">
            <p class="footer-text">⚡ Esta é uma mensagem de contato automática do seu portfolio</p>
            <p class="footer-text">Responda diretamente para ${sanitizedEmail}</p>
          </div>
        </div>
      </body>
      </html>
    `
    sendSmtpEmailAdmin.sender = { name: 'CamponezDEV', email: senderEmail }
    sendSmtpEmailAdmin.to = [{ email: adminEmail }]
    sendSmtpEmailAdmin.replyTo = { email: sanitizedEmail, name: sanitizedName }

    // Enviar emails
    try {
      await apiInstance.sendTransacEmail(sendSmtpEmailUser)
      await apiInstance.sendTransacEmail(sendSmtpEmailAdmin)
    } catch (brevoError) {
      console.error('Erro ao enviar email via Brevo:', brevoError)
      throw new Error('Falha ao enviar email')
    }

    // Log da mensagem (sem dados sensíveis)
    console.log('Nova mensagem de contato recebida:', {
      name: sanitizedName,
      timestamp: new Date().toISOString(),
      ip,
    })

    return NextResponse.json(
      {
        success: true,
        message: 'Mensagem enviada com sucesso!',
      },
      { 
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        }
      }
    )
  } catch (error) {
    // Log error for debugging (server-side only)
    console.error('Erro ao processar contato:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    })

    // Don't expose internal errors to client
    return NextResponse.json(
      { error: 'Erro ao processar sua mensagem. Tente novamente mais tarde.' },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        }
      }
    )
  }
}
