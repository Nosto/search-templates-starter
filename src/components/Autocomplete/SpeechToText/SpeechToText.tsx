import Button from "@/elements/Button/Button"
import { speechToTextSupported, useSpeechToText } from "@nosto/search-js/preact/hooks"

type Props = {
  onSubmit: (input: string) => void
}

export default function SpeechToTextButton({ onSubmit }: Props) {
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
