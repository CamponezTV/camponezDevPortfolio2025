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

  it('deve ter 6 projetos na lista (4 na section + 2 no catálogo)', () => {
    const pt = getTranslations('pt')
    expect(pt.projects.items).toHaveLength(6)
    expect(pt.projects.items[0].title).toBe('Xmetal Token')
    expect(pt.projects.items[3].title).toBe('Novasyn LTDA')
    expect(pt.projects.items[4].title).toBe('Portfolio 2024')
    expect(pt.projects.items[5].title).toBe('Portfolio 2026')
  })

  it('deve ter Portfolio 2024 com todas as informações corretas', () => {
    const pt = getTranslations('pt')
    const portfolio2024 = pt.projects.items[4]
    expect(portfolio2024.title).toBe('Portfolio 2024')
    expect(portfolio2024.category).toBe('Full Stack & Design')
    expect(portfolio2024.tags).toContain('Next.js 14')
    expect(portfolio2024.tags).toContain('Three.js')
    expect(portfolio2024.details).toBeDefined()
    expect(portfolio2024.details.challenge).toBeDefined()
    expect(portfolio2024.details.solution).toBeDefined()
    expect(portfolio2024.details.results).toBeDefined()
  })

  it('deve ter Portfolio 2026 com todas as informações corretas', () => {
    const pt = getTranslations('pt')
    const portfolio2026 = pt.projects.items[5]
    expect(portfolio2026.title).toBe('Portfolio 2026')
    expect(portfolio2026.category).toBe('Design & Desenvolvimento')
    expect(portfolio2026.tags).toContain('Embla Carousel')
    expect(portfolio2026.details).toBeDefined()
  })

  it('deve ter estrutura igual entre PT e EN para projetos', () => {
    const pt = getTranslations('pt')
    const en = getTranslations('en')
    expect(pt.projects.items.length).toBe(en.projects.items.length)
    pt.projects.items.forEach((ptProject, index) => {
      const enProject = en.projects.items[index]
      expect(ptProject.tags.length).toBe(enProject.tags.length)
      expect(ptProject.details).toBeDefined()
      expect(enProject.details).toBeDefined()
    })
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
