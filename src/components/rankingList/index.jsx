import React, { useState, useEffect } from "react";
import Link from "next/link";
import style from './style.module.css';

const RankingList = () => {
    const [jogadores, setJogadores] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const playersPerPage = 7;

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
        });
    };

    const renderJogadores = () => {
        const sortedJogadores = getSortedJogadores(jogadores);
        const indexOfLastPlayer = currentPage * playersPerPage;
        const indexOfFirstPlayer = indexOfLastPlayer - playersPerPage;
        const currentPlayers = sortedJogadores.slice(indexOfFirstPlayer, indexOfLastPlayer);
        return currentPlayers.map((jogador, index) => (
            <div className={style['rl-jogador']} key={index}>
                <p>{indexOfFirstPlayer + index + 1}</p>
                <p>{jogador.jogador}</p>
                <p>{jogador.pontuacao}</p>
            </div>
        ));
    };

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(jogadores.length / playersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <>
            <main className={style['rl-container']}>
                <div className={style['rl-content-wrapper']}>
                    {renderJogadores()}
                    <div className={style['pagination-wrapper']}>
                        {pageNumbers.map(number => (
                            <div className={currentPage === number ? style['btn-wrapper'] : null} key={number}>
                                <button className={style['pagination-btn']} onClick={() => paginate(number)} type="button">
                                    {number}
                                </button>
                            </div>
                        ))}
                    </div>
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
