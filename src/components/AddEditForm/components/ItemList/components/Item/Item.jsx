import React, {useEffect, useState} from 'react'
import {deleteIcon} from "../../../../../../const"
import { useInvoiceContext } from '../../../../../../context';
import "./Item.css";

const Item = ({toggleItemErrorOff,hasError,handleRemoveItem,id,item,itemsLength,clearArtifacts}) => {
    const [itemName,setItemName] = useState(item.itemname);
    const [quantity, setQuantity] = useState(item.quantity);
    const [price,setPrice] = useState(item.price);
    const {adjustInvoiceItems} = useInvoiceContext();


      
    useEffect(()=>{
        if(clearArtifacts){
            setItemName("");
            setQuantity(1);
            setPrice(10)
        }
    },[clearArtifacts])



  return (
    <tr name="invoice-item" className="item">
        <td style={{display:"none"}}>
        <label htmlFor={`item_id-${id}`}>
            <input type="hidden" name="id" id={`item_id-${id}`} value={id}/>
        </label>
        </td>
        <td className="itemname-table-column">
            <label htmlFor={`itemName-${id}`}>
            <input onKeyDown={()=>toggleItemErrorOff(item.id)} type="text" className={hasError ?  "itemname-input item-input error-border" : "itemname-input item-input"} placeholder="Item name..." autoComplete="off" name="itemName" id={`itemName-${id}`} value={itemName} onChange={(e)=>setItemName(e.target.value)} />
            {/* <!-- Add some error handling --> */}
            </label>
            {hasError ? <h5 className="red-error">Requires input </h5> : ""}
        </td>
        <td className="quantity-table-column">
            <label htmlFor={`quantity-${id}`}>
            <input type="number" min="1" max="5000"  autoComplete="off" name="quantity" id={`quantity-${id}`} value={quantity} onChange={(e)=>{
                if(e.target.value.length > 4)return; 
                setQuantity(e.target.value);
                // let newAmt = parseInt(price) * parseInt(e.target.value);
                adjustInvoiceItems(id,price,e.target.value);
                // <!-- This logic needs to be worked on as its eventually causing errors -->
                // <!-- Roughly, its a single source of truth issue -->
                // <!-- Replicate BUG, create a few items and then delete one, the total goes to zero
                //  due the context havings its own means of items compared to the UI -->
            
            }} 
            className="item-num-input item-input" />
            </label>
        </td>
        <td className="price-table-column">
            <label htmlFor={`price-${id}`}>
            <input type="number" min="10" max="10000" step="10"  autoComplete="off" id={`price-${id}`} name="price" value={price != "" ? price : price} className="item-num-input item-input" onChange={(e)=>{
                if(e.target.value.length > 5)return; 
                setPrice(e.target.value);
                // let newAmt = e.target.value) * quantity);
                // adjustInvoiceItems(id,newAmt)
                adjustInvoiceItems(id,e.target.value,quantity);

            
            }} />
            </label>
        </td>
        <td className="total-table-column">
            <p>{(quantity * price).toFixed(2)}</p>
            <button onClick={(e)=>{
                e.preventDefault()
                if(itemsLength == 1){
                    console.log("down to last item,  just clear current values and total ");
                    // adjustInvoiceItems(id,null,null,"remove")
                    adjustInvoiceItems(id,10,1,"")
                    setQuantity(1);
                    setPrice(10);
                    setItemName("");
                    return;
                }
                adjustInvoiceItems(id,null,null,"remove")
                handleRemoveItem(id)}} 
                className="transparent-btn">
                <img src={deleteIcon} alt="" />
            </button>
        </td>
  
  </tr>
  )
}

export default Item