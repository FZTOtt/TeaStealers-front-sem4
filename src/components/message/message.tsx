import React, { useEffect } from "react";
import "./message.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { RootState } from "@redux/store";
import close from "@static/close.svg";
import { hideMessage } from "@redux/messages";

const Message: React.FC = () => {
    const dispatch = useDispatch();
    const message = useSelector((state: RootState) => state.messages.message); 

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                dispatch(hideMessage());
            }, 7000);

            return () => clearTimeout(timer);
        }
    }, [message, dispatch]);

    const handleClose = () => {
        dispatch(hideMessage());
    }

    if (!message) {
        return null;
    }

    return (
        <div className={`message ${message?.type ? 'message--' + message.type : ''}`}>
            <div className="message__header">
                <div className="message__header__title">
                    {message?.type === 'error' ? 'Ошибка' : message?.type === 'notify' ? 'Уведомление' : 'Успех'}
                </div>
                <div className="message__header__close" onClick={handleClose}>
                    <img src={close} alt="close" />
                </div>
            </div>
            <div className="message__content">
                <h1>{message?.message}</h1>
            </div>
        </div>
    )
}

export default Message;
