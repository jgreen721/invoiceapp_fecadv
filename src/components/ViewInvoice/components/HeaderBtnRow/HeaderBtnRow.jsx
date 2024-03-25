import React from 'react'
import {Btn} from "../../../"
import { useUIContext } from '../../../../context'
import { useInvoiceContext } from '../../../../context/InvoiceContext'
import "./HeaderBtnRow.css"

const HeaderBtnRow = ({toggleDeleteModal}) => {
  const {currInvoice,updateStatusToPaid} = useInvoiceContext();
  const {toggleForm} = useUIContext()
  return (
    <div className="header-btn-row">
        <Btn handleEvent={toggleForm} className="gray-btn">
            <h5>Edit</h5>
        </Btn>
        <Btn handleEvent={toggleDeleteModal} className="red-btn">
            <h5>Delete</h5>
        </Btn>
        <Btn handleEvent={()=>{updateStatusToPaid(currInvoice)}} className={currInvoice.status == "paid" ? "purple-btn disabled" : "purple-btn"}>
            <h5>{currInvoice.status == "paid" ? "Paid" : "Mark as Paid"}</h5>
        </Btn>
    </div>
  )
}

export default HeaderBtnRow