import React, { useState, useEffect } from "react";
import style from './style.module.css';
import axios from "axios";

import QuizResults from '@/components/Home/QuizResults';

export function QuizQuestions({ nickname }) {
    const [perguntaIndex, setPerguntaIndex] = useState(0);
    const [perguntas, setPerguntas] = useState([]);
    const [pontuacao, setPontuacao] = useState(0);
    const [tempoTotal, setTempoTotal] = useState(10); // segundos
    const [tempoRestante, setTempoRestante] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            const response = await axios.get('https://spilinsh.vercel.app/start-quiz');
            setPerguntas(response.data);
            setTempoRestante(tempoTotal);
            setIsLoading(false);
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

    function handleRestartQuiz() {
        setPerguntaIndex(0);
        setPontuacao(0);
        setTempoRestante(tempoTotal);
    }

    return (
        <>
            {isLoading ? (
                <p>Carregando perguntas...</p>
            ) : perguntas.length > 0 && perguntaIndex < perguntas.length ? (
                <div className={style['qq-container']}>
                    <div className={style["qq-timer-wrap"]}>
                        <p>Tempo restante:</p>
                        <p>
                            <strong>{Math.floor(tempoRestante)}s</strong>
                        </p>
                    </div>
                    <div className={style['qq-content']}>
                        <h3>{perguntas[perguntaIndex].pergunta}</h3>
                        <div className={style['qq-wrapper']}>
                            {perguntas[perguntaIndex].respostas.map((resposta, index) => (
                                <div
                                    key={index}
                                    className={style['qq-item']}
                                    onClick={() => handleRespostaEscolhida(index)}
                                >
                                    {resposta.texto}
                                </div>
                            ))}
                        </div>
                        <p>
                            {perguntaIndex + 1}/{perguntas.length}
                        </p>
                    </div>
                </div>
            ) : (
                <QuizResults
                    pontuacao={pontuacao}
                    totalPerguntas={perguntas.length}
                    onRestartQuiz={handleRestartQuiz}
                />
            )}
        </>
    );
}
