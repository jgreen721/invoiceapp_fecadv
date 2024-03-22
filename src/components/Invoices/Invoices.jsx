import React from 'react'
import { useInvoiceContext } from '../../context/InvoiceContext'
import {InvoicesHeader,Empty,InvoiceList} from "./components"
import "./Invoices.css"
const Invoices = () => {
    const {invoices} = useInvoiceContext()

  return (
    <div className="invoices-parent">
        <InvoicesHeader invoices={invoices}/>
        {invoices.length >= 1 ? <InvoiceList invoices={invoices}/> :  <Empty/> }
    </div>
  )
}

export default Invoices