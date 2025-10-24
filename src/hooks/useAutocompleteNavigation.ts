import { useEffect, useCallback, useState } from "preact/hooks"

type UseAutocompleteNavigationProps = {
  formRef: preact.RefObject<HTMLFormElement>
  isOpen: boolean
  onSubmit: (query: string) => void
  setShowAutocomplete: (show: boolean) => void
}

export function useAutocompleteNavigation({
  formRef,
  isOpen,
  onSubmit,
  setShowAutocomplete
}: UseAutocompleteNavigationProps) {
  const [focusedIndex, setFocusedIndex] = useState<number>(-1)

  const getElements = useCallback(() => {
    if (!formRef.current) return []
    return Array.from(formRef.current.querySelectorAll(".ns-autocomplete-element")) as HTMLElement[]
  }, [formRef])

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" && !isOpen) {
        e.preventDefault()
        setShowAutocomplete(true)
      } else if (!isOpen) {
        return
      }

      const elements = getElements()
      if (elements.length === 0) {
        return
      }

      e.preventDefault()

      if (e.key === "ArrowDown" || e.key === "Tab") {
        const newIndex = (focusedIndex + 1) % elements.length
        setFocusedIndex(newIndex)
      } else if (e.key === "ArrowUp") {
        const newIndex = (focusedIndex - 1 + elements.length) % elements.length
        setFocusedIndex(newIndex)
      } else if (e.key === "Enter") {
        if (focusedIndex >= 0) {
          const element = elements[focusedIndex]
          const query = element.dataset.nostoQuery
          if (query) {
            onSubmit(query)
          } else {
            element.click()
          }
        }
      } else if (e.key === "Escape") {
        setShowAutocomplete(false)
      }
    },
    [isOpen, focusedIndex, getElements, setShowAutocomplete, onSubmit]
  )

  useEffect(() => {
    const elements = getElements()
    if (focusedIndex === elements.length - 1) {
      formRef.current?.querySelector("input")?.focus()
      setShowAutocomplete(false)
      return
    }
    elements.forEach((element, index) => {
      if (index === focusedIndex) {
        element.setAttribute("tabindex", "0")
        element.focus()
      } else {
        element.setAttribute("tabindex", "-1")
      }
    })
  }, [focusedIndex, getElements, formRef])

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
