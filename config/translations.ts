export type Language = 'pt' | 'en'

export const translations = {
  pt: {
    nav: {
      home: 'Início',
      about: 'Sobre',
      skills: 'Habilidades',
      projects: 'Projetos',
      contact: 'Contato',
    },
    hero: {
      role: 'Desenvolvedor full stack',
      summary: 'Desenvolvedor full stack na OCL Advogados, com foco em IA e dados, e cofundador e CTO da NOVAsyn. Construo aplicações web e mobile, APIs, pipelines de dados e automações com IA.',
      ctaProjects: 'Ver projetos',
      ctaContact: 'Falar comigo',
      location: 'Vila Velha, Espírito Santo',
    },
    about: {
      title: 'Sobre',
      heading: 'Do primeiro contato com o cliente ao deploy em produção',
      description:
        'Programo desde 2021. Hoje trabalho na OCL Advogados construindo APIs, dashboards, pipelines de dados e sistemas com IA para o financeiro, o backoffice e o RH, e lidero a tecnologia da NOVAsyn, do levantamento de requisitos ao deploy.',
      subheading:
        'Antes, passei dois anos como analista de TI na Banestes Asset Management, criando apps e sites para o mercado financeiro e acompanhando uma equipe de estagiários. Estudo Ciência da Computação na UVV, com conclusão prevista para 2027, e sou fluente em português e inglês.',
      facts: [
        { label: 'Programando desde', value: '2021' },
        { label: 'Hoje', value: 'OCL Advogados e NOVAsyn' },
        { label: 'Base', value: 'Vila Velha, Espírito Santo' },
      ],
      roadmaps: {
        companies: {
          title: 'Experiência',
          labels: {
            description: 'Sobre',
            achievements: 'O que fiz',
            technologies: 'Tecnologias',
            close: 'Fechar',
          },
          items: [
            {
              id: 1,
              title: 'OCL Advogados',
              period: 'Mar 2026 - Presente',
              role: 'Desenvolvedor full stack, IA e dados',
              logo: '/ocl-logo.png',
              description: 'Soluções full stack, de analytics e de IA para operações financeiras, backoffice, planejamento estratégico e RH na Olivieri, Carvalho & Lievori Advogados Associados, integrando sistemas corporativos, automações e análise de dados.',
              achievements: [
                'APIs com Node.js, Fastify e TypeScript integradas ao CRM All-in-One da Gatepay, com MySQL, PostgreSQL, Prisma, Redis e autenticação JWT',
                'Sistemas internos, relatórios e dashboards de backoffice, incluindo cálculo de parcelas para quitação e renegociação de contratos e relatórios de funil',
                'Sistema de agendamento diário de atendimento usado por cerca de 100 funcionários',
                'Sistema de RH com triagem de candidatos por IA usando Anthropic Claude, tool calling, SQL e engenharia de prompts',
                'Data Warehouse com PostgreSQL, Airbyte, pipelines ETL/ELT incrementais com watermark, dbt Core e TimescaleDB',
                'Landing page e dashboards em React, com deploy em Docker e Portainer na AWS e CI/CD via GitHub Actions e Amazon ECR',
              ],
              technologies: ['TypeScript', 'React', 'Next.js', 'Node.js', 'Fastify', 'Prisma', 'MySQL', 'PostgreSQL', 'Redis', 'Airbyte', 'dbt Core', 'TimescaleDB', 'Anthropic Claude', 'Docker', 'Portainer', 'AWS', 'GitHub Actions', 'Tailwind CSS']
            },
            {
              id: 2,
              title: 'NOVAsyn',
              period: 'Dez 2025 - Presente',
              role: 'Cofundador e CTO',
              logo: '/logo_1.png',
              description: 'Cofundador e responsável pela tecnologia da NOVAsyn, liderando a parte técnica dos projetos do primeiro contato com o cliente até o deploy em produção.',
              achievements: [
                'Levantamento de requisitos e definição de escopo direto com clientes e stakeholders',
                'Arquitetura, modelos de dados, fluxos e especificações a partir dos problemas de negócio',
                'Aplicações full stack com React, Next.js, Node.js, Express e TypeScript sobre PostgreSQL e MySQL',
                'Wireframes, fluxos e protótipos de alta fidelidade no Figma para guiar o desenvolvimento',
                'Deploys self-hosted com Docker, Nginx e Coolify',
                'Padrões técnicos, processos de desenvolvimento e documentação dos projetos',
              ],
              technologies: ['React', 'Next.js', 'Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'MySQL', 'Figma', 'Docker', 'Nginx', 'Coolify', 'N8N']
            },
            {
              id: 3,
              title: 'Banestes Asset Management',
              period: 'Fev 2024 - Jan 2026',
              role: 'Analista de TI',
              logo: '/banesteslogo.png',
              description: 'Design e desenvolvimento de aplicativos móveis e sites para o mercado financeiro, com foco em investimentos, análise de dados e soluções centradas no usuário.',
              achievements: [
                'Participação em todo o ciclo do produto, da pesquisa com usuários à entrega',
                'Interfaces e experiências de UX/UI alinhadas a usabilidade e objetivos de negócio',
                'Desenvolvimento e manutenção de aplicativos móveis e sites',
                'Uso de plataformas low-code para validar ideias com mais agilidade',
                'Liderança e acompanhamento de uma equipe de estagiários, com revisão de entregas',
              ],
              technologies: ['React Native', 'Android Studio', 'Figma', 'JavaScript', 'Bootstrap', 'Node.js', 'MySQL', 'CA Harvest SCM']
            },
            {
              id: 4,
              title: 'Freelancer',
              period: 'Abr 2023 - Fev 2024',
              role: 'Desenvolvedor front-end',
              logo: '/freelancer.png',
              description: 'Projetos independentes e consultoria para startups e pequenas empresas.',
              achievements: [
                'Desenvolvimento full stack com React e Node.js',
                'Implementação de pagamentos com Stripe',
                'Portfólios, landing pages e sistemas de e-commerce',
                'Prototipação, design de interfaces e identidade visual no Figma'
              ],
              technologies: ['Figma', 'Next.js', 'Stripe', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'React.js', 'Vercel', 'Hostinger']
            },
            {
              id: 5,
              title: 'Solitude Mountain Resort',
              period: 'Dez 2022 - Mar 2023',
              role: 'Work Experience, Utah, EUA',
              logo: '/solitude.webp',
              description: 'Programa de intercâmbio cultural e profissional nos EUA, com foco em hospitalidade e atendimento ao cliente.',
              achievements: [
                'Desenvolvimento do inglês no dia a dia de trabalho',
                'Adaptação cultural e profissional nos EUA',
                'Convivência com equipes multiculturais'
              ],
              technologies: ['Inglês', 'Espanhol', 'Hospitalidade', 'Atendimento ao Cliente']
            },
            {
              id: 6,
              title: 'Banestes',
              period: 'Mai 2022 - Nov 2022',
              role: 'Estagiário de desenvolvimento de software',
              logo: '/banesteslogo.png',
              description: 'Apoio à análise, ao desenvolvimento e à implantação de soluções de software, com foco em transformação digital e integração de sistemas.',
              achievements: [
                'Aplicações web com HTML, CSS e JavaScript',
                'Integração com sistemas legados',
                'Otimização de performance e segurança'
              ],
              technologies: ['HTML', 'CSS', 'JavaScript', 'AppSheet', 'Git', 'GitHub', 'Agile', 'Scrum', 'Jira']
            }
          ]
        },
        education: {
          title: 'Formação',
          labels: {
            description: 'Sobre',
            achievements: 'Destaques',
            technologies: 'Tecnologias',
            close: 'Fechar',
          },
          items: [
            {
              id: 1,
              title: 'Universidade Vila Velha (UVV)',
              period: 'Ago 2023 - Ago 2027',
              role: 'Bacharelado em Ciência da Computação',
              logo: '/uvv-logo.png',
              description: 'Graduação em Ciência da Computação com foco em desenvolvimento web e arquitetura de sistemas.',
              achievements: [
                'Disciplinas de programação web, banco de dados e engenharia de software',
                'Projetos acadêmicos com tecnologias atuais',
                'Participação em eventos e workshops de tecnologia'
              ],
              technologies: ['Java', 'Python', 'SQL', 'UML', 'Git', 'C', 'Figma', 'React Native', 'Android Studio', 'CI/CD', 'Agile', 'Scrum']
            },
            {
              id: 2,
              title: 'Coursera IBM',
              period: 'Dez 2025 - Presente',
              role: 'Certificado IBM Full-Stack JavaScript Developer',
              logo: '/ibm.png',
              description: 'Formação em desenvolvimento web full stack com foco em cloud computing, engenharia e arquitetura de software.',
              achievements: [
                'Desenvolvimento full stack com JavaScript',
                'Cloud native, DevOps, Agile e NoSQL',
                'Docker, Kubernetes e OpenShift',
                'Microsserviços e serverless',
                'MongoDB e bancos NoSQL'
              ],
              technologies: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Docker', 'Kubernetes', 'MongoDB', 'Node.js', 'Express', 'Git', 'Cloud Computing', 'Microservices']
            },
            {
              id: 3,
              title: 'Universidade Vila Velha (UVV)',
              period: 'Fev 2022 - Dez 2022',
              role: 'Engenharia da Computação · Interrompido',
              logo: '/uvv-logo.png',
              description: 'Primeiro contato com a graduação, no curso de Engenharia da Computação, interrompido em 2022.',
              achievements: [],
              technologies: []
            }
          ]
        }
      }
    },
    skills: {
      title: 'Habilidades',
      heading: 'Ferramentas que uso no dia a dia',
      frontend: 'Frontend e mobile',
      backend: 'Backend',
      data: 'Dados',
      tools: 'Infra e IA',
    },
    projects: {
      title: 'Projetos',
      heading: 'Projetos selecionados',
      viewMore: 'Ver todos os projetos',
      viewProject: 'Ver site',
      code: 'Código',
      details: 'Estudo de caso',
      note: 'Alguns projetos não têm repositório público porque ainda não estão estáveis ou são protegidos por contrato.',
      index: {
        heading: 'Todos os projetos',
        description: 'Sites, plataformas e automações que desenvolvi para empresas, clientes da NOVAsyn e projetos pessoais, com o desafio, a solução e a stack de cada um.',
        metaTitle: 'Projetos',
        metaDescription: 'Projetos de Arthur Camponez, desenvolvedor full stack em Vila Velha (ES): sites, plataformas e automações com Next.js, React, Node.js e IA.',
      },
      caseStudy: {
        label: 'Estudo de caso',
        challenge: 'Desafio',
        solution: 'Solução',
        results: 'Resultados',
        timeline: 'Prazo',
        team: 'Equipe',
        learnings: 'Aprendizados',
        techStack: 'Stack',
        otherProjects: 'Outros projetos',
        ctaTitle: 'Precisa de algo parecido?',
        ctaDescription: 'Conte o que você precisa e eu respondo por email.',
        ctaAction: 'Falar comigo',
      },
      items: [
        {
          title: 'OCL Advogados',
          slug: 'ocl-advogados',
          category: 'Desenvolvimento Web',
          description: 'Site institucional de um escritório com mais de 30 anos em recuperação de crédito, com áreas de atuação, blog, FAQ, envio de currículo e agendamento de consulta.',
          image: '/ocl.jpg',
          tags: ['React', 'Vite', 'React Router', 'Tailwind CSS', 'Framer Motion'],
          link: 'https://ocladvogados.adv.br/',
          github: '',
          details: {
            challenge: 'Dar ao escritório uma presença digital à altura da operação: apresentar as áreas de atuação para empresas e instituições financeiras e, ao mesmo tempo, atender quem chega para negociar uma dívida.',
            solution: 'SPA em React com Vite e React Router, com páginas de institucional, áreas de atuação, trabalhe conosco, contato, FAQ e política de privacidade, além de blog, equipe e avaliações na home. Ligada aos canais de denúncia e acolhimento do escritório.',
            results: 'Site no ar em ocladvogados.adv.br, com rotas próprias para candidatos, clientes e quem busca atendimento.',
            timeline: '',
            team: 'Equipe de tecnologia da OCL Advogados',
            learnings: 'Comunicar um serviço jurídico para dois públicos bem diferentes na mesma página e estruturar um SPA com várias rotas e muitas imagens.',
          },
        },
        {
          title: 'Grupo Sartoretto',
          slug: 'grupo-sartoretto',
          category: 'Desenvolvimento Web',
          description: 'Site de uma empresa de representação comercial que liga marcas de ferramentas a lojistas, com catálogo de fornecedoras, lançamentos, mapa de lojas e acesso à área do lojista.',
          image: '/sartoretto.jpg',
          tags: ['Next.js', 'React', 'Tailwind CSS'],
          link: 'https://sartoretto.novasyn.com.br/',
          github: '',
          details: {
            challenge: 'Atender dois públicos com o mesmo site: o consumidor final, que quer saber onde comprar, e o lojista, que precisa chegar rápido ao portal de pedidos.',
            solution: 'Site em Next.js com uma escolha logo na entrada entre consumidor final e lojista, páginas de fornecedoras, lançamentos e lojas, e link direto para o portal de pedidos do Meus Pedidos.',
            results: 'Site no ar pela NOVAsyn, com as marcas representadas na home e caminhos separados para cada público.',
            timeline: '',
            team: 'NOVAsyn',
            learnings: 'Organizar a navegação a partir de quem está visitando e integrar o site a um portal de pedidos de terceiros.',
          },
        },
        {
          title: 'O Incidente WebSite',
          slug: 'o-incidente',
          category: 'Desenvolvimento Web',
          description: 'Website oficial do grupo de influenciadores O Incidente.',
          image: '/incidente.png',
          tags: ['React.Js', 'Docker', 'TailwindCSS', 'Three.js', 'Twitch/YouTube API', 'Coolify'],
          link: 'https://incidente.gg/',
          github: '',
          details: {
            challenge: 'Criar uma plataforma institucional para o grupo de influenciadores O Incidente, com foco em performance, segurança e confiabilidade e design criativo.',
            solution: 'Desenvolvemos uma arquitetura Front-end focada principalmente em performance, segurança e confiabilidade, Integrado a APIs externas como Youtube e Twitch, além de animações 3D feitas com Three.js e integração de diversas camadas de segurança como o cloudflare para evitar ataques no site.',
            results: 'Plataforma Institucional robusta feita para o grupo O Incidente. O site conta com integração com as APIs do Youtube e Twitch, além de animações 3D feitas com Three.js e boas integrações e práticas de segurança.',
            timeline: '1 mês de desenvolvimento',
            team: 'NOVAsyn LTDA',
            learnings: 'Experiência profunda em integração de APIs do YouTube e da Twitch, otimização de performance com Three.js e boas práticas de segurança e integração do Cloudflare, deploy e CI/CD com Coolify com Docker e Nginx.'
          }
        },
        {
          title: 'Banestes Asset',
          slug: 'banestes-asset',
          category: 'Desenvolvimento Web',
          description: 'Nova Plataforma Institucional para a Banestes Asset',
          image: '/banestes.png',
          tags: ['Bootstrap', 'Node.js', 'CA Harvest SCM'],
          link: 'https://www.banestesasset.com.br/',
          github: '',
          details: {
            challenge: 'Modernizar plataforma legada do setor financeiro com interface responsiva mantendo compatibilidade com sistemas legados.',
            solution: 'Implementamos Bootstrap para front-end responsivo, Node.js no backend e integração com CA Harvest SCM para gerenciamento de versões.',
            results: 'Plataforma 3x mais rápida, 99.9% de disponibilidade e satisfação de 98% dos usuários.',
            timeline: 'Projeto em andamento desde Setembro de 2025 e lançamento oficial em Dezembro de 2025',
            team: 'Equipe de 4 desenvolvedores e 1 analista de TI',
            learnings: 'Expertise em sistemas financeiros, integração com CA Harvest SCM, e best practices de segurança no setor financeiro'
          }
        },
        {
          title: 'Vende.AI',
          slug: 'vende-ai',
          category: 'IA & Automação',
          description: 'Plataforma de automação de vendas no WhatsApp com IA',
          image: '/vendeai-logo.svg',
          tags: ['Python', 'N8N', 'Whatsapp API', 'Coolify'],
          link: 'https://novasyn.com.br/#portfolio',
          github: '',
          details: {
            challenge: 'Automatizar todo o fluxo de vendas via WhatsApp utilizando IA para responder clientes de forma inteligente e personalizada.',
            solution: 'Criamos fluxos complexos com N8N, integrados com IA e WhatsApp API, permitindo respostas automáticas contextualizadas e qualificadas.',
            results: 'Aumento de 80% na capacidade de resposta, redução de 90% no tempo de atendimento e aumento de 45% nas vendas.',
            timeline: '4 meses de desenvolvimento até o momento',
            team: 'Equipe especializada em automação e IA com 2 engenheiros de software',
            learnings: 'Experiência em N8N avançado, integração com APIs de IA, arquitetura de fluxos de automação complexos'
          }
        },
        {
          title: 'Novasyn LTDA',
          slug: 'novasyn',
          category: 'Desenvolvimento Web',
          description: 'Plataforma Institucional Completa com integração de email.',
          image: '/novasynn.png',
          tags: ['React.js', 'Brevo API', 'TailwindCSS', 'Coolify'],
          link: 'https://novasyn.com.br',
          github: 'https://github.com/CamponezTV/NovaSyn-LTDA',
          details: {
            challenge: 'Criar plataforma institucional com sistema de email marketing integrado para gerenciar campanhas e contatos.',
            solution: 'Desenvolvemos aplicativo React com TailwindCSS e integração Brevo API para automação de email marketing.',
            results: 'Plataforma com taxa de abertura de email 35% acima da média, gerenciamento de contatos.',
            timeline: '1 semana de desenvolvimento',
            team: 'Equipe de 2 desenvolvedores full-stack',
            learnings: 'Expertise em Brevo API, segmentação de dados, e otimização de campanhas de email'
          }
        },
        {
          title: 'Portfolio 2024',
          slug: 'portfolio-2024',
          category: 'Full Stack & Design',
          description: 'Portfólio pessoal com Next.js, animações Framer Motion, globo 3D interativo com Three.js, dark/light mode e i18n EN/PT.',
          image: '/portfolio_2024.png',
          tags: ['Next.js 14', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Three.js', 'React Three Fiber', 'Vercel'],
          link: 'https://my-portfolio-six-kappa-14.vercel.app/',
          github: 'https://github.com/CamponezTV/my-portfolio',
          details: {
            challenge: 'Criar um portfólio visualmente atraente e funcional que demonstrasse habilidades em front-end, design responsivo e animações complexas, com suporte a múltiplos idiomas e temas.',
            solution: 'Desenvolvido com Next.js 14, TypeScript, Tailwind CSS para styling, Framer Motion para animações sofisticadas, Three.js com React Three Fiber para globo 3D interativo, e sistema i18n customizado.',
            results: 'Portfólio com animações fluidas, globo 3D interativo, dark/light mode funcional, suporte completo EN/PT, layout responsivo mobile-first, e performance otimizada. Gerou múltiplas oportunidades profissionais.',
            timeline: '1 mês de desenvolvimento',
            team: 'Desenvolvido por mim',
            learnings: 'Proficiência em Framer Motion, Three.js e React Three Fiber para efeitos 3D, sistema de internacionalização customizado, temas dinâmicos com next-themes, e otimização de performance em Single Page Applications'
          }
        },
        {
          title: 'Portfolio 2026',
          slug: 'portfolio-2026',
          category: 'Design & Desenvolvimento',
          description: 'Portfólio pessoal moderno com animações avançadas, parallax, carrossel interativo e responsividade completa.',
          image: '/portfolio_2026.png',
          tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Embla Carousel', 'Vercel'],
          link: '',
          github: 'https://github.com/CamponezTV/camponezDevPortfolio2025',
          details: {
            challenge: 'Criar um portfólio pessoal que destacasse habilidades em design e desenvolvimento, com animações fluidas, interatividade smooth e responsividade perfeita em todos os dispositivos.',
            solution: 'Desenvolvi com Next.js 16, TypeScript para type safety, TailwindCSS para styling responsivo, Framer Motion para animações avançadas e Embla Carousel para carrossel interativo com auto-play.',
            results: 'Portfólio com 100% de performance, animações suaves em todos os dispositivos, carrossel com 45+ tecnologias mapeadas, e conversão de visitantes em oportunidades profissionais.',
            timeline:'3 semanas de desenvolvimento',
            team: 'Apenas formada por mim',
            learnings: 'Masterização em Framer Motion avançado, responsive design mobile-first, integração de carrossel infinito, parallax effects e i18n com português/inglês'
          }
        },
      ],
    },
    gallery: {
      title: 'Galeria',
      heading: 'Equipe, eventos e prêmios',
      quote: 'Às vezes, são as pessoas de quem ninguém imagina nada que fazem as coisas que ninguém consegue imaginar.',
      author: 'Alan Turing',
      images: [
        { alt: 'Ensaio fotográfico sócios NOVAsyn', location: 'Estúdio • Mar 2026' },
        { alt: 'Reunião em Equipe com a Banestes Asset', location: 'Bistrô Saldanha 2025 • Vitória, Espírito Santo' },
        { alt: 'Ensaio fotográfico NOVAsyn · Arthur Camponez', location: 'Estúdio • Mar 2026' },
        { alt: 'Equipe de TI da Banestes Asset reunida em festa de fim de ano 2025', location: 'Casa Mizzi 2025 • Vitória, Espírito Santo' },
        { alt: 'Prêmios conquistados pela Banestes Asset em 2025 ', location: 'Palas Center 2025 • Vitória, Espírito Santo' },
        { alt: 'Ensaio fotográfico NOVAsyn · Arthur Camponez', location: 'Estúdio • Mar 2026' },
        { alt: 'Apresentação da empresa Banestes Asset e projetos promissores na UVV', location: 'UVV 2025 • Vitória, Espírito Santo' },
        { alt: 'Participando de um dos maiores eventos de tecnologia do Espírito Santo', location: 'ESX 2025 • Vitória, Espírito Santo' },
      ],
    },
    contact: {
      title: 'Contato',
      heading: 'Vamos conversar',
      description: 'Para projetos, vagas ou parcerias, escreva por aqui ou direto no email.',
      channels: {
        email: 'Email',
        linkedin: 'LinkedIn',
        github: 'GitHub',
        resume: 'Currículo',
        resumeAction: 'Baixar PDF',
        location: 'Base',
        locationValue: 'Vila Velha, Espírito Santo',
      },
      form: {
        name: 'Nome',
        email: 'Email',
        subject: 'Assunto',
        message: 'Mensagem',
        placeholderName: 'Seu nome',
        placeholderEmail: 'voce@email.com',
        placeholderSubject: 'Projeto, vaga ou ideia',
        placeholderMessage: 'Conte um pouco sobre o que você precisa',
        send: 'Enviar mensagem',
        sending: 'Enviando',
        success: 'Mensagem enviada. Você vai receber uma confirmação por email.',
        error: 'Não foi possível enviar a mensagem',
      },
    },
    footer: {
      brand: 'Arthur Camponez',
      description: 'Desenvolvedor full stack em Vila Velha, Espírito Santo.',
      rights: 'Todos os direitos reservados',
      backToTop: 'Voltar ao topo',
    },
    common: {
      menu: 'Abrir menu',
      closeMenu: 'Fechar menu',
      language: 'Idioma',
      breadcrumb: 'Você está em',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
    },
    hero: {
      role: 'Full stack engineer',
      summary: 'Full stack developer at OCL Advogados, focused on AI and data, and co-founder and CTO of NOVAsyn. I build web and mobile apps, APIs, data pipelines and AI automations.',
      ctaProjects: 'See projects',
      ctaContact: 'Get in touch',
      location: 'Vila Velha, Brazil',
    },
    about: {
      title: 'About',
      heading: 'From the first client call to production',
      description:
        'I have been programming since 2021. Today I work at OCL Advogados building APIs, dashboards, data pipelines and AI systems for finance, back office and HR, and I lead technology at NOVAsyn, from requirements to deploy.',
      subheading:
        'Before that, I spent two years as an IT analyst at Banestes Asset Management, building apps and websites for the financial market and supporting a team of interns. I study Computer Science at UVV, graduating in 2027, and I work fluently in Portuguese and English.',
      facts: [
        { label: 'Programming since', value: '2021' },
        { label: 'Now', value: 'OCL Advogados and NOVAsyn' },
        { label: 'Based in', value: 'Vila Velha, Brazil' },
      ],
      roadmaps: {
        companies: {
          title: 'Experience',
          labels: {
            description: 'About',
            achievements: 'What I did',
            technologies: 'Technologies',
            close: 'Close',
          },
          items: [
            {
              id: 1,
              title: 'OCL Advogados',
              period: 'Mar 2026 - Present',
              role: 'Full stack developer, AI and data',
              logo: '/ocl-logo.png',
              description: 'Full stack, analytics and AI solutions for financial operations, back office, strategic planning and HR at Olivieri, Carvalho & Lievori Advogados Associados, integrating enterprise systems, automation and data analytics.',
              achievements: [
                "APIs with Node.js, Fastify and TypeScript integrated with Gatepay's All-in-One CRM, using MySQL, PostgreSQL, Prisma, Redis and JWT authentication",
                'Internal systems, reports and back-office dashboards, including installment calculations for debt settlement and renegotiation and sales funnel reports',
                'Daily customer appointment scheduling system used by about 100 employees',
                'HR system with AI candidate screening using Anthropic Claude, tool calling, SQL and prompt engineering',
                'Data Warehouse with PostgreSQL, Airbyte, incremental ETL/ELT pipelines with watermark-based ingestion, dbt Core and TimescaleDB',
                'Landing page and dashboards in React, deployed with Docker and Portainer on AWS, with CI/CD through GitHub Actions and Amazon ECR',
              ],
              technologies: ['TypeScript', 'React', 'Next.js', 'Node.js', 'Fastify', 'Prisma', 'MySQL', 'PostgreSQL', 'Redis', 'Airbyte', 'dbt Core', 'TimescaleDB', 'Anthropic Claude', 'Docker', 'Portainer', 'AWS', 'GitHub Actions', 'Tailwind CSS']
            },
            {
              id: 2,
              title: 'NOVAsyn',
              period: 'Dec 2025 - Present',
              role: 'Co-founder and CTO',
              logo: '/logo_1.png',
              description: 'Co-founder and head of technology at NOVAsyn, leading the technical side of projects from the first client contact to production deployment.',
              achievements: [
                'Requirements gathering and project scoping directly with clients and stakeholders',
                'Architecture, data models, workflows and specifications from business problems',
                'Full stack applications with React, Next.js, Node.js, Express and TypeScript on PostgreSQL and MySQL',
                'Wireframes, user flows and high-fidelity prototypes in Figma to guide development',
                'Self-hosted deployments with Docker, Nginx and Coolify',
                'Technical standards, development processes and project documentation',
              ],
              technologies: ['React', 'Next.js', 'Node.js', 'Express', 'TypeScript', 'PostgreSQL', 'MySQL', 'Figma', 'Docker', 'Nginx', 'Coolify', 'N8N']
            },
            {
              id: 3,
              title: 'Banestes Asset Management',
              period: 'Feb 2024 - Jan 2026',
              role: 'IT analyst',
              logo: '/banesteslogo.png',
              description: 'Design and development of mobile apps and websites for the financial market, focused on investments, data analysis and user-centered solutions.',
              achievements: [
                'Full product lifecycle, from user research to delivery',
                'UX/UI interfaces aligned with usability and business goals',
                'Development and maintenance of mobile apps and websites',
                'Low-code platforms to validate ideas faster',
                'Leading and supporting a team of interns and reviewing their deliveries',
              ],
              technologies: ['React Native', 'Android Studio', 'Figma', 'JavaScript', 'Bootstrap', 'Node.js', 'MySQL', 'CA Harvest SCM']
            },
            {
              id: 4,
              title: 'Freelancer',
              period: 'Apr 2023 - Feb 2024',
              role: 'Front-end developer',
              logo: '/freelancer.png',
              description: 'Independent projects and consulting for startups and small businesses.',
              achievements: [
                'Full stack development with React and Node.js',
                'Payment implementation with Stripe',
                'Portfolios, landing pages and e-commerce systems',
                'Prototyping, interface design and brand identity in Figma'
              ],
              technologies: ['Figma', 'Next.js', 'Stripe', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'React.js', 'Vercel', 'Hostinger']
            },
            {
              id: 5,
              title: 'Solitude Mountain Resort',
              period: 'Dec 2022 - Mar 2023',
              role: 'Work Experience, Utah, USA',
              logo: '/solitude.webp',
              description: 'Cultural and professional exchange program in the USA, focused on hospitality and customer service.',
              achievements: [
                'English practiced every day at work',
                'Cultural and professional adaptation in the USA',
                'Working with multicultural teams'
              ],
              technologies: ['English', 'Spanish', 'Hospitality', 'Customer Service']
            },
            {
              id: 6,
              title: 'Banestes',
              period: 'May 2022 - Nov 2022',
              role: 'Software development intern',
              logo: '/banesteslogo.png',
              description: 'Support in the analysis, development and implementation of software solutions, focused on digital transformation and systems integration.',
              achievements: [
                'Web applications with HTML, CSS and JavaScript',
                'Integration with legacy systems',
                'Performance and security improvements'
              ],
              technologies: ['HTML', 'CSS', 'JavaScript', 'AppSheet', 'Git', 'GitHub', 'Agile', 'Scrum', 'Jira']
            }
          ]
        },
        education: {
          title: 'Education',
          labels: {
            description: 'About',
            achievements: 'Highlights',
            technologies: 'Technologies',
            close: 'Close',
          },
          items: [
            {
              id: 1,
              title: 'Vila Velha University (UVV)',
              period: 'Aug 2023 - Aug 2027',
              role: "Bachelor's in Computer Science",
              logo: '/uvv-logo.png',
              description: 'Computer Science degree focused on web development and systems architecture.',
              achievements: [
                'Courses in web programming, databases and software engineering',
                'Academic projects with current technologies',
                'Tech events and workshops'
              ],
              technologies: ['Java', 'Python', 'SQL', 'UML', 'Git', 'C', 'Figma', 'React Native', 'Android Studio', 'CI/CD', 'Agile', 'Scrum']
            },
            {
              id: 2,
              title: 'Coursera IBM',
              period: 'Dec 2025 - Present',
              role: 'IBM Full-Stack JavaScript Developer Certificate',
              logo: '/ibm.png',
              description: 'Full stack web development program focused on cloud computing, software engineering and architecture.',
              achievements: [
                'Full stack development with JavaScript',
                'Cloud native, DevOps, Agile and NoSQL',
                'Docker, Kubernetes and OpenShift',
                'Microservices and serverless',
                'MongoDB and NoSQL databases'
              ],
              technologies: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Docker', 'Kubernetes', 'MongoDB', 'Node.js', 'Express', 'Git', 'Cloud Computing', 'Microservices']
            },
            {
              id: 3,
              title: 'Vila Velha University (UVV)',
              period: 'Feb 2022 - Dec 2022',
              role: 'Computer Engineering · Discontinued',
              logo: '/uvv-logo.png',
              description: 'First year of university, in the Computer Engineering program, discontinued in 2022.',
              achievements: [],
              technologies: []
            }
          ]
        }
      }
    },
    skills: {
      title: 'Skills',
      heading: 'Tools I use every day',
      frontend: 'Frontend and mobile',
      backend: 'Backend',
      data: 'Data',
      tools: 'Infra and AI',
    },
    projects: {
      title: 'Projects',
      heading: 'Selected projects',
      viewMore: 'See all projects',
      viewProject: 'Visit site',
      code: 'Code',
      details: 'Case study',
      note: 'Some projects have no public repository because they are not stable yet or are covered by a contract.',
      index: {
        heading: 'All projects',
        description: 'Websites, platforms and automations I built for companies, NOVAsyn clients and personal projects, with the challenge, solution and stack of each one.',
        metaTitle: 'Projects',
        metaDescription: 'Projects by Arthur Camponez, full stack developer in Vila Velha, Brazil: websites, platforms and automations with Next.js, React, Node.js and AI.',
      },
      caseStudy: {
        label: 'Case study',
        challenge: 'Challenge',
        solution: 'Solution',
        results: 'Results',
        timeline: 'Timeline',
        team: 'Team',
        learnings: 'Learnings',
        techStack: 'Stack',
        otherProjects: 'Other projects',
        ctaTitle: 'Need something similar?',
        ctaDescription: 'Tell me what you need and I will reply by email.',
        ctaAction: 'Get in touch',
      },
      items: [
        {
          title: 'OCL Advogados',
          slug: 'ocl-advogados',
          category: 'Web Development',
          description: 'Website for a law firm with over 30 years in credit recovery, with practice areas, blog, FAQ, job applications and consultation booking.',
          image: '/ocl.jpg',
          tags: ['React', 'Vite', 'React Router', 'Tailwind CSS', 'Framer Motion'],
          link: 'https://ocladvogados.adv.br/',
          github: '',
          details: {
            challenge: 'Give the firm a web presence that matches its operation: present its practice areas to companies and financial institutions while also serving people who arrive to settle a debt.',
            solution: 'A React SPA with Vite and React Router, with pages for the firm, practice areas, careers, contact, FAQ and privacy policy, plus blog, team and reviews on the home page. Linked to the firm\'s reporting and support channels.',
            results: 'Live at ocladvogados.adv.br, with separate routes for candidates, clients and people looking for help.',
            timeline: '',
            team: 'OCL Advogados technology team',
            learnings: 'Explaining a legal service to two very different audiences on the same page and structuring an SPA with many routes and images.',
          },
        },
        {
          title: 'Grupo Sartoretto',
          slug: 'grupo-sartoretto',
          category: 'Web Development',
          description: 'Website for a sales representation company that connects tool brands with retailers, with a supplier catalog, new releases, a store map and access to the retailer area.',
          image: '/sartoretto.jpg',
          tags: ['Next.js', 'React', 'Tailwind CSS'],
          link: 'https://sartoretto.novasyn.com.br/',
          github: '',
          details: {
            challenge: 'Serve two audiences with one site: end consumers who want to know where to buy, and retailers who need to reach the ordering portal quickly.',
            solution: 'A Next.js site that asks visitors upfront whether they are a consumer or a retailer, with pages for suppliers, new releases and stores, and a direct link to the Meus Pedidos ordering portal.',
            results: 'Live through NOVAsyn, with the represented brands on the home page and separate paths for each audience.',
            timeline: '',
            team: 'NOVAsyn',
            learnings: 'Organizing navigation around who is visiting and connecting the site to a third-party ordering portal.',
          },
        },
        {
          title: 'O Incidente WebSite',
          slug: 'o-incidente',
          category: 'Web Development',
          description: 'Official website of the influencer group O Incidente.',
          image: '/incidente.png',
          tags: ['React.js', 'Docker', 'TailwindCSS', 'Three.js', 'Twitch/YouTube API', 'Coolify'],
          link: 'https://incidente.gg/',
          github: '',
          details: {
            challenge: 'Create an institutional platform for the influencer group O Incidente, focusing on performance, security, reliability, and creative design.',
            solution: 'We developed a Frontend architecture focused primarily on performance, security, and reliability, integrated with external APIs like YouTube and Twitch, plus 3D animations made with Three.js and integration of various security layers like Cloudflare to prevent attacks on the site.',
            results: 'Robust institutional platform made for the O Incidente group. The site features integration with YouTube and Twitch APIs, plus 3D animations made with Three.js and good security practices and integrations.',
            timeline: '1 month of development',
            team: 'NOVAsyn LTDA',
            learnings: 'Deep experience in YouTube and Twitch API integration, performance optimization with Three.js, and good security practices and Cloudflare integration, deployment and CI/CD with Coolify using Docker and Nginx.'
          }
        },
        {
          title: 'Banestes Asset',
          slug: 'banestes-asset',
          category: 'Web Development',
          description: 'New Institutional Platform for Banestes Asset',
          image: '/banestes.png',
          tags: ['Bootstrap', 'Node.js', 'CA Harvest SCM'],
          link: 'https://www.banestesasset.com.br/',
          github: '',
          details: {
            challenge: 'Modernize a legacy financial sector platform with responsive interface while maintaining compatibility with legacy systems.',
            solution: 'We implemented Bootstrap for responsive front-end, Node.js backend and integration with CA Harvest SCM for version management.',
            results: 'Platform 3x faster, 99.9% availability and 98% user satisfaction rate.',
            timeline: 'Ongoing project since September 2025 and official launch in December 2025',
            team: 'Team of 4 developers and 1 IT analyst',
            learnings: 'Expertise in financial systems, CA Harvest SCM integration, and financial sector security best practices'
          }
        },
        {
          title: 'Vende.AI',
          slug: 'vende-ai',
          category: 'AI & Automation',
          description: 'WhatsApp sales automation platform with AI',
          image: '/vendeai-logo.svg',
          tags: ['Python', 'N8N', 'Whatsapp API', 'Coolify'],
          link: 'https://novasyn.com.br/#portfolio',
          github: '',
          details: {
            challenge: 'Automate the entire sales flow via WhatsApp using AI to respond to customers intelligently and personalized.',
            solution: 'We created complex workflows with N8N, integrated with AI and WhatsApp API, enabling contextualized and qualified automatic responses.',
            results: '80% increase in response capacity, 90% reduction in response time and 45% increase in sales.',
            timeline: '4 months of development until now',
            team: 'Specialized automation and AI team with 2 software engineers',
            learnings: 'Advanced N8N experience, AI API integration, architecture of complex automation workflows'
          }
        },
        {
          title: 'Novasyn LTDA',
          slug: 'novasyn',
          category: 'Web Development',
          description: 'Complete Institutional Platform with email integration.',
          image: '/novasynn.png',
          tags: ['React.js', 'Brevo API', 'TailwindCSS', 'Coolify'],
          link: 'https://novasyn.com.br',
          github: 'https://github.com/CamponezTV/NovaSyn-LTDA',
          details: {
            challenge: 'Create an institutional platform with integrated email marketing system to manage campaigns and contacts.',
            solution: 'We developed React application with TailwindCSS and Brevo API integration for email marketing automation.',
            results: 'Platform with email open rate 35% above average, managing contacts.',
            timeline: '1 week of development',
            team: '2 Full-stack developer team',
            learnings: 'Expertise in Brevo API, data segmentation, and email campaign optimization'
          }
        },
        {
          title: 'Portfolio 2024',
          slug: 'portfolio-2024',
          category: 'Full Stack & Design',
          description: 'Personal portfolio with Next.js, Framer Motion animations, interactive 3D globe with Three.js, dark/light mode and EN/PT i18n.',
          image: '/portfolio_2024.png',
          tags: ['Next.js 14', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Three.js', 'React Three Fiber', 'Vercel'],
          link: 'https://my-portfolio-six-kappa-14.vercel.app/',
          github: 'https://github.com/CamponezTV/my-portfolio',
          details: {
            challenge: 'Create a visually attractive and functional portfolio that demonstrated front-end skills, responsive design and complex animations, with support for multiple languages and themes.',
            solution: 'Developed with Next.js 14, TypeScript, Tailwind CSS for styling, Framer Motion for sophisticated animations, Three.js with React Three Fiber for interactive 3D globe, and custom i18n system.',
            results: 'Portfolio with smooth animations, interactive 3D globe, functional dark/light mode, full EN/PT support, mobile-first responsive layout, and optimized performance. Generated multiple professional opportunities.',
            timeline: '1 month of development',
            team: 'Developed by me',
            learnings: 'Proficiency in Framer Motion, Three.js and React Three Fiber for 3D effects, custom internationalization system, dynamic themes with next-themes, and performance optimization in Single Page Applications'
          }
        },
        {
          title: 'Portfolio 2026',
          slug: 'portfolio-2026',
          category: 'Design & Development',
          description: 'Modern personal portfolio with advanced animations, parallax, interactive carousel and complete responsiveness.',
          image: '/portfolio_2026.png',
          tags: ['Next.js', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Embla Carousel', 'Vercel'],
          link: '',
          github: 'https://github.com/CamponezTV/camponezDevPortfolio2025',
          details: {
            challenge: 'Create a personal portfolio that showcased skills in design and development, with smooth animations, smooth interactivity and perfect responsiveness on all devices.',
            solution: 'I developed with Next.js 16, TypeScript for type safety, TailwindCSS for responsive styling, Framer Motion for advanced animations and Embla Carousel for interactive carousel with auto-play.',
            results: 'Portfolio with 100% performance, smooth animations on all devices, carousel with 45+ mapped technologies, and conversion of visitors into professional opportunities.',
            timeline: '3 weeks of development',
            team: 'Only formed by me',
            learnings: 'Mastery in advanced Framer Motion, mobile-first responsive design, infinite carousel integration, parallax effects and i18n with Portuguese/English'
          }
        },
      ],
    },
    gallery: {
      title: 'Gallery',
      heading: 'Team, events and awards',
      quote: 'Sometimes, the people nobody imagines anything of are the ones that do the things that nobody can imagine.',
      author: 'Alan Turing',
      images: [
        { alt: 'NOVAsyn partners photo shoot', location: 'Studio • Mar 2026' },
        { alt: 'Team meeting at Banestes Asset', location: 'Bistrô Saldanha 2025 • Vitória, Espírito Santo' },
        { alt: 'NOVAsyn photo shoot · Arthur Camponez', location: 'Studio • Mar 2026' },
        { alt: 'IT team at year-end party 2025', location: 'Casa Mizzi 2025 • Vitória, Espírito Santo' },
        { alt: 'Awards won by Banestes Asset in 2025', location: 'Palas Center 2025 • Vitória, Espírito Santo' },
        { alt: 'NOVAsyn photo shoot · Arthur Camponez', location: 'Studio • Mar 2026' },
        { alt: 'Banestes Asset presentation at UVV', location: 'UVV 2025 • Vitória, Espírito Santo' },
        { alt: 'Participating in one of the largest technology events in Espírito Santo', location: 'ESX 2025 • Espírito Santo' },
      ],
    },
    contact: {
      title: 'Contact',
      heading: "Let's talk",
      description: 'For projects, jobs or partnerships, write here or straight to my email.',
      channels: {
        email: 'Email',
        linkedin: 'LinkedIn',
        github: 'GitHub',
        resume: 'Resume',
        resumeAction: 'Download PDF',
        location: 'Based in',
        locationValue: 'Vila Velha, Brazil',
      },
      form: {
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        placeholderName: 'Your name',
        placeholderEmail: 'you@email.com',
        placeholderSubject: 'Project, job or idea',
        placeholderMessage: 'Tell me a little about what you need',
        send: 'Send message',
        sending: 'Sending',
        success: 'Message sent. You will get a confirmation by email.',
        error: 'Could not send the message',
      },
    },
    footer: {
      brand: 'Arthur Camponez',
      description: 'Full stack developer in Vila Velha, Brazil.',
      rights: 'All rights reserved',
      backToTop: 'Back to top',
    },
    common: {
      menu: 'Open menu',
      closeMenu: 'Close menu',
      language: 'Language',
      breadcrumb: 'Breadcrumb',
    },
  },
} as const

export function getTranslations(language: Language) {
  return translations[language]
}
