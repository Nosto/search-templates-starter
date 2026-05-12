const styles = {
  container: "w-full py-[var(--ns-space-2)]",
  track:
    "relative my-[var(--ns-space-4)] h-[6px] cursor-pointer rounded-[var(--ns-border-radius-3)] bg-[var(--ns-color-grey-light)]",
  range: "pointer-events-none absolute h-full rounded-[var(--ns-border-radius-3)] bg-[var(--ns-color-primary)]",
  handle:
    "absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 cursor-grab rounded-full border-[var(--ns-border-width-medium)] border-solid border-[var(--ns-color-primary)] bg-[var(--ns-color-white)] outline-none transition-shadow duration-150 ease-in-out hover:shadow-[var(--ns-box-shadow-slider-handle)] focus:shadow-[var(--ns-box-shadow-slider-handle)]",
  dragging: "cursor-grabbing shadow-[var(--ns-box-shadow-slider-handle)]",
  labels:
    "mt-[var(--ns-space-2)] flex justify-between text-[length:var(--ns-font-size-3)] text-[var(--ns-color-grey-dark)]",
  label: "font-[var(--ns-weight-medium)]"
}

export default styles
