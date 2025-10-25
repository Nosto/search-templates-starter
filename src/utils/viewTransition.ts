/**
 * Utility function to handle view transitions if supported by the browser.
 * @param callback - The function to execute during the view transition.
 */
export function startViewTransition(callback: () => Promise<void> | void) {
  if (document.startViewTransition) {
    document.startViewTransition(callback)
  } else {
    callback()
  }
}
