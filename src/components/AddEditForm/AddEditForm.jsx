import React, {useEffect, useRef, useState} from 'react'
import {FormDiv,SelectForm,CalenderForm,ItemList,FormBtnRow} from "./components"
import { useUIContext, useInvoiceContext } from '../../context'
import {serializeFormData,validateInvoice, validateItems,validateLSDraft} from "../../helpers"
import "./AddEditForm.css"
import { useLocalStorage } from '../../hooks/useLocalStorage'




const AddEditForm = () => {
  const {showForm,toggleForm} = useUIContext();
  const {payload:payloadItems,loading} = useLocalStorage("items",[],null);
  const {handleSaveInvoice, adjustInvoiceItems,clearInvoiceItems,currInvoice} = useInvoiceContext();
  const [clearArtifacts, setClearArtifacts] = useState(false);
  const formRef = useRef();
  // mainform errors
  const [textError,setTextError] = useState("")
  const [itemError,setItemError] = useState("")
  const [fieldsError,setFieldsError] = useState({
        address:false, 
        city:false,
        postcode:false,
        country:false,
    clientsname:false,
    email:false,
    clients_address:false,
    clients_city:false,
    clients_postcode:false,
    clients_country:false,
    description:false,
  })

  // used to control UI-errors for each Item
  const [itemErrors,setItemErrors] = useState([])
  const [itemErrorsLoaded,setItemErrorsLoaded] = useState(false);
  const [items,setItems] = useState([])
  const [invalidDraftAlert,setInvalidDraftAlert] = useState(false)





useEffect(()=>{
  // console.log("payloadItemsLength:",payloadItems.length);
  // console.log("itemErrors.length",itemErrors.length);
  if(payloadItems.length >= 1){
    // console.log("Loading Items from LS",payloadItems)
  setItems(payloadItems)
  payloadItems.forEach(item=>{
    handleAddNewErrorItem(item.id)
  })
  // adjustInvoiceItemTotals(payloadItems)
  // console.log(payloadItems);
}
else{
  // console.log("no items in LS")
  setItemErrors([{id:1,hasError:false}])
  setItems([{id:1,itemname:"",price:10,quantity:1}])
}

},[payloadItems])


useEffect(()=>{
  if(itemErrors.length){
    setItemErrorsLoaded(true)
  }
},[itemErrors])



  const handleSubmitInvoiceItem =(e)=>{
    e.preventDefault();
    toggleError("clear")


    // console.log("handleSubmitInvoiceItem fired!")
    let formData = new FormData(formRef.current);
    let newInvoiceItem = serializeFormData(formData,itemErrors);
    // console.log(newInvoiceItem);
    let {errors,errorFieldObj} = validateInvoice(newInvoiceItem)    // errors handles text-alerts/ errorFieldObj handles input errors
    let {itemErrors:returnedItemErrors} = validateItems(newInvoiceItem.items)   // tracks item errors (dynamically/scalable)

    // console.log("ITEMERRORS",returnedItemErrors)
      setFieldsError(errorFieldObj)
      setItemErrors(returnedItemErrors);
    if(errors.hasError){
      if(errors.text){
        toggleError("text")

      }
      if(errors.item){
        console.log("error-item should be toggled");
        toggleError("items")
      }
    }
    else{
  // toggleError("clear")
   handleSaveInvoice(newInvoiceItem,"pending")
  toggleForm();
    }
  }

  const toggleError = (errorType)=>{
    if(errorType == "text")setTextError("- All fields required");
    if(errorType == "items"){setItemError("- At least 1 item must be added")}
   if(errorType == "clear"){
      setItemError("");
      setTextError("");
    }
  }


  const handleStoreAsDraft=(e)=>{
    e.preventDefault();
    let formData = new FormData(formRef.current);
    let savedDraft = serializeFormData(formData,itemErrors)
    console.log(savedDraft)
     if(validateLSDraft(savedDraft)){
       localStorage.setItem('draftitem',JSON.stringify(savedDraft))
       setClearArtifacts(false)

     }
     if(!validateLSDraft(savedDraft) && payloadItems.length){
       localStorage.clear("draftitems");
     }
     else if(!validateLSDraft(savedDraft)){
       setInvalidDraftAlert(true);
       setTimeout(()=>{
         setInvalidDraftAlert(false)

       },2500);
       return;   //we dont want to close the form necessarily
     }
    toggleForm();
    handleSaveInvoice(savedDraft,"draft")
  }



  // keydown events passed to children (inputs)
  const toggleOffFieldError=(field_name)=>{
    if(!fieldsError[field_name])return;
   setFieldsError(fieldsError=>fieldsError = {...fieldsError,[field_name]:false})
  }

  const toggleItemErrorOff=(id)=>{
    // console.log(itemErrors,id)
    let idx = itemErrors.findIndex(i=>i.id == id);
    // console.log(idx)
    if(!itemErrors[idx].hasError)return;
    setItemErrors((itemErrors)=>itemErrors.map(item=>item.id == id ? {...item,hasError:false} : item))
  }

  const handleAddNewErrorItem=(id)=>{
    setItemErrors((itemErrors)=>[...itemErrors,{id,hasError:false}])
    // let newItemErrors = [...itemErrors,{id,hasError:false}]
    // console.log("fire bitch!!",newItemErrors)
}




  const handleRemoveErrorItem=(id)=>{
    setItemErrors((itemErrors)=>itemErrors.filter(itemError=>itemError.id != id))
 
  }

  const clearUIErrors = ()=>{
    setTextError("");
    setItemError("");
  }


  const handleDiscard=(e)=>{
    e.preventDefault();
    localStorage.clear();
    clearUIErrors();
    setClearArtifacts(true);
    clearInvoiceItems()
    toggleForm()
  }



  return (
    <div onClick={(e)=>{
      if(e.target.classList.contains("add-edit-form-parent")){
      toggleForm()
    }}}
      className={showForm ? "add-edit-form-parent" : "add-edit-form-parent hide-form-parent"}>
      <div className={showForm ? `invoice-form` : "invoice-form hide-form"}>
        <form ref={formRef} className="invoice-form">
          <div className="form-content">
        <h2>New Invoice</h2>
            <section className="bill-from-container form-section">
          <h3 className="purple-text form-section-label">Bill From</h3>
        <FormDiv clearArtifacts={clearArtifacts} toggleOffFieldError={toggleOffFieldError} label="Street Address" placeholder="Address" name="address" bill="from" hasError={fieldsError.address}/>
        <div className="form-desktop-row">
           <div className="form-row">
            <FormDiv clearArtifacts={clearArtifacts} toggleOffFieldError={toggleOffFieldError} label="City" placeholder="City" name="city" bill="from" hasError={fieldsError.city}/>
            <FormDiv clearArtifacts={clearArtifacts} toggleOffFieldError={toggleOffFieldError} label="Post Code" placeholder="Post code" name="postcode" bill="from" hasError={fieldsError.postcode}/>
          </div>
            <FormDiv clearArtifacts={clearArtifacts} toggleOffFieldError={toggleOffFieldError} label="Country" placeholder="Country" name="country" bill="from" hasError={fieldsError.country}/>
          </div> 
        </section>   
 
          <section className="bill-from-container form-section">
        <h3 className="purple-text form-section-label">Bill To</h3>

           <FormDiv clearArtifacts={clearArtifacts} toggleOffFieldError={toggleOffFieldError} label="Client's Name" placeholder="Name" name="clientsname" bill="to" hasError={fieldsError.clientsname}/>
          <FormDiv clearArtifacts={clearArtifacts} toggleOffFieldError={toggleOffFieldError} label="Client's Email" placeholder="Email" name="email" bill="to" hasError={fieldsError.email}/>
          <FormDiv clearArtifacts={clearArtifacts} toggleOffFieldError={toggleOffFieldError} label="Street Address" placeholder="Street Address" name="clients_address" bill="to" hasError={fieldsError.clients_address}/>
          <div className="form-desktop-row">
            <div className="form-row">
              <FormDiv clearArtifacts={clearArtifacts} toggleOffFieldError={toggleOffFieldError} label="City" placeholder="City" name="clients_city" bill="to" hasError={fieldsError.clients_city}/>
              <FormDiv clearArtifacts={clearArtifacts} toggleOffFieldError={toggleOffFieldError} label="Post Code" placeholder="Post code" name="clients_postcode" bill="to" hasError={fieldsError.clients_postcode}/>
            </div>
            <FormDiv clearArtifacts={clearArtifacts} toggleOffFieldError={toggleOffFieldError} label="Country" placeholder="Country" name="clients_country" bill="to" hasError={fieldsError.clients_country}/>
          </div> 
          <div className="form-row custom-selects-form-row">
            <CalenderForm clearArtifacts={clearArtifacts} />
            <SelectForm clearArtifacts={clearArtifacts}/>
          </div>
          <FormDiv toggleOffFieldError={toggleOffFieldError} label="Project Description" placeholder="e.g Graphic Design Service" name="description" hasError={fieldsError.description} clearArtifacts={clearArtifacts}/>
      </section>     
       {itemErrorsLoaded && <ItemList passedDownItems={items} invalidDraftAlert={invalidDraftAlert} clearArtifacts={clearArtifacts} toggleItemErrorOff={toggleItemErrorOff} itemErrors={itemErrors}  handleAddNewErrorItem={handleAddNewErrorItem} handleRemoveErrorItem={handleRemoveErrorItem}/>}
       <div className="errors-row">
          <h5 className="error-text">{textError}</h5>
          <h5 className="error-text">{itemError}</h5>
      </div>
        </div> 
      
        <FormBtnRow clearUIErrors={clearUIErrors} setClearArtifacts={setClearArtifacts} handleDiscard={handleDiscard} handleSubmitInvoiceItem={handleSubmitInvoiceItem} handleStoreAsDraft={handleStoreAsDraft}/>

      </form>
</div>
   </div>
  )
}

export default AddEditForm