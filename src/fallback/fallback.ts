import { unstashNativeContent } from "./nativeContent"

const initialUrl = location.href

let unmountTemplate = () => {}

/**
 * Registers how to unmount the template. Called by the entry before rendering.
 */
export function registerUnmount(unmount: () => void) {
  unmountTemplate = unmount
}

/**
 * Unmounts the template and restores the native content in place.
 * The native content only matches the URL the page was loaded with, so if the URL has changed,
 * the page is reloaded instead.
 */
export function restoreNativeContent() {
  if (location.href !== initialUrl) {
    location.reload()
    return
  }
  unmountTemplate()
  unstashNativeContent()
}
