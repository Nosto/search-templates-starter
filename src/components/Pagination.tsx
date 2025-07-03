import { usePagination, useActions, Page } from "@nosto/search-js/preact/hooks"
import Icon from "./elements/Icon"
import { JSX } from "preact/jsx-runtime"

function PageLink({
  onClick,
  href,
  className,
  ariaLabel,
  children
}: JSX.IntrinsicElements["a"] & { ariaLabel?: string }) {
  return (
    <a
      class={`ns-page-link ns-d-block ns-relative ns-text-undecorated ns-clickable ns-py-2 ns-px-4 ns-color-black ns-border-radius-3 ${className}`}
      href={href}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </a>
  )
}

export default function Pagination() {
  const { prev, first, pages, last, next } = usePagination({
    width: 5
  })

  const { updateSearch } = useActions()

  function pageLinkProps({ from }: Page) {
    return {
      onClick: (e: Event) => {
        e.preventDefault()
        updateSearch({ products: { from } })
        scrollTo(0, 0)
      }
    }
  }

  return (
    <ul class="ns-d-flex ns-flex-wrap ns-justify-content-center ns-list-unstyled ns-m-0 ns-p-0 ns-my-2 ns-mx-0">
      {prev && (
        <li>
          <PageLink {...pageLinkProps(prev)} className="ns-previous" ariaLabel="Previous page">
            <Icon name="arrow" className="ns-page-prev-icon" />
          </PageLink>
        </li>
      )}

      {first && (
        <>
          <li>
            <PageLink {...pageLinkProps(first)} ariaLabel="First page">
              {first.page}
            </PageLink>
          </li>
          <li>
            <span class="ns-d-block ns-py-2 ns-px-4">...</span>
          </li>
        </>
      )}

      {pages.map(page => (
        <li key={page.page} class={`${page.current ? "ns-active ns-color-black ns-background-primary-light" : ""}`}>
          <PageLink ariaLabel={`${page.page} page`} {...pageLinkProps(page)}>
            {page.page}
          </PageLink>
        </li>
      ))}

      {last && (
        <>
          <li>
            <span class="ns-py-2 ns-px-4">...</span>
          </li>
          <li>
            <PageLink {...pageLinkProps(last)} ariaLabel="Last page">
              {last.page}
            </PageLink>
          </li>
        </>
      )}

      {next && (
        <li>
          <PageLink {...pageLinkProps(next)} className="ns-next" ariaLabel="Next page">
            <Icon name="arrow" className="ns-page-next-icon" />
          </PageLink>
        </li>
      )}
    </ul>
  )
}
