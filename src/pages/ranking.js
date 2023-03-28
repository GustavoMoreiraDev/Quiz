import React from "react";
import Head from "next/head";

import { Background } from "@/components/Background";
import RankingList from "@/components/rankingList";

const RankingPage = () => {
    return (
        <>
            <Head>
                <title>Quiz | Teste de Conhecimento</title>
                <meta name="description" content="Teste seu conhecimento em nosso quiz e descubra o quanto você sabe sobre o assunto em apenas algumas perguntas! Desafie a si mesmo agora!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Background>
                <RankingList />
            </Background>
        </>
    )
};

export default RankingPage;