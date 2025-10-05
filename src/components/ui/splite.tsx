'use client'

import { Suspense, lazy, useState, useEffect } from 'react'

// Lazy load the Spline component only when needed
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  lazy?: boolean // Add option to lazy load
}

export function SplineScene({ scene, className, lazy = true }: SplineSceneProps) {
  const [shouldLoad, setShouldLoad] = useState(!lazy)

  useEffect(() => {
    if (lazy) {
      // Load after a short delay to prioritize other content
      const timer = setTimeout(() => setShouldLoad(true), 100)
      return () => clearTimeout(timer)
    }
    return undefined
  }, [lazy])

  if (!shouldLoad) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 ${className}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-2"></div>
          <p className="text-sm text-gray-400">Loading 3D scene...</p>
        </div>
      </div>
    )
  }

  return (
    <Suspense
      fallback={
        <div className={`w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 ${className}`}>
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500 mx-auto mb-2"></div>
            <p className="text-sm text-gray-400">Loading 3D scene...</p>
          </div>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
      />
    </Suspense>
  )
}
