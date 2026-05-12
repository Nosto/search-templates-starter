export const styles = {
  radioButton:
    "relative flex cursor-pointer select-none items-center justify-between text-[var(--ns-color-black)] [&>input]:absolute [&>input]:h-0 [&>input]:w-0 [&>input]:cursor-pointer [&>input]:opacity-0",
  checkmark:
    "relative h-[var(--ns-height-input-checkbox)] w-[var(--ns-height-input-checkbox)] shrink-0 rounded-full bg-[var(--ns-color-grey-light)] [input:checked~&]:bg-[var(--ns-color-primary)] after:absolute after:left-1/2 after:top-1/2 after:hidden after:h-2 after:w-2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-[var(--ns-color-white)] after:content-[''] [input:checked~&]:after:block"
}
