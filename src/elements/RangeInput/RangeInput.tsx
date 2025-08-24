import { JSX } from "preact"
import styles from "./RangeInput.module.css"
import cl from "@/utils/cl"

type Props = JSX.IntrinsicElements["input"] & {
  type?: "number" | "range"
}

export default function RangeInput({ className, type = "number", ...props }: Props) {
  return <input type={type} className={cl(styles.input, className)} {...props} />
}
