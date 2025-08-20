"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  ArrowLeft,
  Users,
  CreditCard,
  Megaphone,
  GraduationCap,
  Zap,
  Home,
  Bell,
  Calendar,
  Star,
  ArrowRight,
  Mail,
  XCircle
} from "lucide-react"
import { useState } from "react"

interface ComingSoonSectionProps {
  onBack: () => void
}

export function ComingSoonSection({ onBack }: ComingSoonSectionProps) {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNotifyMe = () => {
    if (email) {
      setIsSubscribed(true)
      setEmail("")
    }
  }

  const upcomingFeatures = [
    {
      title: "🏁 Closing Your Business",
      description: "Complete business closure journey with legal, financial, and regulatory guidance",
      icon : XCircle,
      category: "Business Closure",
      timeline: "Q1 2024",
      features: [
        "Step-by-step checklist for business closure",
        "GST cancellation and tax clearances",
        "Employee settlements & compliance handling",
        "ROC/LLP closure forms digital submission",
        "Closure compliance report generation",
        "Penalty avoidance guidance",
      ],
      color: "bg-red-100 text-red-800 border-red-200",
      detailedDescription:
        "💡 We understand that winding up a business is not just about stopping operations – it involves legal, financial, and regulatory steps. 🔒 With our upcoming feature, you'll be able to get a step-by-step checklist for business closure, file for GST cancellation and tax clearances, handle employee settlements & compliance, submit ROC/LLP closure forms digitally, and generate a closure compliance report to avoid penalties. ✨ Just like our Business Setup Journey, the Business Closure Journey will guide you through every step.",
    },
    {
      title: "Community Hub",
      description: "Connect with verified CA firms, legal advisors, and business consultants",
      icon: Users,
      category: "Networking",
      timeline: "Q2 2024",
      features: [
        "Verified CA and legal advisor directory",
        "Direct consultation booking",
        "Community forums and discussions",
        "Expert Q&A sessions",
        "Business networking events",
      ],
      color: "bg-blue-100 text-blue-800 border-blue-200",
    },
    {
      title: "Verified Business E-Card",
      description: "Premium digital business card with QR code and compliance verification",
      icon: CreditCard,
      category: "Premium Feature",
      timeline: "Q1 2024",
      features: [
        "Digital business card with QR code",
        "Real-time compliance status",
        "Shareable verification link",
        "Custom branding options",
        "Integration with business profiles",
      ],
      color: "bg-green-100 text-green-800 border-green-200",
    },
    {
      title: "Paid Promotions",
      description: "Boost your business visibility with targeted promotional campaigns",
      icon: Megaphone,
      category: "Marketing",
      timeline: "Q3 2024",
      features: [
        "Targeted business promotions",
        "Local market advertising",
        "Featured business listings",
        "Social media integration",
        "Performance analytics",
      ],
      color: "bg-purple-100 text-purple-800 border-purple-200",
    },
    {
      title: "Workshops & Expert Sessions",
      description: "Learn from industry experts through interactive workshops and training",
      icon: GraduationCap,
      category: "Education",
      timeline: "Q2 2024",
      features: [
        "Live expert-led workshops",
        "Business skill development",
        "Compliance training sessions",
        "Industry-specific guidance",
        "Certificate programs",
      ],
      color: "bg-orange-100 text-orange-800 border-orange-200",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header with persistent navigation */}
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
                onClick={() => window.location.reload()}
                className="font-sans font-medium"
              >
                <Home className="w-4 h-4 mr-1" />
                Home
              </Button>
              <Button variant="ghost" size="sm" className="font-sans font-medium">
                Govt Schemes
              </Button>
              <Button variant="ghost" size="sm" className="font-sans font-medium">
                Checklist
              </Button>
              <Button variant="ghost" size="sm" className="font-sans font-medium">
                Dashboard
              </Button>
              <Button variant="ghost" size="sm" className="font-sans font-medium">
                Profile
              </Button>
              <Button variant="ghost" size="sm" className="font-sans font-medium">
                Chatbot
              </Button>
              <Button variant="ghost" size="sm" className="font-sans font-medium bg-primary/10 text-primary">
                Coming Soon
              </Button>
              <Button variant="ghost" size="sm" className="font-sans font-medium">
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
      <section className="py-16 px-4 bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="container mx-auto max-w-4xl">
          <Button variant="ghost" size="sm" onClick={onBack} className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Star className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-6">
              Exciting Features <span className="text-primary">Coming Soon</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              We're working on amazing new features to make your business journey even smoother. Get notified when these
              features launch!
            </p>

            {/* Notification Signup */}
           <Card className="max-w-md mx-auto border-primary/20 bg-primary/5">
              <CardContent className="p-6">
                {!isSubscribed ? (
                  <div>
                    <h3 className="font-sans font-semibold text-foreground mb-3">Get Early Access</h3>
                    <div className="flex gap-2">
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1"
                      />
                      <Button onClick={handleNotifyMe} className="bg-primary hover:bg-primary/90">
                        <Bell className="w-4 h-4 mr-2" />
                        Notify Me
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Mail className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-sans font-semibold text-green-800 mb-2">You're All Set!</h3>
                    <p className="text-sm text-green-700">We'll notify you when these features are ready.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Upcoming Features */}
     <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-4">What's Coming Next</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These powerful features will enhance your business management experience and connect you with the right
              professionals.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingFeatures.map((feature, index) => (
              <Card key={index} className="border-border hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="text-right">
                      <Badge className={feature.color}>{feature.category}</Badge>
                      <div className="flex items-center gap-1 mt-2">
                        <Calendar className="w-3 h-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{feature.timeline}</span>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-sans">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>

                  <div className="space-y-2">
                    <h4 className="font-sans font-medium text-foreground text-sm">Key Features:</h4>
                    <ul className="space-y-1">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
     <section className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-4">Development Roadmap</h2>
            <p className="text-lg text-muted-foreground">
              Here's our planned timeline for rolling out these exciting features.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-border"></div>

            <div className="space-y-12">
              {[
                {
                  quarter: "Q1 2024",
                  title: "Verified Business E-Card",
                  description: "Launch premium digital business cards with QR codes and compliance verification",
                  status: "In Development",
                },
                {
                  quarter: "Q2 2024",
                  title: "Community Hub & Workshops",
                  description: "Connect with professionals and access expert-led training sessions",
                  status: "Planning",
                },
                {
                  quarter: "Q3 2024",
                  title: "Paid Promotions",
                  description: "Boost business visibility with targeted marketing campaigns",
                  status: "Research",
                },
                {
                  quarter: "Q4 2024",
                  title: "Advanced Analytics",
                  description: "Comprehensive business insights and performance tracking",
                  status: "Concept",
                },
              ].map((milestone, index) => (
                <div key={index} className="relative flex items-center">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background"></div>

                  <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 ml-auto"}`}>
                    <Card className="border-border">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {milestone.quarter}
                          </Badge>
                          <Badge className="text-xs bg-primary/10 text-primary border-primary/20">
                            {milestone.status}
                          </Badge>
                        </div>
                        <h3 className="font-sans font-semibold text-foreground mb-2">{milestone.title}</h3>
                        <p className="text-sm text-muted-foreground">{milestone.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
     <section className="py-16 px-4 bg-primary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-sans font-bold text-primary-foreground mb-4">Stay Updated on New Features</h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Be the first to know when these exciting features launch. Join our community of forward-thinking
            entrepreneurs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white hover:bg-white/90 text-primary font-sans font-semibold"
              onClick={() => !isSubscribed && setEmail("")}
            >
              <Bell className="w-5 h-5 mr-2" />
              Get Notified
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-primary font-sans font-semibold bg-transparent"
              onClick={onBack}
            >
              Explore Current Features
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}


