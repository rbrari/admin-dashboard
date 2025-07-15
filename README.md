# Admin Dashboard

A modern Vue 3 admin dashboard built with TypeScript, featuring real-time analytics, business metrics, and interactive charts. The application uses Mock Service Worker (MSW) to simulate API responses with realistic loading delays.

## Prerequisites

Make sure you have the following installed:

- **Node.js** (version 18 or higher)
- **pnpm** (recommended package manager)

> **Note**: If you're using nvm (Node Version Manager), run `nvm use` to automatically switch to the correct Node.js version specified in `.nvmrc`.

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd admin-dashboard
   ```

2. **Install dependencies**:

   Using pnpm (recommended):

   ```bash
   pnpm install
   ```

   Or using npm:

   ```bash
   npm install
   ```

## Development

Start the development server:

Using pnpm:

```bash
pnpm dev
```

Or using npm:

```bash
npm run dev
```

The application will be available at:

- **Local**: http://localhost:5173/ (or next available port)
- **Vue DevTools**: Available as a separate window

### Available Scripts

**With pnpm (recommended):**

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build
- `pnpm type-check` - Run TypeScript type checking
- `pnpm lint` - Run ESLint with auto-fix
- `pnpm format` - Format code with Prettier

**With npm:**

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run type-check` - Run TypeScript type checking
- `npm run lint` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier

## Project Structure

```
src/
├── components/           # Vue components
│   ├── dashboard/       # Dashboard-specific components
│   │   ├── metric-cards/    # Metric card components
│   │   └── tables/          # Data table components
│   ├── layout/          # Layout components
│   └── ui/              # Reusable UI components
├── composables/         # Vue composables
├── mocks/               # MSW mock data and services
├── router/              # Vue Router configuration
├── services/            # Real API services
├── types/               # TypeScript type definitions
└── views/               # Page components
```
