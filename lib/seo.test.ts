/** @jest-environment node */
import robots from '@/app/robots'
import sitemap from '@/app/sitemap'
import { getTranslations } from '@/config/translations'
import { languageAlternates, projectPath, translatePath } from './i18n'
import { homeMetadata, projectMetadata } from './metadata'
import { PROFILES, SITE_URL } from './site'
import { homeStructuredData, projectStructuredData, serializeJsonLd } from './structured-data'

type GraphNode = { '@type': string; [key: string]: unknown }

const nodesOf = (data: { '@graph': object[] }) => data['@graph'] as GraphNode[]
const findNode = (data: { '@graph': object[] }, type: string) => nodesOf(data).find((node) => node['@type'] === type)
const [firstProject] = getTranslations('pt').projects.items

describe('structured data', () => {
  it('describes the person with official profiles, role and location', () => {
    expect(findNode(homeStructuredData('pt'), 'Person')).toMatchObject({
      name: 'Arthur Camponez Marinho',
      alternateName: 'Arthur Camponez',
      url: SITE_URL,
      jobTitle: 'Desenvolvedor full stack',
      sameAs: [PROFILES.linkedin.url, PROFILES.github.url],
      address: { addressLocality: 'Vila Velha', addressRegion: 'ES', addressCountry: 'BR' },
    })
  })

  it('uses the English job title and URL on the English home page', () => {
    const data = homeStructuredData('en')
    expect(findNode(data, 'Person')).toMatchObject({ jobTitle: 'Full stack developer' })
    expect(findNode(data, 'ProfilePage')).toMatchObject({ url: `${SITE_URL}/en`, inLanguage: 'en' })
  })

  it('credits each case study to the person with a breadcrumb back to the project list', () => {
    const data = projectStructuredData('pt', firstProject)
    const person = findNode(homeStructuredData('pt'), 'Person')
    expect(findNode(data, 'CreativeWork')).toMatchObject({
      name: firstProject.title,
      url: `${SITE_URL}/projetos/${firstProject.slug}`,
      author: { '@id': person?.['@id'] },
    })
    const breadcrumb = findNode(data, 'BreadcrumbList') as unknown as { itemListElement: { item: string }[] }
    expect(breadcrumb.itemListElement.map((crumb) => crumb.item)).toEqual([
      SITE_URL,
      `${SITE_URL}/projetos`,
      `${SITE_URL}/projetos/${firstProject.slug}`,
    ])
  })

  it('escapes < so the JSON-LD cannot close its script tag', () => {
    expect(serializeJsonLd({ text: '</script>' })).not.toContain('</script>')
  })
})

describe('language routing', () => {
  it('maps every page to its counterpart in the other language', () => {
    expect(translatePath('/', 'en')).toBe('/en')
    expect(translatePath('/en', 'pt')).toBe('/')
    expect(translatePath('/projetos', 'en')).toBe('/en/projects')
    expect(translatePath('/en/projects/vende-ai', 'pt')).toBe('/projetos/vende-ai')
  })

  it('declares both languages and a Portuguese default as hreflang alternates', () => {
    expect(languageAlternates((language) => projectPath(language, 'novasyn'))).toEqual({
      'pt-BR': '/projetos/novasyn',
      en: '/en/projects/novasyn',
      'x-default': '/projetos/novasyn',
    })
  })

  it('gives each home page its own canonical URL', () => {
    expect(homeMetadata('pt').alternates?.canonical).toBe('/')
    expect(homeMetadata('en').alternates?.canonical).toBe('/en')
  })

  it('titles case studies with the project name', () => {
    expect(projectMetadata('en', firstProject.slug).title).toBe(`${firstProject.title} · Case study`)
  })
})

describe('crawling', () => {
  it('opens the site to crawlers, blocks the API and points to the sitemap', () => {
    expect(robots()).toEqual({
      rules: [{ userAgent: '*', allow: '/', disallow: '/api/' }],
      sitemap: `${SITE_URL}/sitemap.xml`,
      host: SITE_URL,
    })
  })

  it('lists every page in both languages plus the resumes', () => {
    const urls = sitemap().map((entry) => entry.url)
    const projectCount = getTranslations('pt').projects.items.length

    expect(urls).toEqual(expect.arrayContaining([SITE_URL, `${SITE_URL}/en`, `${SITE_URL}/projetos`, `${SITE_URL}/en/projects`]))
    expect(urls).toContain(`${SITE_URL}/en/projects/${firstProject.slug}`)
    expect(urls).toContain(`${SITE_URL}/resume/cv-en.pdf`)
    expect(urls).toHaveLength((2 + projectCount) * 2 + 2)
  })

  it('links each sitemap entry to its translation', () => {
    const home = sitemap().find((entry) => entry.url === SITE_URL)
    expect(home?.alternates?.languages).toEqual({ 'pt-BR': SITE_URL, en: `${SITE_URL}/en` })
  })
})
