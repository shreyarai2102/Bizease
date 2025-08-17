"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Zap,
  CheckCircle2,
  Bell,
  Calendar,
  Download,
  ExternalLink,
  MessageCircle,
  Users,
  CreditCard,
  Clock,
  Gift,
  Building2,
  Star,
  Crown,
  ArrowRight,
  RefreshCw,
  Upload,
  X,
  Lock,
  AlertTriangle,
  TrendingUp,
  Home,
} from "lucide-react"

interface BusinessData {
  businessName: string
  ownerName: string
  email: string
  phone: string
  businessType: string
  industry: string
  location: string
  employees: string
  description: string
  businessId?: string
  isSubscribed?: boolean
  hasECard?: boolean
  eCardExpiry?: string
}

interface UserProgress {
  hasCompletedQuestionnaire: boolean
  hasGeneratedChecklist: boolean
  checklistProgress: number
  hasECard: boolean
  isVerified: boolean
  activationLevel: "basic" | "questionnaire" | "checklist" | "verified"
}

interface DashboardProps {
  businessData: BusinessData
  userProgress: UserProgress
  onNavigate: (section: string) => void
  onProgressUpdate?: (progress: number) => void
}

interface ChecklistItem {
  id: string
  title: string
  description: string
  category: string
  status: "pending" | "in-progress" | "completed" | "expired"
  deadline?: string
  renewalLink?: string
  priority: "high" | "medium" | "low"
}

interface Notification {
  id: string
  type: "renewal" | "missing" | "deadline" | "success"
  title: string
  message: string
  deadline?: string
  actionLabel?: string
  actionType?: "renew" | "upload" | "remind"
}

interface GovernmentScheme {
  id: string
  title: string
  description: string
  category: string
  benefits: string[]
  eligibility: string[]
  amount?: string
  link: string
}

export function BizEaseDashboard({ businessData, userProgress, onNavigate, onProgressUpdate }: DashboardProps) {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [schemes, setSchemes] = useState<GovernmentScheme[]>([])
  const [chatOpen, setChatOpen] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [loading, setLoading] = useState(true)

  // Mock data generation
  useEffect(() => {
    const generateMockData = () => {
      // Generate checklist items
      const mockChecklist: ChecklistItem[] = [
        {
          id: "1",
          title: "GST Registration",
          description: "Goods and Services Tax registration",
          category: "Tax Registration",
          status: "completed",
          priority: "high",
        },
        {
          id: "2",
          title: "Trade License",
          description: "Municipal trade license renewal due",
          category: "Local License",
          status: "pending",
          deadline: "2024-03-15",
          renewalLink: "https://delhioss.delhi.gov.in/",
          priority: "high",
        },
        {
          id: "3",
          title: "FSSAI License",
          description: "Food Safety and Standards Authority license",
          category: "Industry License",
          status: "in-progress",
          deadline: "2024-04-20",
          priority: "medium",
        },
        {
          id: "4",
          title: "PAN Card",
          description: "Permanent Account Number verification",
          category: "Basic Documents",
          status: "completed",
          priority: "high",
        },
        {
          id: "5",
          title: "Shop & Establishment License",
          description: "State labor department registration",
          category: "Local License",
          status: "expired",
          deadline: "2024-01-30",
          renewalLink: "https://labour.delhi.gov.in/",
          priority: "high",
        },
      ]

      // Generate notifications
      const mockNotifications: Notification[] = [
        {
          id: "1",
          type: "renewal",
          title: "Trade License Renewal Due",
          message: "Your trade license expires in 15 days. Renew now to avoid penalties.",
          deadline: "2024-03-15",
          actionLabel: "Renew Now",
          actionType: "renew",
        },
        {
          id: "2",
          type: "missing",
          title: "Missing Document",
          message: "Upload your updated bank statement for GST compliance.",
          actionLabel: "Upload Now",
          actionType: "upload",
        },
        {
          id: "3",
          type: "deadline",
          title: "FSSAI License Application",
          message: "Complete your FSSAI license application within 30 days.",
          deadline: "2024-04-20",
          actionLabel: "Complete Application",
          actionType: "renew",
        },
        {
          id: "4",
          type: "success",
          title: "GST Registration Completed",
          message: "Your GST registration has been successfully processed.",
        },
      ]

      // Generate government schemes
      const mockSchemes: GovernmentScheme[] = [
        {
          id: "1",
          title: "MSME Registration Benefits",
          description: "Get collateral-free loans and priority sector lending",
          category: "MSME",
          benefits: ["Collateral-free loans up to ₹2 crore", "Lower interest rates", "Government tender preferences"],
          eligibility: ["Investment up to ₹50 crore", "Annual turnover up to ₹250 crore"],
          link: "https://udyamregistration.gov.in/",
        },
        {
          id: "2",
          title: "Startup India Tax Benefits",
          description: "100% tax deduction for eligible startups",
          category: "Startup",
          benefits: ["100% tax deduction for 3 years", "Fast-track patent examination", "Self-certification"],
          eligibility: ["Company incorporated within 10 years", "Annual turnover less than ₹100 crore"],
          amount: "100% tax exemption",
          link: "https://www.startupindia.gov.in/",
        },
        {
          id: "3",
          title: "PMEGP Subsidy Scheme",
          description: "Credit-linked subsidy for employment generation",
          category: "Subsidy",
          benefits: ["15-35% subsidy on project cost", "Easy loan approval", "Single window clearance"],
          eligibility: ["Age 18+ years", "Class VIII pass minimum"],
          amount: "Up to ₹15 lakh subsidy",
          link: "https://www.kviconline.gov.in/pmegpeportal/",
        },
      ]

      setChecklist(mockChecklist)
      setNotifications(mockNotifications)
      setSchemes(mockSchemes)
      setLoading(false)
    }

    setTimeout(generateMockData, 1000)
  }, [])

  const completedItems = checklist.filter((item) => item.status === "completed").length
  const totalItems = checklist.length
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0

  useEffect(() => {
    if (onProgressUpdate) {
      onProgressUpdate(progress)
    }
  }, [progress]) // Removed onProgressUpdate from dependency array to prevent infinite loop

  const handleNotificationAction = (notification: Notification) => {
    if (notification.actionType === "renew" && notification.deadline) {
      // Add to calendar
      const event = {
        title: notification.title,
        start: new Date(notification.deadline),
        description: notification.message,
      }
      console.log("[v0] Adding to calendar:", event)
    }

    // Remove notification after action
    setNotifications((prev) => prev.filter((n) => n.id !== notification.id))
  }

  const handleChatSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatMessage.trim()) return

    console.log("[v0] Chat message:", chatMessage)

    // Mock AI response
    setTimeout(() => {
      console.log(
        "[v0] AI Response: I can help you with business registration, document requirements, and government schemes. What specific information do you need?",
      )
    }, 1000)

    setChatMessage("")
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100"
      case "in-progress":
        return "text-yellow-600 bg-yellow-100"
      case "expired":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "renewal":
        return <RefreshCw className="w-5 h-5 text-orange-600" />
      case "missing":
        return <Upload className="w-5 h-5 text-red-600" />
      case "deadline":
        return <Clock className="w-5 h-5 text-yellow-600" />
      case "success":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      default:
        return <Bell className="w-5 h-5 text-blue-600" />
    }
  }

  const renderActivationContent = () => {
    if (userProgress.activationLevel === "basic") {
      return (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-orange-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-sans font-semibold text-orange-800 mb-1">Dashboard Not Activated</h3>
                <p className="text-orange-700 text-sm mb-3">
                  Complete the business questionnaire to unlock your personalized dashboard and checklist.
                </p>
                <Button
                  onClick={() => onNavigate("questionnaire")}
                  className="bg-orange-600 hover:bg-orange-700 text-white"
                >
                  Complete Questionnaire
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }

    if (userProgress.activationLevel === "questionnaire" && !userProgress.hasGeneratedChecklist) {
      return (
        <Card className="border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-sans font-semibold text-blue-800 mb-1">Generating Your Checklist</h3>
                <p className="text-blue-700 text-sm mb-3">
                  Your personalized business checklist is being generated based on your questionnaire responses.
                </p>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <span className="text-blue-600 text-sm">Processing...</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )
    }

    return null
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-sans font-semibold text-foreground mb-2">Loading Dashboard</h2>
          <p className="text-muted-foreground">Setting up your business workspace...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-sans font-bold text-foreground">BizEase</h1>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={() => onNavigate("home")} className="font-sans font-medium">
                <Home className="w-4 h-4 mr-1" />
                Home
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate("government-schemes")}
                className="font-sans font-medium"
              >
                Govt Schemes
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate("checklist")}
                className="font-sans font-medium"
              >
                Checklist
              </Button>
              <Button variant="ghost" size="sm" className="font-sans font-medium bg-primary/10 text-primary">
                Dashboard
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onNavigate("profile")} className="font-sans font-medium">
                Profile
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setChatOpen(true)} className="font-sans font-medium">
                Chatbot
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onNavigate("coming-soon")}
                className="font-sans font-medium"
              >
                Coming Soon
              </Button>
              <Button variant="ghost" size="sm" onClick={() => onNavigate("support")} className="font-sans font-medium">
                Support
              </Button>
              <Badge
                variant="outline"
                className={`${
                  userProgress.activationLevel === "verified"
                    ? "bg-green-100 text-green-700 border-green-300"
                    : userProgress.activationLevel === "checklist"
                      ? "bg-blue-100 text-blue-700 border-blue-300"
                      : "bg-orange-100 text-orange-700 border-orange-300"
                }`}
              >
                {userProgress.activationLevel === "verified" && <Star className="w-3 h-3 mr-1" />}
                {userProgress.activationLevel === "verified"
                  ? "Verified Business"
                  : userProgress.activationLevel === "checklist"
                    ? "Checklist Active"
                    : "Basic Access"}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Welcome Header */}
        <div className="mb-8">
          {userProgress.isVerified && businessData.hasECard ? (
            <Card className="border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                      <Crown className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-sans font-bold text-foreground mb-1">
                        Welcome back, {businessData.businessName}
                      </h1>
                      <p className="text-green-700 font-medium">You're BizEase Verified!</p>
                      <Badge className="mt-2 bg-green-600 text-white">
                        <Star className="w-3 h-3 mr-1" />
                        Verified Business
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={() => onNavigate("ecard")} className="bg-green-600 hover:bg-green-700">
                      <Download className="w-4 h-4 mr-2" />
                      Download E-Card
                    </Button>
                    {businessData.eCardExpiry && new Date(businessData.eCardExpiry) < new Date() && (
                      <Button variant="outline" className="border-orange-300 text-orange-600 bg-transparent">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Renew Subscription
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-sky-50">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-blue-600" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-sans font-bold text-foreground mb-1">
                        Welcome back, {businessData.businessName}
                      </h1>
                      <p className="text-blue-700">Keep your business documents organized.</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="border-blue-300 text-blue-600 bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Download Documents Bundle
                    </Button>
                    <Button onClick={() => onNavigate("subscription")} className="bg-blue-600 hover:bg-blue-700">
                      <Crown className="w-4 h-4 mr-2" />
                      Unlock BizEase E-Card
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {renderActivationContent() && <div className="mb-8">{renderActivationContent()}</div>}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Checklist Progress Tracker
                  {userProgress.activationLevel === "basic" && <Lock className="w-4 h-4 text-muted-foreground" />}
                </CardTitle>
                <CardDescription>
                  {userProgress.activationLevel === "basic"
                    ? "Complete questionnaire to generate your personalized checklist"
                    : `Progress: ${completedItems}/${totalItems} Documents Completed (${Math.round(progress)}%)`}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userProgress.activationLevel === "basic" ? (
                  <div className="text-center py-8">
                    <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground mb-4">Your personalized checklist will appear here</p>
                    <Button onClick={() => onNavigate("questionnaire")} className="bg-primary hover:bg-primary/90">
                      Start Questionnaire
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-foreground">Overall Progress</span>
                        <span className="text-sm font-bold text-primary">{Math.round(progress)}%</span>
                      </div>
                      <Progress value={progress} className="h-3" />
                    </div>
                    <div className="space-y-4">
                      {checklist.slice(0, 4).map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center justify-between p-4 border border-border rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${getStatusColor(item.status)}`} />
                            <div>
                              <h4 className="font-medium text-foreground">{item.title}</h4>
                              <p className="text-sm text-muted-foreground">{item.description}</p>
                              {item.deadline && (
                                <p className="text-xs text-orange-600 mt-1">
                                  Due: {new Date(item.deadline).toLocaleDateString()}
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                            {item.renewalLink && (
                              <Button size="sm" variant="outline" asChild>
                                <a href={item.renewalLink} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  Apply/Renew
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                      <Button variant="outline" onClick={() => onNavigate("checklist")} className="w-full">
                        View Full Checklist
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Smart Notifications & Renewals
                  {userProgress.activationLevel === "basic" && <Lock className="w-4 h-4 text-muted-foreground" />}
                </CardTitle>
                <CardDescription>
                  {userProgress.activationLevel === "basic"
                    ? "Complete questionnaire to unlock personalized notifications"
                    : "Renewal reminders, deadlines, and important alerts with calendar sync"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {userProgress.activationLevel === "basic" ? (
                  <div className="text-center py-8">
                    <Lock className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Notifications will appear here after completing the questionnaire
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {notifications.slice(0, 3).map((notification) => (
                      <div key={notification.id} className="flex items-start gap-3 p-4 border border-border rounded-lg">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{notification.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                          {notification.deadline && (
                            <p className="text-xs text-orange-600 mt-2">
                              <Clock className="w-3 h-3 inline mr-1" />
                              Due: {new Date(notification.deadline).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          {notification.actionLabel && (
                            <Button size="sm" variant="outline" onClick={() => handleNotificationAction(notification)}>
                              {notification.actionLabel}
                            </Button>
                          )}
                          <Button size="sm" variant="ghost" onClick={() => handleNotificationAction(notification)}>
                            <Calendar className="w-4 h-4 mr-1" />
                            Add to Calendar
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setNotifications((prev) => prev.filter((n) => n.id !== notification.id))}
                          >
                            Remind Later
                          </Button>
                        </div>
                      </div>
                    ))}
                    {notifications.length > 3 && (
                      <Button variant="outline" onClick={() => onNavigate("notifications")} className="w-full">
                        View All Notifications ({notifications.length})
                      </Button>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Government Schemes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  Government Scheme Recommendations
                </CardTitle>
                <CardDescription>AI-driven personalized recommendations based on your business profile</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schemes.slice(0, 2).map((scheme) => (
                    <div key={scheme.id} className="p-4 border border-border rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-foreground">{scheme.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{scheme.description}</p>
                          {scheme.amount && <Badge className="mt-2 bg-green-100 text-green-800">{scheme.amount}</Badge>}
                        </div>
                        <Badge variant="outline">{scheme.category}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-muted-foreground">{scheme.benefits.slice(0, 2).join(" • ")}</div>
                        <Button size="sm" asChild>
                          <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="w-3 h-3 mr-1" />
                            Apply Now
                          </a>
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" onClick={() => onNavigate("government-schemes")} className="w-full">
                    View All Schemes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5" />
                  Subscriptions & E-Card
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start bg-transparent"
                  disabled={userProgress.activationLevel === "basic"}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Bundle PDF
                  {userProgress.activationLevel === "basic" && <Lock className="w-3 h-3 ml-auto" />}
                </Button>
                {userProgress.isVerified && (
                  <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download E-Card (PDF + QR)
                  </Button>
                )}
                <div className="p-3 border border-dashed border-border rounded-lg text-center">
                  <CreditCard className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">Premium E-Card</p>
                  <p className="text-xs text-muted-foreground">Verified business card with QR</p>
                  <Badge className="mt-2 bg-blue-100 text-blue-800">Subscription Required</Badge>
                </div>
                <div className="p-3 border border-dashed border-border rounded-lg text-center">
                  <Gift className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">Promotional Guides</p>
                  <p className="text-xs text-muted-foreground">Marketing & growth resources</p>
                  <Badge className="mt-2 bg-orange-100 text-orange-800">Coming Soon</Badge>
                </div>
              </CardContent>
            </Card>

            {/* Community & Coming Soon */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Community & More
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 border border-dashed border-border rounded-lg text-center">
                  <Users className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">Community Hub</p>
                  <p className="text-xs text-muted-foreground">Connect with CA firms & legal advisors</p>
                  <Badge className="mt-2 bg-orange-100 text-orange-800">Coming Soon</Badge>
                </div>
                <div className="p-3 border border-dashed border-border rounded-lg text-center">
                  <MessageCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm font-medium text-foreground">Workshops & Expert Sessions</p>
                  <p className="text-xs text-muted-foreground">Learn from industry experts</p>
                  <Badge className="mt-2 bg-orange-100 text-orange-800">Coming Soon</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-50">
        {chatOpen ? (
          <Card className="w-80 h-96 shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm flex items-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Dashbot - AI Assistant
                </CardTitle>
                <Button size="sm" variant="ghost" onClick={() => setChatOpen(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col h-full pb-3">
              <div className="flex-1 bg-muted/30 rounded-lg p-3 mb-3 text-sm">
                <p className="text-muted-foreground mb-2">Hi! I'm your Dashbot. I can help you with:</p>
                <ul className="text-xs space-y-1">
                  <li>• "How do I renew my GST registration?"</li>
                  <li>• "What government schemes apply to my business?"</li>
                  <li>• "Show me my pending documents"</li>
                  <li>• "When is my trade license due?"</li>
                  <li>• "Help me with compliance requirements"</li>
                </ul>
              </div>
              <form onSubmit={handleChatSubmit} className="flex gap-2">
                <Input
                  placeholder="Ask me anything about your business..."
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  className="text-sm"
                />
                <Button type="submit" size="sm">
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          <Button
            onClick={() => setChatOpen(true)}
            className="w-14 h-14 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
          >
            <MessageCircle className="w-6 h-6" />
          </Button>
        )}
      </div>
    </div>
  )
}
