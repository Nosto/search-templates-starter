import { JSX } from "preact"
import styles from "./RangeInput.module.css"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface RangeInputProps {}

export default function RangeInput({ className, ...props }: RangeInputProps & JSX.IntrinsicElements["input"]) {
  return <input type="number" className={`${styles.input} ${className}`} {...props} />
}
