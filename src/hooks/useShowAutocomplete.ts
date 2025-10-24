import { selectors } from "@/config"
import { useCallback, useState } from "preact/hooks"
import { useDomEvents } from "./useDomEvents"

type Props = {
  searchInput: HTMLInputElement
}

export function useShowAutocomplete({ searchInput }: Props) {
  const [showAutocomplete, setShowAutocomplete] = useState<boolean>(false)
  const dropdownElement = document.querySelector<HTMLElement>(selectors.dropdown)!

  const onClickOutside = useCallback(
    (event: Event) => {
      if (event.target !== searchInput && !dropdownElement.contains(event.target as Node)) {
        setShowAutocomplete(false)
      }
    },
    [searchInput, dropdownElement]
  )

  useDomEvents(showAutocomplete ? document.body : null, {
    onClick: onClickOutside
  })

  return { onClickOutside, showAutocomplete, setShowAutocomplete }
}
