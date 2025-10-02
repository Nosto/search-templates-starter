/**
 * Wait for a single DOM element to appear
 * @param selector CSS selector to wait for
 * @param timeout Maximum time to wait in milliseconds (default: 10000)
 * @param interval Polling interval in milliseconds (default: 100)
 * @returns Promise that resolves with the element when found
 */
export function waitForElement<T extends Element = HTMLElement>(
  selector: string,
  timeout = 10000,
  interval = 100
): Promise<T> {
  return new Promise((resolve, reject) => {
    const startTime = Date.now()

    const checkElement = () => {
      const element = document.querySelector<T>(selector)

      if (element) {
        resolve(element)
        return
      }

      if (Date.now() - startTime >= timeout) {
        reject(new Error(`Element with selector "${selector}" not found within ${timeout}ms`))
        return
      }

      setTimeout(checkElement, interval)
    }

    checkElement()
  })
}

/**
 * Wait for multiple DOM elements to appear
 * @param selectors Array of CSS selectors to wait for
 * @param timeout Maximum time to wait in milliseconds (default: 10000)
 * @param interval Polling interval in milliseconds (default: 100)
 * @returns Promise that resolves with an array of elements when all are found
 */
export function waitForElements<T extends Element = HTMLElement>(
  selectors: string[],
  timeout = 10000,
  interval = 100
): Promise<T[]> {
  return Promise.all(selectors.map(selector => waitForElement<T>(selector, timeout, interval)))
}
