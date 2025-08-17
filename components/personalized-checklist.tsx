"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  ArrowLeft,
  Building2,
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  Download,
  ExternalLink,
  Star,
  Zap,
  Home,
  ArrowRight,
  Bell,
  CreditCard,
  Info,
  BookOpen,
  Phone,
  Users,
} from "lucide-react"
import { BusinessECard } from "./business-ecard"

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
  businessSize?: string
  turnover?: string
  isNewToBusiness?: string
  existingRegistrations?: string[]
  plannedOperations?: string
  hasPhysicalStore?: string
  requiresSpecialLicense?: string
  exportPlans?: string
  onlineBusinessPlan?: string
  existingTurnover?: string
  currentChallenges?: string[]
  priorityAreas?: string[]
}

interface UserProgress {
  hasCompletedQuestionnaire: boolean
  hasGeneratedChecklist: boolean
  checklistProgress: number
  hasECard: boolean
  isVerified: boolean
  activationLevel: "basic" | "questionnaire" | "checklist" | "verified"
}

interface ChecklistItem {
  id: string
  title: string
  description: string
  category: string
  estimated_time: string
  status: "pending" | "in-progress" | "completed"
  is_required?: boolean
  business_id: string
  priority: "high" | "medium" | "low"
  government_portal?: string
  documents_needed?: string[]
  cost_estimate?: string
  why_needed?: string
}

interface PersonalizedChecklistProps {
  businessData: BusinessData
  userProgress: UserProgress
  onBack: () => void
  onComplete: () => void
  onProgressUpdate: (progress: number) => void
}

export function PersonalizedChecklist({
  businessData,
  userProgress,
  onBack,
  onComplete,
  onProgressUpdate,
}: PersonalizedChecklistProps) {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showECard, setShowECard] = useState(false)

  const getStorageKey = () => `bizease_checklist_${businessData.businessId || "default"}`

  const saveChecklistToStorage = (checklistData: ChecklistItem[]) => {
    try {
      localStorage.setItem(getStorageKey(), JSON.stringify(checklistData))
      console.log("[v0] Checklist saved to localStorage")
    } catch (error) {
      console.error("[v0] Failed to save checklist to localStorage:", error)
    }
  }

  const loadChecklistFromStorage = (): ChecklistItem[] | null => {
    try {
      const saved = localStorage.getItem(getStorageKey())
      if (saved) {
        const parsed = JSON.parse(saved)
        console.log("[v0] Loaded checklist from localStorage:", parsed.length, "items")
        return parsed
      }
    } catch (error) {
      console.error("[v0] Failed to load checklist from localStorage:", error)
    }
    return null
  }

  useEffect(() => {
    const savedChecklist = loadChecklistFromStorage()

    if (savedChecklist && savedChecklist.length > 0) {
      console.log("[v0] Using saved checklist from localStorage")
      setChecklist(savedChecklist)
    } else {
      console.log("[v0] No saved checklist found, generating new one")
      // Generate personalized checklist based on business data
      const generateChecklist = () => {
        const items: ChecklistItem[] = []
        const businessId = businessData.businessId || `biz_${Date.now()}`

        // Base requirements for all businesses
        const baseRequirements = [
          {
            id: `${businessId}_pan`,
            title: "PAN Card",
            description: "Permanent Account Number for tax identification and business operations",
            category: "Basic Documents",
            estimated_time: "1-2 days",
            priority: "high" as const,
            is_required: true,
            government_portal: "https://www.incometax.gov.in/iec/foportal/",
            documents_needed: ["Identity Proof", "Address Proof", "Photograph"],
            cost_estimate: "₹110",
            why_needed: "Mandatory for all business transactions and tax compliance",
          },
          {
            id: `${businessId}_aadhaar`,
            title: "Aadhaar Card",
            description: "Unique identification document for business owner",
            category: "Basic Documents",
            estimated_time: "Immediate (if available)",
            priority: "high" as const,
            is_required: true,
            government_portal: "https://uidai.gov.in/",
            documents_needed: ["Biometric verification"],
            cost_estimate: "Free",
            why_needed: "Required for most government registrations and KYC processes",
          },
        ]

        items.push(...baseRequirements)

        // Business type specific requirements
        if (businessData.businessType === "private-limited" || businessData.businessType === "public-limited") {
          items.push({
            id: `${businessId}_incorporation`,
            title: "Company Incorporation",
            description: "Register your company with Ministry of Corporate Affairs",
            category: "Business Registration",
            estimated_time: "10-15 days",
            priority: "high" as const,
            is_required: true,
            government_portal: "https://www.mca.gov.in/",
            documents_needed: ["DIN", "DSC", "MOA", "AOA"],
            cost_estimate: "₹4,000-₹10,000",
            why_needed: "Legal entity formation for limited companies",
          })
        }

        // GST Registration
        items.push({
          id: `${businessId}_gst`,
          title: "GST Registration",
          description: "Goods and Services Tax registration for tax compliance",
          category: "Tax Registration",
          estimated_time: "3-7 days",
          priority: "high" as const,
          is_required: true,
          government_portal: "https://www.gst.gov.in/",
          documents_needed: ["PAN", "Aadhaar", "Business Address Proof"],
          cost_estimate: "Free",
          why_needed: "Mandatory for businesses with turnover above ₹40 lakhs",
        })

        // Industry specific licenses
        if (businessData.industry === "food-beverage") {
          items.push({
            id: `${businessId}_fssai`,
            title: "FSSAI License",
            description: "Food Safety and Standards Authority of India license",
            category: "Industry License",
            estimated_time: "15-30 days",
            priority: "high" as const,
            is_required: true,
            government_portal: "https://www.fssai.gov.in/",
            documents_needed: ["Business Registration", "Layout Plan", "Water Test Report"],
            cost_estimate: "₹100-₹7,500",
            why_needed: "Mandatory for all food businesses in India",
          })
        }

        // Physical store requirements
        if (businessData.hasPhysicalStore === "yes") {
          items.push({
            id: `${businessId}_trade_license`,
            title: "Trade License",
            description: "Municipal trade license for physical business operations",
            category: "Local License",
            estimated_time: "7-15 days",
            priority: "high" as const,
            is_required: true,
            government_portal: "https://www.delhi.gov.in/",
            documents_needed: ["Property Documents", "NOC from Owner", "Identity Proof"],
            cost_estimate: "₹500-₹2,000",
            why_needed: "Required for operating physical business premises",
          })

          items.push({
            id: `${businessId}_shop_establishment`,
            title: "Shop & Establishment License",
            description: "Registration under Shops and Establishments Act",
            category: "Local License",
            estimated_time: "7-10 days",
            priority: "high" as const,
            is_required: true,
            government_portal: "https://www.delhi.gov.in/",
            documents_needed: ["Rent Agreement", "Identity Proof", "Passport Size Photos"],
            cost_estimate: "₹200-₹1,000",
            why_needed: "Mandatory for all commercial establishments with employees",
          })
        }

        // MSME Registration
        items.push({
          id: `${businessId}_udyam`,
          title: "Udyam Registration (MSME)",
          description: "Micro, Small and Medium Enterprises registration",
          category: "Government Schemes",
          estimated_time: "1-2 days",
          priority: "medium" as const,
          is_required: false,
          government_portal: "https://udyamregistration.gov.in/",
          documents_needed: ["Aadhaar Card", "PAN Card", "Business Details"],
          cost_estimate: "Free",
          why_needed: "Access to government schemes, subsidies, and easier loan approvals",
        })

        // Banking
        items.push({
          id: `${businessId}_bank_account`,
          title: "Current Bank Account",
          description: "Open business current account for financial transactions",
          category: "Banking",
          estimated_time: "3-7 days",
          priority: "high" as const,
          is_required: true,
          government_portal: "N/A (Private Banks)",
          documents_needed: ["Business Registration", "PAN Card", "Address Proof"],
          cost_estimate: "₹500-₹2,000 (monthly charges)",
          why_needed: "Separate business finances and professional banking services",
        })

        return items.map((item) => ({
          ...item,
          status: "pending" as const,
          business_id: businessId,
        }))
      }

      const newChecklist = generateChecklist()
      setChecklist(newChecklist)
      saveChecklistToStorage(newChecklist)
    }

    setLoading(false)
  }, []) // Empty dependency array to run only once on mount

  useEffect(() => {
    if (checklist.length > 0) {
      const completedItems = checklist.filter((item) => item.status === "completed").length
      const progress = (completedItems / checklist.length) * 100
      onProgressUpdate(progress)
    }
  }, [checklist])

  const updateItemStatus = (id: string, status: ChecklistItem["status"]) => {
    console.log("[v0] Updating item status:", id, "to:", status)

    setChecklist((prev) => {
      const updatedChecklist = prev.map((item) => {
        if (item.id === id) {
          console.log("[v0] Item found, updating from:", item.status, "to:", status)
          return { ...item, status }
        }
        return item
      })

      saveChecklistToStorage(updatedChecklist)

      return updatedChecklist
    })
  }

  const completedItems = checklist.filter((item) => item.status === "completed").length
  const totalItems = checklist.length
  const progress = totalItems > 0 ? (completedItems / totalItems) * 100 : 0

  const groupedChecklist = checklist.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, ChecklistItem[]>,
  )

  const getPriorityColor = (priority: string, isRequired: boolean) => {
    if (priority === "high") {
      return "bg-red-100 text-red-800 border-red-200"
    } else if (isRequired) {
      return "bg-orange-100 text-orange-800 border-orange-200"
    } else {
      return "bg-blue-100 text-blue-800 border-blue-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="w-5 h-5 text-green-600" />
      case "in-progress":
        return <Clock className="w-5 h-5 text-yellow-600" />
      default:
        return <AlertCircle className="w-5 h-5 text-gray-400" />
    }
  }

  const handleGenerateECard = () => {
    console.log("[v0] Generating e-card for business:", businessData.businessName)
    setShowECard(true)
  }

  const handleBackFromECard = () => {
    setShowECard(false)
  }

  if (showECard) {
    return (
      <BusinessECard businessData={businessData} businessId={businessData.businessId} onBack={handleBackFromECard} />
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-sans font-semibold text-foreground mb-2">
            Generating Your Personalized Checklist
          </h2>
          <p className="text-muted-foreground">Creating customized requirements based on your business details...</p>
        </div>
      </div>
    )
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
              <Button variant="ghost" size="sm" className="font-sans font-medium bg-primary/10 text-primary">
                Checklist
              </Button>
              <Button variant="ghost" size="sm" onClick={onComplete} className="font-sans font-medium">
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
              <Button variant="ghost" size="sm" className="font-sans font-medium">
                Support
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" className="font-sans font-medium relative">
                      <Bell className="w-4 h-4" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
                      </div>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Smart Notifications - Reminders & Renewals</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                ✓ DigiLocker Verified
              </Badge>
            </div>
          </div>
        </div>
      </header>

      <section className="border-b border-border bg-gradient-to-r from-card to-muted">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <Button variant="ghost" size="sm" onClick={onBack} className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Questionnaire
              </Button>

              <div className="flex items-center justify-between mb-4">
                <h2 className="text-3xl font-sans font-bold text-foreground">
                  Your Personalized Business Setup Checklist
                </h2>
                <span className="text-lg font-semibold text-primary bg-primary/10 px-4 py-2 rounded-lg">
                  {Math.round(progress)}% Complete
                </span>
              </div>
              <div className="mb-4">
                <Progress value={progress} className="h-3 bg-muted border border-border" />
                <div className="flex justify-between text-sm text-muted-foreground mt-2">
                  <span>Progress</span>
                  <span>
                    {completedItems} of {totalItems} completed
                  </span>
                </div>
              </div>

              <p className="text-muted-foreground mb-6 text-lg">
                Complete these requirements to get your business officially registered and verified. Each item includes
                direct links to government portals and estimated processing times.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <div className="text-2xl font-sans font-bold text-foreground">{totalItems}</div>
                      <div className="text-sm text-muted-foreground">Total Requirements</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="text-2xl font-sans font-bold text-foreground">{completedItems}</div>
                      <div className="text-sm text-muted-foreground">Completed</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <div className="text-2xl font-sans font-bold text-foreground">{totalItems - completedItems}</div>
                      <div className="text-sm text-muted-foreground">Remaining</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {progress === 100 && (
              <Card className="border-primary bg-gradient-to-r from-primary/10 to-accent/10 mb-8 shadow-lg">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="w-12 h-12 text-primary" />
                    </div>
                    <h3 className="text-3xl font-sans font-bold text-foreground mb-3">🎉 Congratulations!</h3>
                    <p className="text-muted-foreground text-lg mb-2">
                      You've successfully completed all checklist items for your business setup!
                    </p>
                    <p className="text-primary font-medium text-lg">
                      Your business is now ready for official operations. Access your premium features below.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                      size="lg"
                      variant="outline"
                      className="font-sans font-medium bg-white border-primary text-primary hover:bg-primary/5 shadow-sm"
                    >
                      <Download className="w-5 h-5 mr-2" />
                      Download Document Bundle
                    </Button>

                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="lg"
                            onClick={handleGenerateECard}
                            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-sans font-medium shadow-sm"
                          >
                            <CreditCard className="w-5 h-5 mr-2" />
                            Download e-Verified Card Premium Feature
                            <Info className="w-4 h-4 ml-2" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="max-w-xs">
                          <p>
                            Get your official BizEase Verified E-Card with QR for trust & validation (Premium
                            subscription feature)
                          </p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      <main className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8">
            {Object.entries(groupedChecklist).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-xl font-sans font-semibold text-foreground mb-6 flex items-center gap-3">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  {category}
                </h3>

                <div className="space-y-4">
                  {items.map((item) => (
                    <Card
                      key={item.id}
                      className={`border-2 transition-all duration-200 hover:shadow-lg ${
                        item.status === "completed"
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border bg-card hover:border-primary/40"
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="relative">
                            <div
                              className={`w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${
                                item.status === "completed"
                                  ? "bg-primary border-primary"
                                  : "border-primary/40 hover:border-primary hover:bg-primary/5"
                              }`}
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                const newStatus = item.status === "completed" ? "pending" : "completed"
                                console.log(
                                  "[v0] Checkbox clicked for item:",
                                  item.id,
                                  "current status:",
                                  item.status,
                                  "new status:",
                                  newStatus,
                                )
                                updateItemStatus(item.id, newStatus)
                              }}
                            >
                              {item.status === "completed" ? (
                                <CheckCircle2 className="w-5 h-5 text-white" />
                              ) : (
                                <div className="w-5 h-5" />
                              )}
                            </div>
                          </div>

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-sans font-bold text-foreground text-lg">{item.title}</h4>
                                  {item.priority === "high" && <Star className="w-5 h-5 text-accent" />}
                                </div>
                                <p className="text-muted-foreground mb-3 text-base">{item.description}</p>
                                {item.why_needed && (
                                  <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-3">
                                    <div className="flex items-start gap-2">
                                      <Info className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                                      <div>
                                        <p className="text-sm font-medium text-primary mb-1">Why this is needed:</p>
                                        <p className="text-sm text-primary/80">{item.why_needed}</p>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                {getStatusIcon(item.status)}
                                <Badge
                                  className={`${getPriorityColor(item.priority, item.is_required ?? true)} font-medium`}
                                >
                                  {item.priority === "high"
                                    ? "High Priority"
                                    : item.is_required
                                      ? "Required"
                                      : "Optional"}
                                </Badge>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                              <div className="flex items-center gap-2 text-sm">
                                <Clock className="w-4 h-4 text-primary" />
                                <span className="text-primary">Time:</span>
                                <span className="text-primary font-medium">{item.estimated_time}</span>
                              </div>
                              {item.cost_estimate && (
                                <div className="flex items-center gap-2 text-sm">
                                  <span className="text-primary">Cost:</span>
                                  <span className="text-primary font-medium">{item.cost_estimate}</span>
                                </div>
                              )}
                              {item.government_portal &&
                                item.government_portal !== "N/A (Private Banks)" &&
                                item.government_portal !== "N/A (Professional Services)" && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <ExternalLink className="w-4 h-4 text-primary" />
                                    <a
                                      href={item.government_portal}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary hover:text-primary/80 hover:underline font-medium"
                                    >
                                      Official Portal
                                    </a>
                                  </div>
                                )}
                            </div>

                            {item.documents_needed && item.documents_needed.length > 0 && (
                              <div className="mb-4">
                                <p className="text-sm font-medium text-primary mb-2">Documents Required:</p>
                                <div className="flex flex-wrap gap-2">
                                  {item.documents_needed.map((doc, index) => (
                                    <Badge
                                      key={index}
                                      variant="outline"
                                      className="text-xs bg-primary/10 text-primary border-primary/20"
                                    >
                                      {doc}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            )}

                            <div className="flex items-center gap-3">
                              {item.status !== "completed" && (
                                <Button
                                  size="sm"
                                  onClick={() => updateItemStatus(item.id, "completed")}
                                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-medium"
                                >
                                  Mark Complete
                                </Button>
                              )}
                              {item.status === "pending" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateItemStatus(item.id, "in-progress")}
                                  className="font-sans font-medium border-primary/40 text-primary hover:bg-primary/5"
                                >
                                  Mark In Progress
                                </Button>
                              )}
                              {item.status === "completed" && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => updateItemStatus(item.id, "pending")}
                                  className="font-sans font-medium"
                                >
                                  Reset
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="outline"
              size="lg"
              className="font-sans font-medium bg-white border-primary text-primary hover:bg-primary/5"
              disabled={progress < 100}
            >
              <Download className="w-5 h-5 mr-2" />
              Download PDF Bundle
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={handleGenerateECard}
              disabled={progress < 100}
              className="font-sans font-medium bg-white border-accent text-accent hover:bg-accent/5"
            >
              <CreditCard className="w-5 h-5 mr-2" />
              e-Card Business Download
            </Button>
            <Button
              size="lg"
              onClick={onComplete}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-medium"
            >
              Go to Dashboard
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              variant="outline"
              size="lg"
              className="font-sans font-medium bg-white hover:bg-primary/5 border-primary/20"
            >
              <BookOpen className="w-5 h-5 mr-2" />
              Workshops
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="font-sans font-medium bg-white hover:bg-primary/5 border-primary/20"
            >
              <Users className="w-5 h-5 mr-2" />
              Training
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="font-sans font-medium bg-white hover:bg-primary/5 border-primary/20"
            >
              <Phone className="w-5 h-5 mr-2" />
              Contact
            </Button>
          </div>
        </div>
      </footer>
    </div>
  )
}
