# yv-or.github.io

# Rovy Dalusung — Portfolio

Personal portfolio website of Rovy Dalusung, a 2nd-year BSIT Network Administration student at Holy Angel University.

## Live website

[https://yv-or.github.io](https://yv-or.github.io)

## Built with

- HTML5
- CSS3
- JavaScript
- GitHub Pages

## Included work

- HAU Dorm Finder — Human-Computer Interaction final project
- MonsterMatch — CSS styling and animation project
- Curbside Thai — Responsive web-design project
- Iris Music Player — Browser-based media and lyrics interface

# REDESIGN

A redesigned static portfolio for GitHub Pages.

## What changed
- Rebuilt all four pages with a new visual system and responsive layout.
- Added dark / light / system theme settings with localStorage persistence.
- Added reduced-motion setting.
- Added a site-wide portfolio assistant that runs entirely in the browser and answers from published portfolio data.
- Upgraded project gallery with search + category filters.
- Added subtle reveal, hover, magnetic-button, text-rotation, and cursor-glow interactions.
- Kept the existing `yv-or.github.io` deployment model and external `js/script.js` required by the course.

## About the assistant
This is intentionally a static-site assistant, not a live cloud LLM. GitHub Pages cannot safely store a private OpenAI/API key in client-side JavaScript. The assistant therefore uses a small local knowledge base and intent matching so the portfolio can have an assistant-like experience without exposing secrets.

To add a real generative AI later, connect a serverless function (for example Cloudflare Workers, Netlify Functions, Vercel Functions, or an API gateway) and keep the API key on that server side.

## Note

This portfolio was built by Rovy Dalusung with AI assistance. The content was reviewed, personalized, and understood by yvor.
