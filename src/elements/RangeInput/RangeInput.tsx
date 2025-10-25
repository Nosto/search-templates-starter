import { JSX } from "preact"
import styles from "./RangeInput.module.css"
import { cl } from "@nosto/search-js/utils"

type Props = JSX.IntrinsicElements["input"]

/**
 * A styled numeric input component specifically designed for range value entry.
 * Provides consistent styling for number inputs used in range selection contexts.
 *
 * @param className - Additional CSS classes to apply to the input element
 * @param props - All standard HTML input attributes (value, onChange, min, max, etc.)
 * @returns A styled number input element with consistent appearance
 */
export default function RangeInput({ className, ...props }: Props) {
  return <input type="number" className={cl(styles.input, className)} {...props} />
}
