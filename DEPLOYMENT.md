# Guia de Deployment no Vercel

## Status Atual
✓ Repositório GitHub criado e sincronizado
✓ Build production testado e validado
✓ Segurança implementada e auditada
✓ Arquivo `vercel.json` configurado

## Pré-requisitos
- [Conta Vercel](https://vercel.com)
- [Repositório GitHub](https://github.com/CamponezTV/camponezDevPortfolio2025)
- Domínio registrado (já possui)

## Passo a Passo para Deploy

### 1. Conectar ao Vercel
1. Acesse [vercel.com/new](https://vercel.com/new)
2. Clique em "Continue with GitHub"
3. Autorize Vercel a acessar seus repositórios

### 2. Selecionar Repositório
1. Na página de import, selecione o repositório:
   - **Nome**: `camponezDevPortfolio2025`
   - **Owner**: `CamponezTV`

### 3. Configurar Variáveis de Ambiente
Antes de fazer deploy, adicione as variáveis de ambiente no Vercel:

**Project Settings → Environment Variables**

```
NEXT_PUBLIC_SITE_URL=https://seu-dominio.com
NEXT_PUBLIC_BREVO_API_KEY=xkeysib_seu_api_key_aqui
```

**Importante:** Use seu domínio real no `NEXT_PUBLIC_SITE_URL`

### 4. Configurar Domínio Personalizado
1. Vá para **Project Settings → Domains**
2. Clique em "Add Domain"
3. Digite seu domínio (ex: `camponez.dev`)
4. Siga as instruções de DNS

**DNS (se seu registrador for parecido com a maioria):**
```
Tipo: CNAME
Nome: seu-dominio.com (ou subdomain)
Valor: cname.vercel-dns.com
```

### 5. Deploy Automático
- Vercel detectará automaticamente mudanças no GitHub
- Cada push para `main` acionará um novo deploy
- Você receberá notificação via email

## Após o Primeiro Deploy

### Verificar Saúde do Site
```bash
# Em seu repositório local
npm run build    # Testa build
npm run dev      # Testa localmente antes de push
```

### Monitorar Deployments
1. Dashboard Vercel → seu projeto
2. "Deployments" mostra histórico
3. Logs e status de cada deployment

### Variáveis de Ambiente em Produção
Se precisar atualizar variáveis:
1. **Project Settings → Environment Variables**
2. Edite e salve
3. Faça um novo deployment (ou re-deploy anterior)

## Estrutura de Segurança

### Headers de Segurança (Automáticos via Vercel)
- ✓ HSTS (HTTP Strict Transport Security)
- ✓ X-Content-Type-Options
- ✓ X-Frame-Options
- ✓ X-XSS-Protection
- ✓ Content Security Policy

### Rate Limiting
- API routes: 100 requests/15min por IP
- Contact form: 5 requests/hora por IP
- Email: 3 requests/hora por IP

### Validação de Origem
- Apenas `NEXT_PUBLIC_SITE_URL` pode fazer requisições para API

## Troubleshooting

### Build falha no Vercel mas passa localmente
```bash
# Limpar cache local
rm -rf .next
npm run build
```

### Deploy não atualiza domínio
- Aguarde 24-48h para propagação DNS
- Limpe cache do navegador
- Use Ctrl+Shift+Delete para limpar cache completo

### Variáveis não carregam em produção
- Confirme que foram adicionadas em **Environment Variables**
- Faça um novo deployment (não re-deploy)
- Reinicie a aplicação se necessário

## Rollback (Reverter para Versão Anterior)

No dashboard Vercel:
1. Vá para "Deployments"
2. Encontre a versão anterior
3. Clique nos 3 pontos (...)
4. Selecione "Promote to Production"

## Suporte
- [Documentação Vercel](https://vercel.com/docs)
- [Suporte GitHub](https://github.com/CamponezTV/camponezDevPortfolio2025)
- Email: seu.email@gmail.com

---

**Criado em:** 20 de Janeiro de 2026
**Status:** Pronto para Produção
**Última atualização:** $(date)
