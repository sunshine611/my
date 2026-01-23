# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a bilingual (Chinese) learning notes repository ("六陽笔记") built with VitePress, covering programming topics including Golang, JavaScript/Dart, Flutter, networking, and server technologies. The repository serves as both a VitePress documentation site and includes a basic Vue 3 application scaffold.

## Development Commands

### VitePress Documentation (Primary)
```bash
npm run dev          # Start VitePress dev server on port 3000 (auto-opens browser)
npm run build        # Build VitePress documentation site
npm run preview      # Preview built documentation site
```

### Vue 3 Application (Secondary)
```bash
npm run vue:dev      # Start Vite dev server for Vue app
npm run vue:build    # Build Vue application
npm run vue:preview  # Preview built Vue app
```

## Architecture

### Dual-Purpose Structure
The repository contains two separate applications:
1. **VitePress documentation site** (primary): Lives in `docs/` directory
2. **Vue 3 application** (secondary): Lives in `src/` directory with entry point at `index.html`

### VitePress Documentation Structure

#### Configuration
- **Main config**: `docs/.vitepress/config.js` - Contains site metadata, navigation, sidebar structure, and build configuration
- **Theme**: `docs/.vitepress/theme/index.js` - Extends VitePress default theme with custom components
- **Custom components**: `docs/.vitepress/components/` - Houses reusable Vue components (e.g., `ZoomImg.vue` for image zooming)
- **Build output**: `docs/.vitepress/dist/` - Generated static site

#### Content Organization
Documentation is organized by technology domain:
- `docs/backend/golang/` - Go language tutorials (introduction, data types, syntax, functions, interfaces, serialization, packages, SQL)
- `docs/frontend/dart/` - Dart language guides (basics, functions, classes, libraries, async)
- `docs/frontend/flutter/` - Flutter framework docs (base, widgets)
- `docs/frontend/js/` - JavaScript documentation
- `docs/frontend/vue3/` - Vue 3 documentation
- `docs/network/` - Networking concepts (e.g., browser URL resolution)
- `docs/server/postgresql/` - PostgreSQL database documentation
- `docs/server/jenkins/` - Jenkins CI/CD (installation, usage)

#### Navigation and Sidebar
The sidebar and navigation menus are manually configured in `config.js`. When adding new documentation pages:
1. Create the `.md` file in the appropriate subdirectory
2. Update the `sidebar` array in `config.js` to include the new page link
3. If creating a new top-level section, also update the `nav` array

### Styling
- **Tailwind CSS** is configured for both VitePress docs and Vue app
- VitePress uses PostCSS with Tailwind plugin (configured in `config.js`)
- Custom styles: `docs/.vitepress/theme/style.css` for VitePress, `src/style.css` for Vue app
- Tailwind content paths include both `docs/**` and `src/**` directories

### Build and Deployment
- **Jenkins pipeline**: `Jenkinsfile` automates deployment
  - Uses Node.js 20.21.1
  - Runs `npm run build` (VitePress build)
  - Deploys output from `docs/.vitepress/dist/` to `/var/sites/lydoc.me/index`
- **Local build**: The VitePress build command generates a static site in `docs/.vitepress/dist/`

## Key Technical Details

### VitePress Configuration Notes
- **Dev server port**: 3000 (auto-opens on start)
- **Search**: Local search provider enabled
- **Outline levels**: Displays heading levels 2-4 in document outline
- **Clean URLs**: Disabled (URLs include `.html` extension)
- **Medium-zoom**: Integrated via custom `ZoomImg` component for image zoom functionality

### Component Registration
Custom components must be registered in `docs/.vitepress/theme/index.js` using the `enhanceApp` hook to be available globally in markdown files.

## Working with Documentation

### Adding New Documentation Pages
1. Create markdown file in appropriate `docs/` subdirectory
2. Update `docs/.vitepress/config.js`:
   - Add to `sidebar` array with proper nesting
   - Add to `nav` array if creating new top-level section
3. Follow existing Chinese naming conventions for titles

### Using Custom Components
The `ZoomImg` component is available globally in all markdown files for adding zoomable images.

## Git Workflow
- **Main branch**: `main`
- Recent commits show work on PostgreSQL documentation and dependency updates
