import React from "react";
import './navbar.scss'
import Button from "@components/button/button";

const Navbar: React.FC = () => {
    return (
        <div className="navbar">
            <Button className="navbar__statictic_btn" size="sm" text="Статистика" divClass="navbar__statictic"/>
            <div className="navbar__logo-container">
                <p className="navbar__logo anton-regular">OUZI</p>
            </div>
        </div>
    )
}

export default Navbar;