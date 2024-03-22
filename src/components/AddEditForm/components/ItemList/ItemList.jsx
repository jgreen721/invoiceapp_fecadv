import React, {useEffect, useState} from 'react'
import { plusIcon} from '../../../../const'
import { useInvoiceContext } from '../../../../context'
import {Item,ItemsTotalRow} from "./components"
import "./ItemList.css"

const ItemList = ({invalidDraftAlert,clearArtifacts,passedDownItems,itemErrors,handleAddNewErrorItem,handleRemoveErrorItem,toggleItemErrorOff}) => {


  // console.log("val",val);
  const {total,adjustInvoiceItems} = useInvoiceContext();
  const [items,setItems] = useState(passedDownItems)
  const [maxErrorAlert,setMaxErrorAlert] = useState(false);




  useEffect(()=>{
    if(clearArtifacts){
    setItems([{id:1,itemname:"",quantity:1,price:10}])
    console.log('clear list artifacts!!---')
    }
  },[clearArtifacts])

  const handleAddItem = (e)=>{
    e.preventDefault();
    if(items.length > 5){
      toggleMaxAlert()
      return;
    }
    // for UI purposes -- actual item input values will be grabbed via formData.getAll(label);
    let newSkeletonItem = {
      id:Math.random() * 50000 | 0,
      itemname:"",
      quantity:1,
      price:10,
    }
    let idx = items.findIndex(i=>i.id == newSkeletonItem.id);
    while(idx != -1){
      idx = items.findIndex(i=>i.id == newSkeletonItem.id);
      newSkeletonItem.id = Math.random() * 50000 | 0;
    }
    setItems((items)=>items = [...items,newSkeletonItem])
    handleAddNewErrorItem(newSkeletonItem.id)
    adjustInvoiceItems(newSkeletonItem.id,10,1)


  }

  const toggleMaxAlert=()=>{
    setMaxErrorAlert(true);
    setTimeout(()=>{
      setMaxErrorAlert(false)
    },2500);
  }

  const handleRemoveItem=(id)=>{
    if(items.length == 1)return;
     let temp = items;
     temp = temp.filter(t=>t.id != id);
     setItems(temp);
     handleRemoveErrorItem(id)

  }


  return (
    <section className="new-item-section form-section">
          <h3>Item List</h3>
        
          <table className="items-table">
            <thead>
              <tr>
                <th><p>Item Name</p></th>
                <th><p>Qty.</p></th>
                <th><p>Price</p></th>
                <th><p>Total</p></th>
              </tr>
            </thead>
            <tbody>
              {items.map((i,idx)=>(
                <Item itemsLength={items.length} toggleItemErrorOff={toggleItemErrorOff} hasError={itemErrors[idx].hasError}  handleRemoveItem={handleRemoveItem} id={i.id} item={i} key={i.id} clearArtifacts={clearArtifacts}/>
              ))}
            </tbody>
          </table>
          <ItemsTotalRow total={total}/>
          <button onClick={(e)=>handleAddItem(e)} className="add-item-btn">
              <img className="btn-icon" src={plusIcon} alt="" />
              Add New Item
          </button>
         {maxErrorAlert && <h3 className="max-error-alert">Say thats alot of items, might want to create a new invoice and split things up! :)</h3>}
         {invalidDraftAlert && <h3 className="max-error-alert">Invalid Draft, at least one item needs a name.</h3>}
       
       
        </section>
  )
}

export default ItemList