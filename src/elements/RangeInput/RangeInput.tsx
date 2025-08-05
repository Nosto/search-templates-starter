import { JSX } from "preact"
import styles from "./RangeInput.module.css"

export default function RangeInput({ className, ...props }: JSX.IntrinsicElements["input"]) {
  return <input type="number" className={`${styles.input} ${className}`} {...props} />
}
