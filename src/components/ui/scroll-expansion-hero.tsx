import React from 'react'
import { cn } from '@/lib/utils'

interface ScrollExpansionHeroProps {
  className?: string
  children?: React.ReactNode
}

export function ScrollExpansionHero({ 
  className,
  children 
}: ScrollExpansionHeroProps) {
  return (
    <div className={cn(
      "relative min-h-screen flex items-center justify-center overflow-hidden",
      className
    )}>
      {children}
    </div>
  )
}
