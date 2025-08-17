"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  User,
  MapPin,
  Briefcase,
  Loader2,
  HelpCircle,
  AlertCircle,
  CheckCircle,
} from "lucide-react"
import { ChecklistDashboard } from "@/components/checklist-dashboard"
import { BusinessECard } from "@/components/business-ecard"
import { createBusiness, type BusinessData as ServerBusinessData } from "@/lib/actions"

interface BusinessData {
  businessName: string
  ownerName: string
  email: string
  phone: string
  businessType: string
  industry: string
  location: string
  employees: string
  businessSize: string
  turnover: string
  description: string
  address: string
  city: string
  state: string
  pincode: string
  isNewToBusiness: string
  existingRegistrations: string[]
  annualRevenue?: string
  plannedOperations: string
  hasPhysicalStore: string
  requiresSpecialLicense: string
  exportPlans: string
  onlineBusinessPlan: string
  existingTurnover: string
  currentChallenges: string[]
  priorityAreas: string[]
}

interface BusinessQuestionnaireProps {
  onBack: () => void
  onComplete?: (businessData: any) => void // Added completion callback
}

export function BusinessQuestionnaire({ onBack, onComplete }: BusinessQuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [showDashboard, setShowDashboard] = useState(false)
  const [showECard, setShowECard] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [createdBusiness, setCreatedBusiness] = useState<any>(null)
  const [businessData, setBusinessData] = useState<BusinessData>({
    businessName: "",
    ownerName: "",
    email: "",
    phone: "",
    businessType: "",
    industry: "",
    location: "",
    employees: "",
    businessSize: "",
    turnover: "",
    description: "",
    address: "",
    city: "Delhi",
    state: "Delhi",
    pincode: "",
    isNewToBusiness: "",
    existingRegistrations: [],
    annualRevenue: "",
    plannedOperations: "",
    hasPhysicalStore: "",
    requiresSpecialLicense: "",
    exportPlans: "",
    onlineBusinessPlan: "",
    existingTurnover: "",
    currentChallenges: [],
    priorityAreas: [],
  })

  const getTotalSteps = () => {
    let steps = 5 // Base steps
    if (businessData.isNewToBusiness === "yes") {
      steps += 1 // Add new business specific step
    } else if (businessData.isNewToBusiness === "no") {
      steps += 1 // Add existing business specific step
    }
    return steps
  }

  const totalSteps = getTotalSteps()
  const progress = (currentStep / totalSteps) * 100

  const updateBusinessData = (field: keyof BusinessData, value: string | string[]) => {
    setBusinessData((prev) => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const getIndustrySpecificRequirements = () => {
    const requirements = []
    switch (businessData.industry) {
      case "food-beverage":
        requirements.push("FSSAI License", "Health Department Clearance")
        break
      case "manufacturing":
        requirements.push("Pollution Clearance", "Factory License", "Fire Safety Certificate")
        break
      case "healthcare":
        requirements.push("Medical Council Registration", "Drug License")
        break
      case "education":
        requirements.push("Education Department Approval", "Fire Safety Certificate")
        break
      case "finance":
        requirements.push("RBI Approval", "SEBI Registration")
        break
      default:
        requirements.push("Trade License", "Shop & Establishment License")
    }
    return requirements
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    setSubmitError(null)

    try {
      const serverData: ServerBusinessData = {
        businessName: businessData.businessName,
        businessType: businessData.businessType,
        industry: businessData.industry,
        ownerName: businessData.ownerName,
        email: businessData.email,
        phone: businessData.phone,
        address: businessData.address || `${businessData.location}, Delhi`,
        city: businessData.city,
        state: businessData.state,
        pincode: businessData.pincode || "110001",
        employeeCount: businessData.employees,
        annualRevenue: businessData.turnover || businessData.annualRevenue,
      }

      const business = await createBusiness(serverData)
      setCreatedBusiness(business)

      if (onComplete) {
        onComplete({ ...businessData, businessId: business.id })
      } else {
        setShowDashboard(true)
      }
    } catch (error) {
      console.error("Failed to create business:", error)
      setSubmitError(error instanceof Error ? error.message : "Failed to create business")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackFromDashboard = () => {
    setShowDashboard(false)
  }

  const handleGenerateECard = () => {
    setShowECard(true)
  }

  const handleBackFromECard = () => {
    setShowECard(false)
  }

  if (showECard) {
    return <BusinessECard businessData={businessData} businessId={createdBusiness?.id} onBack={handleBackFromECard} />
  }

  if (showDashboard) {
    return (
      <ChecklistDashboard
        businessData={businessData}
        onBack={handleBackFromDashboard}
        onGenerateECard={handleGenerateECard}
      />
    )
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-sans font-bold text-foreground mb-2">Basic Information</h2>
              <p className="text-muted-foreground">Let's start with your business and personal details</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  placeholder="Enter your business name"
                  value={businessData.businessName}
                  onChange={(e) => updateBusinessData("businessName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ownerName">Owner Name *</Label>
                <Input
                  id="ownerName"
                  placeholder="Enter owner's full name"
                  value={businessData.ownerName}
                  onChange={(e) => updateBusinessData("ownerName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={businessData.email}
                  onChange={(e) => updateBusinessData("email", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  placeholder="Enter phone number"
                  value={businessData.phone}
                  onChange={(e) => updateBusinessData("phone", e.target.value)}
                />
              </div>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-sans font-bold text-foreground mb-2">Business Type & Industry</h2>
              <p className="text-muted-foreground">Help us understand your business structure and industry</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Structure *</Label>
                <Select
                  value={businessData.businessType}
                  onValueChange={(value) => updateBusinessData("businessType", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                    <SelectItem value="partnership">Partnership</SelectItem>
                    <SelectItem value="llp">Limited Liability Partnership (LLP)</SelectItem>
                    <SelectItem value="private-limited">Private Limited Company</SelectItem>
                    <SelectItem value="public-limited">Public Limited Company</SelectItem>
                    <SelectItem value="opc">One Person Company (OPC)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry *</Label>
                <Select value={businessData.industry} onValueChange={(value) => updateBusinessData("industry", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology & Software</SelectItem>
                    <SelectItem value="retail">Retail & E-commerce</SelectItem>
                    <SelectItem value="food-beverage">Food & Beverage</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="services">Professional Services</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="finance">Finance & Insurance</SelectItem>
                    <SelectItem value="real-estate">Real Estate</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {businessData.industry && (
              <Card className="bg-blue-50 border-blue-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-blue-600" />
                    <CardTitle className="text-base text-blue-800">Industry-Specific Requirements</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-blue-700 mb-3">
                    Based on your industry selection, you may need these additional licenses:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {getIndustrySpecificRequirements().map((req) => (
                      <Badge key={req} variant="outline" className="text-xs border-blue-300 text-blue-700">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-sans font-bold text-foreground mb-2">Location & Size</h2>
              <p className="text-muted-foreground">Tell us about your business location and size</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location">Business Location *</Label>
                <Select value={businessData.location} onValueChange={(value) => updateBusinessData("location", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location in Delhi" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="central-delhi">Central Delhi</SelectItem>
                    <SelectItem value="north-delhi">North Delhi</SelectItem>
                    <SelectItem value="south-delhi">South Delhi</SelectItem>
                    <SelectItem value="east-delhi">East Delhi</SelectItem>
                    <SelectItem value="west-delhi">West Delhi</SelectItem>
                    <SelectItem value="new-delhi">New Delhi</SelectItem>
                    <SelectItem value="north-west-delhi">North West Delhi</SelectItem>
                    <SelectItem value="south-west-delhi">South West Delhi</SelectItem>
                    <SelectItem value="south-east-delhi">South East Delhi</SelectItem>
                    <SelectItem value="north-east-delhi">North East Delhi</SelectItem>
                    <SelectItem value="shahdara">Shahdara</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessSize">Business Size *</Label>
                <Select
                  value={businessData.businessSize}
                  onValueChange={(value) => updateBusinessData("businessSize", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select business size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="micro">Micro (Up to ₹1 Crore turnover)</SelectItem>
                    <SelectItem value="small">Small (₹1-10 Crore turnover)</SelectItem>
                    <SelectItem value="medium">Medium (₹10-50 Crore turnover)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="employees">Number of Employees *</Label>
                <Select
                  value={businessData.employees}
                  onValueChange={(value) => updateBusinessData("employees", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select employee count" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Just me (1)</SelectItem>
                    <SelectItem value="2-5">Small team (2-5)</SelectItem>
                    <SelectItem value="6-10">Growing team (6-10)</SelectItem>
                    <SelectItem value="11-50">Medium business (11-50)</SelectItem>
                    <SelectItem value="51-200">Large business (51-200)</SelectItem>
                    <SelectItem value="200+">Enterprise (200+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="turnover">Expected Annual Turnover *</Label>
                <Select value={businessData.turnover} onValueChange={(value) => updateBusinessData("turnover", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select expected turnover" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="below-25-lakhs">Below ₹25 Lakhs</SelectItem>
                    <SelectItem value="25-lakhs-1-crore">₹25 Lakhs - ₹1 Crore</SelectItem>
                    <SelectItem value="1-5-crore">₹1 - ₹5 Crore</SelectItem>
                    <SelectItem value="5-10-crore">₹5 - ₹10 Crore</SelectItem>
                    <SelectItem value="above-10-crore">Above ₹10 Crore</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Will you have a physical store/office? *</Label>
                <RadioGroup
                  value={businessData.hasPhysicalStore}
                  onValueChange={(value) => updateBusinessData("hasPhysicalStore", value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="physical-yes" />
                    <Label htmlFor="physical-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="physical-no" />
                    <Label htmlFor="physical-no">No (Online only)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Do you plan to sell online? *</Label>
                <RadioGroup
                  value={businessData.onlineBusinessPlan}
                  onValueChange={(value) => updateBusinessData("onlineBusinessPlan", value)}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="yes" id="online-yes" />
                    <Label htmlFor="online-yes">Yes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="online-no" />
                    <Label htmlFor="online-no">No</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
        )

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-sans font-bold text-foreground mb-2">Business Experience</h2>
              <p className="text-muted-foreground">Help us customize your checklist based on your experience</p>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <Label className="text-base font-medium">Are you new to business setup? *</Label>
                <RadioGroup
                  value={businessData.isNewToBusiness}
                  onValueChange={(value) => updateBusinessData("isNewToBusiness", value)}
                  className="space-y-3"
                >
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-accent/5">
                    <RadioGroupItem value="yes" id="new-yes" />
                    <Label htmlFor="new-yes" className="flex-1 cursor-pointer">
                      <div className="font-medium">Yes, I'm new to business setup</div>
                      <div className="text-sm text-muted-foreground">
                        I need guidance on all required documents and processes
                      </div>
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 p-4 border border-border rounded-lg hover:bg-accent/5">
                    <RadioGroupItem value="no" id="new-no" />
                    <Label htmlFor="new-no" className="flex-1 cursor-pointer">
                      <div className="font-medium">No, I have business setup experience</div>
                      <div className="text-sm text-muted-foreground">
                        I may already have some registrations and need advanced guidance
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              {businessData.isNewToBusiness === "no" && (
                <div className="space-y-4 p-6 bg-accent/5 rounded-lg border border-accent/20">
                  <Label className="text-base font-medium">Existing Registrations (Select all that apply)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { id: "pan", label: "PAN Card" },
                      { id: "gst", label: "GST Registration" },
                      { id: "udyam", label: "Udyam Registration" },
                      { id: "trade-license", label: "Trade License" },
                      { id: "shop-establishment", label: "Shop & Establishment License" },
                      { id: "fssai", label: "FSSAI License" },
                      { id: "pollution-clearance", label: "Pollution Clearance" },
                      { id: "fire-safety", label: "Fire Safety Certificate" },
                    ].map((registration) => (
                      <div key={registration.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={registration.id}
                          checked={businessData.existingRegistrations.includes(registration.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateBusinessData("existingRegistrations", [
                                ...businessData.existingRegistrations,
                                registration.id,
                              ])
                            } else {
                              updateBusinessData(
                                "existingRegistrations",
                                businessData.existingRegistrations.filter((id) => id !== registration.id),
                              )
                            }
                          }}
                        />
                        <Label htmlFor={registration.id} className="text-sm cursor-pointer">
                          {registration.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )

      case 5:
        if (businessData.isNewToBusiness === "yes") {
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-2">New Business Planning</h2>
                <p className="text-muted-foreground">Tell us about your business plans and priorities</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="plannedOperations">Describe your planned business operations *</Label>
                  <Textarea
                    id="plannedOperations"
                    placeholder="Briefly describe what your business will do, products/services you'll offer..."
                    value={businessData.plannedOperations}
                    onChange={(e) => updateBusinessData("plannedOperations", e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-medium">What are your priority areas? (Select all that apply)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { id: "quick-setup", label: "Quick business setup" },
                      { id: "cost-effective", label: "Cost-effective registration" },
                      { id: "compliance", label: "Legal compliance guidance" },
                      { id: "tax-benefits", label: "Tax benefits and schemes" },
                      { id: "funding", label: "Funding and investment guidance" },
                      { id: "digital-presence", label: "Digital presence setup" },
                    ].map((priority) => (
                      <div key={priority.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={priority.id}
                          checked={businessData.priorityAreas.includes(priority.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateBusinessData("priorityAreas", [...businessData.priorityAreas, priority.id])
                            } else {
                              updateBusinessData(
                                "priorityAreas",
                                businessData.priorityAreas.filter((id) => id !== priority.id),
                              )
                            }
                          }}
                        />
                        <Label htmlFor={priority.id} className="text-sm cursor-pointer">
                          {priority.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        } else if (businessData.isNewToBusiness === "no") {
          return (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-2xl font-sans font-bold text-foreground mb-2">Existing Business Details</h2>
                <p className="text-muted-foreground">Help us understand your current business situation</p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="existingTurnover">Current Annual Turnover *</Label>
                  <Select
                    value={businessData.existingTurnover}
                    onValueChange={(value) => updateBusinessData("existingTurnover", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select current turnover" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="below-25-lakhs">Below ₹25 Lakhs</SelectItem>
                      <SelectItem value="25-lakhs-1-crore">₹25 Lakhs - ₹1 Crore</SelectItem>
                      <SelectItem value="1-5-crore">₹1 - ₹5 Crore</SelectItem>
                      <SelectItem value="5-10-crore">₹5 - ₹10 Crore</SelectItem>
                      <SelectItem value="above-10-crore">Above ₹10 Crore</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  <Label className="text-base font-medium">Current business challenges (Select all that apply)</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { id: "compliance-issues", label: "Compliance and legal issues" },
                      { id: "tax-optimization", label: "Tax optimization" },
                      { id: "license-renewals", label: "License renewals" },
                      { id: "expansion-planning", label: "Business expansion planning" },
                      { id: "digital-transformation", label: "Digital transformation" },
                      { id: "funding-growth", label: "Funding for growth" },
                    ].map((challenge) => (
                      <div key={challenge.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={challenge.id}
                          checked={businessData.currentChallenges.includes(challenge.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              updateBusinessData("currentChallenges", [...businessData.currentChallenges, challenge.id])
                            } else {
                              updateBusinessData(
                                "currentChallenges",
                                businessData.currentChallenges.filter((id) => id !== challenge.id),
                              )
                            }
                          }}
                        />
                        <Label htmlFor={challenge.id} className="text-sm cursor-pointer">
                          {challenge.label}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )
        }
        // Fall through to review step if no specific experience selected
        return null

      case totalSteps:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-sans font-bold text-foreground mb-2">Review & Submit</h2>
              <p className="text-muted-foreground">Review your information and generate your personalized checklist</p>
            </div>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-lg font-sans">Business Summary</CardTitle>
                <CardDescription>Review your information before generating your checklist</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Business:</span>
                      <span className="font-medium">{businessData.businessName || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Owner:</span>
                      <span className="font-medium">{businessData.ownerName || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Type:</span>
                      <Badge variant="secondary">{businessData.businessType || "Not selected"}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Industry:</span>
                      <Badge variant="outline">{businessData.industry || "Not selected"}</Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Location:</span>
                      <span className="font-medium">{businessData.location || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Size:</span>
                      <Badge variant="secondary">{businessData.businessSize || "Not selected"}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Employees:</span>
                      <span className="font-medium">{businessData.employees || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Experience:</span>
                      <Badge variant={businessData.isNewToBusiness === "yes" ? "default" : "secondary"}>
                        {businessData.isNewToBusiness === "yes" ? "New to Business" : "Experienced"}
                      </Badge>
                    </div>
                  </div>
                </div>
                {businessData.isNewToBusiness === "no" && businessData.existingRegistrations.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <span className="text-muted-foreground text-sm">Existing Registrations:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {businessData.existingRegistrations.map((reg) => (
                        <Badge key={reg} variant="outline" className="text-xs">
                          {reg.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {businessData.isNewToBusiness === "yes" && businessData.priorityAreas.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <span className="text-muted-foreground text-sm">Priority Areas:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {businessData.priorityAreas.map((area) => (
                        <Badge key={area} variant="outline" className="text-xs">
                          {area.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                {businessData.isNewToBusiness === "no" && businessData.currentChallenges.length > 0 && (
                  <div className="pt-4 border-t border-border">
                    <span className="text-muted-foreground text-sm">Current Challenges:</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {businessData.currentChallenges.map((challenge) => (
                        <Badge key={challenge} variant="outline" className="text-xs">
                          {challenge.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )

      default:
        return null
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return businessData.businessName && businessData.ownerName && businessData.email && businessData.phone
      case 2:
        return businessData.businessType && businessData.industry
      case 3:
        return (
          businessData.location &&
          businessData.businessSize &&
          businessData.employees &&
          businessData.turnover &&
          businessData.hasPhysicalStore &&
          businessData.onlineBusinessPlan
        )
      case 4:
        return businessData.isNewToBusiness
      case 5:
        if (businessData.isNewToBusiness === "yes") {
          return businessData.plannedOperations && businessData.priorityAreas.length > 0
        } else if (businessData.isNewToBusiness === "no") {
          return businessData.existingTurnover && businessData.currentChallenges.length > 0
        }
        return true
      case totalSteps:
        return true
      default:
        return false
    }
  }

  return (
    <div className="min-h-screen bg-background">
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
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-sans font-bold text-foreground">BizEase</span>
            </div>
          </div>
        </div>
      </header>

      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-foreground">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      </div>

      <main className="py-8 px-4">
        <div className="container mx-auto max-w-2xl">
          <Card className="border-border">
            <CardContent className="p-8">
              {submitError && (
                <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <p className="text-destructive text-sm">{submitError}</p>
                </div>
              )}
              {renderStep()}
            </CardContent>
          </Card>

          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1 || isSubmitting}
              className="font-sans font-medium bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            {currentStep === totalSteps ? (
              <Button
                onClick={handleSubmit}
                disabled={!isStepValid() || isSubmitting}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-medium"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Business...
                  </>
                ) : (
                  <>
                    Generate Personalized Checklist
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            ) : (
              <Button
                onClick={nextStep}
                disabled={!isStepValid() || isSubmitting}
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-medium"
              >
                Next Step
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
