# GEMINI.md - Project Context & Instructions

This project, "六陽笔记" (LyDoc), is a bilingual (primarily Chinese) learning notes repository and documentation site built with VitePress. It serves as a central hub for programming and server-side technology notes.

## Project Overview

- **Purpose**: A comprehensive collection of learning notes for Go, Dart, Flutter, JavaScript, Vue 3, PostgreSQL, Jenkins, and Networking.
- **Main Technologies**:
  - **Documentation Framework**: [VitePress](https://vitepress.dev/) (Vue 3 based).
  - **Styling**: Tailwind CSS (v4), PostCSS, Sass.
  - **Build Tool**: Vite.
  - **CI/CD**: Jenkins (configured via `Jenkinsfile`).
- **Architecture**:
  - **Documentation (Primary)**: Located in the `docs/` directory.
  - **Vue 3 Application (Secondary)**: A boilerplate Vue 3 app located in the `src/` directory.

## Building and Running

### VitePress Documentation (Primary)
- **Development**: `npm run dev` (Runs on port 3000, auto-opens browser).
- **Build**: `npm run build` (Output in `docs/.vitepress/dist`).
- **Preview**: `npm run preview`.

### Vue 3 Application (Secondary)
- **Development**: `npm run vue:dev`.
- **Build**: `npm run vue:build`.
- **Preview**: `npm run vue:preview`.

## Directory Structure & Key Files

### Documentation (`docs/`)
- `.vitepress/config.js`: **Central Configuration**. Defines site metadata, navigation, and the sidebar structure.
- `.vitepress/theme/index.js`: Customizes the default theme and registers global components (e.g., `ZoomImg`).
- `backend/golang/`: Go language documentation.
- `frontend/`: Subdirectories for `dart/`, `flutter/`, `js/`, and `vue3/`.
- `server/`: Subdirectories for `postgresql/` and `jenkins/`.
- `public/`: Static assets (images, PDFs, favicon) used within the documentation. Note: Site-specific images are often in `docs/public/images/`.

### Vue 3 Application (`src/`)
- `main.js`: Entry point for the Vue application.
- `App.vue`: Root component.
- `components/`: Vue components for the application.

## Development Conventions

### Adding New Documentation
1.  **Markdown Files**: Create `.md` files in the relevant subdirectory within `docs/`.
2.  **Navigation & Sidebar**: Update `docs/.vitepress/config.js` to include the new page in the `sidebar` or `nav` arrays. Sidebar items often use `collapsed: true` for cleaner navigation.
3.  **Naming**: Follow the existing Chinese naming conventions for titles in the sidebar/nav (e.g., "基础", "函数", "类与对象").
4.  **Images**: Use the custom `ZoomImg` component for zoomable images in markdown:
    ```vue
    <ZoomImg src="/images/path/to/image.png" alt="Description" />
    ```

### Styling
- **Tailwind CSS**: Primary styling framework. Configuration is handled via PostCSS (`postcss.config.js`).
- **Documentation Styles**: Located in `docs/.vitepress/theme/style.css`.
- **Application Styles**: Located in `src/style.css`.

### Deployment
- **Automation**: The project uses a Jenkins pipeline (`Jenkinsfile`) targeting Node.js 20.21.1.
- **Build Target**: The build process primarily generates the VitePress static site and deploys it to `/var/sites/lydoc.me/index`.

## Technical Details
- **Search**: Local search provider is enabled in VitePress.
- **Outline**: Configured to show headers from level 2 to 4 (`outline: [2, 4]`).
- **Clean URLs**: Set to `false` (URLs include `.html`).
- **Images**: Custom component `ZoomImg` utilizes `medium-zoom` for a better viewing experience.
