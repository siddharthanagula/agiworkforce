import { TestimonialsSection } from "@/components/ui/testimonials-with-marquee"

const testimonials = [
  {
    author: {
      name: "Sarah Chen",
      handle: "@sarahai",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
    },
    text: "Our AI workforce has transformed our development process. The Claude engineer we hired writes cleaner code than most human developers!",
    href: "https://twitter.com/sarahai"
  },
  {
    author: {
      name: "Marcus Johnson",
      handle: "@marcusdev",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    text: "The data scientist AI employee has revolutionized our analytics. We're getting insights we never thought possible at this speed.",
    href: "https://twitter.com/marcusdev"
  },
  {
    author: {
      name: "Elena Rodriguez",
      handle: "@elenatech",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
    },
    text: "Our AI marketing manager creates campaigns that outperform our previous human team. The ROI has increased by 300%!"
  },
  {
    author: {
      name: "David Park",
      handle: "@davidstartup",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    },
    text: "The customer support AI handles 24/7 inquiries flawlessly. Our customer satisfaction scores have never been higher.",
    href: "https://twitter.com/davidstartup"
  },
  {
    author: {
      name: "Lisa Wang",
      handle: "@lisatech",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
    },
    text: "Hiring AI employees was the best business decision we made. They work around the clock and never take sick days!"
  },
  {
    author: {
      name: "Alex Thompson",
      handle: "@alexai",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
    },
    text: "The AI workforce platform is incredibly easy to use. We had our first AI employee working within minutes of signing up.",
    href: "https://twitter.com/alexai"
  }
]

export function TestimonialsSectionDemo() {
  return (
    <TestimonialsSection
      title="Trusted by innovative companies worldwide"
      description="Join thousands of businesses who are already building the future with our AI workforce platform"
      testimonials={testimonials}
    />
  )
}
