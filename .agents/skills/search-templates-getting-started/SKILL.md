---
name: search-templates-getting-started
description: Getting started workflow for Search Templates Starter. Use when helping someone clone or template the starter, install dependencies, configure nosto-cli, bind the project to a specific Nosto merchant, run local development, or deploy preview search templates with the Nosto CLI.
---

# Search Templates Getting Started

Use this skill when creating setup instructions or walking a developer through connecting Search Templates Starter to a merchant with `@nosto/nosto-cli`.

## Assumptions

- The developer has access to a Nosto account with Search Templates enabled.
- Node.js 24 or newer and npm are installed.
- The target merchant ID is known. It is the public Nosto account ID, often shaped like `shopify-12345678`.
- Authentication is done either with `nosto login` and 2FA, or with a private `API_APPS` token.

## Canonical Setup Flow

1. Create the project from the starter:

   ```bash
   git clone https://github.com/Nosto/search-templates-starter.git my-search-templates
   cd my-search-templates
   npm install
   ```

   If this is for a merchant implementation, prefer GitHub's "Use this template" flow or a fork before custom work starts.

2. Choose the CLI invocation style:

   ```bash
   npx nosto --help
   ```

   The starter includes the CLI dependency, so `npx nosto ...` is the default. Use a global install only when the developer explicitly wants one:

   ```bash
   npm install -g @nosto/nosto-cli
   nosto --help
   ```

3. Authenticate:

   ```bash
   npx nosto login
   ```

   This opens the browser login flow and stores user credentials under `~/.nosto/.auth.json`. If the team uses automation or API-key auth, configure a private `API_APPS` key instead of relying on user login.

4. Bind the local project to the merchant:

   ```bash
   NOSTO_MERCHANT=merchant-id npx nosto setup
   ```

   This creates or updates `.nosto.json` in the project. Treat `.nosto.json` as the project CLI configuration for the selected merchant. If the merchant targets a non-production environment, include the API URL:

   ```bash
   NOSTO_MERCHANT=merchant-id NOSTO_API_URL=https://api.staging.nosto.com npx nosto setup
   ```

   For API-key auth:

   ```bash
   NOSTO_MERCHANT=merchant-id NOSTO_API_KEY=private-api-apps-token npx nosto setup
   ```

5. Verify the coupling:

   ```bash
   npx nosto status
   ```

   Confirm that the CLI reads the expected merchant and environment before pushing or running preview uploads.

6. Run local development against the merchant:

   ```bash
   VITE_MERCHANT_ID=merchant-id npm run dev
   ```

   Alternatively, use a local `.env` file containing `VITE_MERCHANT_ID=merchant-id`. Do not commit merchant-specific `.env` files.

7. Prepare live injected development:

   - Ensure Nosto is installed on the store page.
   - Open the storefront with `?nostodebug=true` and confirm the Nosto Debug Toolbar appears.
   - Configure injection selectors in `src/config.tsx` so they match the merchant storefront DOM.
   - Remember that wrong selectors can make the template fail silently because nothing is injected.

8. Run live preview deployment:

   ```bash
   npx nosto st dev
   ```

   This watches local files, runs the starter's `nosto.config.ts` build watch command, and uploads preview build artifacts for the configured merchant. The merchant storefront must have the Debug Toolbar enabled and Preview mode toggled on to see changes.

9. Use one-off CLI commands when needed:

   ```bash
   npx nosto st build
   npx nosto st push
   npx nosto st pull
   ```

   If `nosto st push` reports no files changed after a previous `st dev` run, use `npx nosto st push -f` or change a file so hashes update.

## Git Hygiene

- Ensure `.nostocache`, `build`, and local `.env` files are ignored.
- Do not add private `apiKey` values to committed `.nosto.json` files. Use `NOSTO_API_KEY` for secrets.
- Do not commit merchant secrets, private API keys, or developer auth files.
- Keep merchant-specific setup instructions parameterized with `merchant-id` unless the user explicitly provides a safe real merchant ID to document.

## Production Path

Nosto CLI preview uploads are not the final production release step. After validating the preview on the merchant storefront, create the production deployment from the Search Templates page in Nosto Admin.
