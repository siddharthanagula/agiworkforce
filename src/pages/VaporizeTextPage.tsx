import { VaporizeTextAIDemo, VaporizeTextTechDemo } from '@/components/ui/vapour-text-effect-ai-demo'
import { DemoOne } from '@/components/ui/vapour-text-effect-demo'

export default function VaporizeTextPage() {
  return (
    <div className="min-h-screen">
      {/* AI Workforce Demo */}
      <VaporizeTextAIDemo />
      
      {/* Technology Demo */}
      <VaporizeTextTechDemo />
      
      {/* Basic Demo */}
      <DemoOne />
    </div>
  )
}
