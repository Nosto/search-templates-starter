const styles = {
  dropdown: "border-b border-[var(--ns-color-grey-light)] md:last:border-b-0",
  active:
    "[&>.ns-facet-menu]:max-h-[var(--ns-facet-max-height)] [&>.ns-facet-menu]:p-[var(--ns-space-4)] [&>.ns-facet-menu]:opacity-100",
  menu: "ns-facet-menu max-h-0 overflow-hidden px-[var(--ns-space-4)] py-0 opacity-0 transition-[max-height,opacity,padding] duration-[var(--ns-transition-duration)] ease-[var(--ns-transition-easing)]",
  anchor:
    "relative inline-block w-full box-border cursor-pointer border-0 bg-transparent p-[var(--ns-space-4)] text-left",
  title: "text-[length:var(--ns-font-size-4)] text-[var(--ns-color-black)]",
  count:
    "ml-[var(--ns-space-1)] inline-block whitespace-nowrap rounded-[var(--ns-border-radius-pill)] bg-[var(--ns-color-primary)] px-[0.35rem] py-[0.1rem] align-baseline text-center text-[length:var(--ns-font-size-3)] font-[var(--ns-weight-bold)] leading-[var(--ns-line-height-tiny)] text-[var(--ns-color-white)]",
  icon: "absolute right-[var(--ns-space-16)] top-1/2 block -translate-y-1/2",
  rangeContainer: "flex flex-col gap-[var(--ns-space-2)] pr-[var(--ns-space-2)]",
  rangeItem: "py-[var(--ns-space-2)]"
}

export default styles
