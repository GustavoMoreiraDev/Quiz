import React, { useState, useEffect } from "react";
import Link from "next/link";
import style from './style.module.css';

const RankingList = () => {
    const [jogadores, setJogadores] = useState([]);

    useEffect(() => {
        const fetchJogadores = async () => {
            const res = await fetch('/ranking.json');
            const data = await res.json();
            setJogadores(data.jogadores);
        };

        fetchJogadores();
    }, []);

    const sortedJogadores = jogadores.sort((a, b) => {
        return parseInt(a.ranking) - parseInt(b.ranking);
    });

    return (
        <>
            <main className={style['rl-container']}>
                <div className={style['rl-content-wrapper']}>
                    {sortedJogadores.map((jogador, index) => {
                        return (
                            <div className={style['rl-jogador']} key={index}>
                                <p>{jogador.ranking}</p>
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
