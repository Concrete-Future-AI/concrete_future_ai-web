# Concrete Future AI - Corporate Website

Enterprise AI Transformation Services Platform - Official Corporate Website

## Overview

This is the official corporate website for Concrete Future AI, showcasing enterprise AI transformation services, training programs, and successful implementation cases. The platform is built with modern web technologies to deliver a premium B2B experience with responsive design and high performance.

## Technology Stack

### Core Framework
- **React 18.3.1** - Modern UI library with hooks and concurrent features
- **TypeScript 5.8.3** - Type-safe development with enhanced IDE support
- **Vite 6.3.5** - Next-generation frontend build tool with HMR

### UI & Styling
- **Tailwind CSS 3.4.17** - Utility-first CSS framework for rapid UI development
- **Framer Motion 12.23.24** - Production-ready animation library
- **Lucide React** - Clean and consistent icon library
- **clsx + tailwind-merge** - Conditional className utilities

### State & Routing
- **React Router DOM 7.9.6** - Declarative routing for React applications
- **Zustand 5.0.3** - Lightweight state management solution

### Development Tools
- **ESLint** - Code quality and consistency enforcement
- **PostCSS + Autoprefixer** - CSS processing and vendor prefixing
- **TypeScript ESLint** - TypeScript-specific linting rules

## Project Structure

```
website_3/
├── docs/                           # Documentation and design artifacts
│   ├── design-drafts/             # Design specifications and drafts
│   ├── archive/                   # Archived code versions
│   └── PROJECT_STRUCTURE.md       # Detailed structure documentation
│
├── public/                        # Static assets
│   ├── assets/                    # Core assets
│   │   ├── images/               # Organized image library
│   │   │   ├── partners/         # Partner and client logos
│   │   │   ├── services/         # Service concept art
│   │   │   ├── avatars/          # User avatars
│   │   │   ├── case-studies/     # Case study images
│   │   │   └── icons/            # Icon assets
│   │   ├── logo.png              # Company logo
│   │   └── favicon.svg           # Browser favicon
│   └── img/                       # Backward-compatible image paths
│
├── src/                           # Source code
│   ├── components/                # Reusable React components
│   ├── pages/                     # Page-level components
│   ├── hooks/                     # Custom React hooks
│   ├── lib/                       # Utility libraries
│   ├── assets/                    # Compile-time assets
│   ├── App.tsx                    # Main application component
│   ├── main.tsx                   # Application entry point
│   └── index.css                  # Global styles
│
├── dist/                          # Production build output (generated)
└── [config files]                 # Build and tooling configuration

```

## Key Features

### Service Portfolio
- AI Digital Human Live Streaming
- Intelligent Product Selection
- Marketing Content Generation
- AI-Powered Ad Optimization
- Matrix Account Operations
- Customer Service Automation
- Data-Driven Decision Making

### User Experience
- Responsive design optimized for desktop, tablet, and mobile devices
- Smooth animations and transitions using Framer Motion
- Interactive service showcases with visual feedback
- Professional B2B design language
- Accessibility-first component architecture

### Performance
- Optimized asset loading and code splitting
- Tree-shaking for minimal bundle size
- Production-grade build optimization
- Fast page transitions with React Router

## Getting Started

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher (or pnpm 8.x)

### Installation

```bash
# Clone the repository
git clone https://github.com/Concrete-Future-AI/concrete_future_ai-web.git
cd concrete_future_ai-web

# Install dependencies
npm install
```

### Development

```bash
# Start development server with hot reload
npm run dev

# Open http://localhost:5173 in your browser
```

The development server supports:
- Hot Module Replacement (HMR)
- Fast refresh for React components
- TypeScript type checking
- Real-time error reporting

### Type Checking

```bash
# Run TypeScript compiler in watch mode
npm run check
```

### Linting

```bash
# Run ESLint to check code quality
npm run lint
```

## Build and Deployment

### Production Build

```bash
# Build for production
npm run build

# Output will be in dist/ directory
```

The build process:
1. TypeScript compilation with type checking
2. Vite optimization and bundling
3. CSS minification and purging
4. Asset optimization and hashing
5. Source map generation

### Preview Production Build

```bash
# Preview production build locally
npm run preview

# Open http://localhost:4173 in your browser
```

### Deployment

The project is configured for automatic deployment to GitHub Pages:
- Push to `main` branch triggers deployment workflow
- GitHub Actions builds and deploys to `gh-pages` branch
- Live site: https://concrete-future-ai.github.io/concrete_future_ai-web/

#### Manual Deployment

```bash
# Build the project
npm run build

# Deploy dist/ directory to your hosting provider
# Ensure proper routing configuration for SPA
```

## Asset Management

### Adding New Images

Images should be organized by category in `public/assets/images/`:

```bash
# Partner logos
public/assets/images/partners/company-logo.svg

# Service illustrations
public/assets/images/services/service-concept.jpg

# Case study images
public/assets/images/case-studies/client-success.png

# Icons
public/assets/images/icons/icon-name.svg
```

### Image Path References

In code, reference images from the public directory:

```tsx
// Partner logos
<img src="/assets/tencent.svg" alt="Tencent" />

// Service images
<img src="/img/digi_man.jpg" alt="Digital Human" />

// Icons
<img src="/img/icons8-微信-50.png" alt="WeChat" />
```

## Code Structure

### Component Organization

```tsx
// Reusable components in src/components/
ContactForm.tsx          // Contact form with validation
PartnerShowcase.tsx      // Partner logo carousel
ResultsShowcase.tsx      // Client success stories
ServiceMatrix.tsx        // Service grid display

// Page components in src/pages/
AIImplementationPage.tsx    // AI services landing page
AITransformationPage.tsx    // Main transformation page
```

### Styling Conventions

```tsx
// Use Tailwind utility classes
<div className="flex items-center gap-4 p-6 rounded-lg bg-blue-50">

// Combine with clsx for conditional styling
import { cn } from '@/lib/utils';
<div className={cn(
  "base-classes",
  isActive && "active-classes"
)}>
```

### State Management

```tsx
// Zustand for global state
import { create } from 'zustand';

const useStore = create((set) => ({
  // state and actions
}));
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

Modern browsers with ES2020+ support required.

## Contributing

### Development Workflow

1. Create a feature branch from `main`
2. Make your changes following the coding standards
3. Run tests and linting: `npm run lint && npm run check`
4. Commit with descriptive messages
5. Push and create a pull request

### Code Standards

- Follow TypeScript best practices
- Use functional components with hooks
- Maintain component modularity and reusability
- Write self-documenting code with clear naming
- Add comments for complex business logic only
- Ensure responsive design for all new features

### Commit Message Format

```
feat: add new AI service showcase component
fix: resolve mobile navigation issue
docs: update deployment instructions
refactor: reorganize project structure
style: apply consistent spacing in header
```

## Documentation

- [Project Structure](docs/PROJECT_STRUCTURE.md) - Detailed directory organization
- [Design Drafts](docs/design-drafts/) - Original design specifications
- [Archive](docs/archive/) - Previous implementation versions

## License

Proprietary - Concrete Future AI. All rights reserved.

## Contact

For inquiries regarding this project:
- Website: [Concrete Future AI](https://concrete-future-ai.github.io/concrete_future_ai-web/)
- GitHub: [Concrete-Future-AI](https://github.com/Concrete-Future-AI)

---

Built with modern web technologies for enterprise-grade performance and user experience.
