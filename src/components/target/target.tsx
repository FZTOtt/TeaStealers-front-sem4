import Button from "@components/button/button";
import React, { useEffect, useState } from "react";
import playTargetAudio from "@static/play_target_audio.jpg"; 
import { getWord } from "../../api/api";

const Target: React.FC = () => {

    const [word, setWord] = useState<string | null>('Hello');
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);

    useEffect (() => {
        const fetchWord = async () => {
            const [status, response] = await getWord('hello');
            console.log(status, response)
            console.log(response.text)

            if (status===200) {
                setWord(response.text)
                setAudioBlob(response.audioBlob);
            } else {
                console.error("Ошибка при получении данных:", response);
            }
        };

        fetchWord();
    }, [])

    const handlePlayAudio = () => {
        if (audioBlob) {
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();
            }
    };

    return (
        <div className="target">
            {word}
            <Button imgSrc={playTargetAudio} size="sm" onClick={handlePlayAudio}></Button>
        </div>
    )
}

export default Target;