import { usePagination, useActions, Page } from "@nosto/search-js/preact/hooks"
import Icon from "@/elements/Icon/Icon"
import { JSX } from "preact/jsx-runtime"
import cl from "@/utils/cl"

type Props = {
  ariaLabel?: string
} & JSX.IntrinsicElements["a"]

function PageLink({ onClick, href, className, ariaLabel, children }: Props) {
  return (
    <a
      class={cl("block relative no-underline text-ns-black p-ns-2 px-ns-4 rounded-ns-3 cursor-pointer", className)}
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
    <ul className="flex flex-wrap justify-center list-none my-ns-2 p-0">
      {prev && (
        <li>
          <PageLink {...pageLinkProps(prev)} ariaLabel="Previous page">
            <Icon name="arrow-left" />
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
            <span className="block p-ns-2 px-ns-4">...</span>
          </li>
        </>
      )}

      {pages.map(page => (
        <li key={page.page} class={cl(page.current && "bg-ns-primary-light")}>
          <PageLink ariaLabel={`${page.page} page`} {...pageLinkProps(page)}>
            {page.page}
          </PageLink>
        </li>
      ))}

      {last && (
        <>
          <li>
            <span className="block p-ns-2 px-ns-4">...</span>
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
          <PageLink {...pageLinkProps(next)} ariaLabel="Next page">
            <Icon name="arrow-right" />
          </PageLink>
        </li>
      )}
    </ul>
  )
}
