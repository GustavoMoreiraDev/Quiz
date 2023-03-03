import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import style from "./style.module.css";

import { ResultsContext } from "../../../service/resultsContext";

import { Instrucoes } from "../instrucoes";
import QuizResults from "../QuizResults";

function shuffle(array) {
    let currentIndex = array.length;
    let temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

export function QuizQuestions() {
    const router = useRouter();
    const { username } = useContext(ResultsContext);
    const [quizStarted, setQuizStarted] = useState(false);
    const [quizFinished, setQuizFinished] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(10);
    const [correctAnswers, setCorrectAnswers] = useState(0);

    const { perguntas } = require("../../../service/perguntas.json");

    const shuffledQuestions = shuffle(perguntas);
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const { pergunta, respostas } = currentQuestion;

    useEffect(() => {
        if (quizStarted) {
            const intervalId = setInterval(() => {
                setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [quizStarted]);

    useEffect(() => {
        if (timeLeft === 0) {
            setQuizFinished(true);
        }
    }, [timeLeft]);

    function startQuiz() {
        setQuizStarted(true);
    }

    function handleAnswerClick(verdadeira) {
        if (verdadeira) {
            setCorrectAnswers(correctAnswers + 1);
        }

        const nextQuestionIndex = currentQuestionIndex + 1;

        if (nextQuestionIndex < shuffledQuestions.length) {
            setCurrentQuestionIndex(nextQuestionIndex);
        } else {
            setQuizFinished(true);
        }
    }

    function handleRestartQuiz() {
        setQuizStarted(false);
        setQuizFinished(false);
        setCurrentQuestionIndex(0);
        setTimeLeft(10);
        setCorrectAnswers(0);
    }

    if (quizFinished) {
        return (
            <QuizResults
                username={username}
                correctAnswers={correctAnswers}
                totalQuestions={shuffledQuestions.length}
                onRestartQuiz={handleRestartQuiz}
            />
        );
    }

    return (
        <>
            {!quizStarted && (
                <Instrucoes player={username} time={timeLeft} onStartQuiz={startQuiz} />
            )}

            {quizStarted && (
                <div className={style["qq-container"]}>
                    <div className={style["qq-timer-wrap"]}>
                        <p>Tempo restante:</p>
                        <p>
                            <strong>{timeLeft}s</strong>
                        </p>
                    </div>
                    <h3>{pergunta}</h3>
                    <div className={style["qq-wrapper"]}>
                        {respostas &&
                            respostas.map((resposta) => (
                                <Opcao
                                    key={resposta.texto}
                                    texto={resposta.texto}
                                    verdadeira={resposta.verdadeira}
                                    onClick={() => handleAnswerClick(resposta.verdadeira)}
                                />
                            ))}
                    </div>
                </div>
            )}
        </>
    );
}


function Opcao({ texto, onClick }) {
    return (
        <>
            <div className={style['op-wrapper']}>
                <button type="button" onClick={onClick}>
                    {texto}
                </button>
            </div>
        </>
    )
}
