import React from 'react'
import InvoiceItem from '../InvoiceItem/InvoiceItem'
import "./InvoiceList.css"

const InvoiceList = ({invoices}) => {
    
  return (
    <ul className="invoices-list">
        {invoices.map((invoice,key)=>(
            <InvoiceItem key={key} invoice={invoice}/>
        ))}
    </ul>
  )
}

export default InvoiceList