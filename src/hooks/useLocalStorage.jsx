import {useState, useEffect} from "react"
import { parseLocalStorage } from "../helpers"


export const useLocalStorage=(name,defaultValue,bill)=>{
        const [payload,setPayload] = useState(defaultValue)
        const [loading,setLoading] = useState(true);

    

        useEffect(()=>{
            let localStorageData = JSON.parse(localStorage.getItem("draftitem")) || {};
            if(!localStorageData?.billFrom && !localStorageData?.billTo && !localStorageData?.description && !localStorageData?.date && !localStorageData?.paymentTerms && !localStorageData?.items){
                // console.log("Nothing in Local Storage");
                setLoading(false)
        
            }
            else{
                setLoading(true)
                // console.log("parsing LS object")
                let val = parseLocalStorage(name,bill)
                setPayload(val)
                setLoading(false);

    
           

            }
      
        },[]);

        // console.log(`useLocalStorage(${name})-Payload:${payload}`);

        return {payload,loading}
        
}