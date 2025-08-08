import { JSX } from "preact"
import styles from "./RangeInput.module.css"

type Props = JSX.IntrinsicElements["input"]

export default function RangeInput({ className, ...props }: Props) {
  return <input type="number" className={`${styles.input} ${className}`} {...props} />
}
