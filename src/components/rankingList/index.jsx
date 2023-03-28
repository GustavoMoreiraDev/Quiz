import React, { useState, useEffect } from "react";
import Link from "next/link";
import style from './style.module.css';

const RankingList = () => {
    const [jogadores, setJogadores] = useState([]);

    useEffect(() => {
        const fetchJogadores = async () => {
            const res = await fetch('https://spilinsh.vercel.app/ranking');
            const data = await res.json();
            setJogadores(data);
        };

        fetchJogadores();
    }, []);

    const getSortedJogadores = (jogadores) => {
        return jogadores.sort((a, b) => {
            return parseInt(b.pontuacao) - parseInt(a.pontuacao);
        }).slice(0, 20);
    };

    return (
        <>
            <main className={style['rl-container']}>
                <div className={style['rl-content-wrapper']}>
                    {getSortedJogadores(jogadores).map((jogador, index) => {
                        return (
                            <div className={style['rl-jogador']} key={index}>
                                <p>{index + 1}</p>
                                <p>{jogador.jogador}</p>
                                <p>{jogador.pontuacao}</p>
                            </div>
                        )
                    })}
                    <div className={style['rl-btn-wrapper']}>
                        <Link className={style['rl-btn']} href="/" alt="Spilinsh">
                            Voltar ao inicio
                        </Link>
                    </div>
                </div>
            </main>
        </>
    )
};

export default RankingList;
