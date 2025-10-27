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
  return <img {...props} alt={props.alt || ""} />
}
