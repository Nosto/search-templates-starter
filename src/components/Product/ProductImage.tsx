import Image from "@/elements/Image/Image"
import { productImageProps } from "@/constants/imageSizing"

export default function ProductImage({ src, alt }: { src: string; alt?: string }) {
  if (src.includes("cdn.shopify.com")) {
    return <Image src={src} alt={alt} {...productImageProps} />
  }
  return <img src={src} alt={alt} />
}
