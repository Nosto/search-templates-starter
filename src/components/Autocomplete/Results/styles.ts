const styles = {
  autocomplete:
    "absolute left-0 right-0 z-[var(--ns-z-index-autocomplete)] mx-auto box-border flex w-[calc(100%_-_var(--ns-width-autocomplete-offset))] max-w-[var(--ns-max-width-autocomplete)] flex-col items-start rounded-[var(--ns-border-radius-3)] border border-[var(--ns-color-grey-light)] bg-[var(--ns-color-white)] font-[var(--ns-font-family)] text-[length:var(--ns-font-size-4)] shadow-[var(--ns-box-shadow-autocomplete)] md:w-auto",
  container: "mt-auto w-full",
  paddingContainer: "p-[var(--ns-space-1)]",
  section: "flex flex-row max-md:grid max-md:grid-cols-2",
  items: "flex flex-row max-md:flex-col",
  suggestionsColumn:
    "flex min-w-[150px] flex-col border-r border-[var(--ns-color-grey-light)] p-[var(--ns-space-1)] max-md:min-w-0 max-md:border-b max-md:border-r-0",
  productsColumn: "flex grow flex-col p-[var(--ns-space-1)]",
  keywords: "flex flex-col",
  products:
    "mb-[var(--ns-space-2)] grid grid-cols-2 grid-rows-2 gap-[var(--ns-space-2)] [&>:nth-child(n+5)]:hidden md:grid-cols-4 md:grid-rows-none min-[1201px]:grid-cols-5 min-[1201px]:[&>:nth-child(n+5)]:block",
  button: "flex justify-center rounded-none border-t border-[var(--ns-color-grey-light)]",
  submit: "w-full rounded-none text-center"
}

export default styles
