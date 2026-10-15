# Ally Lo Portfolio

This is the deployable, static version of Ally Lo's portfolio. `index.html` is the source of truth for future edits. The original snapshot remains at `../outputs/Ally-Lo-Portfolio.html`.

## Local preview

Run `./dev.sh`, then open <http://127.0.0.1:4173/>. Refresh the browser after editing. Python 3 is the only requirement. Do not use a `file://` URL for routine testing.

## Publishing

This repository is connected to the Vercel project `ally-portfolio` with **Framework Preset: Other**, **Root Directory: `./`**, and no build command. The production URL is <https://ally-portfolio-nine.vercel.app/>. A push to `main` updates that URL automatically; pushes to other branches create Preview deployments. No build framework or manual upload is needed.

After editing `index.html` or `assets/`, stage only the exact changed paths for one logical change. Replace the example path as needed and inspect the staged diff; see `docs/context/OPERATING_RULES.md` for the change policy.

```sh
git add -- index.html
git diff --cached
git commit -m "Update portfolio"
git push origin main
```

For review on iPad or phone before publishing, use the existing `preview` branch:

```sh
git switch preview
git merge main
# edit and check the site with ./dev.sh
git add -- index.html
git diff --cached
git commit -m "Update portfolio"
git push origin preview
```

Vercel updates the Preview branch URL at <https://ally-portfolio-git-preview-allylo02111-2479.vercel.app/>. Preview deployments currently require Vercel login; the dashboard can also generate a temporary share link for another device. After reviewing, publish the same commit:

```sh
git switch main
git merge preview
git push origin main
```

## Resource notes

The page embeds most imagery and styles in `index.html`. The remaining images, fonts, creator-video thumbnails, and scripts are in `assets/`; the interactive screening page is in `prototypes/creator-screening/`. Links to original creator posts and videos open external sites. Those destinations are outside this repository and may depend on the viewer's region or network.

## Cloudflare Pages migration pilot

This is a static site being prepared for a Cloudflare Pages GitHub
deployment. Vercel and the existing public domain remain unchanged.
Embedded media have been extracted from `index.html` into `assets/media/`,
and identical game icons reuse `assets/game-icons/`. Keep these files
together: Cloudflare Pages limits any individual site asset to 25 MiB.

Setup, after the owner connects their Cloudflare account:

1. Cloudflare > Workers & Pages > Create application > Pages > Connect to
   Git. Authorize the existing `ALLYLO/ally-portfolio` repository.
2. During the trial, choose **`preview` as the initial Cloudflare production
   branch**. This serves a separate test `*.pages.dev` address only.
   GitHub `main` still has the oversized pre-migration HTML, so do not
   choose `main` for Cloudflare deployment until the tested refactor is
   promoted. Do not alter the current Vercel production site.
3. Use Framework preset **None**, Root directory `.`, Build command blank
   (or `exit 0`), and Build output directory `.` containing `index.html`.
4. Test both languages, screen-width breakpoints, static WORKS covers,
   project-detail dialogs, interactive demos, relative asset paths,
   typography, scrolling, and downloadable files before sign-off.
5. After approval, merge the tested changes from `preview` to `main`,
   switch Cloudflare's production branch to `main`, and only then consider
   changing the public domain. Use branch build controls to limit build usage.

This repository change does not create or deploy a Cloudflare account/project.
