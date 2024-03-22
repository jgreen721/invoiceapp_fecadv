import React, {useState} from 'react'
import { useInvoiceContext } from '../../context'
import {BackBtn,InvoiceHeader,DeleteModal,InvoiceBody, HeaderBtnRow} from "./components"
import "./ViewInvoice.css"

const ViewInvoice = () => {
  const {currInvoice } = useInvoiceContext();
  const [showDeleteModal,setShowDeleteModal] = useState(false);

  const toggleDeleteModal = ()=>{
          setShowDeleteModal((showDeleteModal=>showDeleteModal=!showDeleteModal));
  }
  return (
    <div className="view-invoice-parent-container">
      <BackBtn/>
      <InvoiceHeader toggleDeleteModal={toggleDeleteModal} currInvoice={currInvoice}/>
      <DeleteModal toggleModal={toggleDeleteModal} showDeleteModal={showDeleteModal}/>
      <InvoiceBody currInvoice={currInvoice}/>
      <div className="mobile">
        <HeaderBtnRow/>
      </div>
    </div>
  )
}

export default ViewInvoice