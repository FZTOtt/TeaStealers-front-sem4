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
    const { targetWord, isCorrect, targetAudioUrl } = useSelector((state: RootState) => state.translated);

    const handlePlayAudio = () => {
        if (targetAudioUrl) {
            const audio = new Audio(targetAudioUrl);
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