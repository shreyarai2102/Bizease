"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Home, LayoutDashboard, Gift, Users, Bell, User, Zap } from "lucide-react"

interface FooterNavigationProps {
  activeSection: string
  onNavigate: (section: string) => void
}

export function FooterNavigation({ activeSection, onNavigate }: FooterNavigationProps) {
  const navigationItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      onClick: () => onNavigate("home"),
    },
    {
      id: "questionnaire",
      label: "Dashboard",
      icon: LayoutDashboard,
      onClick: () => onNavigate("questionnaire"),
      badge: "Start",
    },
    {
      id: "government-schemes",
      label: "Govt Schemes",
      icon: Gift,
      onClick: () => onNavigate("government-schemes"),
    },
    {
      id: "community",
      label: "Community",
      icon: Users,
      onClick: () => onNavigate("community"),
      badge: "Soon",
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
      onClick: () => onNavigate("notifications"),
      badge: "Soon",
    },
    {
      id: "profile",
      label: "Profile",
      icon: User,
      onClick: () => onNavigate("profile"),
      badge: "Soon",
    },
  ]

  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          {/* Logo Section */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="hidden sm:block">
              <div className="text-sm font-sans font-bold text-foreground">BizEase</div>
              <div className="text-xs text-muted-foreground">Delhi Portal</div>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-1 sm:gap-2">
            {navigationItems.map((item) => (
              <div key={item.id} className="relative">
                <Button
                  variant={activeSection === item.id ? "default" : "ghost"}
                  size="sm"
                  onClick={item.onClick}
                  className={`flex flex-col items-center gap-1 h-auto py-2 px-2 sm:px-3 font-sans text-xs ${
                    activeSection === item.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden sm:block">{item.label}</span>
                  <span className="sm:hidden text-xs">{item.label.split(" ")[0]}</span>
                </Button>
                {item.badge && (
                  <Badge
                    variant={item.badge === "Soon" ? "secondary" : "default"}
                    className={`absolute -top-1 -right-1 text-xs px-1 py-0 h-4 ${
                      item.badge === "Soon"
                        ? "bg-orange-100 text-orange-800 border-orange-200"
                        : "bg-green-100 text-green-800 border-green-200"
                    }`}
                  >
                    {item.badge}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
