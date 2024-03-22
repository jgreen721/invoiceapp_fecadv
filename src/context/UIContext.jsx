import { useEffect, useState, createContext, useContext } from "react";
import { useApi } from "../hooks/useApi";


const AppContext = createContext();

export const useUIContext = () => useContext(AppContext);

export const UIProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") ? localStorage.getItem("theme") : "light");
  const [showForm,setShowForm] = useState(false)




  const toggleTheme = ()=>{
    if(theme == "light")setTheme("dark");
    else setTheme("light");
    localStorage.setItem("theme",theme == "light" ? "dark" : "light");
  }




  const toggleForm = ()=>{
    console.log("toggleForm!!")
    setShowForm(showForm=>showForm=!showForm);
  }




  const values = {
    theme,
    toggleTheme,
    showForm,
    toggleForm,

  };
  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};
