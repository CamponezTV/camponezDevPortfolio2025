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
NEXT_PUBLIC_BREVO_API_KEY=your_brevo_api_key_here
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
├── __tests__/           # Test files
├── config/              # Configuration files
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.ts   # Tailwind CSS configuration
└── next.config.mjs      # Next.js configuration
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

### Modify theme colors

Update Tailwind CSS variables in `app/globals.css` and `tailwind.config.ts`.

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

## Performance Optimization

The project includes several optimizations:

- **Next.js Image:** Automatic image optimization
- **Code Splitting:** Dynamic imports for better bundle size
- **Lazy Loading:** Intersection Observer for viewport-based loading
- **CSS Optimization:** Minimal CSS with Tailwind CSS
- **Font Optimization:** next/font for self-hosted fonts

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
