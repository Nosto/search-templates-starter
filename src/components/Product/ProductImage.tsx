import Image from "@/elements/Image/Image"
import { imageProps } from "./imageProps"

type Props = {
  src: string
  alt?: string
  className?: string
}

export default function ProductImage(props: Props) {
  if (props.src.includes("cdn.shopify.com")) {
    return <Image {...props} {...imageProps} />
  }
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img {...props} />
}
