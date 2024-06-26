import React, {useState, useEffect} from 'react'
import { useInvoiceContext } from '../../../../context';
import { useLocalStorage } from '../../../../hooks/useLocalStorage';
import {serializeToFormData} from "../../../../helpers"
import "./FormDiv.css"

const FormDiv = ({label,placeholder,name,bill,toggleOffFieldError,hasError,clearArtifacts}) => {

  let {payload:formPayload} = useLocalStorage(name,"",bill);
  const [inputVal,setInputVal] = useState("");
  const {currInvoice} = useInvoiceContext();

  useEffect(()=>{
      if(formPayload){
        setInputVal(formPayload);
      }
      if(clearArtifacts){
        setInputVal("");
      }
  },[formPayload,clearArtifacts])


  useEffect(()=>{
    if(currInvoice){
      setInputVal("")
      let invoice = serializeToFormData(currInvoice)
      setInputVal(invoice[name])
    }
  },[currInvoice]);



  

  return (
    <div className="form-div">
        <label htmlFor={name} className="form-label">
          {label}
        <input onKeyDown={()=>toggleOffFieldError(name)} autoComplete="off" type="text" className={ hasError ?  "form-control secondary-bg error-border" : "form-control secondary-bg"} value={inputVal} onChange={(e)=>setInputVal(e.target.value)} placeholder={placeholder} id={name} name={name} />
        </label>
        {hasError ? <h5 className="red-error">Requires input</h5> : ""}
    </div>
  )
}

export default FormDiv