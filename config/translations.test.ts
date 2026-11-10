import { getTranslations, translations } from '@/config/translations'

describe('Translations', () => {
  it('deve ter traduções para português', () => {
    const pt = getTranslations('pt')
    expect(pt.nav.home).toBe('Início')
    expect(pt.hero.summary).toBeDefined()
  })

  it('deve ter traduções para inglês', () => {
    const en = getTranslations('en')
    expect(en.nav.home).toBe('Home')
    expect(en.hero.summary).toBeDefined()
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
    expect(pt.hero.role).toBeDefined()
    expect(pt.hero.summary).toBeDefined()
    expect(pt.hero.ctaProjects).toBeDefined()
    expect(pt.hero.ctaContact).toBeDefined()
  })

  it('deve ter as mesmas imagens de projeto em PT e EN', () => {
    const pt = getTranslations('pt')
    const en = getTranslations('en')
    expect(en.projects.items.map((p) => p.image)).toEqual(pt.projects.items.map((p) => p.image))
  })

  const findProject = (title: string) => getTranslations('pt').projects.items.find((project) => project.title === title)

  it('deve listar os projetos mais recentes primeiro', () => {
    const titles = getTranslations('pt').projects.items.map((project) => project.title)
    expect(titles).toEqual([
      'OCL Advogados',
      'Grupo Sartoretto',
      'O Incidente WebSite',
      'Banestes Asset',
      'Vende.AI',
      'Novasyn LTDA',
      'Portfolio 2024',
      'Portfolio 2026',
    ])
  })

  it('deve ter os sites da OCL Advogados e do Grupo Sartoretto com link e imagem', () => {
    expect(findProject('OCL Advogados')).toMatchObject({ link: 'https://ocladvogados.adv.br/', image: '/ocl.jpg' })
    expect(findProject('Grupo Sartoretto')).toMatchObject({ link: 'https://sartoretto.novasyn.com.br/', image: '/sartoretto.jpg' })
  })

  it('deve ter Portfolio 2024 com todas as informações corretas', () => {
    const portfolio2024 = findProject('Portfolio 2024')!
    expect(portfolio2024.category).toBe('Full Stack & Design')
    expect(portfolio2024.tags).toContain('Next.js 14')
    expect(portfolio2024.tags).toContain('Three.js')
    expect(portfolio2024.details).toBeDefined()
    expect(portfolio2024.details.challenge).toBeDefined()
    expect(portfolio2024.details.solution).toBeDefined()
    expect(portfolio2024.details.results).toBeDefined()
  })

  it('deve ter Portfolio 2026 com todas as informações corretas', () => {
    const portfolio2026 = findProject('Portfolio 2026')!
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

  it('deve usar o mesmo slug para cada projeto nos dois idiomas', () => {
    const slugs = (language: 'pt' | 'en') => getTranslations(language).projects.items.map((project) => project.slug)
    expect(slugs('en')).toEqual(slugs('pt'))
    expect(new Set(slugs('pt')).size).toBe(slugs('pt').length)
  })
})
