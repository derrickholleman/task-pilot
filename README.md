# TaskPilot

A modern todo application built with Angular, featuring inline editing, completion tracking, and local storage persistence.

## Technologies

- **[Angular](https://angular.dev/)** - Frontend framework
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Playwright](https://playwright.dev/)** - End-to-end testing
- **[ESLint](https://eslint.org/)** + **[Prettier](https://prettier.io/)** - Code quality and formatting
- **[Husky](https://typicode.github.io/husky/)** + **[lint-staged](https://github.com/lint-staged/lint-staged)** - Git hooks and pre-commit checks

## Features

- ✅ Add, edit, and delete todos
- ✅ Mark todos as complete/incomplete with strikethrough styling
- ✅ Inline editing with auto-focus
- ✅ Local storage persistence
- ✅ Responsive design

## Getting Started

### Prerequisites

- Node.js (v20.19.0 or higher recommended)
- npm

### Installation

```bash
npm install
```

### Development

Start the development server:

```bash
npm start
```

Navigate to `http://localhost:4200/`. The app will automatically reload when you make changes.

### Build

Build the project for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Testing

Run end-to-end tests:

```bash
npm run e2e
```

### Code Quality

Format code:

```bash
npm run format
```

Lint code:

```bash
npm run lint
```

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── icons/           # SVG icon components
│   │   ├── shared/          # Shared components (icon-button)
│   │   ├── todo-input/      # Todo input component
│   │   └── todo-list/       # Todo list component
│   ├── services/
│   │   └── todo-storage.service.ts
│   ├── app.component.ts
│   └── app.config.ts
└── styles.css
```

## Pre-commit Hooks

This project uses Husky and lint-staged to run checks before commits:

- ESLint (with auto-fix)
- Prettier (with auto-format)
- Playwright e2e tests

All checks must pass before a commit is allowed.
