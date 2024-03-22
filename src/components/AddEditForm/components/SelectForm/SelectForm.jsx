import React, {useEffect, useState} from 'react'
import { arrowDown } from '../../../../const'
import { useLocalStorage } from '../../../../hooks/useLocalStorage'
import "./SelectForm.css"

const SelectItem=({term,handleSelectPaymentTerm,selectedTerm})=>{

  return (
    <li onClick={()=>handleSelectPaymentTerm(term.days)} className="select-drop-down-item select-item">
      <p className={term.days == selectedTerm ? "extra-bold" : "bold"}>Net {term.days} day{term.days > 1 ? "s" : ""}</p>
    </li>
  )
}

const SelectForm = ({clearArtifacts}) => {
  const [showSelect,setShowSelect] = useState(false)
    const paymentTerms = [
        {id:1,days:1},
        {id:2,days:7},
        {id:3,days:14},
        {id:4,days:30}
    ]
    let {payload} = useLocalStorage("paymentTerms",1,null);

    const [terms,setTerms] = useState(1);




    const handleSelectPaymentTerm=(paymentTerm)=>{
      console.log("paymentTerm: " + paymentTerm);
      setTerms(paymentTerm)
      setShowSelect(false)
    }


   
  useEffect(()=>{
          setTerms(payload);


  },[payload])


  useEffect(()=>{
    if(clearArtifacts){
      setTerms(1);
    }

  },[clearArtifacts])



  
  return (
    <div className="form-div select-form-container">
        <label className="form-label" htmlFor="paymentTerms">
          Payment Terms
          <input type="hidden" name="paymentTerms" id="paymentTerms" value={terms} />

        </label>
      <div  className="select-form-div">
        <h5>Net {terms} Days</h5>
        <button onClick={(e)=>{
          e.preventDefault();
          setShowSelect(showSelect=>showSelect = !showSelect)}} className="arrow-div transparent-btn">
        <img className={showSelect ? "arrow-icon rotate-down" : "arrow-icon rotate-up"} src={arrowDown} alt="arrow-img" />
        </button>
      </div>
      <ul className={showSelect ? "select-drop-down-list" : "select-drop-down-list hide-dropdown"}>
        {paymentTerms.map(term=>(
          <SelectItem handleSelectPaymentTerm={handleSelectPaymentTerm} key={term.id} term={term} selectedTerm={terms}/>
        ))}
      </ul>
    </div>
  )
}

export default SelectForm