import React from 'react'
import "./Status.css"

const Status = ({invoice}) => {
  return (
    <div className={invoice.status == "paid" ? "green-status-div status-div" : invoice.status == "pending" ? "yellow-status-div status-div" : "gray-status-div status-div"}>
    <div className={invoice.status == "paid" ? "green-dot dot" : invoice.status == "pending" ? "yellow-dot dot" : "gray-dot dot"}></div>
    <h5 className={invoice.status == "paid" ? "green-text" : invoice.status == "pending" ? "yellow-text" : "gray-text"}>{invoice.status[0].toUpperCase()}{invoice.status.slice(1,invoice.status.length)}</h5>
  </div>
  )
}

export default Status