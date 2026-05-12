import { JSX } from "preact"
import { rangeInputStyles as styles } from "@/styles/classNames"
import { cl } from "@nosto/search-js/utils"

type Props = JSX.IntrinsicElements["input"]

export default function RangeInput({ className, ...props }: Props) {
  return <input type="number" className={cl(styles.input, className)} {...props} />
}
