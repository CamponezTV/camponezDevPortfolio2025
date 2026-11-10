import { escapeHtml } from '@/lib/security'

export interface ContactMessage {
  name: string
  email: string
  subject: string
  message: string
}

const LOCALE = 'pt-BR'

const COLORS = {
  page: '#f4f4f7',
  panel: '#ffffff',
  text: '#1b1b21',
  subtle: '#4b4d5c',
  muted: '#6b6e80',
  hairline: '#e4e4ea',
  accent: '#4f5a8a',
  quote: '#f7f7fa',
}

function escapeContact(contact: ContactMessage): ContactMessage {
  return {
    name: escapeHtml(contact.name),
    email: escapeHtml(contact.email),
    subject: escapeHtml(contact.subject),
    message: escapeHtml(contact.message),
  }
}

function formatReceivedAt(receivedAt: Date): string {
  return receivedAt.toLocaleString(LOCALE, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const STYLES = `
  body { margin: 0; padding: 0; background: ${COLORS.page}; font-family: -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: ${COLORS.text}; }
  .panel { max-width: 560px; margin: 32px auto; background: ${COLORS.panel}; border: 1px solid ${COLORS.hairline}; border-radius: 16px; overflow: hidden; }
  .header { padding: 24px 32px; border-bottom: 1px solid ${COLORS.hairline}; font-size: 14px; font-weight: 600; letter-spacing: 0.02em; }
  .header span { color: ${COLORS.accent}; }
  .content { padding: 32px; }
  h1 { margin: 0 0 12px; font-size: 22px; font-weight: 500; line-height: 1.3; }
  p { margin: 0 0 16px; font-size: 15px; line-height: 1.6; color: ${COLORS.subtle}; }
  .label { margin: 24px 0 6px; font-size: 13px; color: ${COLORS.muted}; }
  .value { font-size: 15px; color: ${COLORS.text}; word-break: break-word; }
  .value a { color: ${COLORS.accent}; text-decoration: none; }
  .quote { margin-top: 6px; padding: 16px 20px; background: ${COLORS.quote}; border: 1px solid ${COLORS.hairline}; border-radius: 10px; font-size: 15px; line-height: 1.6; color: ${COLORS.text}; white-space: pre-wrap; word-wrap: break-word; }
  .footer { padding: 20px 32px; border-top: 1px solid ${COLORS.hairline}; font-size: 13px; color: ${COLORS.muted}; }
`

function wrapDocument(body: string): string {
  return `<!DOCTYPE html>
<html lang="${LOCALE}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>${STYLES}</style>
</head>
<body>
  <div class="panel">
    <div class="header">Arthur <span>Camponez</span></div>
    ${body}
  </div>
</body>
</html>`
}

export function buildVisitorConfirmationEmail(contact: ContactMessage, receivedAt = new Date()): string {
  const { name, subject, message } = escapeContact(contact)

  return wrapDocument(`
    <div class="content">
      <h1>Olá, ${name}. Recebi sua mensagem</h1>
      <p>Obrigado pelo contato. Vou ler com calma e responder neste mesmo email assim que possível.</p>
      <div class="label">Assunto</div>
      <div class="value">${subject}</div>
      <div class="label">Sua mensagem</div>
      <div class="quote">${message}</div>
    </div>
    <div class="footer">Recebida em ${formatReceivedAt(receivedAt)} · Arthur Camponez</div>`)
}

export function buildAdminNotificationEmail(
  contact: ContactMessage,
  clientIp: string,
  receivedAt = new Date(),
): string {
  const { name, email, subject, message } = escapeContact(contact)

  return wrapDocument(`
    <div class="content">
      <h1>Novo contato pelo site</h1>
      <div class="label">Nome</div>
      <div class="value">${name}</div>
      <div class="label">Email</div>
      <div class="value"><a href="mailto:${email}">${email}</a></div>
      <div class="label">Assunto</div>
      <div class="value">${subject}</div>
      <div class="label">Mensagem</div>
      <div class="quote">${message}</div>
    </div>
    <div class="footer">${formatReceivedAt(receivedAt)} · IP ${escapeHtml(clientIp)} · Responder vai direto para ${email}</div>`)
}
