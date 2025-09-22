import Icon from "../Icon/Icon"
import styles from "./Rating.module.css"

type Props = {
  ratingValue: number
  reviewCount: number
  className?: string
}

export default function Rating({ ratingValue, reviewCount, className }: Props) {
  const maxStars = 5
  const fullStars = Math.floor(ratingValue)
  const hasHalfStar = ratingValue % 1 !== 0

  return (
    <div
      className={`${styles.container} ${className || ""}`}
      aria-label={`${ratingValue} out of ${maxStars} stars, ${reviewCount} reviews`}
    >
      <div className={styles.stars} role="img" aria-hidden="true">
        {Array.from({ length: maxStars }, (_, index) => {
          const starIndex = index + 1
          let starClass = styles.starEmpty

          if (starIndex <= fullStars) {
            starClass = styles.starFilled
          } else if (starIndex === fullStars + 1 && hasHalfStar) {
            starClass = styles.starHalf
          }

          return <Icon key={index} name="star" className={starClass} />
        })}
      </div>
      <span className={styles.reviewCount} aria-hidden="true">
        ({reviewCount})
      </span>
    </div>
  )
}
