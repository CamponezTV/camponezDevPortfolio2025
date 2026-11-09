import { NextRequest, NextResponse } from 'next/server'
import { validateEmail, checkRateLimit } from '@/lib/security'
import { securityConfig } from '@/lib/security-config'
import {
  buildAdminNotificationEmail,
  buildVisitorConfirmationEmail,
  type ContactMessage,
} from '@/lib/contact-email'

const MAX_PAYLOAD_CHARS = 10_000
const SENDER_NAME = 'CamponezDEV'
const FALLBACK_SITE_URL = 'https://camponez.com.br'

const FIELD_LIMITS = {
  name: { min: 2, max: 100, label: 'Nome' },
  subject: { min: 5, max: 200, label: 'Assunto' },
  message: { min: 10, max: 5000, label: 'Mensagem' },
} as const

type ValidatedField = keyof typeof FIELD_LIMITS

function allowedOrigin(): string {
  return process.env.NEXT_PUBLIC_SITE_URL || FALLBACK_SITE_URL
}

function corsHeaders() {
  return { 'Access-Control-Allow-Origin': allowedOrigin() }
}

function errorResponse(error: string, status: number) {
  return NextResponse.json({ error }, { status })
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()
  return request.headers.get('x-real-ip') || '127.0.0.1'
}

type BodyResult = { ok: true; body: unknown } | { ok: false; response: NextResponse }

async function readJsonBody(request: NextRequest): Promise<BodyResult> {
  if (!request.headers.get('content-type')?.includes('application/json')) {
    return { ok: false, response: errorResponse('Content-Type deve ser application/json', 400) }
  }

  const text = await request.text()
  if (text.length > MAX_PAYLOAD_CHARS) {
    return { ok: false, response: errorResponse('Payload muito grande', 413) }
  }

  try {
    return { ok: true, body: JSON.parse(text) }
  } catch {
    return { ok: false, response: errorResponse('JSON inválido', 400) }
  }
}

type ValidationResult = { ok: true; data: ContactMessage } | { ok: false; error: string }

function validateContactBody(body: unknown): ValidationResult {
  const fields = (body ?? {}) as Record<string, unknown>
  const { name, email, subject, message } = fields

  if (![name, email, subject, message].every((value) => typeof value === 'string' && value)) {
    return { ok: false, error: 'Todos os campos são obrigatórios' }
  }

  const values = { name, subject, message } as Record<ValidatedField, string>
  for (const field of Object.keys(FIELD_LIMITS) as ValidatedField[]) {
    const { min, max, label } = FIELD_LIMITS[field]
    const length = values[field].length
    if (length < min || length > max) {
      return { ok: false, error: `${label} deve ter entre ${min} e ${max} caracteres` }
    }
  }

  if (!validateEmail(email as string)) {
    return { ok: false, error: 'Email inválido' }
  }

  return {
    ok: true,
    data: {
      name: values.name.trim(),
      email: (email as string).trim(),
      subject: values.subject.trim(),
      message: values.message.trim(),
    },
  }
}

interface MailConfig {
  apiKey: string
  adminEmail: string
  senderEmail: string
}

type MailConfigResult = { ok: true; config: MailConfig } | { ok: false; response: NextResponse }

function readMailConfig(): MailConfigResult {
  const required = [
    { env: 'BREVO_API_KEY', error: 'Serviço de email não configurado' },
    { env: 'ADMIN_EMAIL', error: 'Email do administrador não configurado' },
    { env: 'SENDER_EMAIL', error: 'Email do remetente não configurado' },
  ] as const

  for (const { env, error } of required) {
    if (!process.env[env]) {
      console.error(`${env} não configurada`)
      return { ok: false, response: errorResponse(error, 503) }
    }
  }

  return {
    ok: true,
    config: {
      apiKey: process.env.BREVO_API_KEY as string,
      adminEmail: process.env.ADMIN_EMAIL as string,
      senderEmail: process.env.SENDER_EMAIL as string,
    },
  }
}

async function sendContactEmails(contact: ContactMessage, clientIp: string, config: MailConfig) {
  const { TransactionalEmailsApi, TransactionalEmailsApiApiKeys, SendSmtpEmail } = await import('@getbrevo/brevo')

  const api = new TransactionalEmailsApi()
  api.setApiKey(TransactionalEmailsApiApiKeys.apiKey, config.apiKey)

  const sender = { name: SENDER_NAME, email: config.senderEmail }

  const visitorEmail = new SendSmtpEmail()
  visitorEmail.subject = '✅ Mensagem Recebida com Sucesso!'
  visitorEmail.htmlContent = buildVisitorConfirmationEmail(contact)
  visitorEmail.sender = sender
  visitorEmail.to = [{ email: contact.email, name: contact.name }]

  const adminEmail = new SendSmtpEmail()
  adminEmail.subject = `🎯 Novo Contato: ${contact.subject}`
  adminEmail.htmlContent = buildAdminNotificationEmail(contact, clientIp)
  adminEmail.sender = sender
  adminEmail.to = [{ email: config.adminEmail }]
  adminEmail.replyTo = { email: contact.email, name: contact.name }

  await api.sendTransacEmail(visitorEmail)
  await api.sendTransacEmail(adminEmail)
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      ...corsHeaders(),
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-CSRF-Token',
      'Access-Control-Max-Age': '86400',
    },
  })
}

export async function POST(request: NextRequest) {
  try {
    const clientIp = getClientIp(request)
    const { maxRequests, windowMs } = securityConfig.rateLimit.contact

    if (!checkRateLimit(clientIp, maxRequests, windowMs)) {
      return errorResponse('Muitas tentativas. Tente novamente mais tarde.', 429)
    }

    const parsed = await readJsonBody(request)
    if (!parsed.ok) return parsed.response

    const validation = validateContactBody(parsed.body)
    if (!validation.ok) return errorResponse(validation.error, 400)

    const mail = readMailConfig()
    if (!mail.ok) return mail.response

    await sendContactEmails(validation.data, clientIp, mail.config)

    console.log('Nova mensagem de contato recebida:', {
      name: validation.data.name,
      timestamp: new Date().toISOString(),
      ip: clientIp,
    })

    return NextResponse.json(
      { success: true, message: 'Mensagem enviada com sucesso!' },
      { status: 200, headers: corsHeaders() },
    )
  } catch (error) {
    console.error('Erro ao processar contato:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    })

    return NextResponse.json(
      { error: 'Erro ao processar sua mensagem. Tente novamente mais tarde.' },
      { status: 500, headers: corsHeaders() },
    )
  }
}
