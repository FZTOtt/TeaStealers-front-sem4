import React, {useRef, useState} from "react";
import Button from "@components/button/button";
import { translateAudio } from "../../api/api";
import playOwnPassive from "@static/play_own_passive.jpg";
import playOwnActive from "@static/play_own_active.jpg";
import micOn from "@static/micon.svg";
import micOff from "@static/micoff.svg";
import repeat from "@static/again.jpg";
import pass from "@static/next_word.svg";
import { useDispatch, useSelector } from "react-redux";
import { setTranslatedAudio } from "@redux/translated";
import { RootState } from "@redux/store";
import { showMessage } from "@redux/messages";


const Manage: React.FC = () => {
    const dispatch = useDispatch();
    const { translatedAudio, isCorrect, targetWord } = useSelector((state: RootState) => state.translated);
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isRecorded, setIsRecorded] = useState(false);

    const sendAudioToServer = async (audioBlob: Blob) => {
    
        const [status, response] = await translateAudio(audioBlob);
    
        if (status === 200) {
            // console.log("Аудио успешно отправлено на сервер:", response);
            dispatch(setTranslatedAudio(response.payload.transcription));

        } else {
            // console.error("Ошибка при отправке аудио:", response);
            dispatch(showMessage({
                type: 'error',
                message: response.error
            }));
        }
    };

    const toggleRecording = async () => {
        if (!isRecording) {
            try {

                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        
                mediaRecorderRef.current = new MediaRecorder(stream);
        
                mediaRecorderRef.current.ondataavailable = (event) => {
                    audioChunksRef.current.push(event.data);
                };

                mediaRecorderRef.current.onstop = () => {
                
                    const audioBlob = new Blob(audioChunksRef.current); //, { type: "form-data" }
                    const audioUrl = URL.createObjectURL(audioBlob);
                    // console.log("Запись завершена. Ссылка на аудио:", audioUrl);
                    setAudioUrl(audioUrl);
                    setIsRecorded(true)
                    sendAudioToServer(audioBlob);
                    audioChunksRef.current = [];
                };

                mediaRecorderRef.current.start();
                setIsRecording(true);
            } catch (error) {
                // console.error("Ошибка доступа к микрофону:", error);
                dispatch(showMessage({
                    type: 'error',
                    message: "Ошибка доступа к микрофону. Проверьте доступ к микрофону и попробуйте снова"
                }));
            }
        } else {
            mediaRecorderRef.current?.stop();
            setIsRecording(false);
            mediaRecorderRef.current?.stream.getTracks().forEach((track) => track.stop());
        }
    }

    const handlePlay = () => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        };
    }
    return (
        <div>
        <div className="manage">
            <Button size="md" imgSrc={isRecorded ? playOwnActive : playOwnPassive} disabled = {!isRecorded} onClick={handlePlay}></Button>
            <Button size='lg' imgSrc={isRecording ? micOff : micOn} onClick={toggleRecording}></Button>
            <Button size='md' imgSrc={pass} disabled = {true} className="manage__pass"></Button>
            
        </div>
        <div className="manage__suggest">
            {isRecording ? 'Нажмите для остановки' : translatedAudio ? `Мы распознали как ${translatedAudio}` : 'Нажмите для записи'}
        </div>
        </div>
    )
}

export default Manage;