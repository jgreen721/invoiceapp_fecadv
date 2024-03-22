import React from 'react'
import "./InvoiceItem.css"
import { arrowRight } from '../../../../const'
import  {formatAmount}  from '../../../../helpers'
import { useInvoiceContext } from '../../../../context'
import { Status } from '../../..'


const InvoiceItem = ({invoice}) => {
  const {viewInvoice} = useInvoiceContext();
  return (
    <li className="invoice-item">
      <div className="invoice-item-content-row">
        <div className="invoice-number-div">
          <h3><span className="muted">#</span>{invoice.id}</h3>
        </div>
        <h3 className="muted">{invoice.createdAt}</h3>
        <h3 className="muted">{invoice.clientName}</h3>
        <h2 className="bold">{String.fromCharCode(163)}{formatAmount(invoice.total)}</h2>
        <Status invoice={invoice}/>
        <button onClick={()=>viewInvoice(invoice)} className="view-invoice-btn">
          <img src={arrowRight} alt="" />
        </button>
      </div>
    </li>
  )
}

export default InvoiceItem