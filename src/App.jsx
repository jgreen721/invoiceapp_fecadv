import './App.css'
import {useInvoiceContext, useUIContext} from "./context"
import {Header,Invoices,ViewInvoice,AddEditForm} from "./components"



function App() {
  const {currInvoice} = useInvoiceContext()
  const {theme,showForm} = useUIContext()


 

  return (
    <div data-theme={theme} className="app">
      <div className="app-content-row">
        <div className="header-form-column">
        <Header/>
        </div>
    

        <main className={showForm ? "main-container dark-overlay" : "main-container"}>
          <AddEditForm/>
          <section className="main-content-card">
           {currInvoice ? <ViewInvoice/> : <Invoices/>}
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
