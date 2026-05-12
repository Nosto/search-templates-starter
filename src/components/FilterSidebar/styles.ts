export const styles = {
  close:
    "absolute right-[var(--ns-space-4)] top-[var(--ns-space-4)] block max-w-[var(--ns-width-mobile-close-sidebar)] cursor-pointer items-center border-0 text-right text-[length:var(--ns-font-size-3)]",
  dialog:
    "fixed left-0 top-0 m-0 h-full max-h-full max-w-[var(--ns-width-mobile-sidebar)] animate-dialog-slide-in border-0 p-0 backdrop:animate-fade-in backdrop:bg-black/50",
  content:
    "relative flex h-full w-full min-w-[var(--ns-width-mobile-sidebar)] flex-col overflow-y-auto bg-[var(--ns-color-white)] p-[var(--ns-space-1)]",
  header: "flex items-baseline border-b border-[var(--ns-color-grey-light)] p-[var(--ns-space-4)]",
  facets: "m-0 list-none p-0",
  clearFilters: "mt-auto border-t border-[var(--ns-color-grey-light)] p-[var(--ns-space-4)] text-center"
}
