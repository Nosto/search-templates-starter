export function waitForElement(selector: string): Promise<HTMLElement> {
  return new Promise(resolve => {
    const element = document.querySelector<HTMLElement>(selector)
    if (element) {
      resolve(element)
    }
    const observer = new MutationObserver(() => {
      const element = document.querySelector<HTMLElement>(selector)
      if (element) {
        resolve(element)
        observer.disconnect()
      }
    })
    observer.observe(document.body, { childList: true, subtree: true })
  })
}
