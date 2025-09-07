import { useActions } from "@nosto/search-js/preact/hooks"
import { useEffect } from "preact/hooks"

type Props = {
  inputElement: HTMLInputElement
  formElement?: HTMLFormElement | null
}

export default function FormSubmitHandler({ inputElement, formElement }: Props) {
  const { newSearch } = useActions()

  useEffect(() => {
    if (inputElement) {
      const handleFormSubmit = (e: SubmitEvent) => {
        e.preventDefault()
        const query = inputElement.value.trim()
        if (query) {
          newSearch({ query })
        }
      }

      if (formElement) {
        formElement.addEventListener("submit", handleFormSubmit)
      } else {
        inputElement.addEventListener("submit", handleFormSubmit)
      }

      return () => {
        if (formElement) {
          formElement.removeEventListener("submit", handleFormSubmit)
        } else {
          inputElement.removeEventListener("submit", handleFormSubmit)
        }
      }
    }
  }, [newSearch, inputElement, formElement])

  return null
}
