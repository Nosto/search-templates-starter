const styles = {
  container:
    "flex cursor-pointer flex-col p-[var(--ns-space-2)] text-inherit no-underline focus:bg-[var(--ns-color-focus)]",
  image: "h-auto w-full object-contain aspect-[var(--ns-aspect-ratio)]",
  details: "pt-[var(--ns-space-2)] text-[length:var(--ns-font-size-4)] text-[var(--ns-color-black)]",
  name: "mb-[var(--ns-space-1)] overflow-hidden text-ellipsis [-webkit-box-orient:vertical] [-webkit-line-clamp:1] [display:-webkit-box] [line-clamp:1]",
  price: "font-bold",
  strikedPrice: "ml-[var(--ns-space-2)] line-through"
}

export default styles
