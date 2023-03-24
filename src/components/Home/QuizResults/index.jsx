import React from "react";
import Link from "next/link";
import style from './style.module.css';

const QuizResults = ({ username, correctAnswers, onRestartQuiz }) => {

    return (
        <>
            <main className={style['qr-container']}>
                <h3>Parabéns, {username}!</h3>
                <p>Você acertou {correctAnswers} perguntas</p>
                <button onClick={onRestartQuiz}>Tentar novamente</button>
                <div className={style['qr-content-bottom']}>
                    <Btn content={'Voltar ao Inicio'} rota={'/'} />
                    <Btn content={'Conferir ranking'} rota={'/ranking'} />
                </div>
            </main>
        </>
    )
};

function Btn ({ rota, content }) {
    return (
        <>
            <Link className={style['qr-content-bottom-btn']} href={rota} alt="Spilinsh | Quiz">
                {content}
            </Link>
        </>
    )
}

export default QuizResults;
