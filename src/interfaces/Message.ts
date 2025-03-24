interface Message {
    type: 'error' | 'notify' | 'success';
    message: string;
}

export default Message;
