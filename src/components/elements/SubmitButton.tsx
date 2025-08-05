import styles from "../Autocomplete/Autocomplete.module.css"
import Button from "./Button"

export default function SubmitButton({ className, text }: { className?: string; text?: string }) {
  return (
    <div className={`${styles.submit} ${className}`}>
      <Button name="base">{text}</Button>
    </div>
  )
}
