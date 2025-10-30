import Button from "@/elements/Button/Button"
import { speechToTextSupported, useSpeechToText } from "@nosto/search-js/preact/hooks"
import { useAutocompleteContext } from "@/contexts/AutocompleteContext"

export default function SpeechToTextButton() {
  const { onSubmit } = useAutocompleteContext()
  const { startListening, listening, stopListening } = useSpeechToText({
    interimResults: true,
    onResult: onSubmit
  })

  if (!speechToTextSupported) {
    return null
  }

  return (
    <Button
      aria-label={listening ? "Stop voice search" : "Start voice search"}
      onClick={() => {
        if (listening) {
          stopListening()
        } else {
          startListening()
        }
      }}
    >
      🎤︎︎
    </Button>
  )
}
