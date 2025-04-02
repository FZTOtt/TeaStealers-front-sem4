import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TranslatedState {
    translatedAudio: string | null;
    isCorrect: boolean | null;
    targetWord: string | null;
    targetAudioUrl: string | null;
}

const initialState: TranslatedState = {
    translatedAudio: null,
    isCorrect: null,
    targetWord: null,
    targetAudioUrl: null,
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
            state.isCorrect = null;
        },
        setTargetAudioUrl: (state, action: PayloadAction<string>) => {
            state.targetAudioUrl = action.payload;
        },
    },
});

export const { setTranslatedAudio, setTargetWord, setTargetAudioUrl } = translatedSlice.actions;
export default translatedSlice.reducer;
