import React from 'react'
import "./Header.css";
import {sunIcon, moonIcon,imgAvatar} from "../../const"
import { useUIContext } from '../../context';

const Header = () => {
    const {toggleTheme,theme} = useUIContext()
  return (
    <header className="header">
        <div className="logo-container">
            <div className="logo"></div>
        </div>
        <div className="avatar-theme-div">
            <div className="theme-container">
                <button className="theme-btn" onClick={toggleTheme}>
                <img src={theme == "light" ? moonIcon : sunIcon} alt="" />
                </button>
            </div>
            <div className="avatar-container">
                <img className="avatar-img" src={imgAvatar} alt="img" />
            </div>
        </div>
    </header>
  )
}

export default Header