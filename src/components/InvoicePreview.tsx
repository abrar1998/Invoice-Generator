import { useRef } from 'react'
import type { InvoiceData } from '../types'

interface InvoicePreviewProps {
  invoiceData: InvoiceData
}

export default function InvoicePreview({ invoiceData }: InvoicePreviewProps) {
  const printRef = useRef<HTMLDivElement>(null)

  const handlePrint = () => {
    window.print()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const calculateTotal = () => {
    return invoiceData.lineItems.reduce((sum, item) => sum + item.amount, 0)
  }

  const total = calculateTotal()
  const paymentReceived = invoiceData.paymentReceived
  const balance = total - paymentReceived

  return (
    <div className="invoice-preview" ref={printRef}>
      <button onClick={handlePrint} className="print-btn">
        Print / Download PDF
      </button>
      
      <div className="invoice-content">
        {/* Company Header */}
        <div className="invoice-header">
          <div className="logo-container">
            <img 
              src={invoiceData.companyLogo} 
              alt="Company Logo" 
              className="company-logo"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/AmazeWeblogo.png'
              }}
            />
          </div>
          <div className="company-info">
            <h1 className="company-name">{invoiceData.companyName}</h1>
            <p className="company-tagline">{invoiceData.companyTagline.toUpperCase()}</p>
            <div className="company-contact">
              <p>{invoiceData.companyAddress}</p>
              <p>{invoiceData.companyPhone}</p>
              {invoiceData.companyWebsite && (
                <p>
                  <a 
                    href={invoiceData.companyWebsite} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="website-link"
                  >
                    {invoiceData.companyWebsite}
                  </a>
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Invoice Title */}
        <div className="invoice-title-section">
          <h2 className="invoice-title">INVOICE</h2>
          <div className="invoice-meta">
            <p><strong>Invoice No:</strong> {invoiceData.invoiceNumber}</p>
            <p><strong>Date:</strong> {formatDate(invoiceData.invoiceDate)}</p>
          </div>
        </div>

        {/* Bill To */}
        <div className="bill-to-section">
          <h3>Bill To:</h3>
          <p className="client-name">
            {invoiceData.customerTitle && `${invoiceData.customerTitle}: `}
            {invoiceData.customerName}
          </p>
        </div>

        {/* Line Items Table */}
        <div className="invoice-table-container">
          <table className="invoice-table">
            <thead>
              <tr>
                <th>S.No</th>
                <th>Particulars</th>
                <th>Qnty</th>
                <th>Rate (Rs)</th>
                <th>Amount (Rs)</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.lineItems.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.particular || '-'}</td>
                  <td>{item.quantity}</td>
                  <td>{item.rate.toFixed(2)}</td>
                  <td>{item.amount.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="totals-section">
          <div className="total-row">
            <p className="total-label">Total:</p>
            <p className="total-amount">Rs {total.toFixed(2)}</p>
          </div>
          <div className="total-row">
            <p className="total-label">Payment Received:</p>
            <p className="total-amount">Rs {paymentReceived.toFixed(2)}</p>
          </div>
          <div className="total-row balance-row">
            <p className="total-label">Balance:</p>
            <p className="total-amount balance-amount">Rs {balance.toFixed(2)}</p>
          </div>
        </div>

        {/* Note */}
        <div className="note-section">
          <p>Note: {invoiceData.note}</p>
        </div>
      </div>
    </div>
  )
}

