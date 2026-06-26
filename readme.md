# Welcome to Blue Ocean

How do you feel today? [![CI](https://github.com/ssspear/deep-dive/actions/workflows/ci.yml/badge.svg)](https://github.com/ssspear/deep-dive/actions/workflows/ci.yml)

Congratulations and welcome to your first day at Blue Ocean! We are an underwater agile software development company.  

Let's begin our tour (don't blink!)...

## Getting started

Requires Node 22 (see `.nvmrc`).

```bash
npm run setup    # install client + server dependencies
npm run launch   # start the API (:8000) and the client (:3000)
npm test         # run server + client test suites
```

The client is a [Vite](https://vitejs.dev/) + React 19 app (`client/`) and the API
is an Express 5 server (`server/`). The client reads the API URL from
`VITE_API_URL` and falls back to `http://localhost:8000/api/example`.

# This Repo uses Commitizen

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

This allows consistent commit messages accross the project. To commit with Commitizen use the script npm run commit
See more here:
https://www.npmjs.com/package/commitizen