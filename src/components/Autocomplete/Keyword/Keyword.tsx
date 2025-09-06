import style from "./Keyword.module.css"

interface KeywordProps {
  keyword: { keyword: string }
}

export default function Keyword({ keyword }: KeywordProps) {
  return (
    <a href={`?q=${encodeURIComponent(keyword.keyword)}`} className={style.keyword}>
      {keyword.keyword}
    </a>
  )
}
