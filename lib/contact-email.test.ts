import { buildAdminNotificationEmail, buildVisitorConfirmationEmail } from '@/lib/contact-email'

const contact = {
  name: '<script>alert(1)</script>',
  email: "o'brien@example.com",
  subject: 'Olá & bem-vindo',
  message: '<img src=x onerror=alert(1)>',
}

describe('contact-email', () => {
  it('escapes visitor-controlled fields in the confirmation email', () => {
    const html = buildVisitorConfirmationEmail(contact)

    expect(html).not.toContain('<script>')
    expect(html).not.toContain('<img src=x')
    expect(html).toContain('&lt;script&gt;')
    expect(html).toContain('Olá &amp; bem-vindo')
  })

  it('escapes fields and the client IP in the admin notification', () => {
    const html = buildAdminNotificationEmail(contact, '<b>1.2.3.4</b>')

    expect(html).not.toContain('<b>1.2.3.4</b>')
    expect(html).toContain('&lt;b&gt;1.2.3.4&lt;/b&gt;')
    expect(html).not.toContain('<img src=x')
  })
})
