import React from "react";
import style from './style.module.css';

const QuizResults = ({ username, pontuacao, totalPerguntas, onRestartQuiz }) => {
    
    const percentage = ((pontuacao / totalPerguntas) * 100).toFixed(0);

    return (
        <>
            <div className={style['qr-container']}>
                <h3>Parabéns, {username}!</h3>
                <p>Você acertou {pontuacao} de um total de {totalPerguntas} perguntas ({percentage}%)</p>
                <button onClick={onRestartQuiz}>Tentar novamente</button>
            </div>
        </>
    )
};

export default QuizResults;
