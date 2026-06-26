# Blue Ocean Client

React 19 single-page app built with [Vite](https://vitejs.dev/).

## Available scripts

In the project directory you can run:

### `npm start` (alias `npm run dev`)

Runs the app in development mode on [http://localhost:3000](http://localhost:3000).
The page reloads automatically when you edit source files.

### `npm test`

Runs the test suite once with [Vitest](https://vitest.dev/) and
[Testing Library](https://testing-library.com/).

### `npm run build`

Builds the app for production into the `dist/` folder.

### `npm run preview`

Serves the production build locally to preview it.

## Configuration

The API base URL is read from the `VITE_API_URL` environment variable and
defaults to `http://localhost:8000/api/example`. Create a `.env` file in this
directory to override it:

```
VITE_API_URL=http://localhost:8000/api/example
```
