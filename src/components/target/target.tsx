import Button from "@components/button/button";
import React, { useEffect, useState } from "react";
import playTargetAudio from "@static/play_target_audio.jpg"; 
import { useSelector } from "react-redux";
import { RootState } from "@redux/store";

const Target: React.FC = () => {
    const { targetWord, isCorrect, targetAudioUrl, targetTranscription } = useSelector((state: RootState) => state.translated);

    const handlePlayAudio = () => {
        if (targetAudioUrl) {
            const audio = new Audio(targetAudioUrl);
            audio.play();
        }
    };

    return (
        <div className="target">
            <div className="target__word-container">
                <span className={isCorrect === null ? '' : isCorrect ? 'target__word--correct' : 'target__word--incorrect'}>
                    {targetWord ? targetWord.charAt(0).toUpperCase() + targetWord.slice(1) : ''}
                </span>
                <Button imgSrc={playTargetAudio} size="sm" onClick={handlePlayAudio} divClass="target__audio-button" />
            </div>
            <span className="target__transcription">
                {targetTranscription}
            </span>
        </div>
    )
}

export default Target;