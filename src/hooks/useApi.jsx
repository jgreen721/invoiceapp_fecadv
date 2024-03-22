import { useState, useEffect } from 'react';

export const useApi = (filterBy) => {
  const [data, setData] = useState([]);
  const [filtered,setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        updateData(result);
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


  const handleAddNewItem = (newItem)=>{
    let tempData = data;
    tempData.push(newItem);
    console.log("useAPI",tempData,newItem)
    setData(tempData);
    // setFiltered(tempData)
  }

  const handleDeleteInvoice=(id)=>{
    let tempData = data;
    tempData = tempData.filter(item=>item.id == id);
    setData(tempData);

  }

  return { filtered, loading, error,handleAddNewItem,handleDeleteInvoice };
};




