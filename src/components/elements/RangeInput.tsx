import { JSX } from "preact"

export default function RangeInput({ className, ...props }: JSX.IntrinsicElements["input"]) {
  return <input type="number" className={`ns-input-field ns-d-block ${className}`} {...props} />
}
