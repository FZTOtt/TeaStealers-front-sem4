import React from "react";
import './navbar.scss'
import Button from "@components/button/button";
import { useNavigate } from 'react-router-dom';
const Navbar: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="navbar">
            <p className="navbar__logo anton-regular" onClick={() => navigate('/')}>OUZI</p>
            <Button className="navbar__statictic_btn" size="sm" text="Статистика" onClick={() => navigate('/statistics')}/>
        </div>
    )
}

export default Navbar;