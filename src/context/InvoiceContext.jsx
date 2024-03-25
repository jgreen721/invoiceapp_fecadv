import { useEffect, useState, createContext, useContext } from "react";
import { useApi,useLocalStorage } from "../hooks";
import { serializeToInvoiceItem } from "../helpers";


const AppContext = createContext();

export const useInvoiceContext = () => useContext(AppContext);

export const InvoiceProvider = ({ children }) => {
  const [filterBy,setFilterBy] = useState("")
  const [currInvoice,setCurrInvoice] = useState(null);
  const [invoiceItems,setInvoiceItems] = useState([]);    //invoice items
  const [total,setTotal] = useState(0)    // invoice items collective total -- starts at 10 to match UI




const {filtered:invoices,loading,error,handleAddNewItem,handleDeleteInvoice} = useApi(filterBy);
const {payload:localStorageInvoiceItems} = useLocalStorage("items")





useEffect(()=>{

if(localStorageInvoiceItems?.length){

    setInvoiceItems(localStorageInvoiceItems)
    adjustInvoiceItemsTotal(localStorageInvoiceItems)
}
else{
  setInvoiceItems([{id:1,price:10,quantity:1}])
  adjustInvoiceItemsTotal([{id:1,price:10,quantity:1}])
}

},[localStorageInvoiceItems])


const handleSaveInvoice=(newInvoice)=>{
  // console.log("handle save invoice fired!",newInvoice)
  newInvoice.total = total
  // console.log("NewINVNOICE",newInvoice)

    let formattedInvoiceItem = serializeToInvoiceItem(newInvoice);
    handleAddNewItem(formattedInvoiceItem);
}


  const handleFilterBy = (selectedStatus)=>{
      let newStatus = selectedStatus == "All" ? "" : selectedStatus.toLowerCase()
      setFilterBy(newStatus)
  }

 const viewInvoice = (invoice)=>{
    console.log('viewInvoice')
    if(invoice == null){
      console.log("clearing Invoice!")
      setCurrInvoice(null);
    }
    else setCurrInvoice(invoice);
  }


  const adjustInvoiceItems = (id,price,quantity,action="")=>{
    let temp = invoiceItems
    console.log("adjustInvoiceItemse",temp);

    if(action != "remove"){
          let existing = temp.findIndex(t=>t.id == id);
          if(existing == -1){
           let newInvoiceItem = {
                  id,
                  price,
                  quantity
                    }
            temp.push(newInvoiceItem)
          }
          else{
            temp[existing].quantity = quantity
            temp[existing].price = price
          }
          setInvoiceItems(temp);

        }
        else{
          // console.log("REMOVE-TEMP",temp);
          temp = temp.filter(t=>t.id != id);
          setInvoiceItems(temp);

        }
        console.log("Temp",temp)
         adjustInvoiceItemsTotal(temp);


  }

  const clearInvoiceItems = ()=>{
    setInvoiceItems([])
    adjustInvoiceItemsTotal([])
  }

  const handleConfirmDelete=()=>{
    console.log("handleConfirmDelete fired!")
    handleDeleteInvoice(currInvoice.id);
    setCurrInvoice(null)
  }


  const adjustInvoiceItemsTotal=(items)=>{
    if(!items.length){
      setTotal(10);
    }
    else{
      setTotal(total=>total = items.reduce((a,b)=>a + (parseInt(b?.price) * parseInt(b?.quantity)),0));
     }

  }

  const values = {
    invoices,
    currInvoice,
    filterBy,
    handleFilterBy,
    viewInvoice,
    handleSaveInvoice,
    adjustInvoiceItems,
    adjustInvoiceItemsTotal,
    clearInvoiceItems,
    handleConfirmDelete,
    invoiceItems,
    total,
    loading,
    error,
  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
