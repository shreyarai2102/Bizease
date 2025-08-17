"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Crown,
  BookOpen,
  Users,
  TrendingUp,
  Check,
  Star,
  Zap,
  Download,
  Calendar,
  Award,
} from "lucide-react"

interface SubscriptionSectionProps {
  onBack: () => void
}

export function SubscriptionSection({ onBack }: SubscriptionSectionProps) {
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
            <Crown className="w-10 h-10 text-primary" />
          </div>
          <Badge className="mb-4 bg-orange-100 text-orange-800 border-orange-200">Coming Soon</Badge>
          <h1 className="text-4xl font-sans font-bold text-foreground mb-4">BizEase Premium Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Unlock advanced features, expert guidance, and exclusive resources to accelerate your business growth
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-4">Choose Your Plan</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Select the perfect plan to support your entrepreneurial journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <Card className="border-border relative">
              <CardHeader className="text-center pb-8">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-2xl font-sans">Starter</CardTitle>
                <CardDescription>Perfect for new entrepreneurs</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-sans font-bold text-foreground">₹499</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">E-Verified Business Guide</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Basic compliance templates</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Monthly newsletter</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Community forum access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Email support</span>
                  </div>
                </div>
                <Button disabled className="w-full bg-primary/50 text-primary-foreground font-sans font-semibold mt-6">
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            {/* Professional Plan */}
            <Card className="border-border relative border-primary shadow-lg">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl font-sans">Professional</CardTitle>
                <CardDescription>For growing businesses</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-sans font-bold text-foreground">₹1,499</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Everything in Starter</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Monthly expert workshops</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">1-on-1 consultation (2 hours/month)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Business promotion (3 posts/month)</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Priority support</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Advanced analytics</span>
                  </div>
                </div>
                <Button disabled className="w-full bg-primary/50 text-primary-foreground font-sans font-semibold mt-6">
                  Coming Soon
                </Button>
              </CardContent>
            </Card>

            {/* Enterprise Plan */}
            <Card className="border-border relative">
              <CardHeader className="text-center pb-8">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-2xl font-sans">Enterprise</CardTitle>
                <CardDescription>For established businesses</CardDescription>
                <div className="mt-4">
                  <span className="text-3xl font-sans font-bold text-foreground">₹4,999</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Everything in Professional</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Unlimited expert consultations</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Custom training sessions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Unlimited business promotions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Dedicated account manager</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">White-label solutions</span>
                  </div>
                </div>
                <Button disabled className="w-full bg-primary/50 text-primary-foreground font-sans font-semibold mt-6">
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Premium Features */}
      <section className="py-16 px-4 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-sans font-bold text-foreground mb-4">Premium Features</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Unlock powerful tools and resources designed to accelerate your business success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* E-Verified Business Guide */}
            <Card className="border-border">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <Download className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg font-sans">E-Verified Business Guide</CardTitle>
                <CardDescription>Comprehensive compliance handbook</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Downloadable PDF guide covering all aspects of business compliance, best practices, and regulatory
                  requirements.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>200+ pages of expert content</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>Regular updates included</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>Industry-specific sections</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Expert Workshops */}
            <Card className="border-border">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg font-sans">Expert Workshops</CardTitle>
                <CardDescription>Live training sessions</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Monthly workshops led by industry experts covering topics like taxation, compliance, marketing, and
                  growth strategies.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>Live interactive sessions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>Q&A with experts</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>Recorded for later viewing</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Promotion */}
            <Card className="border-border">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg font-sans">Business Promotion</CardTitle>
                <CardDescription>Showcase your services</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Promote your products and services to the BizEase community at nominal rates with guaranteed
                  visibility.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>Featured listings</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>Social media promotion</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>Performance analytics</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 1-on-1 Consultations */}
            <Card className="border-border">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg font-sans">Expert Consultations</CardTitle>
                <CardDescription>Personalized guidance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  One-on-one sessions with chartered accountants, legal advisors, and business consultants tailored to
                  your needs.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>Verified professionals</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>Flexible scheduling</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>Follow-up support</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Advanced Analytics */}
            <Card className="border-border">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                  <TrendingUp className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-lg font-sans">Business Analytics</CardTitle>
                <CardDescription>Data-driven insights</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Comprehensive analytics dashboard showing your business progress, compliance status, and growth
                  opportunities.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>Progress tracking</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>Compliance monitoring</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>Growth recommendations</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Priority Support */}
            <Card className="border-border">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle className="text-lg font-sans">Priority Support</CardTitle>
                <CardDescription>Dedicated assistance</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Get priority access to our support team with faster response times and dedicated account management.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>24/7 support access</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>Dedicated account manager</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span>Phone & video support</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-sans font-bold text-primary-foreground mb-4">
            Ready to Accelerate Your Business?
          </h2>
          <p className="text-lg text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join our waitlist to be the first to access BizEase Premium services when they launch.
          </p>
          <Button
            size="lg"
            variant="secondary"
            disabled
            className="bg-white/50 hover:bg-white/60 text-primary font-sans font-semibold"
          >
            Join Premium Waitlist
          </Button>
        </div>
      </section>
    </div>
  )
}
