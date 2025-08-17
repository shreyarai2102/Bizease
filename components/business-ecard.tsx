"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Download, Share2, User, Loader2 } from "lucide-react"
import { generateECard } from "@/lib/actions"

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

interface BusinessECardProps {
  businessData: BusinessData
  businessId?: string
  onBack: () => void
}

export function BusinessECard({ businessData, businessId, onBack }: BusinessECardProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const [eCardData, setECardData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const cardData = {
    businessName: businessData.businessName || "Business Name",
    ownerName: businessData.ownerName || "Owner Name",
    registrationId: eCardData?.card_data?.registrationId || `BZ${Date.now().toString().slice(-8)}`,
    state: "Delhi",
    validity: "12/2026",
  }

  useEffect(() => {
    const fetchOrGenerateECard = async () => {
      try {
        setLoading(true)
        setError(null)

        if (businessId) {
          const eCard = await generateECard(businessId)
          setECardData(eCard)
        } else {
          setECardData({
            card_data: {
              registrationId: `BZ${Date.now().toString().slice(-8)}`,
            },
            qr_code_data: JSON.stringify({
              registrationId: `BZ${Date.now().toString().slice(-8)}`,
              businessName: businessData.businessName,
              status: "verified",
              validUntil: "12/2026",
            }),
          })
        }
      } catch (err) {
        console.error("Error generating e-card:", err)
        setError(err instanceof Error ? err.message : "Failed to generate e-card")
        setECardData({
          card_data: { registrationId: `BZ${Date.now().toString().slice(-8)}` },
          qr_code_data: JSON.stringify({ registrationId: `BZ${Date.now().toString().slice(-8)}`, status: "verified" }),
        })
      } finally {
        setLoading(false)
      }
    }

    fetchOrGenerateECard()
  }, [businessData, businessId])

  const downloadECard = async () => {
    setIsGenerating(true)
    // Simulate PDF generation
    setTimeout(() => {
      alert("E-Card PDF download would start here. This is a demo implementation.")
      setIsGenerating(false)
    }, 2000)
  }

  const shareECard = async () => {
    const verificationUrl = `https://bizease.delhi.gov.in/verify/${cardData.registrationId}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${cardData.businessName} - BizEase Verified`,
          text: `${cardData.businessName} is verified by BizEase Delhi Portal`,
          url: verificationUrl,
        })
      } catch (error) {
        console.log("Error sharing:", error)
      }
    } else {
      navigator.clipboard.writeText(verificationUrl)
      alert("Verification URL copied to clipboard!")
    }
  }

  const qrData = {
    registrationId: cardData.registrationId,
    businessName: cardData.businessName,
    status: "verified",
    validUntil: cardData.validity,
  }
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(JSON.stringify(qrData))}`

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-sky-600 mx-auto mb-4" />
          <p className="text-slate-600">Generating your e-card...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Button variant="ghost" onClick={onBack} className="text-slate-700 hover:text-slate-900 hover:bg-white/50">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Button>
        </div>

        <div ref={cardRef} className="mb-8">
          <Card className="w-full max-w-2xl mx-auto bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white shadow-2xl rounded-2xl overflow-hidden border-0">
            <CardContent className="p-8 relative">
              {/* Background decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-center mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-lg">⚡</span>
                    </div>
                    <div>
                      <h1 className="text-xl font-bold">BizEase</h1>
                      <p className="text-xs text-blue-200 uppercase tracking-wide">VERIFIED BUSINESS</p>
                    </div>
                  </div>
                </div>

                {/* Main content */}
                <div className="flex items-start justify-between gap-8">
                  {/* Left side - Photo and business info */}
                  <div className="flex items-start gap-6">
                    {/* Circular photo placeholder */}
                    <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center border-2 border-white/30 flex-shrink-0">
                      <User className="w-12 h-12 text-white/80" />
                    </div>

                    {/* Business information */}
                    <div className="space-y-2">
                      <h2 className="text-xl font-bold leading-tight">{cardData.businessName}</h2>
                      <p className="text-blue-100 text-base">{cardData.ownerName}</p>
                      <p className="text-blue-100 text-sm">Registration No: {cardData.registrationId}</p>
                      <p className="text-blue-100 text-sm">State: {cardData.state}</p>
                      <p className="text-blue-100 text-sm">Validity Date = {cardData.validity}</p>
                    </div>
                  </div>

                  {/* Right side - QR Code */}
                  <div className="text-center flex-shrink-0">
                    <p className="text-xs text-blue-200 mb-2 uppercase tracking-wide">Unique Verificating</p>
                    <div className="w-24 h-24 bg-white rounded-lg p-2">
                      <img
                        src={qrCodeUrl || "/placeholder.svg"}
                        alt="Verification QR Code"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            size="lg"
            onClick={downloadECard}
            disabled={isGenerating}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Generating PDF...
              </>
            ) : (
              <>
                <Download className="w-5 h-5 mr-2" />
                Download E-Card
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={shareECard}
            className="border-2 border-blue-600 text-blue-700 hover:bg-blue-50 font-semibold px-8 py-3 rounded-xl bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <Share2 className="w-5 h-5 mr-2" />
            Share E-Card
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={onBack}
            className="border-2 border-slate-400 text-slate-600 hover:bg-slate-50 font-semibold px-8 py-3 rounded-xl bg-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Dashboard
          </Button>
        </div>
      </div>
    </div>
  )
}
