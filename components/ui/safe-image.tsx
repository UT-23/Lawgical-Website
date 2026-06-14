'use client'
import { useState, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'

interface SafeImageProps extends Omit<ImageProps, 'src'> {
  src: string
  fallbackSrc?: string
}

export function SafeImage({ src, fallbackSrc = '/about-office.png', ...props }: SafeImageProps) {
  const [error, setError] = useState(false)

  // Reset error state if src changes
  useEffect(() => {
    setError(false)
  }, [src])

  return (
    <Image
      src={error ? fallbackSrc : src}
      onError={() => setError(true)}
      {...props}
    />
  )
}
