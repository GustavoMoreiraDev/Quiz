import React, { useState, useEffect } from "react";
import style from './style.module.css';
import axios from "axios";

export function QuizQuestions() {
    const [perguntaIndex, setPerguntaIndex] = useState(0);
    const [perguntas, setPerguntas] = useState([]);
    const [pontuacao, setPontuacao] = useState(0);
    const [tempoTotal, setTempoTotal] = useState(120); // 120 seconds
    const [tempoRestante, setTempoRestante] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('https://spilinsh.vercel.app/start-quiz');
            setPerguntas(response.data);
            setTempoRestante(tempoTotal);
        }
        fetchData();
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            if (tempoRestante > 0) {
                setTempoRestante(tempoRestante - 1);
            } else {
                clearInterval(timer);
                handleQuizEnd();
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [tempoRestante]);

    function handleRespostaEscolhida(respostaIndex) {
        const perguntaAtual = perguntas[perguntaIndex];
        const respostaCorretaIndex = perguntaAtual.respostas.findIndex(r => r.verdadeira);
        if (respostaIndex === respostaCorretaIndex) {
            setPontuacao(pontuacao + 1);
        }
        handleNextQuestion();
    }

    function handleNextQuestion() {
        if (perguntaIndex < perguntas.length - 1) {
            setPerguntaIndex(perguntaIndex + 1);
        } else {
            handleQuizEnd();
        }
    }

    function handleQuizEnd() {
        setTempoRestante(0);
    }

    return (
        <>
            {perguntas.length > 0 && perguntaIndex < perguntas.length ? (
                <div className={style['qq-container']}>
                    <div className={style["qq-timer-wrap"]}>
                        <p>Tempo restante:</p>
                        <p>
                            <strong>{Math.floor(tempoRestante / 60)}:{(tempoRestante % 60).toString().padStart(2, '0')}s</strong>
                        </p>
                    </div>
                    <h3>{perguntas[perguntaIndex].pergunta}</h3>
                    <div className={style["qq-wrapper"]}>
                        <Respo
                            respostas={perguntas[perguntaIndex].respostas}
                            onRespostaEscolhida={handleRespostaEscolhida}
                        />
                    </div>
                </div>
            ) : (
                <div className={style['qq-container']}>
                    <h3>Parabéns! Você finalizou o quiz.</h3>
                    <p>Pontuação: {pontuacao}</p>
                    <p>Tempo total: {tempoTotal} segundos</p>
                </div>
            )}
        </>
    )
};

function Respo({ respostas, onRespostaEscolhida }) {
    function handleButtonClick(index) {
        onRespostaEscolhida(index);
    }

    return (
        <>
            {
                respostas.map((resposta, index) => (
                    <div className={style['op-wrapper']} key={index}>
                        <button
                            type="button"
                            className={resposta.verdadeira ? 'resposta-correta' : ''}
                            onClick={() => handleButtonClick(index)}
                        >
                            {resposta.texto}
                        </button>
                    </div>
                ))
            }
        </>
    )
}
