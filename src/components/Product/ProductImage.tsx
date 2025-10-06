import Image from "@/elements/Image/Image"
import { defaultImageProps } from "./imageProps"

export default function ProductImage({ src, alt }: { src: string; alt?: string }) {
  if (src.includes("cdn.shopify.com")) {
    return <Image src={src} alt={alt} {...defaultImageProps} />
  }
  return <img src={src} alt={alt} />
}
