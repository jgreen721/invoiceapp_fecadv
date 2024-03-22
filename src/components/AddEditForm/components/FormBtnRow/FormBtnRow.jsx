import React from 'react'
import {Btn} from "../../.."
import "./FormBtnRow.css"

const FormBtnRow = ({handleSubmitInvoiceItem,handleStoreAsDraft,handleDiscard}) => {
 



  return (
       <div className="form-btns-row">
          <Btn className="gray-btn" handleEvent={handleDiscard}>
            Discard
          </Btn>
          <div className="btns-row">
            <Btn className="dark-btn" handleEvent={handleStoreAsDraft}>Save as Draft</Btn>
            <Btn className="purple-btn" handleEvent={handleSubmitInvoiceItem}>Save & Send</Btn>
          </div>
        </div> 
  )
}

export default FormBtnRow