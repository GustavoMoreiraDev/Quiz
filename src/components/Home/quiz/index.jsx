import React, { useContext, useState, useEffect } from 'react';
import style from './style.module.css';
import { ResultsContext } from '../../../service/resultsContext';
import { Instrucoes } from '../instrucoes';
import { QuizQuestions } from '../QuizQuestions';

const QuizComponent = () => {
  const { username } = useContext(ResultsContext);
  const [exibirInstrucoes, setExibirInstrucoes] = useState(true);

  useEffect(() => {
    localStorage.setItem('username', username);
  }, [username]);
  
  const handleIniciarQuiz = () => {
    setExibirInstrucoes(false);
  };

  return (
    <>
      <header className={style['q-header']}>
        <h1>Quiz</h1>
        <h4>Bem-vindo(a) <strong>{username}</strong>!</h4>
      </header>
      <section className={style['q-content']}>
        {exibirInstrucoes ? (
          <Instrucoes onStartQuiz={handleIniciarQuiz} />
        ) : (
          <QuizQuestions />
        )}
      </section>
      <footer></footer>
    </>
  );
};

export default QuizComponent;
