# TaskPilot

A modern, fully-featured todo application built with Angular 19, Tailwind CSS, and end-to-end tested with Playwright.

## Technologies

- **[Angular](https://angular.dev/)** - Frontend framework
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Playwright](https://playwright.dev/)** - End-to-end testing
- **[ESLint](https://eslint.org/)** + **[Prettier](https://prettier.io/)** - Code quality and formatting
- **[Husky](https://typicode.github.io/husky/)** + **[lint-staged](https://github.com/lint-staged/lint-staged)** - Git hooks and pre-commit checks

## Features

- Add, edit, and delete todos
- Mark todos as complete/incomplete with strikethrough styling
- Inline editing with auto-focus
- Drag and drop to reorder todos with visual feedback
- Tab-based filtering (All, Active, Completed)
- Bulk delete completed todos
- Local storage persistence
- Responsive design

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
│   │   ├── shared/          # Reusable shared components
│   │   │   ├── icon-button/ # Icon button component
│   │   │   └── tab/         # Tab component
│   │   ├── todo-input/      # Todo input component
│   │   └── todo-list/       # Todo list component
│   ├── services/
│   │   └── todo-storage.service.ts
│   ├── app.component.ts
│   └── app.config.ts
└── styles.css

e2e/                         # Playwright e2e tests
```

## Path Aliases

This project uses TypeScript path aliases for cleaner imports:

```typescript
// Instead of relative paths:
import { Todo } from "../../services/todo-storage.service";

// Use absolute imports:
import { Todo } from "@services/todo-storage.service";
```

**Available aliases:**

- `@app/*` → `src/app/*`
- `@components/*` → `src/app/components/*`
- `@services/*` → `src/app/services/*`
- `@utils/*` → `src/app/utils/*`

Configured in `tsconfig.json`.

## Pre-commit Hooks

This project uses Husky and lint-staged to run checks before commits:

- ESLint (with auto-fix)
- Prettier (with auto-format)
- Playwright e2e tests

All checks must pass before a commit is allowed.
