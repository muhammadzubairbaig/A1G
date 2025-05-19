# Getting Started

This guide will help you set up and run the A1G Frontend Challenge application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher) or yarn (v1.22.0 or higher)
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/a1g-fe-challenge.git
cd a1g-fe-challenge
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Create environment files:
```bash
cp .env.example .env.local
```

## Development Setup

### Environment Configuration

Configure your environment variables in `.env.local`:

```env
VITE_API_URL=http://localhost:3000
VITE_API_TIMEOUT=5000
```

### Running the Application

1. Start the development server:
```bash
npm run dev
# or
yarn dev
```

2. Open your browser and navigate to:
```
http://localhost:5173
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run test` - Run tests
- `npm run lint` - Run linting
- `npm run format` - Format code with Prettier

## Development Workflow

### Code Style

The project uses ESLint and Prettier for code formatting:

- ESLint configuration is in `.eslintrc.js`
- Prettier configuration is in `.prettierrc`

### Git Hooks

The project uses Husky for Git hooks:

- Pre-commit: Runs linting and formatting
- Pre-push: Runs tests

### Testing

Run tests with:

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Building for Production

1. Create a production build:
```bash
npm run build
```

2. Preview the production build:
```bash
npm run preview
```

## Project Structure

```
a1g-fe-challenge/
├── src/
│   ├── components/     # Reusable UI components
│   ├── features/       # Feature modules
│   ├── hooks/         # Custom React hooks
│   ├── services/      # API services
│   ├── utils/         # Utility functions
│   └── styles/        # Global styles
├── public/            # Static assets
├── docs/             # Documentation
└── __tests__/        # Test files
```

## Troubleshooting

### Common Issues

1. **Node Version Mismatch**
   - Use `nvm` to switch to the correct Node version
   - Check `.nvmrc` for the required version

2. **Build Errors**
   - Clear the cache: `npm run clean`
   - Delete `node_modules` and reinstall

3. **Test Failures**
   - Update test snapshots: `npm run test:update`
   - Check test environment setup

For more detailed troubleshooting, see the [Troubleshooting Guide](./troubleshooting.md).

## Next Steps

- Review the [Architecture Documentation](./architecture/README.md)
- Explore the [Component Library](./components/README.md)
- Check out the [API Integration Guide](./api/README.md)

## Support

If you encounter any issues or need help:

1. Check the [Troubleshooting Guide](./troubleshooting.md)
2. Search existing [GitHub Issues](https://github.com/your-username/a1g-fe-challenge/issues)
3. Create a new issue if needed 