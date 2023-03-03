import React from "react";
import style from './style.module.css';

const QuizResults = ({ username, correctAnswers, totalQuestions, onRestartQuiz }) => {
    
    const percentage = ((correctAnswers / totalQuestions) * 100).toFixed(0);

    return (
        <>
            <div className={style['qr-container']}>
                <h3>Parabéns, {username}!</h3>
                <p>Você acertou {correctAnswers} de um total de {totalQuestions} perguntas ({percentage}%)</p>
                <button onClick={onRestartQuiz}>Tentar novamente</button>
            </div>
        </>
    )
};

export default QuizResults;
