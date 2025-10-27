/**
 * If you are redirected here when you try to import a CSS module with VSCode,
 * you may want to do this to enable proper CSS type resolution in the IDE:
 *
 * https://code.visualstudio.com/docs/typescript/typescript-compiling#_using-the-workspace-version-of-typescript
 */

declare module "*.module.css"
declare module "*.module.scss"

interface Window {
  Shopify?: unknown
}
