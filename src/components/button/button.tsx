import { ButtonProps } from "@interfaces/ButtonProps"
import React from "react"

const Button: React.FC<ButtonProps> = ({ text, imgSrc, onClick, disabled, type = "button", className, size = "sm" }) => {

    const buttonClass = `${className || ''} button_size_${size}`;

    return(
        <div>
            <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={buttonClass}
            >
            {text? text:''}
            {imgSrc && <img src={imgSrc} alt="Button icon" />}

        </button>
        </div>
        
    )
}

export default Button