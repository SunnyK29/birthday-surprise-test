# TEST COPY — Special Person → Birthday → Sorry

This is a temporary test copy of the complete three-page journey. Its lock and release time have been changed for testing only. Do not use this timing for the final project.

1. **Main surprise page** — Next.js + React + Framer Motion at `/`.
2. **Birthday site** — standalone HTML/CSS/vanilla JavaScript at `/birthday/`.
3. **Sorry site** — encrypted source bundle in `private/sorry-site.tar.gz.enc`; it is only decrypted into the deployment after **18 October 2026 at 10:00 PM IST**.

The Sorry source and its assets are not stored in plaintext in this repository. The decryption key must be stored as a GitHub Actions secret.

## One-time setup

1. Create one GitHub repository and upload the contents of this folder to its `main` branch.
2. In the repository, open **Settings → Secrets and variables → Actions → New repository secret**.
3. Add a secret named **`SORRY_DECRYPTION_KEY`** with the key provided separately with this ZIP. Do not write the key into a file or commit it to Git.
4. Open **Settings → Pages** and choose **GitHub Actions** as the build and deployment source.
5. Open **Actions** and make sure **Build and deploy the surprise journey** succeeds.

The workflow builds the Next.js site as static files, puts the birthday site under `/birthday/`, and deploys them together. On or after the release time, it decrypts the Sorry bundle and adds it under `/sorry/`.

## Visitor flow

- The main page's final button now reads **“Continue to Birthday Surprise →”** and navigates to `/birthday/`.
- The birthday site's **“Read My Apology 💌”** button shows the locked popup before the deadline.
- After the deadline, the button checks for `/sorry/index.html` and navigates to `/sorry/` only when the page is actually deployed.

## TEST COPY schedule details

The workflow uses `30 16 18 10 *` (16:30 UTC = 10:00 PM IST) and checks the full release timestamp `2026-10-18 16:30:00 UTC`. GitHub scheduled runs can be delayed by a few minutes. The workflow also runs on pushes and manual dispatches; before the deadline those deployments omit the Sorry page.

## GitHub Pages paths

The workflow sets `NEXT_PUBLIC_BASE_PATH` automatically for a repository Pages URL (for example, `https://OWNER.github.io/REPOSITORY/`). If the repository is named `OWNER.github.io`, it uses the domain root.

## Local development

- Main Next.js page: `npm ci` then `npm run dev`.
- Birthday site: open `birthday/index.html` in a browser.
- The Sorry site is intentionally encrypted and is not included in a local preview by default.

## Important notes

- Keep `SORRY_DECRYPTION_KEY` private. Anyone who obtains both the encrypted bundle and the key can decrypt the Sorry page before release.
- This is a scheduled publication, not strong access control after release: once published, the Sorry page is public.
- GitHub Pages is static hosting; no server is required.
