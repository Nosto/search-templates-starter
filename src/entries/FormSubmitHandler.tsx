import { useEventListener } from "@/hooks/useEventListener"
import { useCallback } from "preact/hooks"

type Props = {
  inputElement: HTMLInputElement
  formElement?: HTMLFormElement | null
  onSubmit: (query: string) => void
}

export default function FormSubmitHandler({ inputElement, formElement, onSubmit }: Props) {
  const onSubmitFn = useCallback(
    (e: SubmitEvent) => {
      e.preventDefault()
      const query = inputElement.value.trim()
      if (query) {
        onSubmit(query)
      }
    },
    [onSubmit, inputElement]
  )

  useEventListener({
    target: formElement || inputElement,
    eventName: "submit",
    listener: onSubmitFn
  })

  return null
}
