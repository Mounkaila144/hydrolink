# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

hyperlink-BTP is a professional website for a multidisciplinary company based in Niamey, Niger, specializing in civil engineering & construction (BTP), hydraulics, e-commerce, and general commerce. The site is built with Next.js 15 (App Router), TypeScript, and uses next-intl for internationalization.

## Development Commands

### Core Development
```bash
npm run dev           # Start development server with Turbopack on localhost:3000
npm run build         # Build for production with Turbopack
npm start             # Start production server
```

### Code Quality
```bash
npm run lint          # Run ESLint to check code
npm run lint:fix      # Fix ESLint issues automatically
```

### Testing
```bash
npm run test          # Run Vitest tests in watch mode
npm run test:ui       # Run Vitest tests with UI
npm run test:run      # Run Vitest tests once (CI mode)
npm run e2e           # Run Playwright E2E tests
npm run e2e:ui        # Run Playwright E2E tests with UI
```

## Architecture

### Next.js App Router Structure

This project uses Next.js 15 App Router with the following organization:

- **`app/`** - All pages using Next.js App Router file-based routing
  - Each route has a `page.tsx` file (e.g., `app/a-propos/page.tsx`)
  - Root layout in `app/layout.tsx` handles fonts, metadata, and i18n provider
  - No nested layouts - each page imports Header/Footer directly

### Internationalization (i18n)

The site uses **next-intl** for internationalization:

- **Configuration**: `lib/i18n.ts` defines supported locales (`fr`, `en`)
- **Content files**: `content/site.fr.json` and `content/site.en.json` contain all translations
- **Default locale**: French (`fr`)
- **Usage in components**:
  - Use `useTranslations()` hook for translated strings
  - Import and use content JSON directly for complex data structures (e.g., `siteData.nav`)
- **Layout integration**: `NextIntlClientProvider` wraps all children in `app/layout.tsx`

### Component Organization

**UI Components** (`components/ui/`):
- **shadcn/ui** components: `button.tsx`, `card.tsx`, `badge.tsx`, `input.tsx`, `select.tsx`, etc.
- **Custom layout components**:
  - `header.tsx` - Enhanced sticky navigation with:
    - Two-tier header (top bar with contact info + main navigation)
    - Company logo (`/logo.jpeg`) with hover effects
    - Mega-menu dropdown for services
    - Responsive mobile menu with slide-down animation
    - Active route highlighting
  - `footer.tsx` - Company info, navigation links, and legal links
- All components use Tailwind CSS for styling

### Content Management

**Content Structure** (`content/`):
- All site content lives in JSON files (`site.fr.json`, `site.en.json`)
- Content includes: brand info, navigation structure, service descriptions, form labels
- Navigation is structured as nested objects with optional `children` for dropdown menus
- Import content files directly in components when needed (e.g., for navigation data)

### Forms & Validation

**Validation schemas** (`lib/validations.ts`):
- Uses **Zod** for schema validation
- Two main schemas:
  - `contactFormSchema` - General contact form
  - `quoteFormSchema` - Quote request form with service selection
- Used with **react-hook-form** and **@hookform/resolvers**

### Styling

**Design System**:
- **Primary color**: Blue (#2563eb) - trust and professionalism
- **Accent color**: Green (#16a34a) - water and sustainability
- **Typography**:
  - Primary font: Inter (via `--font-inter`)
  - Secondary font: JetBrains Mono (via `--font-jetbrains-mono`)
- **Tailwind CSS v4**: Uses `@tailwindcss/postcss` (note: no `tailwind.config.js` file)
- **Custom utilities**: `lib/utils.ts` exports `cn()` for className merging
- **CSS Variables**: Defined in `app/globals.css`

### SEO & Metadata

**Root Layout Metadata** (`app/layout.tsx`):
- Comprehensive metadata including Open Graph and Twitter Cards
- Multi-language support with `alternates.languages`
- Sitemap and robots configuration
- Base URL: `https://hyperlink-btp.com`

## Key Technical Details

### Next.js Configuration

`next.config.ts` includes:
- **next-intl plugin** wrapping the config
- Image optimization for `images.unsplash.com` and `localhost`
- Experimental features: `optimizeCss`, `scrollRestoration`
- Strict TypeScript and ESLint enforcement (`ignoreBuildErrors: false`)

### Routing Patterns

- All pages are at the top level of `app/` directory
- Service pages follow pattern: `app/services/[service-name]/page.tsx`
  - Services: `btp`, `hydraulique`, `e-commerce`, `commerce-general`
- Legal pages: `app/mentions-legales/`, `app/politique-de-confidentialite/`

### State Management

- No global state management library
- Uses React hooks (`useState`) for local component state
- `Header` component manages mobile menu state locally

### Data Fetching

- Content is imported statically from JSON files
- No dynamic data fetching or API routes currently
- All content is pre-rendered at build time

## Important Patterns

### Adding New Pages

1. Create `app/[page-name]/page.tsx`
2. Import `Header` and `Footer` components
3. Use `useTranslations()` for text content
4. Add navigation entry to `content/site.fr.json` and `content/site.en.json`

### Working with Translations

```typescript
// In components:
import { useTranslations } from "next-intl";
const t = useTranslations();
// Use: t("homepage.hero.title")

// For complex structures (like navigation):
import siteData from "@/content/site.fr.json";
// Access: siteData.nav
```

### Component Styling

- Use `cn()` utility from `lib/utils.ts` to merge Tailwind classes
- Custom classes defined in `app/globals.css` including utility classes:
  - `.btn-primary`, `.btn-secondary`, `.btn-accent` for consistent button styles
  - `.text-gradient` for gradient text effects
  - `.card-hover` for hover effects on cards
  - Animation classes: `.animate-fade-in`, `.animate-slide-in-left`, `.animate-float`, etc.
- Radix UI components styled with Tailwind via class-variance-authority

### Form Implementation

1. Define schema in `lib/validations.ts` using Zod
2. Use `react-hook-form` with `@hookform/resolvers/zod`
3. Import UI components: `Input`, `Textarea`, `Select`, `Label`, `Button`
4. Export TypeScript types from schemas (e.g., `ContactFormData`, `QuoteFormData`)

## Performance Considerations

- Uses Turbopack in development and build (`--turbopack` flag)
- Image optimization via `next/image` with WebP and AVIF formats
- CSS optimization enabled via experimental feature
- Lighthouse target: ≥ 90 for all metrics

## Accessibility

- WCAG AA compliance target
- Keyboard navigation supported (especially in `Header` navigation)
- Screen reader friendly (semantic HTML)
- Respects `prefers-reduced-motion` for animations
