export function renderRatingStars(ratingValue: number): string {
  const maxStars = 5
  const fullStars = Math.floor(ratingValue)
  const hasHalfStar = ratingValue % 1 !== 0

  // Create filled stars using repeat
  const filledStars = "★".repeat(fullStars)

  // Add half star if needed
  const halfStar = hasHalfStar && fullStars < maxStars ? "☆" : ""

  // Fill remaining with empty stars using repeat
  const remainingStars = maxStars - fullStars - (hasHalfStar ? 1 : 0)
  const emptyStars = "☆".repeat(remainingStars)

  return filledStars + halfStar + emptyStars
}
