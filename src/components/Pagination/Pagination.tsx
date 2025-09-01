import { usePagination, useActions, Page } from "@nosto/search-js/preact/hooks"
import Icon from "@/elements/Icon/Icon"
import { JSX } from "preact/jsx-runtime"
import style from "./Pagination.module.css"
import cl from "@/utils/cl"
import { generatePageUrl } from "@/utils/url"

type Props = {
  ariaLabel?: string
} & JSX.IntrinsicElements["a"]

function PageLink({ onClick, href, className, ariaLabel, children }: Props) {
  return (
    <a className={cl(style.link, className)} href={href} aria-label={ariaLabel} onClick={onClick}>
      {children}
    </a>
  )
}

export default function Pagination() {
  const { prev, first, pages, last, next } = usePagination({
    width: 5
  })

  const { updateSearch } = useActions()

  function pageLinkProps({ from, page }: Page) {
    return {
      href: generatePageUrl(page),
      onClick: (e: Event) => {
        e.preventDefault()
        updateSearch({ products: { from } })
        scrollTo(0, 0)
      }
    }
  }

  return (
    <ul className={style.container}>
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
            <span className={style.filler}>...</span>
          </li>
        </>
      )}

      {pages.map(page => (
        <li key={page.page} className={cl(page.current && style.active)}>
          <PageLink ariaLabel={`${page.page} page`} {...pageLinkProps(page)}>
            {page.page}
          </PageLink>
        </li>
      ))}

      {last && (
        <>
          <li>
            <span className={style.filler}>...</span>
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
