# Ally Lo Portfolio

This is the deployable, static version of Ally Lo's portfolio. `index.html` is the source of truth for future edits. The original snapshot remains at `../outputs/Ally-Lo-Portfolio.html`.

## Local preview

Run `./dev.sh`, then open <http://127.0.0.1:4173/>. Refresh the browser after editing. Python 3 is the only requirement. Do not use a `file://` URL for routine testing.

## Publishing

Connect this repository to a Vercel project with **Framework Preset: Other**, **Root Directory: `./`**, **Build Command: none**, and **Output Directory: `./`**. Set `main` as the Production Branch. A push to `main` updates the production URL; pushes to other branches create Preview deployments. No build framework or upload step is needed.

After editing `index.html` or `assets/`:

```sh
git add -A
git commit -m "Update portfolio"
git push origin main
```

For review on iPad or phone before publishing, create a branch, commit, and push it. Open the Preview URL from the Vercel deployment or pull request. Merge into `main` only after review.

## Resource notes

The page embeds most imagery and styles in `index.html`. The remaining images, fonts, creator-video thumbnails, and scripts are in `assets/`; the interactive screening page is in `prototypes/creator-screening/`. Links to original creator posts and videos open external sites. Those destinations are outside this repository and may depend on the viewer's region or network.
