import { getTranslations, translations, detectBrowserLanguage } from '@/config/translations'

describe('Translations', () => {
  it('deve ter traduções para português', () => {
    const pt = getTranslations('pt')
    expect(pt.nav.home).toBe('Início')
    expect(pt.hero.description).toBeDefined()
  })

  it('deve ter traduções para inglês', () => {
    const en = getTranslations('en')
    expect(en.nav.home).toBe('Home')
    expect(en.hero.description).toBeDefined()
  })

  it('deve ter todas as seções em ambas as linguagens', () => {
    const ptKeys = Object.keys(translations.pt)
    const enKeys = Object.keys(translations.en)
    expect(ptKeys).toEqual(enKeys)
  })

  it('deve ter todas as chaves de navegação em português', () => {
    const pt = getTranslations('pt')
    expect(pt.nav.home).toBeDefined()
    expect(pt.nav.about).toBeDefined()
    expect(pt.nav.skills).toBeDefined()
    expect(pt.nav.projects).toBeDefined()
    expect(pt.nav.contact).toBeDefined()
  })

  it('deve ter todas as chaves de herói em português', () => {
    const pt = getTranslations('pt')
    expect(pt.hero.description).toBeDefined()
    expect(pt.hero.passion).toBeDefined()
    expect(pt.hero.scroll).toBeDefined()
    expect(pt.hero.since).toBeDefined()
  })

  it('deve detectar português no navegador', () => {
    Object.defineProperty(navigator, 'language', {
      value: 'pt-BR',
      configurable: true,
    })
    expect(detectBrowserLanguage()).toBe('pt')
  })

  it('deve detectar inglês como padrão para idiomas não portugueses', () => {
    Object.defineProperty(navigator, 'language', {
      value: 'en-US',
      configurable: true,
    })
    expect(detectBrowserLanguage()).toBe('en')
  })
})
