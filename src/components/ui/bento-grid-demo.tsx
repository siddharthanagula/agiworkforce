import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
} from "@radix-ui/react-icons";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
  {
    Icon: FileTextIcon,
    name: "AI Code Generation",
    description: "Generate production-ready code with AI employees specialized in different programming languages and frameworks.",
    href: "/marketplace",
    cta: "Hire Developer",
    background: (
      <img 
        src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop&crop=center" 
        alt="Code generation"
        className="absolute -right-20 -top-20 opacity-60 rounded-lg"
      />
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: InputIcon,
    name: "Smart Search & Analysis",
    description: "AI employees can search through your data, analyze patterns, and provide intelligent insights instantly.",
    href: "/marketplace",
    cta: "Hire Analyst",
    background: (
      <img 
        src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop&crop=center" 
        alt="Data analysis"
        className="absolute -right-20 -top-20 opacity-60 rounded-lg"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: GlobeIcon,
    name: "Multilingual Support",
    description: "AI employees fluent in 100+ languages for global communication and content creation.",
    href: "/marketplace",
    cta: "Hire Translator",
    background: (
      <img 
        src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop&crop=center" 
        alt="Global communication"
        className="absolute -right-20 -top-20 opacity-60 rounded-lg"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: CalendarIcon,
    name: "Project Management",
    description: "AI project managers that can schedule, coordinate, and track progress across multiple teams.",
    href: "/marketplace",
    cta: "Hire Manager",
    background: (
      <img 
        src="https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop&crop=center" 
        alt="Project management"
        className="absolute -right-20 -top-20 opacity-60 rounded-lg"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: BellIcon,
    name: "24/7 Notifications",
    description: "Get real-time updates when AI employees complete tasks, need input, or discover important insights.",
    href: "/marketplace",
    cta: "Hire Assistant",
    background: (
      <img 
        src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop&crop=center" 
        alt="Notifications"
        className="absolute -right-20 -top-20 opacity-60 rounded-lg"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

function BentoDemo() {
  return (
    <BentoGrid className="lg:grid-rows-3">
      {features.map((feature) => (
        <BentoCard key={feature.name} {...feature} />
      ))}
    </BentoGrid>
  );
}

export { BentoDemo };
