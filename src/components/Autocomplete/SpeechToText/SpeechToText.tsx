import Button from "@/elements/Button/Button"
import { speechToTextSupported, useActions, useSpeechToText } from "@nosto/search-js/preact/hooks"

export function SpeechToTextButton() {
  const { newSearch } = useActions()
  const { startListening, listening, stopListening } = useSpeechToText({
    interimResults: true,
    onResult: value => {
      newSearch({
        query: value
      })
    }
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
