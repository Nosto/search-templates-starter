export const styles = {
  dropdown: "border-b border-[var(--ns-color-grey-light)] md:last:border-b-0",
  active: "[&>.ns-facet-menu]:max-h-[var(--ns-facet-max-height)] [&>.ns-facet-menu]:opacity-100",
  menu: "ns-facet-menu max-h-0 overflow-hidden opacity-0 transition-[max-height,opacity] duration-[var(--ns-transition-duration)] ease-[var(--ns-transition-easing)]",
  anchor:
    "relative inline-block w-full box-border cursor-pointer border-0 bg-transparent p-[var(--ns-space-4)] text-left font-[inherit]",
  title: "text-[length:var(--ns-font-size-4)] text-[var(--ns-color-black)]",
  count:
    "inline-block whitespace-nowrap align-baseline text-center text-[length:var(--ns-font-size-3)] font-[var(--ns-weight-bold)] leading-[var(--ns-line-height-tiny)]",
  anchorCount:
    "ml-[var(--ns-space-1)] rounded-[var(--ns-border-radius-pill)] bg-[var(--ns-color-primary)] px-[0.35rem] py-[0.1rem] text-[var(--ns-color-white)]",
  menuCount:
    "rounded-[var(--ns-border-radius-3)] bg-[var(--ns-color-grey-light)] px-[var(--ns-space-1)] py-[var(--ns-space-1)] text-[var(--ns-color-black)]",
  icon: "absolute right-[var(--ns-space-16)] top-1/2 block -translate-y-1/2",
  pillContainer: "p-[var(--ns-space-2)]"
}
