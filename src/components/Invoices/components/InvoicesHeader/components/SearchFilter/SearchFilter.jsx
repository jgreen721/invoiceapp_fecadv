import React, {useEffect, useState} from 'react'
import { checkIcon } from '../../../../../../const'
import { useInvoiceContext } from '../../../../../../context'
import "./SearchFilter.css"




const FilterCategoryItem = ({status,selectStatus,filterBy})=>{



    return(
        <li className="search-filter-item">
            <div onClick={()=>selectStatus(status.status)} className={status.active ? "check-icon-square active" : "check-icon-square"}>
                {filterBy == status || filterBy == "" && status == "All" && <img src={checkIcon} className="check-icon" alt="" />}
            </div>
            <p className="bold">{status.status}</p>
        </li>
    )

}

const SearchFilter = ({showFilter,setShowFilter}) => {
    const [statuses,setStatuses] = useState([
        {id:1,status:"All",active:true},
        {id:2,status:"Draft",active:false},
        {id:3,status:"Pending",active:false},
        {id:4,status:"Paid",active:false},
    ]);
    const {handleFilterBy,filterBy} = useInvoiceContext()

    const selectStatus = (status)=>{
        // setStatuses(statuses=>statuses.map(c=>c.status == status ? {...c,active:true} : {...c,active:false}))
        handleFilterBy(status)
        setShowFilter(showFilter=>showFilter = false)
    }

    useEffect(()=>{
         setStatuses(statuses=>statuses.map(c=>c.status.toLowerCase() == filterBy ||filterBy == "" && c.status == "All" ? {...c,active:true} : {...c,active:false}))

    },[filterBy])

  return (
    <div className={showFilter ? "search-filter" : "search-filter hide-dropdown"}>
        <ul className="filter-category-list">
            {statuses.map(c=>
                <FilterCategoryItem filterBy={filterBy} selectStatus={selectStatus} status={c} key={c.id}/>)}
        </ul>
    </div>
  )
}

export default SearchFilter