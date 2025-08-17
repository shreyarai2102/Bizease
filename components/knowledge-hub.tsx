"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  Building2,
  Search,
  ExternalLink,
  Star,
  TrendingUp,
  Shield,
  Gift,
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  Lightbulb,
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
}

interface Recommendation {
  id: string
  title: string
  description: string
  category: "scheme" | "license" | "benefit" | "resource"
  priority: "high" | "medium" | "low"
  eligibility: string[]
  benefits: string[]
  applicationProcess: string
  timeline: string
  amount?: string
  link: string
  tags: string[]
}

interface KnowledgeHubProps {
  businessData?: BusinessData
  onBack: () => void
}

export function KnowledgeHub({ businessData, onBack }: KnowledgeHubProps) {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const generateRecommendations = () => {
      const baseRecommendations: Recommendation[] = [
        // Government Schemes
        {
          id: "msme-registration",
          title: "MSME Registration",
          description: "Micro, Small and Medium Enterprises registration for various benefits and subsidies",
          category: "scheme",
          priority: "high",
          eligibility: ["Investment in plant & machinery up to ₹50 crore", "Annual turnover up to ₹250 crore"],
          benefits: [
            "Priority sector lending",
            "Collateral-free loans",
            "Lower interest rates",
            "Government tender preferences",
          ],
          applicationProcess: "Online registration through Udyam portal with Aadhaar and business details",
          timeline: "Instant registration",
          link: "https://udyamregistration.gov.in/",
          tags: ["MSME", "Registration", "Benefits", "Loans"],
        },
        {
          id: "startup-india",
          title: "Startup India Scheme",
          description: "Government initiative to promote entrepreneurship and innovation",
          category: "scheme",
          priority: "high",
          eligibility: [
            "Company incorporated within 10 years",
            "Annual turnover less than ₹100 crore",
            "Working on innovation/improvement",
          ],
          benefits: [
            "Tax exemptions for 3 years",
            "Fast-track patent examination",
            "Self-certification compliance",
            "Fund of funds access",
          ],
          applicationProcess: "Register on Startup India portal with incorporation certificate and business plan",
          timeline: "2-4 weeks",
          link: "https://www.startupindia.gov.in/",
          tags: ["Startup", "Tax Benefits", "Innovation", "Funding"],
        },
        {
          id: "pmegp-scheme",
          title: "PMEGP (Prime Minister's Employment Generation Programme)",
          description: "Credit-linked subsidy scheme for generating employment opportunities",
          category: "scheme",
          priority: "medium",
          eligibility: [
            "Age 18+ years",
            "Educational qualification: Class VIII pass",
            "For existing units: at least 50% new investment",
          ],
          benefits: [
            "15-35% subsidy on project cost",
            "Maximum subsidy ₹15 lakh (manufacturing) / ₹7.5 lakh (service)",
            "Easy loan approval",
          ],
          applicationProcess: "Apply through KVIC/KVIB/DIC with project report and documents",
          timeline: "45-60 days",
          amount: "Up to ₹15 lakh subsidy",
          link: "https://www.kviconline.gov.in/pmegpeportal/",
          tags: ["Employment", "Subsidy", "Manufacturing", "Service"],
        },
      ]

      // Add industry-specific recommendations
      if (businessData?.industry === "technology") {
        baseRecommendations.push(
          {
            id: "software-technology-park",
            title: "Software Technology Park (STP) Scheme",
            description: "Export promotion scheme for software development and services",
            category: "scheme",
            priority: "high",
            eligibility: ["Software development/services", "Export-oriented units", "Minimum export commitment"],
            benefits: [
              "100% export obligation",
              "Duty-free import of capital goods",
              "Income tax benefits",
              "Single window clearance",
            ],
            applicationProcess: "Apply to STP authority with business plan and export projections",
            timeline: "30-45 days",
            link: "https://www.stpi.in/",
            tags: ["Software", "Export", "Tax Benefits", "Technology"],
          },
          {
            id: "digital-india-land-records",
            title: "Digital India Land Records Modernization",
            description: "Technology solutions for land records digitization",
            category: "resource",
            priority: "medium",
            eligibility: ["Technology companies", "GIS/mapping expertise", "Government project experience"],
            benefits: ["Government contracts", "Recurring revenue", "Social impact", "Technology showcase"],
            applicationProcess: "Participate in government tenders through GeM portal",
            timeline: "Tender-based",
            link: "https://gem.gov.in/",
            tags: ["Government", "Technology", "Contracts", "Digital India"],
          },
        )
      }

      if (businessData?.industry === "food") {
        baseRecommendations.push(
          {
            id: "food-processing-scheme",
            title: "PM Formalization of Micro Food Processing Enterprises (PM FME)",
            description: "Scheme to formalize micro food processing enterprises",
            category: "scheme",
            priority: "high",
            eligibility: [
              "Micro food processing enterprises",
              "Individual/FPO/SHG/Cooperative",
              "Existing or new units",
            ],
            benefits: [
              "35% credit-linked subsidy",
              "Maximum ₹10 lakh per beneficiary",
              "Skill development support",
              "Marketing support",
            ],
            applicationProcess: "Apply through state implementing agencies with project details",
            timeline: "60-90 days",
            amount: "Up to ₹10 lakh subsidy",
            link: "https://www.mofpi.gov.in/",
            tags: ["Food Processing", "Subsidy", "Micro Enterprise", "Formalization"],
          },
          {
            id: "organic-certification",
            title: "National Programme for Organic Production (NPOP)",
            description: "Certification scheme for organic food products",
            category: "license",
            priority: "medium",
            eligibility: ["Organic food producers", "Processing units", "Export-oriented businesses"],
            benefits: ["Premium pricing", "Export opportunities", "Consumer trust", "Government support"],
            applicationProcess: "Apply through accredited certification bodies with organic compliance documents",
            timeline: "45-60 days",
            link: "https://www.apeda.gov.in/",
            tags: ["Organic", "Certification", "Export", "Premium"],
          },
        )
      }

      if (businessData?.industry === "manufacturing") {
        baseRecommendations.push(
          {
            id: "pli-scheme",
            title: "Production Linked Incentive (PLI) Scheme",
            description: "Incentive scheme to boost domestic manufacturing",
            category: "scheme",
            priority: "high",
            eligibility: [
              "Manufacturing companies",
              "Minimum investment thresholds",
              "Production targets",
              "Quality standards",
            ],
            benefits: [
              "4-6% incentive on incremental sales",
              "Boost to domestic manufacturing",
              "Job creation",
              "Technology upgradation",
            ],
            applicationProcess: "Apply through respective ministry portals with investment and production plans",
            timeline: "90-120 days",
            amount: "4-6% of incremental sales",
            link: "https://www.pli.gov.in/",
            tags: ["Manufacturing", "Incentive", "Production", "Investment"],
          },
          {
            id: "zed-certification",
            title: "Zero Defect Zero Effect (ZED) Certification",
            description: "Quality and environmental certification for MSMEs",
            category: "license",
            priority: "medium",
            eligibility: ["Manufacturing MSMEs", "Quality management systems", "Environmental compliance"],
            benefits: ["Quality recognition", "Market access", "Cost reduction", "Sustainability credentials"],
            applicationProcess: "Apply through QCI with quality and environmental documentation",
            timeline: "60-90 days",
            link: "https://www.zed.org.in/",
            tags: ["Quality", "Environment", "MSME", "Certification"],
          },
        )
      }

      // Add location-specific schemes for Delhi
      if (businessData?.location?.includes("delhi")) {
        baseRecommendations.push(
          {
            id: "delhi-startup-policy",
            title: "Delhi Startup Policy 2.0",
            description: "Delhi government initiative to promote startups and innovation",
            category: "scheme",
            priority: "high",
            eligibility: ["Startups registered in Delhi", "Innovative business model", "Job creation potential"],
            benefits: [
              "Seed funding up to ₹20 lakh",
              "Reimbursement of patent costs",
              "Marketing support",
              "Incubation facilities",
            ],
            applicationProcess: "Apply through Delhi Startup portal with business plan and innovation details",
            timeline: "30-45 days",
            amount: "Up to ₹20 lakh seed funding",
            link: "https://startup.delhi.gov.in/",
            tags: ["Delhi", "Startup", "Funding", "Innovation"],
          },
          {
            id: "delhi-one-stop-shop",
            title: "Delhi One Stop Shop",
            description: "Single window clearance for business approvals in Delhi",
            category: "resource",
            priority: "medium",
            eligibility: ["All businesses in Delhi", "New registrations", "License renewals"],
            benefits: [
              "Single window clearance",
              "Reduced processing time",
              "Online tracking",
              "Simplified procedures",
            ],
            applicationProcess: "Apply online through Delhi government portal with required documents",
            timeline: "15-30 days",
            link: "https://delhioss.delhi.gov.in/",
            tags: ["Delhi", "Clearance", "Licenses", "Single Window"],
          },
        )
      }

      // Add employee-based recommendations
      if (businessData?.employees && businessData.employees !== "1") {
        baseRecommendations.push({
          id: "skill-development-scheme",
          title: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY)",
          description: "Skill development scheme for workforce enhancement",
          category: "benefit",
          priority: "medium",
          eligibility: ["Employers with training needs", "Youth aged 15-45 years", "Industry-relevant skills"],
          benefits: ["Free skill training", "Certification", "Monetary rewards", "Job placement assistance"],
          applicationProcess: "Register through PMKVY portal and partner with training providers",
          timeline: "Ongoing program",
          link: "https://www.pmkvyofficial.org/",
          tags: ["Skill Development", "Training", "Employment", "Certification"],
        })
      }

      return baseRecommendations
    }

    setTimeout(() => {
      setRecommendations(generateRecommendations())
      setLoading(false)
    }, 1000)
  }, [businessData])

  const filteredRecommendations = recommendations.filter((rec) => {
    const matchesSearch =
      searchQuery === "" ||
      rec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rec.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesTab = activeTab === "all" || rec.category === activeTab

    return matchesSearch && matchesTab
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "scheme":
        return <Gift className="w-5 h-5" />
      case "license":
        return <Shield className="w-5 h-5" />
      case "benefit":
        return <Star className="w-5 h-5" />
      case "resource":
        return <Lightbulb className="w-5 h-5" />
      default:
        return <FileText className="w-5 h-5" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Lightbulb className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-sans font-semibold text-foreground mb-2">Generating Recommendations</h2>
          <p className="text-muted-foreground">Analyzing your business profile for relevant schemes and benefits...</p>
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

      {/* Hero Section */}
      <section className="py-8 px-4 bg-card border-b border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-sans font-bold text-foreground mb-4">Knowledge Hub</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover government schemes, subsidies, and additional licenses tailored for your business
            </p>
          </div>

          {businessData && (
            <Card className="max-w-2xl mx-auto border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-sans font-semibold text-foreground">{businessData.businessName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {businessData.industry.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())} •{" "}
                      {businessData.location.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                    </p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    {filteredRecommendations.length} Recommendations
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-6 px-4 border-b border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search schemes, benefits, licenses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="grid w-full grid-cols-5 md:w-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="scheme">Schemes</TabsTrigger>
                <TabsTrigger value="license">Licenses</TabsTrigger>
                <TabsTrigger value="benefit">Benefits</TabsTrigger>
                <TabsTrigger value="resource">Resources</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      <main className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {filteredRecommendations.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-sans font-semibold text-foreground mb-2">No recommendations found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredRecommendations.map((rec) => (
                <Card key={rec.id} className="border-border hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          {getCategoryIcon(rec.category)}
                        </div>
                        <div>
                          <CardTitle className="text-lg font-sans">{rec.title}</CardTitle>
                          <CardDescription className="text-sm">
                            {rec.category.charAt(0).toUpperCase() + rec.category.slice(1)}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className={getPriorityColor(rec.priority)}>{rec.priority}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{rec.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Benefits */}
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Key Benefits
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {rec.benefits.slice(0, 3).map((benefit, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-600 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Timeline and Amount */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-muted-foreground">Timeline</p>
                          <p className="font-medium text-foreground">{rec.timeline}</p>
                        </div>
                      </div>
                      {rec.amount && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-muted-foreground">Amount</p>
                            <p className="font-medium text-foreground">{rec.amount}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {rec.tags.slice(0, 4).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                      <Button
                        size="sm"
                        asChild
                        className="bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-medium"
                      >
                        <a href={rec.link} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Apply Now
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" className="font-sans font-medium bg-transparent">
                        Learn More
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
