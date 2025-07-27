"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

type AvatarProps = React.HTMLAttributes<HTMLDivElement>

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
        className
      )}
      {...props}
    />
  )
)
Avatar.displayName = "Avatar"

type AvatarImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src?: string;
}

const AvatarImage = React.forwardRef<HTMLImageElement, AvatarImageProps>(
  ({ className, alt = "Avatar", width = 40, height = 40, src, ...props }, ref) => {
    if (!src) return null;
    
    return (
      <Image
        ref={ref}
        className={cn("aspect-square h-full w-full", className)}
        alt={alt}
        width={Number(width)}
        height={Number(height)}
        src={src}
        {...props}
      />
    );
  }
)
AvatarImage.displayName = "AvatarImage"

type AvatarFallbackProps = React.HTMLAttributes<HTMLDivElement>

const AvatarFallback = React.forwardRef<HTMLDivElement, AvatarFallbackProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex h-full w-full items-center justify-center rounded-full bg-muted",
        className
      )}
      {...props}
    />
  )
)
AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }