import cl from "@/utils/cl"

type Props = {
  className?: string
}

export default function Loader({ className }: Props = {}) {
  return (
    <div className={cl("flex justify-center items-center w-full h-[300px] absolute z-[1]", className)}>
      <div className="border-8 border-ns-grey-light border-t-ns-primary rounded-full w-[60px] h-[60px] animate-spin" />
    </div>
  )
}
