import React from 'react'
import { render, screen } from '@testing-library/react'
import { ProjectsSection } from '@/components/projects-section'
import { LanguageProvider } from '@/context/language-context'
import { getTranslations } from '@/config/translations'

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean }) => {
    const imageProps = Object.fromEntries(Object.entries(props).filter(([key]) => key !== 'fill' && key !== 'priority'))
    return <img {...imageProps} alt={props.alt ?? ''} />
  },
}))

const pt = getTranslations('pt')
const en = getTranslations('en')

function renderSection(language: 'pt' | 'en' = 'pt') {
  return render(
    <LanguageProvider language={language}>
      <ProjectsSection />
    </LanguageProvider>,
  )
}

describe('ProjectsSection', () => {
  it('shows only the first four projects on the page', () => {
    renderSection()

    pt.projects.items.slice(0, 4).forEach((project) => {
      expect(screen.getByRole('heading', { name: project.title })).toBeInTheDocument()
    })
    pt.projects.items.slice(4).forEach((project) => {
      expect(screen.queryByRole('heading', { name: project.title })).not.toBeInTheDocument()
    })
  })

  it('links each card to its case study page', () => {
    renderSection()
    const [firstProject] = pt.projects.items

    expect(screen.getByRole('link', { name: firstProject.title })).toHaveAttribute('href', `/projetos/${firstProject.slug}`)
  })

  it('links to the page with every project in the current language', () => {
    renderSection('en')

    expect(screen.getByRole('link', { name: en.projects.viewMore })).toHaveAttribute('href', '/en/projects')
  })

  it('only links to a repository when the project has one', () => {
    renderSection()

    const codeLinks = screen.queryAllByRole('link', { name: pt.projects.code })
    const featuredWithRepo = pt.projects.items.slice(0, 4).filter((project) => project.github)
    expect(codeLinks).toHaveLength(featuredWithRepo.length)
  })
})
