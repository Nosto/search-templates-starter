import style from "./Checkbox.module.css"
import { cl } from "@nosto/search-js/utils"

type Props = {
  value: string
  selected: boolean
  onChange: (e: Event) => void
  className?: string
}

/**
 * A styled checkbox input component with a custom label and checkmark.
 * Provides a consistent checkbox appearance across the application with accessible labeling.
 *
 * @param value - The display text for the checkbox label
 * @param selected - Whether the checkbox is currently checked
 * @param onChange - Callback function triggered when the checkbox state changes
 * @param className - Additional CSS classes to apply to the checkbox wrapper
 * @returns A labeled checkbox element with custom styling
 */
export default function Checkbox({ value, selected, onChange, className }: Props) {
  return (
    <label className={cl(style.checkbox, className)}>
      {value}
      <input type="checkbox" checked={selected} onChange={onChange} />
      <span className={style.checkmark} />
    </label>
  )
}
