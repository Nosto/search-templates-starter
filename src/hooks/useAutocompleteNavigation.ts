import { useEffect, useCallback, useState } from "preact/hooks"

type UseAutocompleteNavigationProps = {
  formRef: preact.RefObject<HTMLFormElement>
  isOpen: boolean
  onClose: () => void
  onSubmit: (query: string) => void
}

export function useAutocompleteNavigation({ formRef, isOpen, onClose, onSubmit }: UseAutocompleteNavigationProps) {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1)

  const getElements = useCallback(() => {
    if (!formRef.current) return []
    return Array.from(formRef.current.querySelectorAll(".ns-autocomplete-element")) as HTMLElement[]
  }, [formRef])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
                console.log("Something")
      if (!isOpen) return

      const elements = getElements()
      if (elements.length === 0) return
        console.log("elements", elements)
      if (e.key === "ArrowDown") {
        e.preventDefault()
        const newIndex = (focusedIndex + 1) % elements.length
        setFocusedIndex(newIndex)
      } else if (e.key === "ArrowUp") {
        e.preventDefault()
        const newIndex = (focusedIndex - 1 + elements.length) % elements.length
        setFocusedIndex(newIndex)
      } else if (e.key === "Tab") {
        onClose()
      } else if (e.key === "Enter") {
        if (focusedIndex >= 0) {
          e.preventDefault()
          const element = elements[focusedIndex]
          const query = element.dataset.nostoQuery
          if (query) {
            onSubmit(query)
          } else {
            element.click()
          }
        }
      } else if (e.key === "Escape") {
        onClose()
      }
    },
    [isOpen, focusedIndex, getElements, onClose, onSubmit]
  )

  useEffect(() => {
    const elements = getElements()
    elements.forEach((element, index) => {
      if (index === focusedIndex) {
        element.setAttribute("tabindex", "0")
        element.focus()
      } else {
        element.setAttribute("tabindex", "-1")
      }
    })
  }, [focusedIndex, getElements])

  useEffect(() => {
    if (!isOpen) {
      setFocusedIndex(-1)
      const elements = getElements()
      elements.forEach(element => {
        element.setAttribute("tabindex", "-1")
      })
    }
  }, [isOpen, getElements])

  useEffect(() => {
    const form = formRef.current
    if (form) {
      form.addEventListener("keydown", handleKeyDown)
      return () => form.removeEventListener("keydown", handleKeyDown)
    }
  }, [handleKeyDown])
}