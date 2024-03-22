import React from 'react'
import "./InvoiceBody.css"

const InvoiceBody = ({currInvoice}) => {
  console.log("currInvoice",currInvoice)
  return (
    <div className="invoice-body-container">
      <div className="top-invoice-row">
        <div>
        <div className="row">
          <h5>#<span className="bold">{currInvoice.id}</span></h5>
        </div>
        <h5 className="muted mid-thin">{currInvoice.description}</h5>
        </div>
        <div className="invoice-info-address-div">
          <h5>{currInvoice.senderAddress.street}</h5>
          <h5>{currInvoice.senderAddress.city}</h5>
          <h5>{currInvoice.senderAddress.postcode}</h5>
          <h5>{currInvoice.senderAddress.country}</h5>
        </div>

      </div>
      <div className="middle-invoice-row">
        <div className="middle-invoice-info-row">
        <div className="invoice-info-column">
          <div>
            <h5 className="mid-thin muted invoice-title">Invoice Date</h5>
            <h5>{currInvoice.createdAt}</h5>
          </div>
          <div>
            <h5 className="mid-thin muted invoice-title">Payment Due</h5>
            <h5>{currInvoice.paymentDue}</h5>
          </div>
        </div>
        <div className="invoice-info-column">
          <div>
            <h5 className="mid-thin muted invoice-title">Bill To</h5>
              <h5 className="mid-thin muted">{currInvoice.clientName}</h5>
              <h5 className="mid-thin muted">{currInvoice.clientAddress.street}</h5>
              <h5 className="mid-thin muted">{currInvoice.clientAddress.city}</h5>
              <h5 className="mid-thin muted">{currInvoice.clientAddress.postcode}</h5>
              <h5 className="mid-thin muted">{currInvoice.clientAddress.country}</h5>
          </div>
        </div>
        </div>
        <div className="invoice-info-column">
          <div>
            <h5 className="mid-thin muted invoice-title">Sent to</h5>
            <h5 className="bold">{currInvoice.clientEmail}</h5>
          </div>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>
              <h5 className="muted mid-thin">Item Name</h5>
            </th>
            <th>
              <h5 className="muted mid-thin">QTY</h5>
            </th>
            <th>
              <h5 className="muted mid-thin">Prices</h5>
            </th>
            <th>
              <h5 className="muted mid-thin">Total</h5>
            </th>
          </tr>
        </thead>
        <tbody>
          {currInvoice.items.map(item=>(
            <tr key={item.price}>
              <td>
                <h5 className="bold">{item.name}</h5>
              </td>
              <td>
                <h5 className="bold">{item.quantity}</h5>
              </td>
              <td>
                <h5 className="bold">{item.price}</h5>
              </td>
              <td>
                <h5 className="bold"><span className="dollar-sign">&#163;</span> {item.total}</h5>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-row">
        <h5 className="mid-thin">Amount Due</h5>
        <h2><span className="dollar-sign">&#163;</span> {currInvoice.items.reduce((a,b)=>a+b.total,0)}</h2>
      </div>


    </div>
  )
}

export default InvoiceBody