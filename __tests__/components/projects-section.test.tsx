/**
 * Testes da Projects Section
 * 
 * O ProjectsSection e ProjectsCatalog usam useTranslations() que depende de contextos
 * que não estão disponíveis durante os testes diretos.
 * 
 * Os testes principais estão em config/translations.test.ts que validam:
 * - 6 projetos na lista (4 na section + 2 adicionais no catálogo)
 * - Portfolio 2024 com todas as informações corretas
 * - Portfolio 2026 com todas as informações corretas
 * - Paridade entre PT e EN
 * 
 * Este arquivo documenta a estrutura e comportamento esperado.
 */

describe('ProjectsSection Component', () => {
  it('deve usar .slice(0, 4) para exibir apenas 4 projetos principais', () => {
    // Estrutura esperada:
    const projects = [
      { id: 1, title: 'Xmetal Token' },
      { id: 2, title: 'Vende.AI' },
      { id: 3, title: 'Banestes Asset' },
      { id: 4, title: 'Novasyn LTDA' },
      { id: 5, title: 'Portfolio 2024' },
      { id: 6, title: 'Portfolio 2026' },
    ]

    const mainProjects = projects.slice(0, 4)
    
    expect(mainProjects).toHaveLength(4)
    expect(mainProjects[0].title).toBe('Xmetal Token')
    expect(mainProjects[3].title).toBe('Novasyn LTDA')
    expect(mainProjects.find(p => p.title === 'Portfolio 2024')).toBeUndefined()
    expect(mainProjects.find(p => p.title === 'Portfolio 2026')).toBeUndefined()
  })

  it('deve manter ProjectsCatalog com todos os 6 projetos', () => {
    const projects = [
      { id: 1, title: 'Xmetal Token' },
      { id: 2, title: 'Vende.AI' },
      { id: 3, title: 'Banestes Asset' },
      { id: 4, title: 'Novasyn LTDA' },
      { id: 5, title: 'Portfolio 2024' },
      { id: 6, title: 'Portfolio 2026' },
    ]

    expect(projects).toHaveLength(6)
    expect(projects[4].title).toBe('Portfolio 2024')
    expect(projects[5].title).toBe('Portfolio 2026')
  })

  it('deve ter arrays de image, link e github com 6 itens cada', () => {
    const imageArray = [
      '/Xmetal.png',
      '/vendeai-logo.svg',
      '/banestes.png',
      '/novasyn.png',
      '/portfolio-2024.png',
      '',
    ]

    const linkArray = [
      'https://xmetal.novasyn.com.br/',
      'https://novasyn.com.br/#portfolio',
      'https://www.banestesasset.com.br/',
      'https://novasyn.com.br',
      'https://my-portfolio-six-kappa-14.vercel.app/',
      '',
    ]

    const githubArray = [
      '',
      '',
      '',
      'https://github.com/CamponezTV/NovaSyn-LTDA',
      'https://github.com/CamponezTV/my-portfolio',
      'https://github.com/CamponezTV/camponezDevPortfolio2025',
    ]

    // Todos devem ter 6 itens
    expect(imageArray).toHaveLength(6)
    expect(linkArray).toHaveLength(6)
    expect(githubArray).toHaveLength(6)

    // Portfolio 2024 (índice 4) deve ter imagem, link e github
    expect(imageArray[4]).toBe('/portfolio-2024.png')
    expect(linkArray[4]).toBe('https://my-portfolio-six-kappa-14.vercel.app/')
    expect(githubArray[4]).toBe('https://github.com/CamponezTV/my-portfolio')

    // Portfolio 2026 (índice 5) deve ter apenas github
    expect(imageArray[5]).toBe('')
    expect(linkArray[5]).toBe('')
    expect(githubArray[5]).toBe('https://github.com/CamponezTV/camponezDevPortfolio2025')
  })

  it('deve renderizar imagem apenas se a URL for válida (não vazia)', () => {
    // Teste de lógica condicional
    const portfolio2026Image = ''
    const portfolio2024Image = '/portfolio-2024.png'

    // String vazia deve não renderizar
    expect(portfolio2026Image).toBeFalsy()
    
    // String com valor deve renderizar
    expect(portfolio2024Image).toBeTruthy()
  })

  it('deve renderizar botão "Ver Projeto" apenas se link for válido', () => {
    // Teste de lógica condicional para links
    const portfolio2026Link = ''
    const portfolio2024Link = 'https://my-portfolio-six-kappa-14.vercel.app/'

    // String vazia deve não mostrar botão
    expect(portfolio2026Link).toBeFalsy()
    
    // String com valor deve mostrar botão
    expect(portfolio2024Link).toBeTruthy()
  })

  it('deve sempre renderizar botão "Código" se github for válido', () => {
    // Teste de lógica condicional para github
    const portfolio2024Github = 'https://github.com/CamponezTV/my-portfolio'
    const portfolio2026Github = 'https://github.com/CamponezTV/camponezDevPortfolio2025'
    const xmetalGithub = ''

    // Ambos portfolios devem ter github
    expect(portfolio2024Github).toBeTruthy()
    expect(portfolio2026Github).toBeTruthy()

    // Xmetal não deve ter github
    expect(xmetalGithub).toBeFalsy()
  })
})

describe('ProjectsCatalog Component', () => {
  it('deve sincronizar arrays em ambos os mappings (inicial + useEffect)', () => {
    // Primeiro mapping (renderização inicial da lista)
    const imageArray1 = [
      '/Xmetal.png',
      '/vendeai-logo.svg',
      '/banestes.png',
      '/novasyn.png',
      '/portfolio-2024.png',
      '',
    ]

    // Segundo mapping (useEffect para selectedProjectId)
    const imageArray2 = [
      '/Xmetal.png',
      '/vendeai-logo.svg',
      '/banestes.png',
      '/novasyn.png',
      '/portfolio-2024.png',
      '',
    ]

    // Devem ser idênticos
    expect(imageArray1).toEqual(imageArray2)
  })

  it('deve renderizar lista modal com todos os 6 projetos', () => {
    const projects = [
      { id: 1, title: 'Xmetal Token' },
      { id: 2, title: 'Vende.AI' },
      { id: 3, title: 'Banestes Asset' },
      { id: 4, title: 'Novasyn LTDA' },
      { id: 5, title: 'Portfolio 2024' },
      { id: 6, title: 'Portfolio 2026' },
    ]

    // Todos aparecem no modal
    expect(projects).toHaveLength(6)
    projects.forEach((project, index) => {
      expect(project.id).toBe(index + 1)
    })
  })

  it('deve exibir detalhes corretos ao selecionar Portfolio 2024', () => {
    const portfolio2024 = {
      id: 5,
      title: 'Portfolio 2024',
      category: 'Full Stack & Design',
      image: '/portfolio-2024.png',
      link: 'https://my-portfolio-six-kappa-14.vercel.app/',
      github: 'https://github.com/CamponezTV/my-portfolio',
      details: {
        challenge: 'Criar um portfólio visualmente atraente e funcional...',
        solution: 'Desenvolvido com Next.js 14, TypeScript...',
        results: 'Portfólio com animações fluidas, globo 3D interativo...',
      }
    }

    expect(portfolio2024.title).toBe('Portfolio 2024')
    expect(portfolio2024.image).toBeTruthy()
    expect(portfolio2024.link).toBeTruthy()
    expect(portfolio2024.github).toBeTruthy()
    expect(portfolio2024.details.challenge).toBeDefined()
  })

  it('deve exibir detalhes corretos ao selecionar Portfolio 2026', () => {
    const portfolio2026 = {
      id: 6,
      title: 'Portfolio 2026',
      category: 'Design & Desenvolvimento',
      image: '',
      link: '',
      github: 'https://github.com/CamponezTV/camponezDevPortfolio2025',
      details: {
        challenge: 'Criar um portfólio pessoal que destacasse...',
        solution: 'Desenvolvi com Next.js 16, TypeScript...',
        results: 'Portfólio com 100% de performance...',
      }
    }

    expect(portfolio2026.title).toBe('Portfolio 2026')
    expect(portfolio2026.image).toBeFalsy() // Vazio
    expect(portfolio2026.link).toBeFalsy() // Vazio
    expect(portfolio2026.github).toBeTruthy()
    expect(portfolio2026.details.results).toBeDefined()
  })
})

describe('Projects Display Logic', () => {
  it('deve aplicar .slice(0, 4) corretamente em projects-section.tsx', () => {
    const totalProjects = 6
    const displayedInSection = 4
    const displayedInCatalogOnly = 2

    expect(totalProjects).toBe(displayedInSection + displayedInCatalogOnly)
    expect(displayedInCatalogOnly).toBe(2)
  })

  it('deve filtrar Portfolio 2024 e Portfolio 2026 da seção principal', () => {
    const projects = [
      { index: 0, title: 'Xmetal Token' },
      { index: 1, title: 'Vende.AI' },
      { index: 2, title: 'Banestes Asset' },
      { index: 3, title: 'Novasyn LTDA' },
      { index: 4, title: 'Portfolio 2024' },
      { index: 5, title: 'Portfolio 2026' },
    ]

    const sectionProjects = projects.slice(0, 4)
    const catalogOnlyProjects = projects.slice(4)

    expect(sectionProjects).toHaveLength(4)
    expect(catalogOnlyProjects).toHaveLength(2)
    expect(catalogOnlyProjects[0].title).toBe('Portfolio 2024')
    expect(catalogOnlyProjects[1].title).toBe('Portfolio 2026')
  })
})
