# Ally Lo Portfolio

This repository contains the static portfolio published from the GitHub `preview` branch. `index.html` is the page source; page styles, scripts, fonts, and media are in `assets/`.

## Local preview

Run `./dev.sh`, then open <http://127.0.0.1:4173/>. Python 3 is the only requirement. Use an HTTP server instead of opening the page with a `file://` URL.

## Publishing to Cloudflare Pages

The active Cloudflare Pages site is <https://ally-portfolio-2a6.pages.dev/>. Its GitHub production branch is `preview`. Pushing to `preview` starts the Cloudflare Pages build and updates this site automatically.

To publish a change:

```sh
git switch preview
git pull --ff-only origin preview
# edit the intended files and review the result
git diff --check
git status --short
git add -- path/to/changed-file
git diff --cached
git commit -m "Describe the change"
git push origin preview
```

Check the Cloudflare Pages deployment for the pushed commit, then review the site at the URL above. Keep `index.html` and its referenced `assets/` files together. Cloudflare Pages has a 25 MiB per-file asset limit.

## Vercel separation

The `main` branch remains the separate Vercel production source. `vercel.json` disables Vercel Git deployments for `preview`, so Cloudflare updates do not create Vercel Preview deployments. Do not merge or push to `main` as part of a Cloudflare publish.

## Resource notes

The interactive screening prototype is in `prototypes/creator-screening/`. External creator posts and videos open third-party sites and may depend on region or network access.
