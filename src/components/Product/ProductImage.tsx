import Image from "@/elements/Image/Image"

// to be customized as needed
const imageProps = {
  width: 800,
  aspectRatio: 2 / 3,
  sizes: `(min-width: 1024px) 25vw,
    (min-width: 768px) 33.33vw,
    (min-width: 375px) 50vw,
    100vw`
}

export default function ProductImage({ src, alt }: { src: string; alt?: string }) {
  if (src.includes("cdn.shopify.com")) {
    return <Image src={src} alt={alt} {...imageProps} />
  }
  return <img src={src} alt={alt} />
}
