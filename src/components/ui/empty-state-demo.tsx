import { EmptyState } from "@/components/ui/empty-state"
import { 
  FileText, 
  Link, 
  Files, 
  Search, 
  MessageSquare, 
  Mail, 
  Image,
  FileQuestion,
  Settings,
  Bot,
  Users,
  Zap,
  Brain,
  Code,
  BarChart
} from "lucide-react"

function EmptyStateDefault() {
  return (
    <EmptyState
      title="No Forms Created"
      description="You can create a new template to add in your pages."
      icons={[FileText, Link, Files]}
      action={{
        label: "Create Form",
        onClick: () => console.log("Create form clicked")
      }}
    />
  )
}

function EmptyStateMessages() {
  return (
    <EmptyState
      title="No Messages"
      description="Start a conversation by sending a message."
      icons={[MessageSquare, Mail]}
      action={{
        label: "Send Message",
        onClick: () => console.log("Send message clicked")
      }}
    />
  )
}

function EmptyStateSearch() {
  return (
    <EmptyState
      title="No Results Found"
      description="Try adjusting your search filters."
      icons={[Search, FileQuestion]}
    />
  )
}

function EmptyStateMedia() {
  return (
    <EmptyState
      title="No Images"
      description="Upload images to get started with your gallery."
      icons={[Image]}
      action={{
        label: "Upload Images",
        onClick: () => console.log("Upload clicked")
      }}
    />
  )
}

function EmptyStateSettings() {
  return (
    <EmptyState
      title="No Settings"
      description="Configure your application settings to get started."
      icons={[Settings]}
      action={{
        label: "Configure",
        onClick: () => console.log("Configure clicked")
      }}
    />
  )
}

// AI Workforce specific empty states
function EmptyStateNoEmployees() {
  return (
    <EmptyState
      title="No AI Employees Hired"
      description="Start building your AI workforce by hiring specialized AI employees for your business needs."
      icons={[Bot, Users, Zap]}
      action={{
        label: "Browse AI Employees",
        onClick: () => console.log("Browse employees clicked")
      }}
    />
  )
}

function EmptyStateNoChats() {
  return (
    <EmptyState
      title="No Chat Sessions"
      description="Start a conversation with your AI employees to get work done."
      icons={[MessageSquare, Brain]}
      action={{
        label: "Start Chat",
        onClick: () => console.log("Start chat clicked")
      }}
    />
  )
}

function EmptyStateNoProjects() {
  return (
    <EmptyState
      title="No Projects Created"
      description="Create your first project and assign AI employees to start working."
      icons={[Code, BarChart, Files]}
      action={{
        label: "Create Project",
        onClick: () => console.log("Create project clicked")
      }}
    />
  )
}

function EmptyStateNoData() {
  return (
    <EmptyState
      title="No Data Available"
      description="Your AI employees haven't generated any data yet. Start a task to see results."
      icons={[BarChart]}
      action={{
        label: "Generate Data",
        onClick: () => console.log("Generate data clicked")
      }}
    />
  )
}

export {
  EmptyStateDefault,
  EmptyStateMessages,
  EmptyStateSearch,
  EmptyStateMedia,
  EmptyStateSettings,
  EmptyStateNoEmployees,
  EmptyStateNoChats,
  EmptyStateNoProjects,
  EmptyStateNoData,
}
