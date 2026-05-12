const styles = {
  modal:
    "fixed left-1/2 top-1/2 m-0 hidden max-h-[90vh] w-[90%] max-w-[800px] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-none border-0 bg-white p-0 transition-opacity duration-[5s] ease-[ease] open:flex open:animate-fade-in backdrop:open:animate-fade-in backdrop:open:bg-black/50",
  content: "flex-1 overflow-y-auto p-4",
  columns: "grid grid-cols-2 gap-4 max-[800px]:grid-cols-[1fr_2fr]",
  leftColumn: "flex-[0_0_auto]",
  rightColumn: "flex flex-1 flex-col gap-4",
  image: "block h-auto w-full rounded",
  addToCartButton:
    "cursor-pointer rounded-[6px] border-0 bg-[var(--ns-color-black)] px-6 py-3 font-semibold text-white transition-colors duration-200 hover:enabled:bg-[var(--ns-color-grey-dark)] disabled:cursor-not-allowed disabled:bg-[#d1d5db]",
  close: "absolute right-1 top-1",
  listPrice: "ml-[var(--ns-space-2)] line-through",
  description: "max-[800px]:hidden"
}

export default styles
