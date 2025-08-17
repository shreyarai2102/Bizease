"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, ArrowRight, CheckCircle, FileText, Loader2, Zap } from "lucide-react"

interface DigiLockerLoginProps {
  onLoginSuccess: (userData: any) => void
  onDemoAccess: () => void
}

export function DigiLockerLogin({ onLoginSuccess, onDemoAccess }: DigiLockerLoginProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [loginStep, setLoginStep] = useState<"initial" | "redirecting" | "verifying">("initial")

  const handleDigiLockerLogin = async () => {
    setIsLoading(true)
    setLoginStep("redirecting")

    setTimeout(() => {
      setLoginStep("verifying")
      setTimeout(() => {
        // Mock successful DigiLocker verification with user data
        const userData = {
          name: "Rajesh Kumar",
          aadhaarNumber: "****-****-1234",
          mobile: "+91 9876543210",
          email: "rajesh.kumar@email.com",
          address: "New Delhi, Delhi",
          isVerified: true,
          verificationDate: new Date().toISOString(),
        }
        onLoginSuccess(userData)
        setIsLoading(false)
      }, 2000)
    }, 1500)
  }

  if (loginStep === "redirecting") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-xl font-sans">Redirecting to DigiLocker</CardTitle>
            <CardDescription>You will be redirected to DigiLocker for secure identity verification</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-sm text-muted-foreground">Please wait...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (loginStep === "verifying") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-xl font-sans">Verifying Identity</CardTitle>
            <CardDescription>Processing your DigiLocker verification details</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
            <p className="text-sm text-muted-foreground">Almost done...</p>
          </CardContent>
        </Card>
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
              <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-sans font-bold text-foreground">BizEase</h1>
              </div>
            </div>
            <Badge variant="secondary" className="bg-accent/10 text-accent border-accent/20">
              Delhi Portal
            </Badge>
          </div>
        </div>
      </header>

      {/* Login Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-2xl">
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              Secure Government Authentication
            </Badge>
            <h1 className="text-4xl md:text-5xl font-sans font-bold text-foreground mb-6">
              Set up your business <span className="text-primary">smartly & digitally</span> ⚡
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Login with DigiLocker for secure identity verification and personalized business setup guidance.
            </p>
          </div>

          <div className="grid gap-6 mb-8">
            {/* Primary DigiLocker Login */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-sans">Login with DigiLocker</CardTitle>
                    <CardDescription>Recommended - Secure government authentication</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Instant identity verification</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Auto-fill personal details</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>Government-grade security</span>
                  </div>
                  <Button
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-sans font-semibold"
                    onClick={handleDigiLockerLogin}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 w-5 h-5 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        Login with DigiLocker
                        <ArrowRight className="ml-2 w-5 h-5" />
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Demo Access */}
            <Card className="border-border">
              <CardHeader>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <FileText className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-sans">Explore Demo</CardTitle>
                    <CardDescription>Limited access - Try before you register</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>View sample questionnaire</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>Explore dashboard features</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-accent" />
                    <span>No personal data required</span>
                  </div>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full font-sans font-semibold bg-transparent"
                    onClick={onDemoAccess}
                  >
                    Explore Demo
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-2xl font-sans font-bold text-primary mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Secure Authentication</div>
            </div>
            <div>
              <div className="text-2xl font-sans font-bold text-primary mb-1">1000+</div>
              <div className="text-sm text-muted-foreground">Verified Businesses</div>
            </div>
            <div>
              <div className="text-2xl font-sans font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto max-w-2xl">
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button variant="ghost" size="sm" className="font-sans font-medium">
              Contact
            </Button>
            <Button variant="ghost" size="sm" className="font-sans font-medium">
              Terms
            </Button>
            <Button variant="ghost" size="sm" className="font-sans font-medium">
              Privacy
            </Button>
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              © 2024 BizEase. All rights reserved. | Powered by Government of Delhi
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
