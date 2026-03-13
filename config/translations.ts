/**
 * Configuração de idiomas (i18n)
 * Suporta Português (pt) e Inglês (en)
 */

export type Language = 'pt' | 'en'

export const translations = {
  pt: {
    // Navigation
    nav: {
      home: 'Início',
      about: 'Sobre',
      skills: 'Habilidades',
      projects: 'Projetos',
      contact: 'Contato',
    },
    // Hero Section
    hero: {
      description: 'Construindo meu próprio caminho com a minha paixão.',
      passion: 'Aficionado por tecnologia e por conhecimento inovativo.',
      scroll: 'Scroll',
      since: 'Desde 2021 • Brasil',
    },
    // About Section
    about: {
      title: 'Sobre mim',
      description:
        'Sou um desenvolvedor extremamente obcecado por inovação e criação de experiências web incríveis. Com foco em performance e design, transformo ideias em realidade digital.',
      heading: 'Resolver problemas e solucionar desafios através da tecnologia',
      subheading: 'Cada projeto é uma oportunidade de superar limites, a si mesmo e criar algo extraordinário.A excelência não é negociável.',
      experience: 'Anos de Experiência',
      projects: 'Projetos Completos',
      clients: 'Clientes Satisfeitos',
      highlights: [
        { title: 'Engajado', description: 'Dedicação e compromisso máximo em cada projeto' },
        { title: 'Performance', description: '100% não é o suficiente se posso focar 110%' },
        { title: 'Paixão', description: 'Sempre se divertir e aprender no processo' },
      ],
      badge: 'Desenvolvendo desde',
      roadmaps: {
        companies: {
          title: 'Experiência Profissional',
          subtitle: 'Minha Jornada Corporativa',
          labels: {
            description: 'Descrição',
            achievements: 'Principais Conquistas',
            technologies: 'Tecnologias Aprendidas',
          },
          items: [
            {
              id: 1,
              title: 'Novasyn LTDA',
              period: 'Nov 2025 - Presente',
              role: 'Fundador & Diretor de Tecnologia',
              logo: '/logo_1.png',
              description: 'Desenvolvimento de soluções web completas e automação de sistemas com IA, com foco em performance e experiência do usuário.',
              achievements: [
                'Criação de interfaces dinâmicas com React.js e Next.js',
                'Integração com Brevo API, Mercado Pago API, Stripe API para automação e pagamentos, e WhatsApp API para automação de mensagens',
                'N8N para criação de automações com IA personalizadas',
              ],
              technologies: ['Next.js', 'N8N', 'TailwindCSS', 'Three.js', 'Coolify', 'Stripe', 'Brevo API', 'Mercado Pago API', 'Node.js', 'Express', 'Supabase']
            },
            {
              id: 2,
              title: 'Banestes Asset',
              period: 'Fev 2024 - Presente',
              role: 'Estagiário Analista de TI',
              logo: '/banesteslogo.png',
              description: 'Participação ativa no desenvolvimento de plataformas institucionais robustas para o setor financeiro.',
              achievements: [
                'Desenvolvimento de interfaces responsivas com Bootstrap',
                'Integração com sistemas CA Harvest SCM',
                'Otimização de performance em aplicações web',
                'Prototipação de interfaces com Figma e desenvolvimento mobile com React Native e Android Studio'
              ],
              technologies: ['Bootstrap', 'Node.js', 'CA Harvest SCM', 'JavaScript', 'MySQL', 'React Native', 'Android Studio', 'Figma']
            },
            {
              id: 3,
              title: 'Freelancer',
              period: 'Abr 2023 - Fev 2024',
              role: 'Desenvolvedor Front-end',
              logo: '/freelancer.png',
              description: 'Projetos independentes e consultoria para startups e pequenas empresas.',
              achievements: [
                'Desenvolvimento full stack com React e Node.js',
                'Implementação de pagamentos com Stripe',
                'Criação de portfólios, landing pages e sistemas de e-commerce',
                'Figma para prototipação, design de interfaces e identidade visual completa de empresas'
              ],
              technologies: ['Figma', 'Next.js', 'Stripe', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'React.js', 'Vercel', 'Hostinger']
            },
            {
              id: 4,
              title: 'Sollitude Mountain Resort - Utah, EUA',
              period: 'Dez 2022 - Abr 2023',
              role: 'World Experience Program',
              logo: '/solitude.webp',
              description: 'Programa de intercâmbio cultural e profissional nos EUA, com foco em hospitalidade e atendimento ao cliente.',
              achievements: [
                'Desenvolvimento do idioma inglês',
                'Adaptação cultural e profissional nos EUA',
                'Troca cultural e experiências internacionais'
              ],
              technologies: ['Inglês', 'Espanhol', 'Hospitalidade', 'Atendimento ao Cliente']
            },
            {
              id: 5,
              title: 'Banestes S.A',
              period: 'Mai 2022 - Nov 2022',
              role: 'Estagiário Desenvolvedor de Software',
              logo: '/banesteslogo.png',
              description: 'Auxiliar na análise, desenvolvimento e implantação de soluções de software, desenvolvendo conhecimentos em transformação digital e integração de sistemas.',
              achievements: [
                'Desenvolvimento de aplicações web com HTML, CSS e JavaScript',
                'Integração com sistemas legados',
                'Otimização de performance e segurança'
              ],
              technologies: ['HTML', 'CSS', 'JavaScript', 'AppSheet', 'Git', 'GitHub', 'Agile', 'Scrum', 'Jira']
            }
          ]
        },
        education: {
          title: 'Formação Acadêmica',
          subtitle: 'Minha Jornada Educacional',
          labels: {
            description: 'Descrição',
            achievements: 'Principais Conquistas',
            technologies: 'Tecnologias Aprendidas',
          },
          items: [
            {
              id: 1,
              title: 'Coursera IBM',
              period: 'Dez 2025 - Presente',
              role: 'Certificado IBM Full-Stack JavaScript Developer',
              logo: '/ibm.png',
              description: 'Curso completo de desenvolvimento web full-stack com foco em Cloud Computing, Engenharia de Software, Arquitetura de Software e tecnologias relacionadas.',
              achievements: [
                'Certificação em desenvolvimento Full-Stack com JavaScript',
                'Certificação em Cloud Native, DevOps, Agile e NoSQL',
                'Certificação em Docker, Kubernetes e OpenShift',
                'Certificação em desenvolvimento usando microserviços e serverless',
                'Certificação em MongoDB e Banco de Dados NoSQL'
              ],
              technologies: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Docker', 'Kubernetes', 'MongoDB', 'Node.js', 'Express', 'Git', 'Agile', 'Scrum', 'Cloud Computing', 'Microservices']
            },
            {
              id: 2,
              title: 'Universidade Vila Velha (UVV)',
              period: 'Jan 2023 - Presente',
              role: 'Ciência da Computação',
              logo: '/uvv-logo.png',
              description: 'Graduando em Ciência da Computação com foco em desenvolvimento web e arquitetura de sistemas.',
              achievements: [
                'Disciplinas: Programação Web, Banco de Dados, Engenharia de Software',
                'Projetos acadêmicos com tecnologias atuais',
                'Participação em eventos e workshops de tecnologia'
              ],
              technologies: ['Java', 'Python', 'SQL', 'UML', 'Git', 'C', 'Figma', 'Game Design', 'React Native', 'Android Studio', 'CI/CD', 'Agile', 'Scrum']
            }
          ]
        }
      }
    },
    // Skills Section
    skills: {
      title: 'Habilidades',
      heading: 'Minhas Competências',
      frontend: 'Frontend',
      backend: 'Backend',
      tools: 'Ferramentas',
      description: 'Tecnologias que domino e utilizo em meus projetos',
      skillsList: [
        { name: 'Dedicação', level: 110 },
        { name: 'Inglês', level: 95 },
        { name: 'TypeScript', level: 95 },
        { name: 'React/Next.js', level: 90 },
        { name: 'Git,CI/CD,Vercel', level: 85 },
        { name: 'API REST', level: 88 },
        { name: 'Jest/Cypress', level: 80 },
        { name: 'SQL/PostgreSQL', level: 75 },
      ],
      stats: [
        { value: '10+', label: 'Projetos Concluídos' },
        { value: '2+', label: 'Anos de Experiência' },
        { value: '100%', label: 'Satisfação' },
        { value: '24/7', label: 'Dedicação' },
      ],
      technologies: [
        'React', 'Next.js', 'TypeScript', 'Node.js', 'API REST', 'TailwindCSS', 'Android Studio',
        'PostgreSQL','Docker', 'Figma', 'Git', 'CI/CD', 'Vercel', 'Bootstrap', 'React Native',
        'N8N', 'Three.js', 'Prisma', 'Jest', 'Cypress', 'Stripe', 'Supabase', 'Express',
      ],
    },
    // Projects Section
    projects: {
      title: 'Projetos',
      heading: 'Projetos Selecionados',
      viewMore: 'Ver Mais',
      visitSite: 'Visitar Site',
      viewProject: 'Ver Projeto',
      code: 'Código',
      description: 'Confira alguns dos meus projetos em destaque',
      modal: {
        title: 'Projetos',
        projects: 'Projetos',
        challenge: 'Desafio',
        solution: 'Solução',
        results: 'Resultados',
        timeline: 'Timeline',
        team: 'Equipe',
        learnings: 'Aprendizados',
        techStack: 'Stack Técnico',
        viewProject: 'Ver Projeto',
        code: 'Código',
      },
      disclaimer: {
        title: '📌 Nota Importante',
        intro: 'Alguns projetos não possuem repositórios públicos. Isso ocorre porque:',
        reasons: [
          'Ainda não atingiram uma versão estável para compartilhamento',
          'Possuem sigilo contratual/propriedade intelectual de terceiros'
        ],
      },
      items: [
        {
          title: 'O Incidente WebSite',
          category: 'Desenvolvimento Web',
          description: 'Website oficial do grupo de influenciadores O Incidente.',
          image: '/incidente.png',
          tags: ['React.Js', 'Docker', 'TailwindCSS', 'Three.js', 'Twitch/Yotube API', 'Coolify'],
          link: 'https://incidente.gg/',
          github: '',
          details: {
            challenge: 'Criar uma plataforma institucional para o grupo de influenciadores O Incidente, com foco em performance, segurança e confiabilidade e design criativo.',
            solution: 'Desenvolvemos uma arquitetura Front-end focada principalmente em performance, segurança e confiabilidade, Integrado a APIs externas como Youtube e Twitch, além de animações 3D feitas com Three.js e integração de diversas camadas de segurança como o cloudflare para evitar ataques no site.',
            results: 'Plataforma Institucional robusta feita para o grupo O Incidente. O site conta com integração com as APIs do Youtube e Twitch, além de animações 3D feitas com Three.js e boas integraçoes e práticas de segurança.',
            timeline: '1 mes de desenvolvimento',
            team: 'NOVAsyn LTDA',
            learnings: 'Experiência profunda em integração de APIs do youtube e twitch, otimização de performance com Three.js e boas práticas de segurança e integração do Cloudflare, deploy e CI/CD com Coolify com Docker e Nginx.'
          }
        },
        {
          title: 'Vende.AI',
          category: 'IA & Automação',
          description: 'Plataforma de automação de vendas no WhatsApp com IA',
          image: '/vendeai-logo.svg',
          tags: ['Python', 'N8N', 'Whatsapp API', 'Coolify'],
          link: 'https://novasyn.com.br/#portfolio',
          github: '',
          details: {
            challenge: 'Automatizar todo o fluxo de vendas via WhatsApp utilizando IA para responder clientes de forma inteligente e personalizada.',
            solution: 'Criamos fluxos complexos com N8N, integrada with IA e WhatsApp API, permitindo respostas automáticas contextualizadas e qualificadas.',
            results: 'Aumento de 80% na capacidade de resposta, redução de 90% no tempo de atendimento e aumento de 45% nas vendas.',
            timeline: '4 meses de desenvolvimento até o momento',
            team: 'Equipe especializada em automação and IA with 2 engenheiros de software',
            learnings: 'Experiência em N8N avançado, integração with APIs de IA, arquitetura de fluxos de automação complexos'
          }
        },
        {
          title: 'Banestes Asset',
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
          title: 'Novasyn LTDA',
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
          category: 'Full Stack & Design',
          description: 'Portfólio pessoal com Next.js, animações Framer Motion, globo 3D interativo com Three.js, dark/light mode e i18n EN/PT.',
          image: '/portfolio_2024.png',
          tags: ['Next.js 14', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Three.js', 'React Three Fiber', 'Vercel'],
          link: 'https://my-portfolio-six-kappa-14.vercel.app/',
          github: 'https://github.com/CamponezTV/my-portfolio',
          details: {
            challenge: 'Criar um portfólio visualmente atraente e funcional que demonstrasse habilidades em front-end, design responsivo e animações complexas, com suporte a múltiplos idiomas e temas.',
            solution: 'Desenvolvido com Next.js 14, TypeScript, Tailwind CSS para styling, Framer Motion para animações sofisticadas, Three.js with React Three Fiber para globo 3D interativo, e sistema i18n customizado.',
            results: 'Portfólio com animações fluidas, globo 3D interativo, dark/light mode funcional, suporte completo EN/PT, layout responsivo mobile-first, e performance otimizada. Gerou múltiplas oportunidades profissionais.',
            timeline: '1 mês de desenvolvimento',
            team: 'Desenvolvido por mim',
            learnings: 'Proficiência em Framer Motion, Three.js e React Three Fiber para efeitos 3D, sistema de internacionalização customizado, temas dinâmicos com next-themes, e otimização de performance em Single Page Applications'
          }
        },
        {
          title: 'Portfolio 2026',
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
    // Gallery Section
    gallery: {
      title: 'Galeria',
      heading: 'Momentos Capturados',
      quote: 'Às vezes, são as pessoas de quem ninguém imagina nada que fazem as coisas que ninguém consegue imaginar.',
      author: ' Alan Turing',
      images: [
        { alt: 'Reunião em Equipe com a Banestes Asset', location: 'Bistrô Saldanha 2025 • Vitória, Espírito Santo' },
        { alt: 'Equipe de TI da Banestes Asset reunida em festa de fim de ano 2025', location: 'Casa Mizzi 2025 • Vitória, Espírito Santo' },
        { alt: 'Prêmios conquistados pela Banestes Asset em 2025 ', location: 'Palas Center 2025 • Vitória, Espírito Santo' },
        { alt: 'Apresentação da empresa Banestes Asset e projetos promissores na UVV', location: 'UVV 2025 • Vitória, Espírito Santo' },
        { alt: 'Participando de um dos maiores eventos de tecnologia do Espírito Santo', location: 'ESX 2025 • Vitória, Espírito Santo' },
      ],
    },
    // Contact Section
    contact: {
      title: 'Entre em Contato',
      heading: 'Vamos Conversar',
      description: 'Gostaria de conversar sobre um projeto ou contratação? Deixe uma mensagem!',
      ctaTitle: 'Quer conhecer meu trabalho?',
      ctaDescription: 'Confira meus projetos no GitHub ou conecte comigo no LinkedIn.',
      scheduleCall: 'Agendar Reunião',
      resume: {
        label: 'Currículo',
        value: 'Download CV',
      },
      form: {
        name: 'Nome',
        email: 'Email',
        subject: 'Assunto',
        message: 'Mensagem',
        placeholderName: 'Seu nome',
        placeholderEmail: 'seu@email.com',
        placeholderSubject: 'Sobre o que vamos conversar?',
        placeholderMessage: 'Conte-me sobre seu projeto ou proposta...',
        send: 'Enviar Mensagem',
        sending: 'Enviando...',
        success: 'Mensagem enviada com sucesso!',
        error: 'Erro ao enviar mensagem',
      },
      info: [
        { label: 'Email', value: 'arthurcamponez2020@gmail.com' },
        { label: 'Localização', value: 'Espírito Santo, Brasil' },
      ],
    },
    // Footer
    footer: {
      brand: 'Arthur Camponez',
      description: 'Desenvolvedor Full Stack apaixonado por criar experiências web extraordinárias.',
      quickLinks: 'Links Rápidos',
      contact: 'Contato',
      rights: 'Todos os direitos reservados.',
      madeSince: 'Feito em 2026',
    },
    // Loading Screen
    loading: {
      title: 'Carregando...',
      message: 'Preparando experiência incrível',
    },
    // Common
    common: {
      home: 'Início',
      about: 'Sobre',
      services: 'Serviços',
      portfolio: 'Portfólio',
      contact: 'Contato',
      language: 'Idioma',
      portuguese: 'Português',
      english: 'English',
    },
  },
  en: {
    // Navigation
    nav: {
      home: 'Home',
      about: 'About',
      skills: 'Skills',
      projects: 'Projects',
      contact: 'Contact',
    },
    // Hero Section
    hero: {
      description: 'Building my own path with my passion.',
      passion: 'Tech enthusiast and innovative knowledge seeker.',
      scroll: 'Scroll',
      since: 'Since 2021 • Brazil',
    },
    // About Section
    about: {
      title: 'About Me',
      description:
        'I am a developer extremely obsessed with innovation and creating incredible web experiences. Focused on performance and design, I transform ideas into digital reality.',
      heading: 'Solving problems and overcoming challenges through technology',
      subheading: 'Each project is an opportunity to exceed limits, surpass myself and create something extraordinary. Excellence is not negotiable.',
      experience: 'Years of Experience',
      projects: 'Completed Projects',
      clients: 'Satisfied Clients',
      highlights: [
        { title: 'Engaged', description: 'Maximum dedication and commitment in every project' },
        { title: 'Performance', description: '100% is not enough if I can achieve 110%' },
        { title: 'Passion', description: 'Always have fun and learn in the process' },
      ],
      badge: 'Developing since',
      roadmaps: {
        companies: {
          title: 'Professional Experience',
          subtitle: 'My Corporate Journey',
          labels: {
            description: 'Description',
            achievements: 'Key Achievements',
            technologies: 'Technologies Learned',
          },
          items: [
            {
              id: 1,
              title: 'Novasyn LTDA',
              period: 'Nov 2025 - Present',
              role: 'Founder & CTO',
              logo: '/logo_1.png',
              description: 'Development of complete web solutions and AI system automation with focus on performance and user experience.',
              achievements: [
                'Creation of dynamic interfaces with React.js and Next.js',
                'Integration with Brevo API, Mercado Pago API, Stripe API for automation and payments, and WhatsApp API for message automation',
                'N8N for creating personalized AI automation workflows'
              ],
              technologies: ['Next.js', 'N8N', 'TailwindCSS', 'Three.js', 'Coolify', 'Stripe', 'Brevo API', 'Mercado Pago API', 'Node.js', 'Express', 'Supabase']
            },
            {
              id: 2,
              title: 'Banestes Asset',
              period: 'Feb 2024 - Present',
              role: 'IT Analyst Intern',
              logo: '/banesteslogo.png',
              description: 'Active participation in developing robust institutional platforms for the financial sector.',
              achievements: [
                'Development of responsive interfaces with Bootstrap',
                'Integration with CA Harvest SCM systems',
                'Performance optimization in web applications',
                'Interface prototyping with Figma and mobile development with React Native and Android Studio'
              ],
              technologies: ['Bootstrap', 'Node.js', 'CA Harvest SCM', 'JavaScript', 'MySQL', 'React Native', 'Android Studio', 'Figma']
            },
            {
              id: 3,
              title: 'Freelancer',
              period: 'Apr 2023 - Feb 2024',
              role: 'Frontend Developer',
              logo: '/freelancer.png',
              description: 'Independent projects and consulting for startups and small businesses.',
              achievements: [
                'Full stack development with React and Node.js',
                'Payment implementation with Stripe',
                'Creation of portfolios, landing pages and e-commerce systems',
                'Figma for prototyping, interface design and complete brand identity creation'
              ],
              technologies: ['Figma', 'Next.js', 'Stripe', 'Node.js', 'PostgreSQL', 'TailwindCSS', 'React.js', 'Vercel', 'Hostinger']
            },
            {
              id: 4,
              title: 'Sollitude Mountain Resort - Utah, USA',
              period: 'Dec 2022 - Apr 2023',
              role: 'World Experience Program',
              logo: '/solitude.webp',
              description: 'Cultural and professional exchange program in the USA, focused on hospitality and customer service.',
              achievements: [
                'Development of English language skills',
                'Cultural and professional adaptation in the USA',
                'Cultural exchange and international experiences'
              ],
              technologies: ['English', 'Spanish', 'Hospitality', 'Customer Service']
            },
            {
              id: 5,
              title: 'Banestes S.A',
              period: 'May 2022 - Nov 2022',
              role: 'Software Development Intern',
              logo: '/banesteslogo.png',
              description: 'Assist in analysis, development and implementation of software solutions, developing knowledge in digital transformation and system integration.',
              achievements: [
                'Development of web applications with HTML, CSS and JavaScript',
                'Integration with legacy systems',
                'Performance and security optimization'
              ],
              technologies: ['HTML', 'CSS', 'JavaScript', 'AppSheet', 'Git', 'GitHub', 'Agile', 'Scrum', 'Jira']
            }
          ]
        },
        education: {
          title: 'Education',
          subtitle: 'My Educational Journey',
          labels: {
            description: 'Description',
            achievements: 'Key Achievements',
            technologies: 'Technologies Learned',
          },
          items: [
            {
              id: 1,
              title: 'Coursera IBM',
              period: 'Dec 2025 - Present',
              role: 'IBM Full-Stack JavaScript Developer Certificate',
              logo: '/ibm.png',
              description: 'Complete full-stack web development course focused on Cloud Computing, Software Engineering, Software Architecture and related technologies.',
              achievements: [
                'Certification in Full-Stack development with JavaScript',
                'Certification in Cloud Native, DevOps, Agile and NoSQL',
                'Certification in Docker, Kubernetes and OpenShift',
                'Certification in development using microservices and serverless',
                'Certification in MongoDB and NoSQL Databases'
              ],
              technologies: ['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Docker', 'Kubernetes', 'MongoDB', 'Node.js', 'Express', 'Git', 'Agile', 'Scrum', 'Cloud Computing', 'Microservices']
            },
            {
              id: 2,
              title: 'Vila Velha University (UVV)',
              period: 'Jan 2023 - Present',
              role: 'Computer Science',
              logo: '/uvv-logo.png',
              description: 'Undergraduate in Computer Science with focus on web development and system architecture.',
              achievements: [
                'Courses: Web Programming, Databases, Software Engineering',
                'Academic projects with current technologies',
                'Participation in tech events and workshops'
              ],
              technologies: ['Java', 'Python', 'SQL', 'UML', 'Git', 'C', 'Figma', 'Game Design', 'React Native', 'Android Studio', 'CI/CD', 'Agile', 'Scrum']
            }
          ]
        }
      }
    },
    // Skills Section
    skills: {
      title: 'Skills',
      heading: 'My Competencies',
      frontend: 'Frontend',
      backend: 'Backend',
      tools: 'Tools',
      description: 'Technologies I master and use in my projects',
      skillsList: [
        { name: 'Dedication', level: 110 },
        { name: 'English', level: 95 },
        { name: 'TypeScript', level: 95 },
        { name: 'React/Next.js', level: 90 },
        { name: 'Git,CI/CD,Vercel', level: 85 },
        { name: 'API REST', level: 88 },
        { name: 'Jest/Cypress', level: 80 },
        { name: 'SQL/PostgreSQL', level: 75 },
      ],
      stats: [
        { value: '10+', label: 'Completed Projects' },
        { value: '2+', label: 'Years of Experience' },
        { value: '100%', label: 'Satisfaction' },
        { value: '24/7', label: 'Dedication' },
      ],
      technologies: [
        'React', 'Next.js', 'TypeScript', 'Node.js', 'API REST', 'TailwindCSS', 'Android Studio',
        'PostgreSQL','Docker', 'Figma', 'Git', 'CI/CD', 'Vercel', 'Bootstrap', 'React Native',
        'N8N', 'Three.js', 'Prisma', 'Jest', 'Cypress', 'Stripe', 'Supabase',
      ],
    },
    // Projects Section
    projects: {
      title: 'Projects',
      heading: 'Featured Projects',
      viewMore: 'View More',
      visitSite: 'Visit Site',
      viewProject: 'View Project',
      code: 'Code',
      description: 'Check out some of my featured projects',
      modal: {
        title: 'Projects',
        projects: 'Projects',
        challenge: 'Challenge',
        solution: 'Solution',
        results: 'Results',
        timeline: 'Timeline',
        team: 'Team',
        learnings: 'Learnings',
        techStack: 'Tech Stack',
        viewProject: 'View Project',
        code: 'Code',
      },
      disclaimer: {
        title: '📌 Important Note',
        intro: 'Some projects do not have public repositories. This occurs because:',
        reasons: [
          'They have not yet reached a stable version for sharing',
          'They have contractual confidentiality/intellectual property of third parties'
        ],
      },
      items: [
        {
          title: 'O Incidente WebSite',
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
          title: 'Vende.AI',
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
          title: 'Banestes Asset',
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
          title: 'Novasyn LTDA',
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
          category: 'Full Stack & Design',
          description: 'Personal portfolio with Next.js, Framer Motion animations, interactive 3D globe with Three.js, dark/light mode and EN/PT i18n.',
          image: '/portfolio-2024.png',
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
          category: 'Design & Development',
          description: 'Modern personal portfolio with advanced animations, parallax, interactive carousel and complete responsiveness.',
          image: '',
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
    // Gallery Section
    gallery: {
      title: 'Gallery',
      heading: 'Captured Moments',
      quote: 'Sometimes, the people nobody imagines anything of are the ones that do the things that nobody can imagine.',
      author: 'Alan Turing',
      images: [
        { alt: 'Team meeting at Banestes Asset', location: 'Bistrô Saldanha 2025 • Vitória, Espírito Santo' },
        { alt: 'IT team at year-end party 2025', location: 'Casa Mizzi 2025 • Vitória, Espírito Santo' },
        { alt: 'Awards won by Banestes Asset in 2025', location: 'Palas Center 2025 • Vitória, Espírito Santo' },
        { alt: 'Banestes Asset presentation at UVV', location: 'UVV 2025 • Vitória, Espírito Santo' },
        { alt: 'Participating in one of the largest technology events in Espírito Santo', location: 'ESX 2025 • Espírito Santo' },
      ],
    },
    // Contact Section
    contact: {
      title: 'Get In Touch',
      heading: "Let's Talk",
      description: 'Would you like to talk about a project or hiring? Leave me a message!',
      ctaTitle: 'Want to see my work?',
      ctaDescription: 'Check out my projects on GitHub or connect with me on LinkedIn.',
      scheduleCall: 'Schedule Meeting',
      resume: {
        label: 'Resume',
        value: 'Download CV',
      },
      form: {
        name: 'Name',
        email: 'Email',
        subject: 'Subject',
        message: 'Message',
        placeholderName: 'Your name',
        placeholderEmail: 'your@email.com',
        placeholderSubject: 'What will we talk about?',
        placeholderMessage: 'Tell me about your project or proposal...',
        send: 'Send Message',
        sending: 'Sending...',
        success: 'Message sent successfully!',
        error: 'Error sending message',
      },
      info: [
        { label: 'Email', value: 'arthurcamponez2020@gmail.com' },
        { label: 'Location', value: 'Espirito Santo, Brazil' },
      ],
    },
    // Footer
    footer: {
      brand: 'Arthur Camponez',
      description: 'Full Stack Developer passionate about creating extraordinary web experiences.',
      quickLinks: 'Quick Links',
      contact: 'Contact',
      rights: 'All rights reserved.',
      madeSince: 'Made in 2026',
    },
    // Loading Screen
    loading: {
      title: 'Loading...',
      message: 'Preparing an incredible experience',
    },
    // Common
    common: {
      home: 'Home',
      about: 'About',
      services: 'Services',
      portfolio: 'Portfolio',
      contact: 'Contact',
      language: 'Language',
      portuguese: 'Português',
      english: 'English',
    },
  },
} as const

/**
 * Hook personalizado para usar traduções
 * @param language - Idioma atual ('pt' ou 'en')
 * @returns Objeto com todas as traduções do idioma selecionado
 */
export function getTranslations(language: Language) {
  return translations[language]
}

/**
 * Detecta o idioma do navegador
 * @returns 'pt' se o navegador usar português, caso contrário 'en'
 */
export function detectBrowserLanguage(): Language {
  if (typeof navigator === 'undefined') return 'pt'
  
  const browserLang = navigator.language.toLowerCase()
  return browserLang.startsWith('pt') ? 'pt' : 'en'
}
