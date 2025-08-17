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
  TrendingUp,
  Shield,
  Gift,
  FileText,
  DollarSign,
  Clock,
  CheckCircle,
  Zap,
  MapPin,
} from "lucide-react"

interface GovernmentSchemesProps {
  onBack: () => void
}

interface Scheme {
  id: string
  title: string
  description: string
  category: "msme" | "startup" | "subsidy" | "tax-benefit" | "license"
  priority: "high" | "medium" | "low"
  eligibility: string[]
  benefits: string[]
  applicationProcess: string
  timeline: string
  amount?: string
  link: string
  tags: string[]
  ministry: string
  location: "delhi" | "pan-india"
}

export function GovernmentSchemes({ onBack }: GovernmentSchemesProps) {
  const [schemes, setSchemes] = useState<Scheme[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    const generateSchemes = (): Scheme[] => {
      return [
        // MSME Schemes
        {
          id: "msme-registration",
          title: "MSME Registration (Udyam)",
          description: "Micro, Small and Medium Enterprises registration for various benefits and subsidies",
          category: "msme",
          priority: "high",
          eligibility: ["Investment in plant & machinery up to ₹50 crore", "Annual turnover up to ₹250 crore"],
          benefits: [
            "Priority sector lending",
            "Collateral-free loans up to ₹2 crore",
            "Lower interest rates (7-8%)",
            "Government tender preferences",
            "Subsidy eligibility for various schemes",
          ],
          applicationProcess: "Online registration through Udyam portal with Aadhaar and business details",
          timeline: "Instant registration",
          link: "https://udyamregistration.gov.in/",
          tags: ["MSME", "Registration", "Benefits", "Loans"],
          ministry: "Ministry of MSME",
          location: "pan-india",
        },
        {
          id: "pmegp-scheme",
          title: "PMEGP (Prime Minister's Employment Generation Programme)",
          description: "Credit-linked subsidy scheme for generating employment opportunities",
          category: "subsidy",
          priority: "high",
          eligibility: [
            "Age 18+ years",
            "Educational qualification: Class VIII pass",
            "For existing units: at least 50% new investment",
          ],
          benefits: [
            "15-35% subsidy on project cost",
            "Maximum subsidy ₹15 lakh (manufacturing) / ₹7.5 lakh (service)",
            "Easy loan approval through banks",
            "Single window clearance",
          ],
          applicationProcess: "Apply through KVIC/KVIB/DIC with project report and documents",
          timeline: "45-60 days",
          amount: "Up to ₹15 lakh subsidy",
          link: "https://www.kviconline.gov.in/pmegpeportal/",
          tags: ["Employment", "Subsidy", "Manufacturing", "Service"],
          ministry: "Ministry of MSME",
          location: "pan-india",
        },

        // Startup Schemes
        {
          id: "startup-india",
          title: "Startup India Scheme",
          description: "Government initiative to promote entrepreneurship and innovation",
          category: "startup",
          priority: "high",
          eligibility: [
            "Company incorporated within 10 years",
            "Annual turnover less than ₹100 crore",
            "Working on innovation/improvement of existing products",
          ],
          benefits: [
            "Tax exemptions for 3 consecutive years",
            "Fast-track patent examination (80% fee reduction)",
            "Self-certification under 9 labor & environment laws",
            "Fund of funds access (₹10,000 crore corpus)",
            "Government procurement relaxation",
          ],
          applicationProcess: "Register on Startup India portal with incorporation certificate and business plan",
          timeline: "2-4 weeks",
          link: "https://www.startupindia.gov.in/",
          tags: ["Startup", "Tax Benefits", "Innovation", "Funding"],
          ministry: "Department for Promotion of Industry and Internal Trade",
          location: "pan-india",
        },
        {
          id: "delhi-startup-policy",
          title: "Delhi Startup Policy 2.0",
          description: "Delhi government initiative to promote startups and innovation ecosystem",
          category: "startup",
          priority: "high",
          eligibility: ["Startups registered in Delhi", "Innovative business model", "Job creation potential"],
          benefits: [
            "Seed funding up to ₹20 lakh",
            "100% reimbursement of patent costs",
            "Marketing support up to ₹2 lakh",
            "Free incubation facilities",
            "Mentorship programs",
          ],
          applicationProcess: "Apply through Delhi Startup portal with business plan and innovation details",
          timeline: "30-45 days",
          amount: "Up to ₹20 lakh seed funding",
          link: "https://startup.delhi.gov.in/",
          tags: ["Delhi", "Startup", "Funding", "Innovation"],
          ministry: "Government of Delhi",
          location: "delhi",
        },

        // Tax Benefits
        {
          id: "section-80iac",
          title: "Section 80-IAC Tax Deduction",
          description: "100% tax deduction for eligible startups for 3 consecutive years",
          category: "tax-benefit",
          priority: "high",
          eligibility: [
            "Startup India registered companies",
            "Incorporated after 1st April 2016",
            "Annual turnover less than ₹100 crore",
          ],
          benefits: [
            "100% tax deduction for 3 years",
            "Can choose any 3 consecutive years out of first 10 years",
            "Significant cost savings",
            "Improved cash flow",
          ],
          applicationProcess: "File ITR with startup recognition certificate and choose eligible years",
          timeline: "During ITR filing",
          amount: "100% tax exemption",
          link: "https://www.incometax.gov.in/",
          tags: ["Tax Deduction", "Startup", "Income Tax", "Savings"],
          ministry: "Ministry of Finance",
          location: "pan-india",
        },
        {
          id: "section-54gb",
          title: "Section 54GB Capital Gains Exemption",
          description: "Capital gains tax exemption for investments in eligible startups",
          category: "tax-benefit",
          priority: "medium",
          eligibility: [
            "Individual/HUF with long-term capital gains",
            "Investment in eligible startup within specified time",
            "Startup should be engaged in eligible business",
          ],
          benefits: [
            "100% capital gains tax exemption",
            "Investment limit up to ₹50 lakh",
            "Lock-in period of 5 years",
            "Promotes startup ecosystem",
          ],
          applicationProcess: "Invest in eligible startup and claim exemption during ITR filing",
          timeline: "During ITR filing",
          amount: "Up to ₹50 lakh investment",
          link: "https://www.incometax.gov.in/",
          tags: ["Capital Gains", "Investment", "Tax Exemption", "Startup"],
          ministry: "Ministry of Finance",
          location: "pan-india",
        },

        // Subsidies
        {
          id: "cgtmse-scheme",
          title: "CGTMSE (Credit Guarantee Trust for Micro and Small Enterprises)",
          description: "Collateral-free loans for micro and small enterprises",
          category: "subsidy",
          priority: "high",
          eligibility: [
            "Micro and Small Enterprises",
            "Manufacturing: investment up to ₹10 crore",
            "Service: investment up to ₹5 crore",
          ],
          benefits: [
            "Collateral-free loans up to ₹2 crore",
            "85% guarantee coverage for loans up to ₹5 lakh",
            "75% guarantee coverage for loans above ₹5 lakh",
            "Easier loan approval process",
          ],
          applicationProcess: "Apply through member lending institutions (banks/NBFCs)",
          timeline: "30-45 days",
          amount: "Up to ₹2 crore guarantee",
          link: "https://www.cgtmse.in/",
          tags: ["Guarantee", "Collateral Free", "MSME", "Loans"],
          ministry: "Ministry of MSME",
          location: "pan-india",
        },
        {
          id: "technology-upgradation",
          title: "Technology Upgradation Fund Scheme (TUFS)",
          description: "Subsidized credit for technology upgradation in textile industry",
          category: "subsidy",
          priority: "medium",
          eligibility: [
            "Textile and jute industry units",
            "Technology upgradation projects",
            "Minimum investment criteria",
          ],
          benefits: [
            "5% interest subvention",
            "15% capital subsidy for specified machinery",
            "Additional benefits for technical textiles",
            "Improved competitiveness",
          ],
          applicationProcess: "Apply through implementing agencies with project details",
          timeline: "60-90 days",
          amount: "5% interest subvention + 15% capital subsidy",
          link: "https://www.texmin.nic.in/",
          tags: ["Technology", "Textile", "Upgradation", "Subsidy"],
          ministry: "Ministry of Textiles",
          location: "pan-india",
        },

        // Licenses and Certifications
        {
          id: "iso-certification-support",
          title: "ISO Certification Reimbursement Scheme",
          description: "Financial assistance for ISO certification to MSMEs",
          category: "license",
          priority: "medium",
          eligibility: ["MSME registered units", "First-time ISO certification", "Valid Udyam registration"],
          benefits: [
            "75% reimbursement of certification cost",
            "Maximum reimbursement ₹2 lakh",
            "Enhanced market credibility",
            "Export opportunities",
          ],
          applicationProcess: "Apply through DC-MSME office with certification documents",
          timeline: "45-60 days",
          amount: "Up to ₹2 lakh reimbursement",
          link: "https://msme.gov.in/",
          tags: ["ISO", "Certification", "Quality", "Reimbursement"],
          ministry: "Ministry of MSME",
          location: "pan-india",
        },
        {
          id: "delhi-single-window",
          title: "Delhi Single Window System",
          description: "Unified platform for all business approvals and licenses in Delhi",
          category: "license",
          priority: "high",
          eligibility: ["All businesses operating in Delhi", "New registrations", "License renewals"],
          benefits: [
            "Single window clearance for 70+ services",
            "Reduced processing time (15-30 days)",
            "Online application and tracking",
            "Transparent process",
          ],
          applicationProcess: "Apply online through Delhi government portal with required documents",
          timeline: "15-30 days",
          link: "https://delhioss.delhi.gov.in/",
          tags: ["Delhi", "Single Window", "Licenses", "Clearance"],
          ministry: "Government of Delhi",
          location: "delhi",
        },
      ]
    }

    setTimeout(() => {
      setSchemes(generateSchemes())
      setLoading(false)
    }, 1000)
  }, [])

  const filteredSchemes = schemes.filter((scheme) => {
    const matchesSearch =
      searchQuery === "" ||
      scheme.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scheme.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    const matchesTab = activeTab === "all" || scheme.category === activeTab

    return matchesSearch && matchesTab
  })

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "msme":
        return <Building2 className="w-5 h-5" />
      case "startup":
        return <Zap className="w-5 h-5" />
      case "subsidy":
        return <Gift className="w-5 h-5" />
      case "tax-benefit":
        return <DollarSign className="w-5 h-5" />
      case "license":
        return <Shield className="w-5 h-5" />
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
            <Gift className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-xl font-sans font-semibold text-foreground mb-2">Loading Government Schemes</h2>
          <p className="text-muted-foreground">Fetching latest schemes and benefits for your business...</p>
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
                <Zap className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-sans font-bold text-foreground">BizEase</span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 px-4 bg-card border-b border-border">
        <div className="container mx-auto max-w-6xl text-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Gift className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl font-sans font-bold text-foreground mb-4">Government Schemes & Benefits</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover MSME schemes, startup benefits, subsidies, and tax advantages available for businesses in Delhi and
            across India
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Building2 className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-sans font-semibold text-foreground mb-1">MSME Schemes</h3>
              <p className="text-sm text-muted-foreground">Registration & benefits</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Zap className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-sans font-semibold text-foreground mb-1">Startup Benefits</h3>
              <p className="text-sm text-muted-foreground">Tax exemptions & funding</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Gift className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-sans font-semibold text-foreground mb-1">Subsidies</h3>
              <p className="text-sm text-muted-foreground">Financial assistance</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-sans font-semibold text-foreground mb-1">Tax Benefits</h3>
              <p className="text-sm text-muted-foreground">Deductions & exemptions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="py-6 px-4 border-b border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search schemes, subsidies, tax benefits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
              <TabsList className="grid w-full grid-cols-6 md:w-auto">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="msme">MSME</TabsTrigger>
                <TabsTrigger value="startup">Startup</TabsTrigger>
                <TabsTrigger value="subsidy">Subsidy</TabsTrigger>
                <TabsTrigger value="tax-benefit">Tax</TabsTrigger>
                <TabsTrigger value="license">License</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Schemes Grid */}
      <main className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {filteredSchemes.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-sans font-semibold text-foreground mb-2">No schemes found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredSchemes.map((scheme) => (
                <Card key={scheme.id} className="border-border hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                          {getCategoryIcon(scheme.category)}
                        </div>
                        <div>
                          <CardTitle className="text-lg font-sans">{scheme.title}</CardTitle>
                          <CardDescription className="text-sm flex items-center gap-2">
                            {scheme.ministry}
                            {scheme.location === "delhi" && (
                              <Badge variant="outline" className="text-xs">
                                <MapPin className="w-3 h-3 mr-1" />
                                Delhi
                              </Badge>
                            )}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className={getPriorityColor(scheme.priority)}>{scheme.priority}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{scheme.description}</p>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    {/* Benefits */}
                    <div>
                      <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4" />
                        Key Benefits
                      </h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {scheme.benefits.slice(0, 3).map((benefit, index) => (
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
                          <p className="font-medium text-foreground">{scheme.timeline}</p>
                        </div>
                      </div>
                      {scheme.amount && (
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-muted-foreground" />
                          <div>
                            <p className="text-muted-foreground">Amount</p>
                            <p className="font-medium text-foreground">{scheme.amount}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {scheme.tags.slice(0, 4).map((tag, index) => (
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
                        <a href={scheme.link} target="_blank" rel="noopener noreferrer">
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
