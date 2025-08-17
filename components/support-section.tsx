"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  HelpCircle,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  FileText,
  Video,
  Zap,
  Home,
  Send,
  CheckCircle,
} from "lucide-react"
import { useState } from "react"

interface SupportSectionProps {
  onBack: () => void
}

export function SupportSection({ onBack }: SupportSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const supportCategories = [
    {
      id: "registration",
      title: "Business Registration",
      description: "Help with company incorporation, licenses, and permits",
      icon: FileText,
    },
    {
      id: "documents",
      title: "Document Requirements",
      description: "Questions about required documents and verification",
      icon: HelpCircle,
    },
    {
      id: "schemes",
      title: "Government Schemes",
      description: "Assistance with subsidies, benefits, and applications",
      icon: CheckCircle,
    },
    {
      id: "technical",
      title: "Technical Support",
      description: "Platform issues, account problems, and troubleshooting",
      icon: MessageCircle,
    },
  ]

  const faqItems = [
    {
      question: "How long does business registration take?",
      answer:
        "Business registration typically takes 10-15 working days for private limited companies and 7-10 days for LLPs, depending on document verification and government processing times.",
    },
    {
      question: "What if my documents are rejected?",
      answer:
        "If documents are rejected, you'll receive detailed feedback on the issues. You can resubmit corrected documents through your dashboard. Our support team can help identify and fix common issues.",
    },
    {
      question: "Can I track my application status?",
      answer:
        "Yes, you can track all your applications through the dashboard. You'll receive real-time updates and notifications about status changes, approvals, and any required actions.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept all major payment methods including credit/debit cards, net banking, UPI, and digital wallets. Government fees are paid directly to respective portals.",
    },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    // Reset form after submission
    setTimeout(() => {
      setFormData({ name: "", email: "", subject: "", message: "" })
      setSelectedCategory("")
      setIsSubmitted(false)
    }, 3000)
  }

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
              <Button variant="ghost" size="sm" className="font-sans font-medium">
                Coming Soon
              </Button>
              <Button variant="ghost" size="sm" className="font-sans font-medium bg-primary/10 text-primary">
                Support
              </Button>
              <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
                Delhi Portal
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-6">
            How can we <span className="text-primary">help you?</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get expert assistance with business registration, document requirements, and government schemes. Our support
            team is here to guide you through every step.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Options */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="w-5 h-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                  <Phone className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Phone Support</p>
                    <p className="text-sm text-muted-foreground">+91 1800-123-4567</p>
                    <p className="text-xs text-muted-foreground">Mon-Fri, 9 AM - 6 PM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Email Support</p>
                    <p className="text-sm text-muted-foreground">support@bizease.gov.in</p>
                    <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border border-border rounded-lg">
                  <Video className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium text-foreground">Video Consultation</p>
                    <p className="text-sm text-muted-foreground">Schedule a call</p>
                    <p className="text-xs text-muted-foreground">Available on request</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Support Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span className="text-muted-foreground">Closed</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>Emergency Support:</strong> Available 24/7 for critical business registration issues.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Support Form and Categories */}
          <div className="lg:col-span-2 space-y-8">
            {/* Support Categories */}
            <Card>
              <CardHeader>
                <CardTitle>What do you need help with?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {supportCategories.map((category) => (
                    <div
                      key={category.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedCategory === category.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          <category.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-medium text-foreground mb-1">{category.title}</h3>
                          <p className="text-sm text-muted-foreground">{category.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Support Form */}
            <Card>
              <CardHeader>
                <CardTitle>Send us a message</CardTitle>
              </CardHeader>
              <CardContent>
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="font-sans font-semibold text-foreground mb-2">Message Sent Successfully!</h3>
                    <p className="text-muted-foreground">
                      We've received your message and will respond within 24 hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                        <Input
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                        <Input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Subject</label>
                      <Input
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="Brief description of your issue"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                      <Textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please describe your issue in detail..."
                      />
                    </div>
                    <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {faqItems.map((faq, index) => (
                    <div key={index} className="border-b border-border pb-4 last:border-b-0">
                      <h3 className="font-medium text-foreground mb-2">{faq.question}</h3>
                      <p className="text-sm text-muted-foreground">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
