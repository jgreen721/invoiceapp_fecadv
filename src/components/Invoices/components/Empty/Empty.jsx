import React from 'react'
import { emptyImg } from '../../../../const'
import "./Empty.css"
const Empty = () => {
  return (
    <div className="empty-invoices-div">
      <div className="empty-invoices-img-div">
        <img src={emptyImg} alt="" />
      </div> 
      <div className="empty-header-div">
        <h1>There is nothing here</h1>
      </div>
      <div className="empty-caption-div">
        <p className="muted">Create an invoice by clicking the <span className="bold">New Invoice</span> button and get started.</p>
      </div>

    </div>
  )
}

export default Empty