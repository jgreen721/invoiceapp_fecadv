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
      <div className="invoice-item-content-row desktop">
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
      <div className="mobile-item-content-row">
        <div className="mobile-column">
          <div className="mobile-id-div">
            <h5 className="bold">#{invoice.id}</h5>
          </div>
          <div>
            <h5 className="muted">{invoice.createdAt}</h5>
            <h5 className="bold">{String.fromCharCode(163)}{formatAmount(invoice.total)}</h5>
          </div>
        </div>
        <div className="mobile-column">
          <h5 className="muted">{invoice.clientName}</h5>
          <Status invoice={invoice}/>
        </div>
      </div>
    </li>
  )
}

export default React.memo(InvoiceItem);
