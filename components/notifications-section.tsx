"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Bell, Zap, CheckCircle, AlertCircle, Info, Calendar, Clock } from "lucide-react"

interface NotificationsSectionProps {
  onBack: () => void
}

export function NotificationsSection({ onBack }: NotificationsSectionProps) {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "success",
      title: "Business Registration Approved",
      message: "Your business registration for Tech Solutions Pvt Ltd has been approved.",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "warning",
      title: "Compliance Deadline Approaching",
      message: "GST filing deadline is in 5 days. Don't forget to submit your returns.",
      time: "1 day ago",
      read: false,
    },
    {
      id: 3,
      type: "info",
      title: "New Government Scheme Available",
      message: "PMEGP scheme applications are now open for technology startups.",
      time: "3 days ago",
      read: true,
    },
  ])

  const [calendarSync, setCalendarSync] = useState({
    enabled: false,
    googleCalendar: false,
    outlookCalendar: false,
    appleCalendar: false,
  })

  const handleCalendarSync = (platform: string, enabled: boolean) => {
    setCalendarSync((prev) => ({
      ...prev,
      [platform]: enabled,
      enabled: enabled || prev.googleCalendar || prev.outlookCalendar || prev.appleCalendar,
    }))
    console.log("[v0] Calendar sync updated:", platform, enabled)
  }

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      case "info":
        return <Info className="w-5 h-5 text-blue-600" />
      default:
        return <Bell className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-sans font-bold text-foreground">BizEase</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
              <Bell className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-sans font-bold text-foreground">Notifications</h1>
              <p className="text-muted-foreground">Stay updated with your business progress and important deadlines</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Notifications List */}
            <div className="lg:col-span-2">
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="font-sans">Recent Notifications</CardTitle>
                  <CardDescription>Your latest updates and alerts</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                        notification.read ? "bg-muted/50 border-border" : "bg-card border-primary/20 shadow-sm"
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-sans font-medium text-foreground">{notification.title}</h4>
                            {!notification.read && (
                              <Badge variant="secondary" className="bg-primary/10 text-primary">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">{notification.message}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {notification.time}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Calendar Sync Settings */}
            <div>
              <Card className="border-border mb-6">
                <CardHeader>
                  <CardTitle className="font-sans flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Calendar Sync
                  </CardTitle>
                  <CardDescription>Sync deadlines and appointments with your calendar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="google-calendar" className="font-sans">
                      Google Calendar
                    </Label>
                    <Switch
                      id="google-calendar"
                      checked={calendarSync.googleCalendar}
                      onCheckedChange={(checked) => handleCalendarSync("googleCalendar", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="outlook-calendar" className="font-sans">
                      Outlook Calendar
                    </Label>
                    <Switch
                      id="outlook-calendar"
                      checked={calendarSync.outlookCalendar}
                      onCheckedChange={(checked) => handleCalendarSync("outlookCalendar", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="apple-calendar" className="font-sans">
                      Apple Calendar
                    </Label>
                    <Switch
                      id="apple-calendar"
                      checked={calendarSync.appleCalendar}
                      onCheckedChange={(checked) => handleCalendarSync("appleCalendar", checked)}
                    />
                  </div>
                  {calendarSync.enabled && (
                    <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-green-800">
                        Calendar sync is active. Important deadlines will be automatically added to your calendar.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Notification Types */}
              <Card className="border-border">
                <CardHeader>
                  <CardTitle className="font-sans">Notification Types</CardTitle>
                  <CardDescription>What you'll be notified about</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-sans font-medium">Progress Updates</p>
                      <p className="text-sm text-muted-foreground">Document approvals and status changes</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <AlertCircle className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-sans font-medium">Compliance Alerts</p>
                      <p className="text-sm text-muted-foreground">Deadlines and renewal reminders</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Info className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-sans font-medium">News & Updates</p>
                      <p className="text-sm text-muted-foreground">New schemes and policy changes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
