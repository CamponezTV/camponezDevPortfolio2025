# Camponez DEV - Portfolio

Professional portfolio website showcasing full-stack development projects, technical skills, and professional experience.

## Overview

Camponez DEV is a modern, responsive portfolio built with cutting-edge web technologies. It features performance optimization, internationalization support, and a smooth user experience with Framer Motion animations.

**Live URL:** [camponezdev.com](https://camponezdev.com)

## Tech Stack

### Frontend
- **Framework:** Next.js 16.0.10 with Turbopack
- **Runtime:** React 19.2.0
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4.1.9
- **Animation:** Framer Motion
- **UI Components:** Radix UI (custom components)
- **Icons:** Lucide React

### Backend & Services
- **Email Service:** Brevo (formerly Sendinblue)
- **Form Handling:** React Hook Form
- **Validation:** Zod

### Development Tools
- **Package Manager:** pnpm
- **Testing:** Jest + React Testing Library
- **Linting:** ESLint
- **Code Formatting:** Prettier (via Next.js)

## Features

### Performance
- Next.js Image optimization with automatic format conversion
- Lazy loading for components using Intersection Observer API
- Web Vitals monitoring with Performance Observer
- Optimized bundle with Turbopack
- Responsive images with adaptive sizing

### User Experience
- Smooth scroll behavior with custom scroll handling
- Dynamic loading screen during page initialization
- Custom cursor implementation
- Framer Motion animations on viewport intersection
- Mobile-first responsive design

### Accessibility
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Color contrast compliance
- Focus management for modals

### Internationalization
- Full i18n support (Portuguese and English)
- Context-based language switching
- Persistent language preference with localStorage
- Dynamic content translation

### Content Sections
- **Hero:** Animated introduction with social links
- **About:** Professional summary with timeline
- **Skills:** Technical competencies with progress visualization
- **Projects:** Portfolio showcase with project details
- **Gallery:** Visual content showcase
- **Contact:** Contact form with Brevo integration
- **Roadmap:** Education and professional experience timeline

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout with metadata
│   └── page.tsx           # Home page
│
├── components/
│   ├── ui/                # Radix UI components
│   ├── about-section.tsx
│   ├── contact-section.tsx
│   ├── gallery-section.tsx
│   ├── hero-section.tsx
│   ├── navigation.tsx
│   ├── projects-section.tsx
│   ├── skills-section.tsx
│   └── [...other-components]
│
├── context/
│   └── language-context.tsx   # Language state management
│
├── hooks/
│   ├── use-translations.ts    # Translation hook
│   ├── use-mobile.ts          # Mobile detection
│   └── use-toast.ts           # Toast notifications
│
├── lib/
│   └── utils.ts               # Utility functions
│
├── config/
│   └── translations.ts        # I18n configuration
│
└── public/
    ├── logo.png              # Site favicon
    └── [...other-assets]
```

## Key Components

### Navigation
Main navigation with language switcher. Features:
- Desktop menu with hover effects
- Mobile hamburger menu with drawer animation
- Language selector (Globe icon + PT/EN buttons)
- Smooth scroll to sections

### Skills Section
Displays technical competencies with:
- Animated progress bars on scroll
- Technologies grid (6 columns on desktop)
- Stats showcase (projects completed, years of experience, etc.)
- Responsive tech icon layout

### Projects Section
Portfolio showcase featuring:
- Hover effects with overlay
- Project details modal
- Tags for technologies used
- Links to live projects and GitHub repositories
- Project catalog with filtering

### Roadmap Section
Timeline of education and professional experience:
- Alternating left/right layout on desktop
- Modal with detailed information
- Responsive design
- Scroll-locked background when modal is open

## Hydration & SSR Optimization

This project uses server-side rendering with careful attention to hydration safety:

- No conditional rendering based on viewport size during hydration
- Consistent class names between server and client
- Responsive classes limited to `sm:`, `md:`, `lg:`, `xl:` (no `xs:`)
- `suppressHydrationWarning` only where necessary
- `mounted` state checks for client-only features

## Performance Metrics

### Core Web Vitals Targets
- **LCP:** < 2.5s
- **FID:** < 100ms
- **CLS:** < 0.1

### Optimization Techniques
1. Next.js Image component for automatic optimization
2. Lazy loading with Intersection Observer
3. Code splitting via dynamic imports
4. CSS-in-JS optimizations
5. Font optimization with next/font

## Deployment

The project is optimized for deployment on Vercel:

```bash
npm run build
npm run start
```

Automatic deployments on push to main branch.

## Environment Variables

```env
NEXT_PUBLIC_BREVO_API_KEY=your_brevo_key
```

## Contributing

Contributions are welcome. Please ensure:
- Code follows existing patterns
- Tests pass before submission
- Components are responsive
- Accessibility standards are met

## License

MIT License - See LICENSE file for details

## Author

Arthur Camponez Marinho
- Portfolio: [camponezdev.com](https://camponezdev.com)
- GitHub: [@CamponezTV](https://github.com/CamponezTV)
- LinkedIn: [Arthur Camponez](https://linkedin.com/in/arthurcmarinho)
