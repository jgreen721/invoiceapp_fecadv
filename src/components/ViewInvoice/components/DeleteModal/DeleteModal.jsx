import React from 'react'
import { useInvoiceContext } from '../../../../context';
import "./DeleteModal.css";

const DeleteModal = ({showDeleteModal,toggleModal}) => {
  const {currInvoice,handleConfirmDelete} = useInvoiceContext();
  return (
    <div className={showDeleteModal ? "delete-modal-parent" : "delete-modal-parent hide-delete-modal"}>
    <div className="delete-modal">
      <h3>Confirm Decision</h3>
      <h5>Are you sure you want delete invoice #{currInvoice.id}? This action cannot be undone. </h5>
      <div className="delete-btn-row">
        <button onClick={toggleModal} className="btn gray-btn">Cancel</button>
        <button onClick={()=>{
          handleConfirmDelete()
           toggleModal()
        }} className="btn red-btn">Delete</button>
      </div>
    </div>
    </div>
  )
}

export default DeleteModal