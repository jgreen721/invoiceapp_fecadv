import React from 'react'
import "./ItemsTotalRow.css"
import { formatAmount } from '../../../../../../helpers' 



const ItemsTotalRow = ({total}) => {
  return (
       <div className="table-total-row">
          <h5>Amount Due</h5>
          <h3 className="bold">{formatAmount(total)}</h3>
        </div> 
  )
}

export default ItemsTotalRow