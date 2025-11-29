import type { LineItem, InvoiceData } from '../types'

interface InvoiceEditorProps {
  invoiceData: InvoiceData
  logoFileName: string
  onInputChange: (field: keyof InvoiceData, value: string | number) => void
  onLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  onLineItemChange: (id: string, field: keyof LineItem, value: string | number) => void
  onAddLineItem: () => void
  onRemoveLineItem: (id: string) => void
  onLogoFileNameChange: (fileName: string) => void
}

export default function InvoiceEditor({
  invoiceData,
  logoFileName,
  onInputChange,
  onLogoChange,
  onLineItemChange,
  onAddLineItem,
  onRemoveLineItem,
  onLogoFileNameChange
}: InvoiceEditorProps) {
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      onLogoFileNameChange(file.name)
      onLogoChange(e)
    } else {
      onLogoFileNameChange('No file chosen')
    }
  }

  return (
    <div className="invoice-editor">
      <h1 className="editor-title">Invoice Editor</h1>
      
      {/* Company Details */}
      <section className="form-section">
        <h2>Company Details</h2>
        <div className="form-group">
          <label>Logo</label>
          <div className="logo-upload">
            <input
              type="file"
              id="logo-upload"
              accept="image/*"
              onChange={handleLogoChange}
              className="file-input"
            />
            <label htmlFor="logo-upload" className="file-label">
              Choose File
            </label>
            <span className="file-name">{logoFileName}</span>
          </div>
        </div>
        <div className="form-group">
          <label>Company Name</label>
          <input
            type="text"
            value={invoiceData.companyName}
            onChange={(e) => onInputChange('companyName', e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Tagline</label>
          <input
            type="text"
            value={invoiceData.companyTagline}
            onChange={(e) => onInputChange('companyTagline', e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea
            value={invoiceData.companyAddress}
            onChange={(e) => onInputChange('companyAddress', e.target.value)}
            className="form-input"
            rows={3}
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="text"
            value={invoiceData.companyPhone}
            onChange={(e) => onInputChange('companyPhone', e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Website URL</label>
          <input
            type="url"
            value={invoiceData.companyWebsite}
            onChange={(e) => onInputChange('companyWebsite', e.target.value)}
            className="form-input"
            placeholder="https://example.com"
          />
        </div>
      </section>

      {/* Client Details */}
      <section className="form-section">
        <h2>Client Details</h2>
        <div className="form-group">
          <label>Title</label>
          <select
            value={invoiceData.customerTitle}
            onChange={(e) => onInputChange('customerTitle', e.target.value)}
            className="form-input"
          >
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Ms">Ms</option>
            <option value="Miss">Miss</option>
            <option value="Dr">Dr</option>
            <option value="Prof">Prof</option>
          </select>
        </div>
        <div className="form-group">
          <label>Customer Name</label>
          <input
            type="text"
            value={invoiceData.customerName}
            onChange={(e) => onInputChange('customerName', e.target.value)}
            className="form-input"
            placeholder="Customer Name"
          />
        </div>
      </section>

      {/* Invoice Details */}
      <section className="form-section">
        <h2>Invoice Details</h2>
        <div className="form-group">
          <label>Invoice Number</label>
          <input
            type="text"
            value={invoiceData.invoiceNumber}
            onChange={(e) => onInputChange('invoiceNumber', e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={invoiceData.invoiceDate}
            onChange={(e) => onInputChange('invoiceDate', e.target.value)}
            className="form-input"
          />
        </div>
      </section>

      {/* Line Items */}
      <section className="form-section">
        <h2>Line Items</h2>
        <div className="line-items-container">
          {invoiceData.lineItems.map((item) => (
            <div key={item.id} className="line-item-row">
              <input
                type="text"
                placeholder="Particular"
                value={item.particular}
                onChange={(e) => onLineItemChange(item.id, 'particular', e.target.value)}
                className="line-item-input"
              />
              <input
                type="number"
                placeholder="Qty"
                value={item.quantity}
                onChange={(e) => onLineItemChange(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                className="line-item-input number-input"
                min="0"
              />
              <input
                type="number"
                placeholder="Rate"
                value={item.rate}
                onChange={(e) => onLineItemChange(item.id, 'rate', parseFloat(e.target.value) || 0)}
                className="line-item-input number-input"
                min="0"
              />
              <input
                type="number"
                placeholder="Amount"
                value={item.amount}
                readOnly
                className="line-item-input number-input readonly"
              />
              <button
                onClick={() => onRemoveLineItem(item.id)}
                className="delete-btn"
                disabled={invoiceData.lineItems.length === 1}
                title="Delete item"
                aria-label="Delete item"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 6H5H21M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M10 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 11V17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
          ))}
        </div>
        <button onClick={onAddLineItem} className="add-item-btn">
          + Add Item
        </button>
      </section>

      {/* Payment Details */}
      <section className="form-section">
        <h2>Payment Details</h2>
        <div className="form-group">
          <label>Payment Received</label>
          <input
            type="number"
            value={invoiceData.paymentReceived}
            onChange={(e) => onInputChange('paymentReceived', parseFloat(e.target.value) || 0)}
            className="form-input"
            min="0"
          />
        </div>
      </section>

      {/* Note */}
      <section className="form-section">
        <h2>Note</h2>
        <div className="form-group">
          <textarea
            value={invoiceData.note}
            onChange={(e) => onInputChange('note', e.target.value)}
            className="form-input"
            rows={2}
          />
        </div>
      </section>
    </div>
  )
}

