"use server"

import { createClient } from "@/lib/supabase/server"

export interface BusinessData {
  businessName: string
  businessType: string
  industry: string
  ownerName: string
  email: string
  phone: string
  address: string
  city: string
  state: string
  pincode: string
  employeeCount: string
  annualRevenue?: string
}

export async function createBusiness(businessData: BusinessData) {
  const supabase = createClient()

  // Generate registration ID
  const registrationId = `BIZ${Date.now()}${Math.random().toString(36).substr(2, 4).toUpperCase()}`

  // Insert business data without user_id requirement
  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .insert({
      business_name: businessData.businessName,
      business_type: businessData.businessType,
      industry: businessData.industry,
      owner_name: businessData.ownerName,
      email: businessData.email,
      phone: businessData.phone,
      address: businessData.address,
      city: businessData.city,
      state: businessData.state,
      pincode: businessData.pincode,
      employee_count: businessData.employeeCount,
      annual_revenue: businessData.annualRevenue,
      registration_id: registrationId,
      status: "pending",
    })
    .select()
    .single()

  if (businessError) {
    throw new Error(`Failed to create business: ${businessError.message}`)
  }

  // Generate checklist items based on business data
  const checklistItems = generateChecklistItems(businessData)

  const checklistInserts = checklistItems.map((item) => ({
    business_id: business.id,
    title: item.title,
    description: item.description,
    category: item.category,
    estimated_time: item.estimatedTime,
    status: "pending",
  }))

  const { error: checklistError } = await supabase.from("checklist_items").insert(checklistInserts)

  if (checklistError) {
    throw new Error(`Failed to create checklist items: ${checklistError.message}`)
  }

  return business
}

export async function getBusinessByRegistrationId(registrationId: string) {
  const supabase = createClient()

  const { data: business, error } = await supabase
    .from("businesses")
    .select("*")
    .eq("registration_id", registrationId)
    .single()

  if (error) {
    throw new Error(`Failed to get business: ${error.message}`)
  }

  return business
}

export async function updateChecklistItemStatus(itemId: string, status: string) {
  const supabase = createClient()

  const { error } = await supabase
    .from("checklist_items")
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq("id", itemId)

  if (error) {
    throw new Error(`Failed to update checklist item: ${error.message}`)
  }
}

export async function generateECard(businessId: string) {
  const supabase = createClient()

  // Get business data
  const { data: business, error: businessError } = await supabase
    .from("businesses")
    .select("*")
    .eq("id", businessId)
    .single()

  if (businessError || !business) {
    throw new Error("Business not found")
  }

  // Create e-card data
  const cardData = {
    businessName: business.business_name,
    ownerName: business.owner_name,
    registrationId: business.registration_id,
    businessType: business.business_type,
    industry: business.industry,
    city: business.city,
    state: business.state,
    issuedDate: new Date().toISOString(),
    validityDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(), // 1 year validity
  }

  const qrCodeData = {
    registrationId: business.registration_id,
    businessName: business.business_name,
    status: "verified",
    validUntil: cardData.validityDate,
  }

  const { data: eCard, error: eCardError } = await supabase
    .from("business_ecards")
    .insert({
      business_id: businessId,
      qr_data: qrCodeData,
      validity_date: cardData.validityDate,
    })
    .select()
    .single()

  if (eCardError) {
    throw new Error(`Failed to generate e-card: ${eCardError.message}`)
  }

  return { ...eCard, cardData }
}

export async function getChecklistItems(businessId: string) {
  const supabase = createClient()

  const { data: items, error } = await supabase
    .from("checklist_items")
    .select("*")
    .eq("business_id", businessId)
    .order("created_at", { ascending: true })

  if (error) {
    throw new Error(`Failed to get checklist items: ${error.message}`)
  }

  return items
}

function generateChecklistItems(businessData: BusinessData) {
  const baseItems = [
    {
      title: "PAN Card Application",
      description: "Apply for Permanent Account Number for your business",
      category: "Tax Registration",
      estimatedTime: "7-15 days",
      required: true,
    },
    {
      title: "GST Registration",
      description: "Register for Goods and Services Tax if annual turnover exceeds ₹20 lakhs",
      category: "Tax Registration",
      estimatedTime: "3-7 days",
      required: businessData.annualRevenue === "above-40-lakhs",
    },
    {
      title: "Shop and Establishment License",
      description: "Mandatory license for commercial establishments in Delhi",
      category: "Business License",
      estimatedTime: "15-30 days",
      required: true,
    },
  ]

  // Add business type specific items
  if (businessData.businessType === "private-limited") {
    baseItems.push({
      title: "Certificate of Incorporation",
      description: "Incorporate your private limited company with MCA",
      category: "Business Registration",
      estimatedTime: "15-20 days",
      required: true,
    })
  }

  if (businessData.businessType === "partnership") {
    baseItems.push({
      title: "Partnership Deed Registration",
      description: "Register partnership deed with local registrar",
      category: "Business Registration",
      estimatedTime: "7-10 days",
      required: true,
    })
  }

  // Add industry specific items
  if (businessData.industry === "food-beverage") {
    baseItems.push({
      title: "FSSAI License",
      description: "Food Safety and Standards Authority license for food businesses",
      category: "Industry License",
      estimatedTime: "30-60 days",
      required: true,
    })
  }

  if (businessData.industry === "technology") {
    baseItems.push({
      title: "Startup India Registration",
      description: "Register with Startup India for tax benefits and support",
      category: "Government Schemes",
      estimatedTime: "7-14 days",
      required: false,
    })
  }

  return baseItems
}
