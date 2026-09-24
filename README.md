# Ally Lo Portfolio

This is the deployable, static version of Ally Lo's portfolio. `index.html` is the source of truth for future edits. The original snapshot remains at `../outputs/Ally-Lo-Portfolio.html`.

## Local preview

Run `./dev.sh`, then open <http://127.0.0.1:4173/>. Refresh the browser after editing. Python 3 is the only requirement. Do not use a `file://` URL for routine testing.

## Publishing

This repository is connected to the Vercel project `ally-portfolio` with **Framework Preset: Other**, **Root Directory: `./`**, and no build command. The production URL is <https://ally-portfolio-nine.vercel.app/>. A push to `main` updates that URL automatically; pushes to other branches create Preview deployments. No build framework or manual upload is needed.

After editing `index.html` or `assets/`:

```sh
git add -A
git commit -m "Update portfolio"
git push origin main
```

For review on iPad or phone before publishing, use the existing `preview` branch:

```sh
git switch preview
git merge main
# edit and check the site with ./dev.sh
git add -A
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
