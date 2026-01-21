# Getting Started

Quick setup guide for running Camponez DEV locally.

## Prerequisites

- Node.js 18.17 or later
- pnpm 8.0 or later (or npm/yarn)

## Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd new-portfolio
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Setup environment variables

Create a `.env.local` file in the root directory:

```env
BREVO_API_KEY=your_brevo_api_key_here
```

To get a Brevo API key:
1. Visit [brevo.com](https://brevo.com)
2. Create an account or login
3. Navigate to Settings > API Keys
4. Generate a new key
5. Add it to `.env.local`

## Development

### Start development server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### Features during development
- Hot module reloading
- Fast refresh
- TypeScript checking
- ESLint warnings

## Building

### Create production build

```bash
pnpm build
```

### Start production server

```bash
pnpm start
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Create optimized production build |
| `pnpm start` | Start production server |
| `pnpm lint` | Run ESLint checks |
| `pnpm test` | Run test suite |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm test:coverage` | Generate coverage report |

## Project Structure

```
.
├── app/                 # Next.js app directory
├── components/          # React components
├── context/             # Context providers
├── hooks/               # Custom hooks
├── lib/                 # Utilities
├── public/              # Static assets
│   └── resume/          # Resume files (PT/EN)
├── __tests__/           # Test files
├── config/              # Configuration files
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── next.config.mjs      # Next.js configuration
```

## Projects Section

### Main Projects (Section Display - 4 Featured)
1. **Xmetal Token** - Crypto e-commerce platform with Mercado Pago integration
2. **Vende.AI** - WhatsApp sales automation with AI
3. **Banestes Asset** - Institutional financial platform
4. **Novasyn LTDA** - Complete institutional platform with Brevo email integration

### Additional Projects (Catalog Modal - 2 More)
5. **Portfolio 2024** - Previous portfolio with Three.js 3D globe, dark/light mode, full i18n
6. **Portfolio 2026** - Current portfolio with advanced animations, parallax, Embla Carousel

### Project Display Logic
- **projects-section.tsx:** Shows only first 4 projects using `.slice(0, 4)`
- **projects-catalog.tsx:** Shows all 6 projects in "Ver Mais" modal
- **projects-section.tsx:** `.slice(0, 4)` ensures Portfolio 2024 and 2026 don't appear in main section

### Projects Array Configuration

Both `projects-section.tsx` and `projects-catalog.tsx` map projects with:
```typescript
image: ["/Xmetal.png", "/vendeai-logo.svg", "/banestes.png", "/novasyn.png", "/portfolio-2024.png", ""][i]
link: ["xmetal-url", "vendeai-url", "banestes-url", "novasyn-url", "portfolio2024-url", ""][i]
github: ["", "", "", "novasyn-github", "portfolio2024-github", "portfolio2026-github"][i]
```

## Customization

### Change site title and metadata

Edit `app/layout.tsx`:

```tsx
export const metadata: Metadata = {
  title: "Your Name - Portfolio",
  description: "Your description",
}
```

### Update translations

Edit `config/translations.ts` to add or modify content in Portuguese and English.

Translations include:
- Navigation items
- Hero section content
- About section
- Skills with 45+ technologies
- 6 Featured projects with full details
- Gallery section
- Contact form
- Footer

### Modify theme colors

Update Tailwind CSS variables in `app/globals.css` and `tailwind.config.ts`.

### Update project information

Projects are stored in `config/translations.ts` under `projects.items`. Each project includes:
- `title` - Project name
- `category` - Project category
- `description` - Short description (shown in section)
- `tags` - Technology stack array
- `details` - Detailed information object with:
  - `challenge` - Project challenge
  - `solution` - How it was solved
  - `results` - Results achieved
  - `timeline` - Development timeline
  - `team` - Team information
  - `learnings` - Key learnings

### Add new project

1. Add project data to `config/translations.ts` (both `pt` and `en`)
2. Update image array in `projects-section.tsx` (if displaying)
3. Update link array in both components
4. Update github array in both components
5. Update `.slice(0, 4)` limit if adding to main section

## Testing

### Run tests

```bash
pnpm test
```

### Run tests in watch mode

```bash
pnpm test:watch
```

### Generate coverage report

```bash
pnpm test:coverage
```

### Test Coverage

Tests are included for:
- Translations validation (6 projects, PT/EN parity)
- Component rendering
- Hook functionality
- Utility functions
- Context providers
- UI components

Key test additions:
- `translations.test.ts`: Validates 6 projects structure and Portal 2024/2026 data
- Component tests ensure proper rendering and conditional display

## Features

### Dynamic Project Display
- Main section shows 4 featured projects
- Modal catalog shows all 6 projects
- Conditional image rendering (empty strings don't render)
- Conditional button display (links and GitHub URLs)

### Responsive Design
- Mobile-first approach
- Tailwind CSS responsive utilities
- Tested on 375px (iPhone SE) and up
- Touch-friendly interactions

### Animations
- Framer Motion for smooth animations
- Skills carousel with 45+ technologies
- Parallax scroll effects
- Embla Carousel for interactive tech showcase

### Internationalization (i18n)
- Portuguese (pt) and English (en) support
- Language persistence in localStorage
- All content translated
- Custom translation hook

### Dark/Light Mode
- Theme toggle in navigation
- Persistent theme preference
- Smooth transitions

## Troubleshooting

### Port 3000 already in use

```bash
pnpm dev -- -p 3001
```

### Cache issues

Clear Next.js cache:

```bash
rm -rf .next
pnpm dev
```

### Hydration errors

Check browser console for specific error location. Usually caused by:
- Mismatched server/client rendering
- Using `Math.random()` or `Date.now()` without checking mounted state
- Viewport-dependent rendering during hydration

### Build errors

Ensure all environment variables are set and TypeScript has no errors:

```bash
pnpm lint
pnpm build
```

### Portfolio 2024/2026 not appearing correctly

Check that:
- Images exist in `/public/` folder
- Arrays in `projects-section.tsx` and `projects-catalog.tsx` have correct length (6 items)
- `.slice(0, 4)` is applied in `projects-section.tsx`
- Both components have matching array configurations

## Performance Optimization

The project includes several optimizations:

- **Next.js Image:** Automatic image optimization
- **Code Splitting:** Dynamic imports for better bundle size
- **Lazy Loading:** Intersection Observer for viewport-based loading
- **CSS Optimization:** Minimal CSS with Tailwind CSS
- **Font Optimization:** next/font for self-hosted fonts
- **Carousel Performance:** Embla Carousel with drag-free mode and infinite loop

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions
- Mobile: iOS 12+, Android 8+

## Support

For issues, questions, or feedback:
- GitHub Issues: Report bugs and request features
- Email: arthurcamponez2020@gmail.com
- LinkedIn: [Arthur Camponez](https://linkedin.com/in/arthurcmarinho)
