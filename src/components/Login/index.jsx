import React, { useContext, useState, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { useRouter } from 'next/router';
import Link from 'next/link';
import style from './style.module.css';

import { ResultsContext } from '../../service/resultsContext';

const Login = () => {

    const { username, setUsername } = useContext(ResultsContext);
    const [usernameInput, setUsernameInput] = useState('');
    const router = useRouter();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
            setUsernameInput(storedUsername);
        }
    }, [setUsername, setUsernameInput]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setUsername(usernameInput);
        localStorage.setItem('username', usernameInput);
        router.push('/quiz');
    };

    const handleUsernameInputChange = (event) => {
        setUsernameInput(event.target.value);
    };

    return (
        <>
            <div className={style['l-container']}>
                <form className={style['l-card']} onSubmit={handleSubmit}>
                    <div className={style['l-card-txt-wrapper']}>
                        <h1>Quiz</h1>
                        <p>Teste agora mesmo seus conhecimentos gerais!!</p>
                    </div>
                    <InputMask
                        type={'text'}
                        className={style['l-card-input']}
                        placeholder={'Digite o nome para seu personagem'}
                        required
                        value={usernameInput}
                        onChange={handleUsernameInputChange}
                    />
                    <div className={style['l-card-btn-wrapper']}>
                        <Link title="Ranking dos melhores" className={style['l-card-btn-link']} href="/ranking" alt="QuizApp">
                            Conferir ranking dos melhores
                        </Link>
                        <button type='submit'>Iniciar</button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
