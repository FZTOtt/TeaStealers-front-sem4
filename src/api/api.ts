import { postRequestFormData, getRequestFormData } from "./ajax";

const API_BASE_URL = "https://ouzistudy.ru/api";
// localhost:8080

/*
    Запрос для распознавания аудио
*/
export const translateAudio = async (audioBlob: Blob): Promise<[number, any]> => {
    const formData = new FormData();
    formData.append("file", audioBlob, "recording.wav");
    console.log(formData)
    
  
    return postRequestFormData(`${API_BASE_URL}/audio/translate_audio`, formData);
};

/*
    Запрос на слово
*/
export const getWord = async(word:string): Promise<[number, any]> => {

    return getRequestFormData(`${API_BASE_URL}/word/get_word/${word}`)
}