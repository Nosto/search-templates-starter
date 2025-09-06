import style from "./Keyword.module.css"

interface KeywordProps {
  keywords: Array<{ keyword: string }>
}

export default function Keyword({ keywords }: KeywordProps) {
  if (!keywords?.length) {
    return null
  }

  return (
    <div className={style.keywords}>
      {keywords.map((keyword, index) => (
        <a key={index} href={`?q=${encodeURIComponent(keyword.keyword)}`} className={style.keyword}>
          {keyword.keyword}
        </a>
      ))}
    </div>
  )
}
