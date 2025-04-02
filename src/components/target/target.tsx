import Button from "@components/button/button";
import React, { useEffect, useState } from "react";
import playTargetAudio from "@static/play_target_audio.jpg"; 
import { addStatistics, getWord } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { setTargetWord } from "@redux/translated";
import { RootState } from "@redux/store";
import { showMessage } from "@redux/messages";

const Target: React.FC = () => {
    const dispatch = useDispatch();
    const { targetWord, translatedAudio, isCorrect } = useSelector((state: RootState) => state.translated);
    const [audioUrl, setAudioUrl] = useState<string | null>(null);

    useEffect (() => {
        const fetchWord = async () => {
            const [status, response] = await getWord('hello');
            console.log(status, response)

            if (status===200) {
                let url = response.link;
                url = url.replace(/http:\/\/[^\/]+/, 'https://ouzistudy.ru/minio');
                url = url.replace(/&/g, '\\u0026');
                setAudioUrl(url);
                console.log(url)
                dispatch(setTargetWord(response.word));
            } else {
                console.error("Ошибка при получении данных:", response);
            }
        };

        fetchWord();
    }, [])

    useEffect(() => {

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
    
        sendStats();

    }, [isCorrect, targetWord])

    const handlePlayAudio = () => {
        if (audioUrl) {
            const audio = new Audio(audioUrl);
            audio.play();
        }
    };

    return (
        <div className="target">
            <span className={isCorrect === null ? '' : isCorrect ? 'target__word--correct' : 'target__word--incorrect'}>
                {targetWord ? targetWord.charAt(0).toUpperCase() + targetWord.slice(1) : ''}
            </span>
            <Button imgSrc={playTargetAudio} size="sm" onClick={handlePlayAudio}></Button>
        </div>
    )
}

export default Target;