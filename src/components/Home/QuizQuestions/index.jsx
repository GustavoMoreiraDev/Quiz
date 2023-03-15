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
    }, [tempoTotal]);
    

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
        if (perguntaIndex === perguntas.length - 1 && tempoRestante > 0) {
            handleQuizEnd();
        } else {
            handleNextQuestion();
        }
    }

    function handleNextQuestion() {
        if (perguntaIndex === perguntas.length - 1 && tempoRestante > 0) {
            handleQuizEnd();
        } else {
            setPerguntaIndex(perguntaIndex + 1);
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
                            <strong>{Math.floor(tempoRestante)}s</strong>
                        </p>
                    </div>
                    <div className={style['qq-content']}>
                        <div className={style['qq-question']}>
                            <h3>{perguntas[perguntaIndex].pergunta}</h3>
                        </div>
                        <div className={style['qq-answers']}>
                            {perguntas[perguntaIndex].respostas.map((resposta, index) => (
                                <div
                                    key={index}
                                    className={style['qq-answer']}
                                    onClick={() => handleRespostaEscolhida(index)}
                                >
                                    <p>{resposta.texto}</p>
                                </div>
                            ))}
                        </div>
                        <div className={style['qq-pontuacao']}>
                            <p>Pontuação: {pontuacao}</p>
                        </div>
                        <div className={style['qq-nav']}>
                            <button onClick={handleNextQuestion}>Próxima</button>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <h2>Fim do Quiz</h2>
                    <p>Sua pontuação foi: {pontuacao}</p>
                </div>
            )}
        </>
    );
}
