import React from "react";
import Head from "next/head";

import QuizResults from "@/components/Home/QuizResults";

const Resultado = () => {

    return (
        <>
            <Head>
                <title>Desafio Quiz | Resultado</title>
            </Head>
            <QuizResults />
        </>
    )
};

export default Resultado;