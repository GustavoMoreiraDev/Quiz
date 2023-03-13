import React, { useState, useEffect } from "react";
import axios from "axios";

const TestePage = () => {
    const [pergunta, setPergunta] = useState('');
    const [respostas, setRespostas] = useState([]);
    const [respostaCorreta, setRespostaCorreta] = useState(null);

    useEffect(() => {
        async function fetchData() {
            const response = await axios.get('https://spilinsh.vercel.app/start-quiz');
            const { pergunta, respostas } = response.data[0];
            const respostaCorretaIndex = respostas.findIndex(r => r.verdadeira);
            setPergunta(pergunta);
            setRespostas(respostas);
            setRespostaCorreta(respostaCorretaIndex);
        }
        fetchData();
    }, []);

    return (
        <>
            <div>
                <h1>teste</h1>
                <p>{pergunta}</p>
                <Respo respostas={respostas} respostaCorreta={respostaCorreta} />
            </div>
        </>
    )
};

function Respo({ respostas, respostaCorreta }) {
    return (
        <>
            {respostas.map((resposta, index) => (
                <button
                    key={index}
                    type="button"
                    className={respostaCorreta === index ? 'resposta-correta' : ''}
                >
                    {resposta.texto}
                </button>
            ))}
        </>
    )
}

export default TestePage;