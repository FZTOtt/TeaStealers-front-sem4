import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TranslatedState {
    translatedAudio: string | null;
    isCorrect: boolean | null;
    targetWord: string | null;
}

const initialState: TranslatedState = {
    translatedAudio: null,
    isCorrect: null,
    targetWord: null,
}

const translatedSlice = createSlice({
    name: 'translated',
    initialState,
    reducers: {
        setTranslatedAudio: (state, action: PayloadAction<string>) => {
            state.translatedAudio = action.payload;
            state.isCorrect = state.translatedAudio?.toLowerCase() === state.targetWord?.toLowerCase();
        },
        setTargetWord: (state, action) => {
            state.targetWord = action.payload;
        },
    },
});

export const { setTranslatedAudio, setTargetWord } = translatedSlice.actions;
export default translatedSlice.reducer;
