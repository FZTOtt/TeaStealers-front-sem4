import React, {useEffect, useRef, useState} from "react";
import Button from "@components/button/button";
import { addStatistics, translateAudio, getWord } from "../../api/api";
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
import { setTargetWord, setTargetAudioUrl } from "@redux/translated";


const Manage: React.FC = () => {
    const dispatch = useDispatch();
    const { translatedAudio, isCorrect, targetWord } = useSelector((state: RootState) => state.translated);
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [isRecorded, setIsRecorded] = useState(false);

    const fetchWord = async (word: string) => {
            const [status, response] = await getWord(word);
            console.log(status, response)
    
            if (status===200) {
                let url = response.link;
                url = url.replace(/http:\/\/[^\/]+/, 'https://ouzistudy.ru/minio');
                url = url.replace(/&/g, '\\u0026');
                dispatch(setTargetWord(response.word));
                dispatch(setTargetAudioUrl(url))
            } else {
                console.error("Ошибка при получении данных:", response);
            }
        };

    const sendStats = async () => {
        if (isCorrect !== null && targetWord !== null) {
            try {
                const [status, response] = await addStatistics(targetWord, isCorrect);
                console.log(status, response)   
                if (status !== 200 && response.sucess !== true) {
                    dispatch(showMessage({
                        type: 'error',
                        message: 'Не удалось сохранить статистику'
                    }));
                }
            } catch (error) {
                dispatch(showMessage({
                    type: 'error',
                    message: 'Ошибка при сохранении статистики'
                }));
            }
        }
    };
    
    useEffect(() => {
        if (!targetWord) {
            fetchWord('hello')
        }
    }, [])

    const sendAudioToServer = async (audioBlob: Blob) => {
    
        const [status, response] = await translateAudio(audioBlob);
    
        if (status === 200) {
            dispatch(setTranslatedAudio(response.payload.transcription));
            if (isCorrect) {
                sendStats();
            }

        } else {
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
                    setAudioUrl(audioUrl);
                    setIsRecorded(true)
                    sendAudioToServer(audioBlob);
                    audioChunksRef.current = [];
                };

                mediaRecorderRef.current.start();
                setIsRecording(true);
            } catch (error) {
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

    const getNextWord = () => {
        fetchWord('interesting')
    }

    const handleRepeat = () => {
        dispatch(setTargetWord(targetWord));
    };

    return (
        <div>
            <div className="manage">
                <Button size="md" imgSrc={isRecorded ? playOwnActive : playOwnPassive} disabled = {!isRecorded} onClick={handlePlay}></Button>
                <Button size='lg' imgSrc={isCorrect ? pass : isRecording ? micOff : micOn} onClick={isCorrect ? getNextWord : toggleRecording}></Button>
                <Button size='md' imgSrc={isCorrect ? repeat : pass} disabled = {isCorrect || false} className="manage__pass" onClick={isCorrect ? handleRepeat : getNextWord}></Button>
                
            </div>
            <div className="manage__suggest">
                {isRecording ? 'Нажмите для остановки' : translatedAudio ? `Мы распознали как ${translatedAudio}` : 'Нажмите для записи'}
            </div>
        </div>
    )
}

export default Manage;