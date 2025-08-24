import { JSX } from "preact"
import styles from "./RangeInput.module.css"
import cl from "@/utils/cl"

type Props = JSX.IntrinsicElements["input"]

export default function RangeInput({ className, ...props }: Props) {
  return <input type="range" className={cl(styles.input, className)} {...props} />
}
