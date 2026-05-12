export const buttonStyles = {
  button:
    "cursor-pointer select-none rounded-[var(--ns-border-radius-4)] border border-transparent bg-transparent px-[var(--ns-space-2)] py-[var(--ns-space-2)] align-middle font-[inherit] text-[length:var(--ns-font-size-4)] font-[var(--ns-weight-regular)] leading-[var(--ns-line-height-tiny)] text-[var(--ns-color-black)] no-underline transition-[color,background-color,border-color,box-shadow] duration-150 ease-in-out active:shadow-[var(--ns-box-shadow-button)] active:transition-none [&>*:not(:first-child)]:ml-[var(--ns-space-1)]",
  light:
    "rounded-[var(--ns-border-radius-pill)] border-0 bg-[var(--ns-color-grey-light)] text-[var(--ns-color-black)] hover:bg-[var(--ns-color-grey)]"
}

export const checkboxStyles = {
  checkbox:
    "relative block cursor-pointer select-none pl-[var(--ns-space-5)] text-[var(--ns-color-black)] [&>input]:absolute [&>input]:h-0 [&>input]:w-0 [&>input]:cursor-pointer [&>input]:opacity-0",
  checkmark:
    "absolute left-0 top-0 h-[var(--ns-height-input-checkbox)] w-[var(--ns-height-input-checkbox)] rounded-[var(--ns-border-radius-3)] bg-[var(--ns-color-grey-light)] [input:checked~&]:bg-[var(--ns-color-primary)] after:absolute after:left-[var(--ns-space-05)] after:top-[var(--ns-border-width-thin)] after:hidden after:h-[var(--ns-height-input-checkbox-tick)] after:w-[var(--ns-width-input-checkbox-tick)] after:rotate-45 after:border-solid after:border-[var(--ns-color-white)] after:[border-width:0_var(--ns-border-width-medium)_var(--ns-border-width-medium)_0] after:content-[''] [input:checked~&]:after:block"
}

export const contentWrapperStyles = {
  wrapper:
    "mx-auto flex min-h-[var(--ns-min-height-content)] flex-col p-0 font-[var(--ns-font-family)] text-[length:var(--ns-font-size-4)] md:!flex-row",
  container: "box-border block w-full p-0 [position:initial] md:inline-block",
  loading: "relative"
}

export const dualRangeStyles = {
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

export const headingStyles = {
  heading: "my-[var(--ns-space-2)] ml-0 mr-[var(--ns-space-1)] font-bold text-[var(--ns-color-black)]"
}

export const rangeInputStyles = {
  input:
    "box-border block w-full appearance-none rounded-[var(--ns-border-radius-4)] border-0 bg-[var(--ns-color-grey-light)] bg-clip-padding px-[var(--ns-space-2)] py-[var(--ns-space-2)] font-[var(--ns-weight-regular)] leading-[var(--ns-line-height-tiny)] transition-[border-color,box-shadow] duration-150 ease-in-out focus:outline-0 focus:shadow-[inset_0_0_0_var(--ns-border-width-thin)_var(--ns-color-primary-light),0_0_0_var(--ns-shadow-offset-medium)_var(--ns-color-grey)]"
}

export const selectStyles = {
  wrapper: "relative",
  menu: "relative m-0 w-auto cursor-pointer appearance-none overflow-hidden text-ellipsis whitespace-nowrap rounded-[var(--ns-border-radius-pill)] border-0 bg-[var(--ns-color-grey-light)] px-[var(--ns-space-3)] py-[var(--ns-space-2)] text-left font-[inherit] text-[length:var(--ns-font-size-4)] font-[var(--ns-weight-regular)] text-[var(--ns-color-black)] transition-colors duration-200 ease-[ease] hover:bg-[var(--ns-color-grey)] focus:bg-[var(--ns-color-primary-light)] focus:outline-none"
}

export const pillStyles = {
  pill: "mr-[var(--ns-space-1)] my-[var(--ns-space-1)] inline-flex cursor-pointer items-center justify-center rounded-[var(--ns-border-radius-pill)] border-0 bg-[var(--ns-color-grey-light)] px-[var(--ns-space-3)] py-[var(--ns-space-2)] font-[inherit] text-[length:var(--ns-font-size-3)] text-[var(--ns-color-black)] transition-colors duration-200 ease-[ease] hover:bg-[var(--ns-color-black)] hover:text-[var(--ns-color-white)]",
  selected: "bg-[var(--ns-color-black)] text-[var(--ns-color-white)]",
  secondary:
    "ml-1 inline-block text-[length:var(--ns-font-size-2)] text-[var(--ns-color-grey-dark)] group-hover:text-[var(--ns-color-grey)]",
  selectedSecondary: "text-[var(--ns-color-grey)]"
}

export const radioButtonStyles = {
  radioButton:
    "relative flex cursor-pointer select-none items-center justify-between text-[var(--ns-color-black)] [&>input]:absolute [&>input]:h-0 [&>input]:w-0 [&>input]:cursor-pointer [&>input]:opacity-0",
  checkmark:
    "relative h-[var(--ns-height-input-checkbox)] w-[var(--ns-height-input-checkbox)] shrink-0 rounded-full bg-[var(--ns-color-grey-light)] [input:checked~&]:bg-[var(--ns-color-primary)] after:absolute after:left-1/2 after:top-1/2 after:hidden after:h-2 after:w-2 after:-translate-x-1/2 after:-translate-y-1/2 after:rounded-full after:bg-[var(--ns-color-white)] after:content-[''] [input:checked~&]:after:block"
}

export const bottomToolbarStyles = {
  wrapper: "my-[var(--ns-space-4)]",
  container:
    "my-[var(--ns-space-2)] flex w-full box-border flex-nowrap items-center justify-center gap-[var(--ns-space-3)] p-[var(--ns-space-2)] text-[var(--ns-color-black)] min-[375px]:relative min-[375px]:justify-center min-[375px]:[&>:not(:first-child):last-child]:absolute min-[375px]:[&>:not(:first-child):last-child]:right-0"
}

export const toolbarStyles = {
  badge:
    "ml-[var(--ns-space-1)] inline-block rounded-[var(--ns-border-radius-pill)] bg-[var(--ns-color-primary)] px-[0.35rem] py-[0.1rem] text-center text-[length:var(--ns-font-size-3)] font-[var(--ns-weight-bold)] text-[var(--ns-color-white)]",
  label: "flex items-center justify-center gap-[var(--ns-space-2)]",
  container:
    "z-[var(--ns-header-control)] flex flex-row flex-wrap items-center justify-between px-[var(--ns-space-2)] pb-[var(--ns-space-1)] pt-0",
  total: "inline-block text-center text-[var(--ns-color-black)]",
  filter: "flex items-center",
  leftSide: "flex items-center",
  rightSide: "mb-0 flex w-auto flex-wrap items-center justify-end gap-[var(--ns-space-3)]",
  sortMenu: "min-w-0"
}

export const productGridStyles = {
  container:
    "grid grid-cols-1 transition-opacity duration-300 ease-[ease] min-[375px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  loading: "opacity-30"
}

export const productStyles = {
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

export const skeletonStyles = {
  skeleton: "pointer-events-none",
  text: "animate-shimmer rounded-[var(--ns-border-radius-3)] bg-[linear-gradient(90deg,#f0f0f0_25%,#e0e0e0_50%,#f0f0f0_75%)] bg-[length:200%_100%] text-transparent"
}

export const paginationStyles = {
  container: "my-[var(--ns-space-2)] flex list-none flex-wrap justify-center p-0",
  filler: "block px-[var(--ns-space-4)] py-[var(--ns-space-2)]",
  active: "bg-[var(--ns-color-primary-light)]",
  link: "relative block cursor-pointer rounded-[var(--ns-border-radius-3)] px-[var(--ns-space-4)] py-[var(--ns-space-2)] text-[var(--ns-color-black)] no-underline"
}

export const autocompleteResultsStyles = {
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

export const autocompleteHistoryStyles = {
  historyColumn:
    "flex min-w-[150px] flex-col border-r border-[var(--ns-color-grey-light)] p-[var(--ns-space-1)] max-md:min-w-0 max-md:border-b max-md:border-r-0"
}

export const autocompleteItemStyles = {
  item: "cursor-pointer rounded-[var(--ns-border-radius-3)] px-[var(--ns-space-2)] py-[var(--ns-space-1)] text-inherit no-underline transition-colors duration-200 ease-[ease] hover:bg-[var(--ns-color-focus)] focus:bg-[var(--ns-color-focus)]"
}

export const autocompleteProductStyles = {
  container:
    "flex cursor-pointer flex-col p-[var(--ns-space-2)] text-inherit no-underline focus:bg-[var(--ns-color-focus)]",
  image: "h-auto w-full object-contain aspect-[var(--ns-aspect-ratio)]",
  details: "pt-[var(--ns-space-2)] text-[length:var(--ns-font-size-4)] text-[var(--ns-color-black)]",
  name: "mb-[var(--ns-space-1)] overflow-hidden text-ellipsis [-webkit-box-orient:vertical] [-webkit-line-clamp:1] [display:-webkit-box] [line-clamp:1]",
  price: "font-bold",
  strikedPrice: "ml-[var(--ns-space-2)] line-through"
}

export const autocompleteHistoryItemStyles = {
  container:
    "flex min-h-[1.5em] cursor-pointer items-center gap-[10px] rounded-[6px] px-2 py-1 text-inherit no-underline hover:bg-[var(--ns-color-focus)] focus:bg-[var(--ns-color-focus)]",
  name: "overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-medium leading-[1.2] text-[#1f2937]"
}

export const noResultsStyles = {
  container: "my-[var(--ns-space-5)] text-[length:var(--ns-font-size-4)]"
}

export const filterSidebarStyles = {
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

export const termsFacetStyles = {
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

export const rangeFacetStyles = {
  dropdown: "border-b border-[var(--ns-color-grey-light)] md:last:border-b-0",
  active:
    "[&>.ns-facet-menu]:max-h-[var(--ns-facet-max-height)] [&>.ns-facet-menu]:p-[var(--ns-space-4)] [&>.ns-facet-menu]:opacity-100",
  menu: "ns-facet-menu max-h-0 overflow-hidden px-[var(--ns-space-4)] py-0 opacity-0 transition-[max-height,opacity,padding] duration-[var(--ns-transition-duration)] ease-[var(--ns-transition-easing)]",
  anchor:
    "relative inline-block w-full box-border cursor-pointer border-0 bg-transparent p-[var(--ns-space-4)] text-left",
  title: "text-[length:var(--ns-font-size-4)] text-[var(--ns-color-black)]",
  count:
    "ml-[var(--ns-space-1)] inline-block whitespace-nowrap rounded-[var(--ns-border-radius-pill)] bg-[var(--ns-color-primary)] px-[0.35rem] py-[0.1rem] align-baseline text-center text-[length:var(--ns-font-size-3)] font-[var(--ns-weight-bold)] leading-[var(--ns-line-height-tiny)] text-[var(--ns-color-white)]",
  icon: "absolute right-[var(--ns-space-16)] top-1/2 block -translate-y-1/2"
}

export const rangeSelectorStyles = {
  ...rangeFacetStyles,
  rangeContainer: "flex flex-col gap-[var(--ns-space-2)] pr-[var(--ns-space-2)]",
  rangeItem: "py-[var(--ns-space-2)]"
}

export const filterTopbarStyles = {
  bar: "flex flex-wrap items-center gap-[var(--ns-space-2)] border-b border-[var(--ns-color-grey-light)] py-[var(--ns-space-2)] max-md:flex-col max-md:items-stretch max-md:gap-[var(--ns-space-1)]"
}

export const filterTriggerStyles = {
  trigger:
    "flex cursor-pointer items-center justify-between gap-[var(--ns-space-2)] rounded-[var(--ns-border-radius-3)] border-0 bg-[var(--ns-color-white)] px-[var(--ns-space-3)] py-[var(--ns-space-2)] text-[length:var(--ns-font-size-4)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--ns-color-primary,#1976d2)]"
}

export const rangeDropdownStyles = {
  dropdown: "relative inline-block",
  menu: "absolute left-0 top-full z-[1000] mt-[var(--ns-space-1)] min-w-[300px] overflow-hidden rounded-[var(--ns-border-radius-3)] border-0 bg-[var(--ns-color-white)] shadow-[0_4px_12px_rgb(0_0_0_/_0.15)] max-md:right-0 max-md:min-w-[280px]",
  inputs: "flex items-center gap-[var(--ns-space-3)] p-[var(--ns-space-4)]",
  inputGroup: "flex flex-1 items-center gap-[var(--ns-space-2)]",
  inputLabel: "text-[length:var(--ns-font-size-4)] font-[var(--ns-weight-medium)] text-[var(--ns-color-black)]",
  input:
    "flex-1 rounded-[var(--ns-border-radius-3)] border-0 p-[var(--ns-space-3)] text-[length:var(--ns-font-size-4)]",
  actions: "border-t-0 bg-[var(--ns-color-grey-light)] px-[var(--ns-space-4)] py-[var(--ns-space-3)]"
}

export const termsDropdownStyles = {
  dropdown: "relative inline-block",
  menu: "absolute left-0 top-full z-[1000] mt-[var(--ns-space-1)] min-w-[280px] max-w-[400px] overflow-hidden rounded-[var(--ns-border-radius-3)] border-0 bg-[var(--ns-color-white)] shadow-[0_4px_12px_rgb(0_0_0_/_0.15)] max-md:right-0 max-md:min-w-[320px]",
  options: "max-h-[300px] overflow-y-auto py-[var(--ns-space-2)]",
  option: "cursor-pointer px-[var(--ns-space-4)] py-[var(--ns-space-1)]"
}

export const quickAddModalStyles = {
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

export const simpleSelectorStyles = {
  simpleSelector: "mt-[var(--ns-space-4)] flex flex-wrap gap-[var(--ns-space-2)]",
  simpleOption:
    "mb-[var(--ns-space-4)] inline-block cursor-pointer border-[var(--ns-color-grey)] bg-[var(--ns-color-grey-light)] p-[var(--ns-space-2)] [&_input]:hidden",
  active: "border-[var(--ns-color-black)] bg-[var(--ns-color-black)] text-[var(--ns-color-white)]"
}

export const selectedFiltersStyles = {
  wrapper: "flex flex-wrap items-center p-[var(--ns-space-2)]",
  container: "relative flex w-full max-w-[83.333333%] flex-[0_0_83.333333%] flex-wrap items-center"
}

export const searchStyles = {
  wrapper: "flex w-full justify-center gap-1"
}
