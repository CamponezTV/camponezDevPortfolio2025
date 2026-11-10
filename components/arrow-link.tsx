import type { ComponentProps, ReactNode } from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const arrowLinkClass =
  "group inline-flex items-center gap-2 text-sm text-foreground transition-colors hover:text-accent"

function Arrow() {
  return (
    <ArrowRight
      size={16}
      strokeWidth={1.5}
      aria-hidden
      className="shrink-0 text-muted-foreground transition-[transform,color] duration-150 ease-out-soft group-hover:translate-x-0.5 group-hover:text-accent"
    />
  )
}

interface ArrowLinkProps extends ComponentProps<"a"> {
  children: ReactNode
  external?: boolean
}

export function ArrowLink({ children, external, className, ...props }: ArrowLinkProps) {
  return (
    <a
      className={cn(arrowLinkClass, className)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      <Arrow />
      {children}
    </a>
  )
}

interface ArrowButtonProps extends ComponentProps<"button"> {
  children: ReactNode
}

export function ArrowButton({ children, className, type = "button", ...props }: ArrowButtonProps) {
  return (
    <button type={type} className={cn(arrowLinkClass, "cursor-pointer", className)} {...props}>
      <Arrow />
      {children}
    </button>
  )
}
