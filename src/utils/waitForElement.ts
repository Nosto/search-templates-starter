export function waitForElement(selector: string): Promise<HTMLElement> {
  const element = document.querySelector<HTMLElement>(selector)
  if (element) {
    return Promise.resolve(element)
  }
  return new Promise(resolve => {
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
