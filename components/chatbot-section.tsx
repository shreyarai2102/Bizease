"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  ArrowLeft,
  Send,
  Bot,
  User,
  Zap,
  Home,
  FileText,
  Gift,
  Clock,
  ExternalLink,
  Lightbulb,
  HelpCircle,
  CheckCircle,
} from "lucide-react"

interface ChatbotSectionProps {
  onBack: () => void
}

interface Message {
  id: string
  type: "user" | "bot"
  content: string
  timestamp: Date
  suggestions?: string[]
  links?: { text: string; url: string }[]
}

export function ChatbotSection({ onBack }: ChatbotSectionProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      type: "bot",
      content:
        "Hello! I'm your BizEase AI Assistant. I can help you with business registration, document requirements, government schemes, and compliance questions. What would you like to know?",
      timestamp: new Date(),
      suggestions: [
        "What documents do I need for GST registration?",
        "Show me government schemes for my business",
        "How do I renew my trade license?",
        "What are the requirements for FSSAI license?",
      ],
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const generateBotResponse = (userMessage: string): Message => {
    const lowerMessage = userMessage.toLowerCase()

    // GST related queries
    if (lowerMessage.includes("gst") || lowerMessage.includes("tax registration")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content:
          "For GST registration, you'll need:\n\n• PAN Card\n• Aadhaar Card\n• Business address proof\n• Bank account details\n• Digital signature (for companies)\n\nGST registration is mandatory if your annual turnover exceeds ₹40 lakhs (₹20 lakhs for northeastern states). The process typically takes 3-7 working days.",
        timestamp: new Date(),
        links: [
          { text: "Apply for GST Registration", url: "https://www.gst.gov.in/" },
          { text: "GST Registration Guide", url: "https://www.gst.gov.in/registration" },
        ],
        suggestions: [
          "What is the GST registration fee?",
          "How to check GST registration status?",
          "GST return filing requirements",
        ],
      }
    }

    // FSSAI related queries
    if (lowerMessage.includes("fssai") || lowerMessage.includes("food license")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content:
          "FSSAI license is mandatory for all food businesses. Requirements include:\n\n• Business registration documents\n• Layout plan of premises\n• Water test report\n• Medical certificates of food handlers\n• List of food products\n\nLicense types:\n• Basic Registration: ₹100 (turnover up to ₹12 lakhs)\n• State License: ₹2,000-7,500 (turnover ₹12 lakhs - ₹20 crores)\n• Central License: ₹7,500+ (turnover above ₹20 crores)",
        timestamp: new Date(),
        links: [
          { text: "Apply for FSSAI License", url: "https://www.fssai.gov.in/" },
          { text: "FSSAI License Types", url: "https://foscos.fssai.gov.in/" },
        ],
        suggestions: [
          "FSSAI license renewal process",
          "Food safety training requirements",
          "FSSAI compliance checklist",
        ],
      }
    }

    // Trade license queries
    if (lowerMessage.includes("trade license") || lowerMessage.includes("municipal license")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content:
          "Trade license is required for operating any business premises. For Delhi:\n\n• Property ownership/rental documents\n• NOC from property owner\n• Identity and address proof\n• Passport size photographs\n• Business registration certificate\n\nFees: ₹500-2,000 depending on business type and area. License is valid for 1 year and must be renewed annually.",
        timestamp: new Date(),
        links: [
          { text: "Delhi Trade License Portal", url: "https://www.delhi.gov.in/" },
          { text: "Trade License Application", url: "https://delhioss.delhi.gov.in/" },
        ],
        suggestions: [
          "Trade license renewal deadline",
          "Documents for trade license renewal",
          "Trade license fee structure",
        ],
      }
    }

    // Government schemes queries
    if (lowerMessage.includes("scheme") || lowerMessage.includes("subsidy") || lowerMessage.includes("benefit")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content:
          "Here are key government schemes for businesses:\n\n**MSME Registration (Udyam)**\n• Collateral-free loans up to ₹2 crore\n• Lower interest rates\n• Government tender preferences\n\n**Startup India**\n• 100% tax deduction for 3 years\n• Fast-track patent examination\n• Self-certification compliance\n\n**PMEGP Scheme**\n• 15-35% subsidy on project cost\n• Up to ₹15 lakh subsidy\n• Easy loan approval",
        timestamp: new Date(),
        links: [
          { text: "Udyam Registration", url: "https://udyamregistration.gov.in/" },
          { text: "Startup India Portal", url: "https://www.startupindia.gov.in/" },
          { text: "PMEGP Scheme", url: "https://www.kviconline.gov.in/pmegpeportal/" },
        ],
        suggestions: ["MSME registration eligibility", "Startup India tax benefits", "How to apply for PMEGP subsidy"],
      }
    }

    // Company registration queries
    if (
      lowerMessage.includes("company registration") ||
      lowerMessage.includes("incorporation") ||
      lowerMessage.includes("private limited")
    ) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content:
          "For Private Limited Company registration:\n\n**Required Documents:**\n• DIN (Director Identification Number)\n• DSC (Digital Signature Certificate)\n• MOA (Memorandum of Association)\n• AOA (Articles of Association)\n• Registered office address proof\n\n**Process Timeline:** 10-15 working days\n**Government Fees:** ₹4,000-10,000\n\nThe process involves name reservation, document filing, and certificate issuance.",
        timestamp: new Date(),
        links: [
          { text: "MCA Portal", url: "https://www.mca.gov.in/" },
          { text: "Company Registration Guide", url: "https://www.mca.gov.in/content/mca/global/en/home.html" },
        ],
        suggestions: ["DIN application process", "Company name availability check", "MOA and AOA templates"],
      }
    }

    // PAN Card queries
    if (lowerMessage.includes("pan card") || lowerMessage.includes("pan application")) {
      return {
        id: Date.now().toString(),
        type: "bot",
        content:
          "PAN Card is mandatory for all business transactions:\n\n**Required Documents:**\n• Identity proof (Aadhaar/Passport/Voter ID)\n• Address proof\n• Date of birth proof\n• Passport size photograph\n\n**Application Fee:** ₹110 (Indian address), ₹1,020 (foreign address)\n**Processing Time:** 1-2 weeks\n\nYou can apply online through NSDL or UTIITSL websites.",
        timestamp: new Date(),
        links: [
          { text: "Apply for PAN - NSDL", url: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html" },
          { text: "Apply for PAN - UTIITSL", url: "https://www.utiitsl.com/UTIITSL/portal/Home.jsp" },
        ],
        suggestions: ["PAN card correction process", "Track PAN application status", "Duplicate PAN card application"],
      }
    }

    // Default response for unrecognized queries
    return {
      id: Date.now().toString(),
      type: "bot",
      content:
        "I can help you with various business registration topics including:\n\n• Document requirements for licenses\n• Government schemes and subsidies\n• Registration processes and timelines\n• Compliance and renewal procedures\n• Fee structures and application links\n\nCould you please be more specific about what you'd like to know? For example, you can ask about GST registration, FSSAI license, trade license, company incorporation, or government schemes.",
      timestamp: new Date(),
      suggestions: [
        "What documents do I need for GST registration?",
        "Show me government schemes for startups",
        "How to register a private limited company?",
        "FSSAI license requirements for food business",
      ],
    }
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsTyping(true)

    // Simulate typing delay
    setTimeout(() => {
      const botResponse = generateBotResponse(inputMessage)
      setMessages((prev) => [...prev, botResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleSuggestionClick = (suggestion: string) => {
    setInputMessage(suggestion)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
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
              <Button variant="ghost" size="sm" className="font-sans font-medium bg-primary/10 text-primary">
                Chatbot
              </Button>
              <Button variant="ghost" size="sm" className="font-sans font-medium">
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

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Button variant="ghost" size="sm" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        {/* Chat Header */}
        <Card className="mb-6 border-primary/20 bg-primary/5">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-xl font-sans">BizEase AI Assistant</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Get instant help with business registration, documents, and government schemes
                </p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Chat Container */}
        <Card className="h-[600px] flex flex-col">
          <CardContent className="flex-1 p-0">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[500px]">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  {message.type === "bot" && (
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                  )}

                  <div className={`max-w-[80%] ${message.type === "user" ? "order-1" : ""}`}>
                    <div
                      className={`p-3 rounded-lg ${
                        message.type === "user" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>

                    {/* Links */}
                    {message.links && message.links.length > 0 && (
                      <div className="mt-2 space-y-1">
                        {message.links.map((link, index) => (
                          <a
                            key={index}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs text-primary hover:underline"
                          >
                            <ExternalLink className="w-3 h-3" />
                            {link.text}
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Lightbulb className="w-3 h-3" />
                          You might also ask:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xs h-7 bg-transparent"
                              onClick={() => handleSuggestionClick(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}

                    <p className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>

                  {message.type === "user" && (
                    <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-accent" />
                    </div>
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex gap-3 justify-start">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted p-3 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-border p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me about business registration, documents, schemes..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                />
                <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>

              {/* Quick Actions */}
              <div className="mt-3 flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs bg-transparent"
                  onClick={() => handleSuggestionClick("What documents do I need for GST registration?")}
                >
                  <FileText className="w-3 h-3 mr-1" />
                  GST Documents
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs bg-transparent"
                  onClick={() => handleSuggestionClick("Show me government schemes for my business")}
                >
                  <Gift className="w-3 h-3 mr-1" />
                  Govt Schemes
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs bg-transparent"
                  onClick={() => handleSuggestionClick("How do I renew my trade license?")}
                >
                  <Clock className="w-3 h-3 mr-1" />
                  License Renewal
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs bg-transparent"
                  onClick={() => handleSuggestionClick("What are the requirements for FSSAI license?")}
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  FSSAI License
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="mt-6 border-blue-200 bg-blue-50/30">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <HelpCircle className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h3 className="font-sans font-medium text-blue-900 mb-2">How can I help you?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-blue-700">
                  <div>• Business registration processes</div>
                  <div>• Document requirements</div>
                  <div>• Government schemes & subsidies</div>
                  <div>• License renewals & deadlines</div>
                  <div>• Compliance requirements</div>
                  <div>• Fee structures & timelines</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
