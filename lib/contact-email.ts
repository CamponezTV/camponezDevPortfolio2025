import { escapeHtml } from '@/lib/security'

export interface ContactMessage {
  name: string
  email: string
  subject: string
  message: string
}

const LOCALE = 'pt-BR'

function escapeContact(contact: ContactMessage): ContactMessage {
  return {
    name: escapeHtml(contact.name),
    email: escapeHtml(contact.email),
    subject: escapeHtml(contact.subject),
    message: escapeHtml(contact.message),
  }
}

const BRAND_GRADIENT = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'

const BASE_STYLES = `
  body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f5f5f5; margin: 0; padding: 0; }
  .container { max-width: 600px; margin: 20px auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden; }
  .header { background: ${BRAND_GRADIENT}; color: white; padding: 40px 30px; text-align: center; }
  .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
  .content { padding: 40px 30px; color: #333; }
  .message-content { color: #333; white-space: pre-wrap; word-wrap: break-word; }
`

function wrapDocument(styles: string, body: string): string {
  return `<!DOCTYPE html>
<html lang="${LOCALE}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${BASE_STYLES}${styles}</style>
</head>
<body>
  <div class="container">${body}</div>
</body>
</html>`
}

export function buildVisitorConfirmationEmail(contact: ContactMessage, receivedAt = new Date()): string {
  const { name, subject, message } = escapeContact(contact)
  const receivedLabel = receivedAt.toLocaleString(LOCALE, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  const styles = `
    .greeting { font-size: 18px; color: #667eea; font-weight: 600; margin-bottom: 20px; }
    .message-box { background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin: 25px 0; border-radius: 6px; }
    .message-label { color: #666; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; font-weight: 600; }
    .message-content { line-height: 1.6; }
    .subject-box { background-color: #e8f0fe; border-left: 4px solid #1f2937; padding: 15px; margin: 20px 0; border-radius: 6px; }
    .footer { background-color: #f8f9fa; padding: 30px; text-align: center; color: #666; font-size: 14px; border-top: 1px solid #eee; }
    .footer-text { margin: 0; }
    .signature { color: #667eea; font-weight: 600; margin-top: 10px; }
  `

  return wrapDocument(
    styles,
    `
    <div class="header"><h1>✅ Mensagem Recebida!</h1></div>
    <div class="content">
      <p class="greeting">Olá, ${name}!</p>
      <p style="font-size: 16px; color: #555; line-height: 1.8;">
        Obrigado por entrar em contato! Recebemos sua mensagem com sucesso e entraremos em contato em breve.
      </p>
      <div class="subject-box">
        <div class="message-label">📌 Assunto</div>
        <div style="color: #1f2937; font-weight: 600; font-size: 16px;">${subject}</div>
      </div>
      <div class="message-box">
        <div class="message-label">💬 Sua Mensagem</div>
        <div class="message-content">${message}</div>
      </div>
      <p style="font-size: 14px; color: #666; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        ⏱️ Recebido em: <strong>${receivedLabel}</strong>
      </p>
    </div>
    <div class="footer">
      <p class="footer-text">👨‍💻 Estamos analisando sua mensagem e entraremos em contato assim que possível.</p>
      <p class="signature">Equipe Camponez DEV</p>
    </div>`,
  )
}

export function buildAdminNotificationEmail(
  contact: ContactMessage,
  clientIp: string,
  receivedAt = new Date(),
): string {
  const { name, email, subject, message } = escapeContact(contact)
  const receivedLabel = receivedAt.toLocaleString(LOCALE, {
    weekday: 'short',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })

  const styles = `
    .badge { display: inline-block; background-color: rgba(255,255,255,0.2); padding: 6px 12px; border-radius: 20px; font-size: 12px; margin-top: 10px; }
    .info-section { margin-bottom: 30px; }
    .info-label { color: #667eea; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 8px; font-weight: 600; }
    .info-value { font-size: 16px; color: #1f2937; font-weight: 500; }
    .divider { border: none; border-top: 2px solid #f0f0f0; margin: 25px 0; }
    .message-box { background: linear-gradient(135deg, #f8f9fa 0%, #e8f0fe 100%); border-left: 4px solid #667eea; padding: 25px; border-radius: 6px; }
    .message-title { color: #667eea; font-weight: 600; margin-bottom: 12px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; }
    .message-content { line-height: 1.8; font-size: 15px; }
    .meta-info { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 25px; padding-top: 25px; border-top: 1px solid #eee; }
    .meta-label { color: #666; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; font-weight: 600; }
    .meta-value { color: #1f2937; font-weight: 600; word-break: break-all; }
    .footer { background: ${BRAND_GRADIENT}; padding: 25px 30px; text-align: center; color: white; }
    .footer-text { margin: 5px 0; font-size: 14px; }
  `

  return wrapDocument(
    styles,
    `
    <div class="header">
      <h1>🎯 Novo Contato Recebido</h1>
      <div class="badge">Responda dentro de 24h</div>
    </div>
    <div class="content">
      <div class="info-section">
        <div class="info-label">👤 Visitante</div>
        <div class="info-value">${name}</div>
      </div>
      <div class="info-section">
        <div class="info-label">📧 Email</div>
        <div class="info-value" style="word-break: break-all;">
          <a href="mailto:${email}" style="color: #667eea; text-decoration: none; font-weight: 600;">${email}</a>
        </div>
      </div>
      <hr class="divider">
      <div class="message-box">
        <div class="message-title">📌 Assunto da Mensagem</div>
        <div style="color: #1f2937; font-weight: 600; font-size: 18px; margin-bottom: 15px;">${subject}</div>
        <div class="message-title" style="margin-top: 20px;">💬 Conteúdo da Mensagem</div>
        <div class="message-content">${message}</div>
      </div>
      <div class="meta-info">
        <div>
          <div class="meta-label">🕐 Data & Hora</div>
          <div class="meta-value">${receivedLabel}</div>
        </div>
        <div>
          <div class="meta-label">⏱️ IP do Cliente</div>
          <div class="meta-value">${escapeHtml(clientIp)}</div>
        </div>
      </div>
    </div>
    <div class="footer">
      <p class="footer-text">⚡ Esta é uma mensagem de contato automática do seu portfolio</p>
      <p class="footer-text">Responda diretamente para ${email}</p>
    </div>`,
  )
}
