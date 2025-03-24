import { configureStore } from "@reduxjs/toolkit";
import translatedReducer from "./translated";
import messagesReducer from "./messages";

const store = configureStore({
    reducer: {
        translated: translatedReducer,
        messages: messagesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
