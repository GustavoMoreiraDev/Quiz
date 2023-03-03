import React, { useContext, useState, useEffect } from 'react';
import style from './style.module.css';
import { ResultsContext } from '../../../service/resultsContext';
import { Instrucoes } from '../instrucoes';
import { QuizQuestions } from '../QuizQuestions';

const QuizComponent = () => {
  const { username } = useContext(ResultsContext);
  const [storedUsername, setStoredUsername] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setStoredUsername(localStorage.getItem('username'));
    }
  }, []);

  const handleIniciarQuiz = () => {
    setExibirInstrucoes(false);
  };

  return (
    <>
      <header className={style['q-header']}>
        <h1>Quiz</h1>
        <h4>Bem-vindo(a) <strong dangerouslySetInnerHTML={{ __html: storedUsername || username }} /></h4>
      </header>
      <section className={style['q-content']}>
          <QuizQuestions />
      </section>
      <footer>
        
      </footer>
    </>
  );
};

export default QuizComponent;
