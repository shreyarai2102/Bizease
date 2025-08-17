"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  CheckCircle,
  FileText,
  Shield,
  ArrowRight,
  Clock,
  Gift,
  Users,
  Crown,
  Zap,
  MessageCircle,
  HelpCircle,
  Home,
  ClipboardList,
} from "lucide-react"
import { BusinessQuestionnaire } from "@/components/business-questionnaire"
import { GovernmentSchemes } from "@/components/government-schemes"
import { CommunitySection } from "@/components/community-section"
import { SubscriptionSection } from "@/components/subscription-section"
import { NotificationsSection } from "@/components/notifications-section"
import { ProfileSection } from "@/components/profile-section"
import { BizEaseDashboard } from "@/components/bizease-dashboard"
import { DigiLockerLogin } from "@/components/digilocker-login"
import { PersonalizedChecklist } from "@/components/personalized-checklist"
import { ChatbotSection } from "@/components/chatbot-section"
import { ComingSoonSection } from "@/components/coming-soon-section"
import { SupportSection } from "@/components/support-section"

interface UserProgress {
  hasCompletedQuestionnaire: boolean
  hasGeneratedChecklist: boolean
  checklistProgress: number
  hasECard: boolean
  isVerified: boolean
  activationLevel: "basic" | "questionnaire" | "checklist" | "verified"
}

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState<any>(null)
  const [isDemoMode, setIsDemoMode] = useState(false)

  const [userProgress, setUserProgress] = useState<UserProgress>({
    hasCompletedQuestionnaire: false,
    hasGeneratedChecklist: false,
    checklistProgress: 0,
    hasECard: false,
    isVerified: false,
    activationLevel: "basic",
  })

  const [businessData, setBusinessData] = useState({
    businessName: "Tech Solutions Pvt Ltd",
    ownerName: "John Doe",
    email: "john@techsolutions.com",
    phone: "+91 9876543210",
    businessType: "private-limited",
    industry: "technology",
    location: "Delhi",
    employees: "10-50",
    description: "Software development company",
    businessId: "biz_123456789",
    isSubscribed: false,
    hasECard: false,
    eCardExpiry: "2024-12-31",
  })

  const handleLoginSuccess = (digiLockerUserData: any) => {
    setUserData(digiLockerUserData)
    setIsAuthenticated(true)
    setIsDemoMode(false)
    // Update business data with DigiLocker info
    setBusinessData((prev) => ({
      ...prev,
      ownerName: digiLockerUserData.name,
      email: digiLockerUserData.email,
      phone: digiLockerUserData.mobile,
    }))
    setActiveSection("welcome")
  }

  const handleDemoAccess = () => {
    setIsDemoMode(true)
    setIsAuthenticated(false)
    setActiveSection("home")
  }

  const handleNavigation = (section: string) => {
    setActiveSection(section)
  }

  const handleBack = () => {
    if (isAuthenticated) {
      setActiveSection("welcome")
    } else {
      setActiveSection("home")
    }
  }

  const handleQuestionnaireComplete = (completedBusinessData: any) => {
    setBusinessData((prev) => ({ ...prev, ...completedBusinessData }))
    setUserProgress((prev) => ({
      ...prev,
      hasCompletedQuestionnaire: true,
      hasGeneratedChecklist: true,
      activationLevel: "checklist",
    }))
    setActiveSection("checklist")
  }

  const handleChecklistProgress = (progress: number) => {
    setUserProgress((prev) => ({
      ...prev,
      checklistProgress: progress,
      isVerified: progress === 100,
      hasECard: progress === 100,
      activationLevel: progress === 100 ? "verified" : "checklist",
    }))

    if (progress === 100) {
      setBusinessData((prev) => ({
        ...prev,
        hasECard: true,
        isSubscribed: true,
      }))
    }
  }

  if (!isAuthenticated && !isDemoMode) {
    return <DigiLockerLogin onLoginSuccess={handleLoginSuccess} onDemoAccess={handleDemoAccess} />
  }

  if (activeSection === "welcome" && isAuthenticated && userData) {
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
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveSection("home")}
                  className="font-sans font-medium"
                >
                  <Home className="w-4 h-4 mr-1" />
                  Home
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveSection("government-schemes")}
                  className="font-sans font-medium"
                >
                  Govt Schemes
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveSection("checklist")}
                  className="font-sans font-medium"
                >
                  Checklist
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveSection("dashboard")}
                  className="font-sans font-medium"
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveSection("profile")}
                  className="font-sans font-medium"
                >
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveSection("chatbot")}
                  className="font-sans font-medium"
                >
                  Chatbot
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveSection("coming-soon")}
                  className="font-sans font-medium"
                >
                  Coming Soon
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveSection("support")}
                  className="font-sans font-medium"
                >
                  Support
                </Button>
                <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                  ✓ DigiLocker Verified
                </Badge>
              </div>
            </div>
          </div>
        </header>

        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <h1 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-6">
                Welcome {userData.name}, let's set up your business journey 🚀
              </h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Your identity has been verified through DigiLocker. Now let's gather some information about your
                business to create a personalized setup plan.
              </p>
            </div>

            <Card className="max-w-md mx-auto mb-8 border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="text-lg font-sans text-green-800">Verified Information</CardTitle>
              </CardHeader>
              <CardContent className="text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Name:</span>
                  <span className="text-sm font-medium">{userData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Mobile:</span>
                  <span className="text-sm font-medium">{userData.mobile}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Email:</span>
                  <span className="text-sm font-medium">{userData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-muted-foreground">Location:</span>
                  <span className="text-sm font-medium">{userData.address}</span>
                </div>
              </CardContent>
            </Card>

            <Card className="max-w-2xl mx-auto mb-8 border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="text-lg font-sans text-blue-800">Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${userProgress.hasCompletedQuestionnaire ? "bg-green-500" : "bg-gray-300"}`}
                    />
                    <span className="text-sm">Questionnaire</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${userProgress.hasGeneratedChecklist ? "bg-green-500" : "bg-gray-300"}`}
                    />
                    <span className="text-sm">Checklist Generated</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-3 h-3 rounded-full ${userProgress.isVerified ? "bg-green-500" : "bg-gray-300"}`}
                    />
                    <span className="text-sm">Verified</span>
                  </div>
                </div>
                <Badge variant="outline" className="text-blue-700 border-blue-300">
                  Activation Level:{" "}
                  {userProgress.activationLevel.charAt(0).toUpperCase() + userProgress.activationLevel.slice(1)}
                </Badge>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-semibold"
                onClick={() => setActiveSection("questionnaire")}
              >
                Start Business Setup Questionnaire
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="font-sans font-semibold bg-transparent"
                onClick={() => setActiveSection("dashboard")}
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        </section>
      </div>
    )
  }

  if (activeSection === "dashboard") {
    return (
      <BizEaseDashboard
        businessData={businessData}
        userProgress={userProgress}
        onNavigate={handleNavigation}
        onProgressUpdate={handleChecklistProgress}
      />
    )
  }

  if (activeSection === "profile") {
    return (
      <ProfileSection
        onBack={handleBack}
        onSignOut={() => {
          setIsAuthenticated(false)
          setIsDemoMode(false)
          setUserData(null)
          setActiveSection("home")
        }}
      />
    )
  }

  if (activeSection === "notifications") {
    return <NotificationsSection onBack={handleBack} />
  }

  if (activeSection === "subscription") {
    return <SubscriptionSection onBack={handleBack} />
  }

  if (activeSection === "community") {
    return <CommunitySection onBack={handleBack} />
  }

  if (activeSection === "government-schemes") {
    return <GovernmentSchemes onBack={handleBack} />
  }

  if (activeSection === "questionnaire") {
    return <BusinessQuestionnaire onBack={handleBack} onComplete={handleQuestionnaireComplete} />
  }

  if (activeSection === "checklist") {
    return (
      <PersonalizedChecklist
        businessData={businessData}
        userProgress={userProgress}
        onBack={handleBack}
        onComplete={() => setActiveSection("dashboard")}
        onProgressUpdate={handleChecklistProgress}
      />
    )
  }

  if (activeSection === "chatbot") {
    return <ChatbotSection onBack={handleBack} />
  }

  if (activeSection === "coming-soon") {
    return <ComingSoonSection onBack={handleBack} />
  }

  if (activeSection === "support") {
    return <SupportSection onBack={handleBack} />
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
              {isDemoMode && (
                <>
                  <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                    Demo Mode
                  </Badge>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setIsDemoMode(false)
                      setIsAuthenticated(false)
                      setActiveSection("home")
                    }}
                    className="font-sans font-medium text-red-600 border-red-200 hover:bg-red-50"
                  >
                    Exit Demo
                  </Button>
                </>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveSection("home")}
                className="font-sans font-medium"
              >
                <Home className="w-4 h-4 mr-1" />
                Home
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveSection("government-schemes")}
                className="font-sans font-medium"
              >
                Govt Schemes
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveSection("checklist")}
                className="font-sans font-medium"
              >
                Checklist
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveSection("dashboard")}
                className="font-sans font-medium"
              >
                Dashboard
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveSection("profile")}
                className="font-sans font-medium"
              >
                Profile
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveSection("chatbot")}
                className="font-sans font-medium"
              >
                Chatbot
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveSection("coming-soon")}
                className="font-sans font-medium"
              >
                Coming Soon
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveSection("support")}
                className="font-sans font-medium"
              >
                Support
              </Button>
              <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                Delhi Portal
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="mb-8">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Trusted by 1000+ Entrepreneurs</Badge>
            <h1 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-6">
              Start Your Business in Delhi with <span className="text-primary">Complete Guidance</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get personalized checklists, track your progress, and receive official verification.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-semibold"
              onClick={() => setActiveSection("questionnaire")}
            >
              Start Your Business Journey
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="font-sans font-semibold bg-transparent"
              onClick={() => setActiveSection("dashboard")}
            >
              Access Dashboard
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="font-sans font-semibold bg-transparent"
              onClick={() => setActiveSection("government-schemes")}
            >
              <Gift className="mr-2 w-5 h-5" />
              Explore Government Schemes
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-2xl font-sans font-bold text-primary mb-1">15 min</div>
              <div className="text-sm text-muted-foreground">Average Setup Time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-sans font-bold text-primary mb-1">98%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-sans font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-4">
              Everything You Need to Start Your Business
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our guided platform simplifies complex business registration processes into clear, actionable steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card
              className="border-border hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setActiveSection("questionnaire")}
            >
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg font-sans">Smart Questionnaire</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Answer simple questions to get a personalized checklist of required documents and licenses.
                </CardDescription>
              </CardContent>
            </Card>

            <Card
              className="border-border hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setActiveSection("dashboard")}
            >
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-3">
                  <CheckCircle className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-lg font-sans">Progress Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Visual dashboard showing your completion status with estimated processing times for each step.
                </CardDescription>
              </CardContent>
            </Card>

            <Card
              className="border-border hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setActiveSection("checklist")}
            >
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <ClipboardList className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg font-sans">Official E-Card</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Receive a verified business e-card with QR code for instant compliance verification.
                </CardDescription>
              </CardContent>
            </Card>

            <Card
              className="border-border hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setActiveSection("government-schemes")}
            >
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Gift className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg font-sans">Government Schemes</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Discover and apply for government schemes and subsidies tailored for your business.
                </CardDescription>
              </CardContent>
            </Card>

            <Card
              className="border-border hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setActiveSection("community")}
            >
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <CardTitle className="text-lg font-sans">Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Connect with other entrepreneurs and share insights.</CardDescription>
              </CardContent>
            </Card>

            <Card
              className="border-border hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setActiveSection("subscription")}
            >
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Crown className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg font-sans">Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Upgrade to premium for enhanced features and support.</CardDescription>
              </CardContent>
            </Card>

            <Card
              className="border-border hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setActiveSection("chatbot")}
            >
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg font-sans">Chatbot</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Get instant assistance with our chatbot.</CardDescription>
              </CardContent>
            </Card>

            <Card
              className="border-border hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setActiveSection("coming-soon")}
            >
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <HelpCircle className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg font-sans">Coming Soon</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Stay tuned for new features and updates.</CardDescription>
              </CardContent>
            </Card>

            <Card
              className="border-border hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setActiveSection("support")}
            >
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-lg font-sans">Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>Get help and support for your business setup.</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-4">Simple 4-Step Process</h2>
            <p className="text-lg text-muted-foreground">
              From questionnaire to verified business in minutes, not months.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Answer Questions",
                description: "Tell us about your business type, location, and requirements",
                icon: FileText,
              },
              {
                step: "02",
                title: "Get Checklist",
                description: "Receive personalized list of required documents and licenses",
                icon: ClipboardList,
              },
              {
                step: "03",
                title: "Track Progress",
                description: "Monitor your completion status with our visual dashboard",
                icon: Clock,
              },
              {
                step: "04",
                title: "Get Verified",
                description: "Receive official BizEase verification e-card with QR code",
                icon: Shield,
              },
              {
                step: "05",
                title: "Explore Schemes",
                description: "Discover government schemes and subsidies for your business",
                icon: Gift,
              },
              {
                step: "06",
                title: "Join Community",
                description: "Connect with other entrepreneurs and share insights",
                icon: Users,
              },
              {
                step: "07",
                title: "Upgrade to Premium",
                description: "Access enhanced features and support with a premium subscription",
                icon: Crown,
              },
              {
                step: "08",
                title: "Chatbot Assistance",
                description: "Get instant assistance with our chatbot",
                icon: MessageCircle,
              },
              {
                step: "09",
                title: "Stay Updated",
                description: "Stay tuned for new features and updates",
                icon: HelpCircle,
              },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                    <span className="text-xs font-sans font-bold text-accent-foreground">{item.step}</span>
                  </div>
                </div>
                <h3 className="text-lg font-sans font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-sans font-bold text-primary-foreground mb-4">
            Ready to Start Your Business Journey?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of entrepreneurs who have successfully registered their businesses with BizEase.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white hover:bg-white/90 text-primary font-sans font-semibold"
              onClick={() => setActiveSection("questionnaire")}
            >
              Begin Registration Process
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary font-sans font-semibold bg-transparent"
              onClick={() => setActiveSection("dashboard")}
            >
              Access Dashboard
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary font-sans font-semibold bg-transparent"
              onClick={() => setActiveSection("government-schemes")}
            >
              <Gift className="mr-2 w-5 h-5" />
              Explore Schemes & Benefits
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary font-sans font-semibold bg-transparent"
              onClick={() => setActiveSection("community")}
            >
              <Users className="mr-2 w-5 h-5" />
              Join Community
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary font-sans font-semibold bg-transparent"
              onClick={() => setActiveSection("subscription")}
            >
              <Crown className="mr-2 w-5 h-5" />
              Upgrade to Premium
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary font-sans font-semibold bg-transparent"
              onClick={() => setActiveSection("chatbot")}
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Chatbot
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary font-sans font-semibold bg-transparent"
              onClick={() => setActiveSection("coming-soon")}
            >
              <HelpCircle className="mr-2 w-5 h-5" />
              Coming Soon
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary font-sans font-semibold bg-transparent"
              onClick={() => setActiveSection("support")}
            >
              <Shield className="mr-2 w-5 h-5" />
              Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
