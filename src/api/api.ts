import { postRequestFormData, getRequestFormData, getRequest, postRequest } from "./ajax";

const API_BASE_URL = "https://ouzistudy.ru/api";
// localhost:8080

/*
    Запрос для распознавания аудио
*/
export const translateAudio = async (audioBlob: Blob): Promise<[number, any]> => {
    const formData = new FormData();
    formData.append("file", audioBlob, "recording.wav");
  
    return postRequestFormData(`${API_BASE_URL}/audio/translate_audio`, formData);
};

/*
    Запрос на слово
*/
export const getWord = async(word:string): Promise<[number, any]> => {

    return getRequest(`${API_BASE_URL}/word/${word}`)
}

/*
    Запрос на изменение статистики
*/
export const addStatistics = async(word:string, isCorrect:boolean): Promise<[number, any]> => {
    const data = {
        'correct': isCorrect
    }
    return postRequest(`${API_BASE_URL}/stat/${word}`, data)
}
