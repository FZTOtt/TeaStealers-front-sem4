import Button from "@components/button/button";
import React, { useEffect, useState } from "react";
import playTargetAudio from "@static/play_target_audio.jpg"; 
import { getWord } from "../../api/api";
import { useDispatch, useSelector } from "react-redux";
import { setTargetWord } from "@redux/translated";
import { RootState } from "@redux/store";

const Target: React.FC = () => {
    const dispatch = useDispatch();
    const { targetWord, translatedAudio, isCorrect } = useSelector((state: RootState) => state.translated);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

    useEffect (() => {
        const fetchWord = async () => {
            const [status, response] = await getWord('hello');
            console.log(status, response)
            console.log(response.text)

            if (status===200) {
                setAudioBlob(response.audioBlob);
                dispatch(setTargetWord(response.text));
            } else {
                console.error("Ошибка при получении данных:", response);
            }
        };

        fetchWord();
    }, [dispatch])

    const handlePlayAudio = () => {
        if (audioBlob) {
            const audioUrl = URL.createObjectURL(audioBlob);
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