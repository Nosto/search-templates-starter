const styles = {
  container: "relative box-border w-full max-w-full flex-[0_0_100%] p-[var(--ns-space-2)] text-inherit no-underline",
  altContainer: "group",
  image: "relative",
  img: "h-auto w-full aspect-[var(--ns-aspect-ratio)] transition-opacity duration-300 ease-in-out [@supports(selector(::part(img)))]:[&::part(img)]:aspect-[var(--ns-aspect-ratio)]",
  altImg: "absolute left-0 top-0 opacity-0 [@media(hover:hover)_and_(pointer:fine)]:group-hover:opacity-100",
  info: "relative mt-[var(--ns-space-2)] [&>div]:!mb-[var(--ns-space-1)] [&>div]:text-[length:var(--ns-font-size-4)] [&>div]:text-[var(--ns-color-black)]",
  specialPrice: "ml-[var(--ns-space-2)] line-through",
  ribbon:
    "absolute z-[1] bg-[var(--ns-color-white)] p-2 text-center text-[length:var(--ns-font-size-4)] text-[var(--ns-color-black)]",
  saleRibbon:
    "absolute left-2 top-2 z-[1] bg-[var(--ns-color-red)] p-2 text-center text-[length:var(--ns-font-size-4)] text-[var(--ns-color-white)]",
  newRibbon:
    "absolute left-2 top-2 z-[1] bg-[var(--ns-color-white)] p-2 text-center text-[length:var(--ns-font-size-4)] text-[var(--ns-color-black)]",
  quickAdd:
    "absolute bottom-2 left-2 z-[1] block cursor-pointer border-0 bg-[var(--ns-color-white)] p-2 text-center text-[length:var(--ns-font-size-4)] text-[var(--ns-color-black)] [@media(hover:hover)_and_(pointer:fine)]:hidden [@media(hover:hover)_and_(pointer:fine)]:group-hover:block"
}

export default styles
