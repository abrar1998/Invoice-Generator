export interface LineItem {
  id: string
  particular: string
  quantity: number
  rate: number
  amount: number
}

export interface InvoiceData {
  companyName: string
  companyTagline: string
  companyAddress: string
  companyPhone: string
  companyWebsite: string
  companyLogo: string
  customerTitle: string
  customerName: string
  invoiceNumber: string
  invoiceDate: string
  lineItems: LineItem[]
  paymentReceived: number
  note: string
}

