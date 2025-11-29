import { useState } from 'react'
import './App.css'
import InvoiceEditor from './components/InvoiceEditor'
import InvoicePreview from './components/InvoicePreview'
import type { InvoiceData, LineItem } from './types'

function App() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    companyName: 'AmazeWeb Solutions',
    companyTagline: 'Simplifying Business World',
    companyAddress: 'Chandiloora Tangmarg near vision library',
    companyPhone: '9906545900 / 9858392856',
    companyWebsite: 'https://amazewebsolutions.vercel.app/',
    companyLogo: '/AmazeWeblogo.png',
    customerTitle: 'Mr',
    customerName: 'Customer Name',
    invoiceNumber: '001',
    invoiceDate: new Date().toISOString().split('T')[0],
    lineItems: [
      {
        id: '1',
        particular: '',
        quantity: 1,
        rate: 0,
        amount: 0
      }
    ],
    paymentReceived: 0,
    note: 'Computer generated invoice, signature not required.'
  })

  const [logoFileName, setLogoFileName] = useState<string>('No file chosen')

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setInvoiceData(prev => ({
          ...prev,
          companyLogo: reader.result as string
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (field: keyof InvoiceData, value: string | number) => {
    setInvoiceData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleLineItemChange = (id: string, field: keyof LineItem, value: string | number) => {
    setInvoiceData(prev => ({
      ...prev,
      lineItems: prev.lineItems.map(item => {
        if (item.id === id) {
          const updated = { ...item, [field]: value }
          if (field === 'quantity' || field === 'rate') {
            updated.amount = updated.quantity * updated.rate
          }
          return updated
        }
        return item
      })
    }))
  }

  const addLineItem = () => {
    setInvoiceData(prev => ({
      ...prev,
      lineItems: [
        ...prev.lineItems,
        {
          id: Date.now().toString(),
          particular: '',
          quantity: 1,
          rate: 0,
          amount: 0
        }
      ]
    }))
  }

  const removeLineItem = (id: string) => {
    setInvoiceData(prev => ({
      ...prev,
      lineItems: prev.lineItems.filter(item => item.id !== id)
    }))
  }

  return (
    <div className="app-container">
      <InvoiceEditor
        invoiceData={invoiceData}
        logoFileName={logoFileName}
        onInputChange={handleInputChange}
        onLogoChange={handleLogoChange}
        onLineItemChange={handleLineItemChange}
        onAddLineItem={addLineItem}
        onRemoveLineItem={removeLineItem}
        onLogoFileNameChange={setLogoFileName}
      />
      <InvoicePreview invoiceData={invoiceData} />
    </div>
  )
}

export default App
