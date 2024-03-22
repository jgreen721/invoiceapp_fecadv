import React, {useState} from 'react'
import {Btn} from "../../../"
import { plusIcon, arrowDown } from '../../../../const'
import { useUIContext } from '../../../../context'
import {SearchFilter} from "./components"
import "./InvoicesHeader.css"

const InvoicesHeader = ({invoices}) => {
  const [showFilter,setShowFilter] = useState(false);
  const {filterBy,toggleForm} = useUIContext();

  return (
    <div className="invoice-header">
      
      <div className="column">
        <h1 className="my-1">Invoices</h1>
        {invoices.length < 1 ? <p className="muted">No invoices</p> : <p className="muted"><span className="desktop">There {invoices.length > 1 ? "are" : "is"} </span>{invoices.length} <span className="desktop">{filterBy == "" ? "total" : filterBy}</span> invoice{invoices.length > 1 ? "s" : ""}</p>}
      </div>
      
      
      <div className="column">
        <div className="filter-add-row">
          <div className="filter-container">
            <div onClick={()=>setShowFilter((showFilter)=>showFilter=!showFilter)} className="filter-search-row">
              <h3>Filter <span className="desktop">by status</span></h3>
              <div className="arrow-div">
                <img className={showFilter ? "arrow-icon rotate-down" : "arrow-icon rotate-up"} src={arrowDown} alt="arrow-img" />
              </div>
            </div>
            <SearchFilter setShowFilter={setShowFilter} showFilter={showFilter}/>
          </div>
          
        
          <Btn handleEvent={toggleForm} className="purple-btn btn">
                <div className="btn-icon-div">
                    <img src={plusIcon} alt="" />
                </div>
                <p>New <span className="desktop">Invoice</span> </p>
          </Btn>
        
        </div>
      </div>
    
    </div>
  )
}

export default InvoicesHeader