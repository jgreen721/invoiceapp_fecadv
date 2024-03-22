import React from 'react'
import { arrowLeft } from '../../../../const'
import { useInvoiceContext } from '../../../../context'

const BackBtn = () => {
    const {viewInvoice} = useInvoiceContext();

  return (
    <button onClick={()=>viewInvoice(null)} className="transparent-btn">
        <img className="arrow-icon" src={arrowLeft} alt="" />
        <h5 className="primary-text">Go Back</h5>
    </button>
  )
}

export default BackBtn