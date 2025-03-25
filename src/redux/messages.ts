import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Message from "@interfaces/Message";

interface MessageState {
    message: Message | null;
}

const initialState: MessageState = {
    message: null,
}

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        showMessage: (state, action: PayloadAction<Message>) => {
            state.message = action.payload;
        },
        hideMessage: (state) => {
            state.message = null;
        }
    }
});

export const { showMessage, hideMessage } = messagesSlice.actions;
export default messagesSlice.reducer;
