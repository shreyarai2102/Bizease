"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, User, Settings, FileText, Shield, Award, Edit, Save, Calendar, LogOut, Home } from "lucide-react"

interface ProfileSectionProps {
  onBack: () => void
  onSignOut: () => void
}

export function ProfileSection({ onBack, onSignOut }: ProfileSectionProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    businessName: "Tech Solutions Pvt Ltd",
    businessType: "Technology",
    location: "Delhi",
    bio: "Entrepreneur passionate about technology and innovation.",
  })

  const handleSave = () => {
    setIsEditing(false)
    // Here you would typically save to database
    console.log("[v0] Profile data saved:", profileData)
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
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="sm" onClick={onBack} className="font-sans font-medium">
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
              <Button variant="ghost" size="sm" className="font-sans font-medium bg-accent/10 text-accent">
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
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="py-8 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Profile Header */}
          <div className="bg-card rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h1 className="text-2xl font-sans font-bold text-foreground">{profileData.name}</h1>
                  <p className="text-muted-foreground">{profileData.businessName}</p>
                  <Badge className="mt-1 bg-green-100 text-green-800 border-green-200">Verified Business Owner</Badge>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
                  className="font-sans font-medium"
                >
                  {isEditing ? <Save className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
                  {isEditing ? "Save Changes" : "Edit Profile"}
                </Button>
                <Button
                  variant="outline"
                  onClick={onSignOut}
                  className="font-sans font-medium text-red-600 border-red-200 hover:bg-red-50 bg-transparent"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            </div>

            {/* Profile Form */}
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profileData.name}
                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="businessName">Business Name</Label>
                  <Input
                    id="businessName"
                    value={profileData.businessName}
                    onChange={(e) => setProfileData({ ...profileData, businessName: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="businessType">Business Type</Label>
                  <Input
                    id="businessType"
                    value={profileData.businessType}
                    onChange={(e) => setProfileData({ ...profileData, businessType: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    value={profileData.location}
                    onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                  <p className="text-foreground">{profileData.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                  <p className="text-foreground">{profileData.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Business Type</Label>
                  <p className="text-foreground">{profileData.businessType}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Location</Label>
                  <p className="text-foreground">{profileData.location}</p>
                </div>
                <div className="md:col-span-2">
                  <Label className="text-sm font-medium text-muted-foreground">Bio</Label>
                  <p className="text-foreground">{profileData.bio}</p>
                </div>
              </div>
            )}
          </div>

          {/* Profile Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-border">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <Settings className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg font-sans">Account Settings</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Update your personal information, contact details, and account preferences.
                </CardDescription>
                <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                  Manage Settings
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <FileText className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg font-sans">My Businesses</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  View and manage all your registered businesses, track their status, and access documents.
                </CardDescription>
                <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                  View Businesses
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-lg font-sans">Verification Status</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Check your verification status, download e-cards, and manage compliance certificates.
                </CardDescription>
                <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                  View Status
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-3">
                  <Award className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle className="text-lg font-sans">Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Track your milestones, earn badges, and celebrate your entrepreneurial journey.
                </CardDescription>
                <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                  View Achievements
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-3">
                  <FileText className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-lg font-sans">Document Vault</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Securely store and access all your business documents, certificates, and licenses.
                </CardDescription>
                <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                  Access Vault
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-3">
                  <Calendar className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg font-sans">Calendar Sync</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Sync important deadlines and appointments with your calendar applications.
                </CardDescription>
                <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                  Setup Sync
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
