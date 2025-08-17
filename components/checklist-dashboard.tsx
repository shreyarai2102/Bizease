"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
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
} from "lucide-react"
import { updateChecklistItemStatus, getChecklistItems } from "@/lib/actions"
import { v4 as uuidv4 } from "uuid"

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

interface ChecklistDashboardProps {
  businessData: BusinessData
  onBack: () => void
  onGenerateECard: () => void
}

export function ChecklistDashboard({ businessData, onBack, onGenerateECard }: ChecklistDashboardProps) {
  const [checklist, setChecklist] = useState<ChecklistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchChecklistData = async () => {
      try {
        setLoading(true)
        setError(null)

        if (businessData.businessId) {
          const items = await getChecklistItems(businessData.businessId)
          setChecklist(
            items.map((item) => ({
              ...item,
              is_required: item.is_required ?? true,
              priority: "medium" as const,
            })),
          )
        } else {
          setChecklist(generatePersonalizedChecklist(businessData))
        }
      } catch (err) {
        console.error("Error fetching checklist:", err)
        setError(err instanceof Error ? err.message : "Failed to load checklist")

        setChecklist(generatePersonalizedChecklist(businessData))
      } finally {
        setLoading(false)
      }
    }

    fetchChecklistData()
  }, [businessData])

  const generatePersonalizedChecklist = (data: BusinessData): ChecklistItem[] => {
    const generateUUID = () => uuidv4()
    const businessId = data.businessId || generateUUID()
    const items: ChecklistItem[] = []

    const baseRequirements = [
      {
        id: generateUUID(),
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
        id: generateUUID(),
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

    if (!data.existingRegistrations?.includes("pan")) {
      items.push(baseRequirements[0])
    }
    items.push(baseRequirements[1])

    if (data.businessType === "private-limited" || data.businessType === "public-limited") {
      items.push({
        id: generateUUID(),
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
    } else if (data.businessType === "llp") {
      items.push({
        id: generateUUID(),
        title: "LLP Registration",
        description: "Register Limited Liability Partnership",
        category: "Business Registration",
        estimated_time: "7-10 days",
        priority: "high" as const,
        is_required: true,
        government_portal: "https://www.mca.gov.in/",
        documents_needed: ["DIN", "DSC", "LLP Agreement"],
        cost_estimate: "₹2,000-₹5,000",
        why_needed: "Legal formation for LLP structure",
      })
    }

    const shouldRequireGST =
      data.businessType !== "sole-proprietorship" ||
      data.turnover === "above-10-crore" ||
      data.turnover === "5-10-crore" ||
      data.businessSize === "medium"

    if (!data.existingRegistrations?.includes("gst") && shouldRequireGST) {
      items.push({
        id: generateUUID(),
        title: "GST Registration",
        description: "Goods and Services Tax registration for tax compliance",
        category: "Tax Registration",
        estimated_time: "3-7 days",
        priority: "high" as const,
        is_required: shouldRequireGST,
        government_portal: "https://www.gst.gov.in/",
        documents_needed: ["PAN", "Aadhaar", "Business Address Proof"],
        cost_estimate: "Free",
        why_needed: "Mandatory for businesses with turnover above ₹40 lakhs or certain business types",
      })
    }

    switch (data.industry) {
      case "food-beverage":
        if (!data.existingRegistrations?.includes("fssai")) {
          items.push({
            id: generateUUID(),
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
        break

      case "manufacturing":
        items.push({
          id: generateUUID(),
          title: "Factory License",
          description: "License to operate manufacturing facility",
          category: "Industry License",
          estimated_time: "30-45 days",
          priority: "high" as const,
          is_required: true,
          government_portal: "https://labour.gov.in/",
          documents_needed: ["Factory Plan", "Power Connection", "Water Connection"],
          cost_estimate: "₹2,000-₹10,000",
          why_needed: "Required for manufacturing operations under Factories Act",
        })

        if (!data.existingRegistrations?.includes("pollution-clearance")) {
          items.push({
            id: generateUUID(),
            title: "Pollution Clearance Certificate",
            description: "Environmental clearance for manufacturing operations",
            category: "Environmental Compliance",
            estimated_time: "45-60 days",
            priority: "high" as const,
            is_required: true,
            government_portal: "https://parivesh.nic.in/",
            documents_needed: ["Project Report", "Site Plan", "Environmental Impact Assessment"],
            cost_estimate: "₹10,000-₹50,000",
            why_needed: "Mandatory for manufacturing units to prevent environmental pollution",
          })
        }
        break

      case "healthcare":
        items.push({
          id: generateUUID(),
          title: "Medical Council Registration",
          description: "Registration with respective medical council",
          category: "Professional License",
          estimated_time: "30-60 days",
          priority: "high" as const,
          is_required: true,
          government_portal: "https://www.nmc.org.in/",
          documents_needed: ["Medical Degree", "Experience Certificate", "Character Certificate"],
          cost_estimate: "₹5,000-₹15,000",
          why_needed: "Mandatory for healthcare practitioners and facilities",
        })
        break

      case "education":
        items.push({
          id: generateUUID(),
          title: "Education Department Approval",
          description: "Approval from state education department",
          category: "Educational License",
          estimated_time: "60-90 days",
          priority: "high" as const,
          is_required: true,
          government_portal: "https://www.education.gov.in/",
          documents_needed: ["Infrastructure Details", "Faculty Qualifications", "Curriculum"],
          cost_estimate: "₹10,000-₹25,000",
          why_needed: "Required for educational institutions and training centers",
        })
        break
    }

    if (data.hasPhysicalStore === "yes") {
      if (!data.existingRegistrations?.includes("trade-license")) {
        items.push({
          id: generateUUID(),
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
      }

      if (!data.existingRegistrations?.includes("shop-establishment")) {
        items.push({
          id: generateUUID(),
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

      if (!data.existingRegistrations?.includes("fire-safety")) {
        items.push({
          id: generateUUID(),
          title: "Fire Safety Certificate",
          description: "Fire department clearance for business premises",
          category: "Safety Compliance",
          estimated_time: "15-30 days",
          priority: "medium" as const,
          is_required: data.employees !== "1",
          government_portal: "https://dfs.delhi.gov.in/",
          documents_needed: ["Building Plan", "Fire Safety Measures", "NOC"],
          cost_estimate: "₹1,000-₹5,000",
          why_needed: "Required for commercial premises with employees for safety compliance",
        })
      }
    }

    if (data.onlineBusinessPlan === "yes") {
      items.push({
        id: generateUUID(),
        title: "Digital Signature Certificate",
        description: "DSC for online business transactions and filings",
        category: "Digital Infrastructure",
        estimated_time: "1-3 days",
        priority: "medium" as const,
        is_required: false,
        government_portal: "https://www.cca.gov.in/",
        documents_needed: ["PAN Card", "Aadhaar Card", "Photograph"],
        cost_estimate: "₹800-₹2,000",
        why_needed: "Required for digital transactions and online government filings",
      })
    }

    if (
      !data.existingRegistrations?.includes("udyam") &&
      (data.businessSize === "micro" || data.businessSize === "small")
    ) {
      items.push({
        id: generateUUID(),
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
    }

    if (data.isNewToBusiness === "yes" && data.priorityAreas) {
      if (data.priorityAreas.includes("tax-benefits")) {
        items.push({
          id: generateUUID(),
          title: "Startup India Registration",
          description: "Register under Startup India initiative for tax benefits",
          category: "Government Schemes",
          estimated_time: "7-15 days",
          priority: "medium" as const,
          is_required: false,
          government_portal: "https://www.startupindia.gov.in/",
          documents_needed: ["Incorporation Certificate", "Business Plan", "Funding Details"],
          cost_estimate: "Free",
          why_needed: "Tax exemptions and government support for eligible startups",
        })
      }

      if (data.priorityAreas.includes("funding")) {
        items.push({
          id: generateUUID(),
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
      }
    }

    if (data.isNewToBusiness === "no" && data.currentChallenges) {
      if (data.currentChallenges.includes("compliance-issues")) {
        items.push({
          id: generateUUID(),
          title: "Compliance Audit",
          description: "Professional audit of current compliance status",
          category: "Professional Services",
          estimated_time: "7-14 days",
          priority: "high" as const,
          is_required: false,
          government_portal: "N/A (Professional Services)",
          documents_needed: ["All Business Documents", "Financial Records"],
          cost_estimate: "₹10,000-₹25,000",
          why_needed: "Identify and resolve compliance gaps to avoid penalties",
        })
      }

      if (data.currentChallenges.includes("tax-optimization")) {
        items.push({
          id: generateUUID(),
          title: "Tax Structure Review",
          description: "Review and optimize current tax structure",
          category: "Professional Services",
          estimated_time: "10-15 days",
          priority: "medium" as const,
          is_required: false,
          government_portal: "N/A (Professional Services)",
          documents_needed: ["Tax Returns", "Financial Statements", "Business Structure"],
          cost_estimate: "₹15,000-₹30,000",
          why_needed: "Optimize tax liability and improve financial efficiency",
        })
      }
    }

    return items.map((item) => ({
      ...item,
      status: "pending" as const,
      business_id: businessId,
    }))
  }

  const updateItemStatus = async (id: string, status: ChecklistItem["status"]) => {
    try {
      await updateChecklistItemStatus(id, status)

      setChecklist((prev) => prev.map((item) => (item.id === id ? { ...item, status } : item)))
    } catch (error) {
      console.error("Failed to update checklist item:", error)
      setError("Failed to update item status")
    }
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

  const getPriorityIcon = (priority: string) => {
    if (priority === "high") {
      return <Star className="w-4 h-4 text-red-600" />
    }
    return null
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
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Questionnaire
              </Button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-sans font-bold text-foreground">BizEase</span>
            </div>
          </div>
        </div>
      </header>

      {/* Error Display */}
      {error && (
        <div className="bg-destructive/10 border-b border-destructive/20 px-4 py-3">
          <div className="container mx-auto max-w-4xl">
            <p className="text-destructive text-sm">{error}</p>
          </div>
        </div>
      )}

      {/* Progress Overview */}
      <section className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
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

            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xl font-sans font-bold text-foreground">
                  Personalized Checklist for {businessData.businessName}
                </h2>
                <span className="text-sm font-medium text-foreground">{Math.round(progress)}% Complete</span>
              </div>
              <Progress value={progress} className="h-3" />
            </div>

            {progress === 100 && (
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-8 h-8 text-green-600" />
                      <div>
                        <h3 className="font-sans font-semibold text-green-800">Congratulations!</h3>
                        <p className="text-sm text-green-700">All requirements completed. Ready for verification.</p>
                      </div>
                    </div>
                    <Button
                      onClick={onGenerateECard}
                      className="bg-green-600 hover:bg-green-700 text-white font-sans font-medium"
                    >
                      Generate E-Card
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </section>

      {/* Checklist */}
      <main className="py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8">
            {Object.entries(groupedChecklist).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-lg font-sans font-semibold text-foreground mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  {category}
                </h3>

                <div className="space-y-4">
                  {items.map((item) => (
                    <Card key={item.id} className="border-border hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <Checkbox
                            checked={item.status === "completed"}
                            onCheckedChange={(checked) => updateItemStatus(item.id, checked ? "completed" : "pending")}
                            className="mt-1"
                          />

                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-sans font-semibold text-foreground">{item.title}</h4>
                                  {getPriorityIcon(item.priority)}
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                                {item.why_needed && (
                                  <p className="text-xs text-blue-600 bg-blue-50 p-2 rounded border border-blue-200 mb-2">
                                    <strong>Why needed:</strong> {item.why_needed}
                                  </p>
                                )}
                              </div>
                              <div className="flex items-center gap-2">
                                {getStatusIcon(item.status)}
                                <Badge className={getPriorityColor(item.priority, item.is_required ?? true)}>
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
                                <Clock className="w-4 h-4 text-muted-foreground" />
                                <span className="text-muted-foreground">Time:</span>
                                <span className="text-foreground">{item.estimated_time}</span>
                              </div>
                              {item.cost_estimate && (
                                <div className="flex items-center gap-2 text-sm">
                                  <span className="text-muted-foreground">Cost:</span>
                                  <span className="text-foreground">{item.cost_estimate}</span>
                                </div>
                              )}
                              {item.government_portal &&
                                item.government_portal !== "N/A (Private Banks)" &&
                                item.government_portal !== "N/A (Professional Services)" && (
                                  <div className="flex items-center gap-2 text-sm">
                                    <ExternalLink className="w-4 h-4 text-muted-foreground" />
                                    <a
                                      href={item.government_portal}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-primary hover:underline"
                                    >
                                      Official Portal
                                    </a>
                                  </div>
                                )}
                            </div>

                            {item.documents_needed && item.documents_needed.length > 0 && (
                              <div className="mb-4">
                                <p className="text-sm font-medium text-foreground mb-2">Documents Required:</p>
                                <div className="flex flex-wrap gap-2">
                                  {item.documents_needed.map((doc, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
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
                                  variant="outline"
                                  onClick={() => updateItemStatus(item.id, "in-progress")}
                                  className="font-sans font-medium bg-transparent"
                                >
                                  Mark In Progress
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

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" size="lg" className="font-sans font-medium bg-transparent">
              <Download className="w-5 h-5 mr-2" />
              Download Checklist PDF
            </Button>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-medium"
              disabled={progress < 100}
              onClick={onGenerateECard}
            >
              Generate Verification E-Card
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
