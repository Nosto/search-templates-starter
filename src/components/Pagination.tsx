import { usePagination, useActions, Page } from "@nosto/search-js/preact/hooks"
import Icon from "./elements/Icon"
import { JSX } from "preact/jsx-runtime"
import style from "../styles/components/pegination.module.css"
import iconStyles from "../styles/elements/icon.module.css"

function PageLink({
  onClick,
  href,
  className,
  ariaLabel,
  children
}: JSX.IntrinsicElements["a"] & { ariaLabel?: string }) {
  return (
    <a class={`${style.link} ${className}`} href={href} aria-label={ariaLabel} onClick={onClick}>
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
    <ul className={style.container}>
      {prev && (
        <li>
          <PageLink {...pageLinkProps(prev)} ariaLabel="Previous page">
            <Icon name="arrow" className={iconStyles["page-prev-icon"]} />
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
        <li key={page.page} class={`${page.current ? style.active : ""}`}>
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
            <Icon name="arrow" className={iconStyles["page-next-icon"]} />
          </PageLink>
        </li>
      )}
    </ul>
  )
}
