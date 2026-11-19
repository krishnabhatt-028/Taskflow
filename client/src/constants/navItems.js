import {
  LayoutDashboard,
  Folder,
  CheckSquare,
  LayoutGrid,
  Calendar,
  Users,
  MessageSquare,
  Bell,
  BarChart3,
  Settings,
} from 'lucide-react'

export const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/projects', label: 'My Projects', icon: Folder },
  { path: '/tasks', label: 'My Tasks', icon: CheckSquare },
  { path: '/kanban', label: 'Kanban Board', icon: LayoutGrid },
  { path: '/calendar', label: 'Calendar', icon: Calendar },
  { path: '/team', label: 'Team Members', icon: Users },
  { path: '/messages', label: 'Messages', icon: MessageSquare },
  { path: '/notifications', label: 'Notifications', icon: Bell },
  { path: '/reports', label: 'Reports & Analytics', icon: BarChart3 },
  { path: '/settings', label: 'Settings', icon: Settings },
]