# Contributing Guide

Thank you for your interest in contributing to the `markdown-it-obsidian-callouts` project! This document outlines the process for building and running the project locally.

## Project Overview

This project is a markdown-it plugin that adds support for Obsidian callouts and admonitions to markdown-it.

## Building the Project

### Prerequisites

- Node.js (latest LTS version recommended)
- npm

### Setup and Build Commands

To build the project:

```bash
npm install
npm run build
```

This command will build both CSS and JavaScript files.

To build only CSS files from SCSS:

```bash
npm run build:css
```

Other available commands:

```bash
npm run build:scss     # Builds style/index.css from SCSS
npm run build:mincss   # Builds minified style/index.min.css
npm run build:js       # Builds only JavaScript files
npm run check          # Runs Biome check for linting and formatting
npm run format         # Formats code with Biome (--fix)
npm run lint           # Lints code with Biome (--fix)
npm run test           # Runs tests
npm run dev            # Runs Vitest in watch mode
```

## Development Environments

### Using VS Code Locally

When developing with VS Code locally:

1. Open the project in VS Code
2. Navigate to the Explorer view
3. Find the "NPM SCRIPTS" section in the Explorer
4. Click on any script to run it with a single click

### Running manually

When using GitHub Codespaces or another editor:

1. Install dependencies:

    ```bash
    npm ci   # Fresh install using package-lock.json
    # or
    npm install   # Regular install, may update dependencies
    ```

2. Run tests in watch mode for active development:

    ```bash
    npm run dev
    ```
    
3. Run a full check and build before committing:

    ```bash
    npm run check   # Verify formatting and linting
    npm run build   # Build everything
    npm run test    # Run all tests
    ```

## Code Style and Formatting

This project uses:
- EditorConfig for consistent whitespace
- Vite for build processes
- Biome for linting and formatting

Before submitting your code, please run the following commands:

```bash
npm run check    # Runs Biome check (includes both lint and format verification)
```

Use `npm run lint`, `npm run format`, or run biome directly with `npx biome` to resolve errors.

## Pull Request Process

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run the code checks to ensure formatting and linting (`npm run check`)
5. Run the build process to ensure everything works (`npm run build`)
6. Run tests to verify functionality (`npm run test`)
6. Commit your changes with clear, descriptive commit messages
7. Push to your fork and submit a pull request

## Questions?

If you have questions about contributing, please open an issue in the [GitHub repository](https://github.com/ebullient/markdown-it-obsidian-callouts/issues).