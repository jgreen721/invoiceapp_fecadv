import { useState, useEffect } from 'react';

export const useApi = (filterBy) => {
  const [data, setData] = useState([]);
  const [filtered,setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hydrate,setHydrate] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("data.json");
        const result = await response.json();
        // console.log(result);
        // let random = Math.random() * 80 | 0 + 25;
        // console.log(random);
        // for(let i=0;i<random;i++){
        //   result.push(result[Math.random() * result.length-1 | 0]);
        // }
        console.log("DONE",result);
        setData(result);
        setFiltered(result);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);


  useEffect(()=>{
    if(filterBy == ""){
      setFiltered(data)
      return;
    }
    console.log("filter data!",filterBy);
    let temp = data;
    temp = temp.filter(t=>t.status == filterBy);
    setFiltered(temp)
  },[filterBy])


  useEffect(()=>{
    console.log("hydrated!!")

    if(filterBy == ""){
      setFiltered(data)
      return;
    }
    let temp = data;
    temp = temp.filter(t=>t.status == filterBy);
    setFiltered(temp)
 
  },[hydrate])


  const handleAddNewItem = (newItem)=>{
    let tempData = data;
    tempData.push(newItem);
    console.log("useAPI",tempData,newItem)
    setData(tempData);
    setHydrate(hydrate=>hydrate=!hydrate)
    // setFiltered(tempData)
  }

  const handleDeleteInvoice=(id)=>{
    let tempData = data;
    // console.log("DataLength",tempData.length)
    tempData = tempData.filter(item=>item.id != id);
    setData(tempData);
    // console.log("DataLength",tempData.length)
    // console.log("handle Delete fired!")
    setHydrate(hydrate=>hydrate=!hydrate)

  }

  return { filtered, loading, error,handleAddNewItem,handleDeleteInvoice };
};




