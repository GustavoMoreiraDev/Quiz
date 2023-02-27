import React from "react";
import style from './style.module.css';

export function Instrucoes({ onStartQuiz }) {

    return (
        <>
            <div className={style['is-container']}>
                <p>
                    Seja bem-vindo ao Quiz! Este jogo desafia seus
                    conhecimentos gerais em um teste de habilidade
                    e velocidade. O objetivo é responder o maior
                    número de perguntas corretamente em um intervalo de
                    120 segundos, colocando à prova seu conhecimento
                    em diversas áreas, como história, geografia,
                    literatura, ciências, entre outras.
                </p>
                <p>
                    A cada resposta certa, você acumula pontos e sobe
                    no ranking de jogadores. No final dos 120 segundos,
                    o jogo é encerrado e o placar final é exibido.
                </p>
                <p>
                    E aí, está pronto para esse desafio? Então vamos lá!
                    Clique em Iniciar Quiz e comece agora mesmo a testar
                    seus conhecimentos gerais!
                </p>
                <button type="button" onClick={onStartQuiz}>
                    Iniciar Quiz
                </button>
            </div>
        </>
    )
}