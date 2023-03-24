import React from "react";
import style from './style.module.css';

import jogadores from '../../service/ranking.json';


const RankingList = () => {

    return (
        <>
            <main className={style['rl-container']}>
                <div className={style['rl-content-wrapper']}>
                    {console.log(jogadores)}
                </div>
            </main>
        </>
    )
};


export default RankingList;