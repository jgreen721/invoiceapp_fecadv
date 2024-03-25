import React from 'react'
import {Status} from "../../../"
import {HeaderBtnRow} from ".."
import "./InvoiceHeader.css"

const InvoiceHeader = ({currInvoice,toggleDeleteModal}) => {
  // console.log(currInvoice)
  return (
    <header className="invoice-header secondary-bg">
        <div className="invoice-header-row">
            <div className="header-row">
                <h5 className="mid-thin muted">Status</h5>
               <Status invoice={currInvoice}/>
              </div>
              <div className="desktop-header">
            <HeaderBtnRow toggleDeleteModal={toggleDeleteModal}/>
            </div>
        </div>
    </header>
  )
}

export default InvoiceHeader