import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { VideoExpansion, ImageExpansion, VideoExpansionTextBlend, ImageExpansionTextBlend } from '@/components/ui/scroll-expansion-hero-demo'
import { Bot, Image, Video, Palette } from 'lucide-react'

export default function ScrollExpansionPage() {
  const [activeDemo, setActiveDemo] = useState('image')

  const demos = [
    { id: 'image', name: 'Image Expansion', component: ImageExpansion, icon: Image },
    { id: 'video', name: 'Video Expansion', component: VideoExpansion, icon: Video },
    { id: 'image-blend', name: 'Image with Text Blend', component: ImageExpansionTextBlend, icon: Palette },
    { id: 'video-blend', name: 'Video with Text Blend', component: VideoExpansionTextBlend, icon: Bot },
  ]

  const ActiveComponent = demos.find(demo => demo.id === activeDemo)?.component || ImageExpansion

  return (
    <div className="min-h-screen bg-black">
      {/* Navigation */}
      <nav className="border-b border-red-600 bg-black/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white">Scroll Expansion Hero Demo</h1>
          </div>
          <div className="flex gap-2">
            {demos.map((demo) => (
              <Button
                key={demo.id}
                variant={activeDemo === demo.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveDemo(demo.id)}
                className="flex items-center gap-2"
              >
                <demo.icon className="h-4 w-4" />
                {demo.name}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Demo Content */}
      <div className="relative">
        <ActiveComponent />
      </div>
    </div>
  )
}
