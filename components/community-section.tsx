"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Users, MessageSquare, BookOpen, Calendar, Zap, UserCheck, Award, TrendingUp } from "lucide-react"

interface CommunitySectionProps {
  onBack: () => void
}

export function CommunitySection({ onBack }: CommunitySectionProps) {
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

      {/* Hero Section */}
      <section className="py-16 px-4 bg-card border-b border-border">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-primary" />
          </div>
          <Badge className="mb-4 bg-orange-100 text-orange-800 border-orange-200">Coming Soon</Badge>
          <h1 className="text-4xl font-sans font-bold text-foreground mb-4">BizEase Community</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Connect with fellow entrepreneurs, get expert advice, and grow your business with our collaborative
            community platform
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" disabled className="bg-primary/50 text-primary-foreground font-sans font-semibold">
              Join Waitlist
            </Button>
            <Button size="lg" variant="outline" disabled className="font-sans font-semibold bg-transparent">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Preview */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-4">What's Coming</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A comprehensive ecosystem to support your entrepreneurial journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Expert Network */}
            <Card className="border-border relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Q2 2025
                </Badge>
              </div>
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-sans">Expert Network</CardTitle>
                <CardDescription>Connect with verified professionals</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Get personalized advice from chartered accountants, legal advisors, and business consultants.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>1-on-1 consultations</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Verified CA & legal experts</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Industry-specific guidance</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Community Forums */}
            <Card className="border-border relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  Q3 2025
                </Badge>
              </div>
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl font-sans">Discussion Forums</CardTitle>
                <CardDescription>Ask questions and share experiences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Join topic-based discussions, ask questions, and learn from other entrepreneurs' experiences.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Industry-specific forums</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Q&A with experts</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Peer-to-peer support</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Knowledge Base */}
            <Card className="border-border relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Q4 2025
                </Badge>
              </div>
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-xl font-sans">Resource Library</CardTitle>
                <CardDescription>Comprehensive business guides</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Access curated resources, templates, and step-by-step guides for every aspect of business.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Legal document templates</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Compliance checklists</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Best practice guides</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Networking Events */}
            <Card className="border-border relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-200">
                  2026
                </Badge>
              </div>
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl font-sans">Networking Events</CardTitle>
                <CardDescription>Connect with like-minded entrepreneurs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Attend virtual and in-person networking events, workshops, and masterclasses.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Monthly networking meetups</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Industry-specific workshops</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Investor pitch sessions</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Success Stories */}
            <Card className="border-border relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                  2026
                </Badge>
              </div>
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle className="text-xl font-sans">Success Stories</CardTitle>
                <CardDescription>Learn from successful entrepreneurs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Get inspired by success stories and case studies from businesses that started with BizEase.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Entrepreneur spotlights</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Growth case studies</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Lessons learned series</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Marketplace */}
            <Card className="border-border relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                  2026
                </Badge>
              </div>
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-xl font-sans">Business Marketplace</CardTitle>
                <CardDescription>Promote and discover services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Promote your products and services, or discover solutions from other verified businesses.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Business directory</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Service marketplace</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Partnership opportunities</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-sans font-bold text-foreground mb-4">Be the First to Know</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join our waitlist to get early access to the BizEase Community and be part of Delhi's most supportive
            entrepreneur network.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Input placeholder="Enter your email address" className="flex-1" disabled />
            <Button disabled className="bg-primary/50 text-primary-foreground font-sans font-semibold">
              Join Waitlist
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-4">
            We'll notify you when the community launches. No spam, ever.
          </p>
        </div>
      </section>
    </div>
  )
}
