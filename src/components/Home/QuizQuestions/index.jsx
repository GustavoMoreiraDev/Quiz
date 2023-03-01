import React, { useState, useEffect } from "react";
import style from './style.module.css';

import perguntas from '../../../service/perguntas.json';

export function QuizQuestions() {

    const [listaPerguntas, setListaPerguntas] = useState(perguntas.perguntas);
    const [tempoRestante, setTempoRestante] = useState(120000);
    const [perguntaAtual, setPerguntaAtual] = useState(0);

    function embaralharRespostas(respostas) {
        // Função para embaralhar as opções de resposta
        let indiceAtual = respostas.length;
        let valorTemporario, indiceAleatorio;

        while (0 !== indiceAtual) {
            indiceAleatorio = Math.floor(Math.random() * indiceAtual);
            indiceAtual -= 1;

            valorTemporario = respostas[indiceAtual];
            respostas[indiceAtual] = respostas[indiceAleatorio];
            respostas[indiceAleatorio] = valorTemporario;
        }

        return respostas;
    }

    function selecionarPerguntaAleatoria() {
        const perguntaSelecionada = listaPerguntas[perguntaAtual];
        const opcoesResposta = perguntaSelecionada ? perguntaSelecionada.respostas : null;
        const pergunta = perguntaSelecionada ? perguntaSelecionada.pergunta : '';

        return { pergunta, respostas: opcoesResposta };
    }

    function handleResposta() {
        // Atualiza o índice da pergunta atual para selecionar a próxima pergunta aleatória
        setPerguntaAtual(perguntaAtual + 1);
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setTempoRestante(tempoRestante - 1000);
        }, 1000);

        if (tempoRestante === 0) {
            clearTimeout(timer);
        }

        return () => clearTimeout(timer);
    }, [tempoRestante]);

    useEffect(() => {
        // Embaralha a lista de perguntas sempre que o estado `listaPerguntas` for atualizado
        setListaPerguntas(embaralharRespostas(listaPerguntas));
    }, [listaPerguntas]);

    const perguntaAleatoria = selecionarPerguntaAleatoria();

    return (
        <>
            <div className={style['qq-container']}>
                <div className={style['qq-timer-wrap']}>
                    <p>tempo restante:</p>
                    <p style={{width: '50px'}}><strong>{tempoRestante / 1000}s</strong></p>
                </div>
                <h3>{perguntaAleatoria.pergunta}</h3>
                <div className={style['qq-wrapper']}>
                    {perguntaAleatoria.respostas && perguntaAleatoria.respostas.map((resposta, indice) => (
                        <Opcao key={indice} texto={resposta.texto} onClick={handleResposta} />
                    ))}
                </div>
            </div>
        </>
    )
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
