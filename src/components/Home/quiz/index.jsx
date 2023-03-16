import React, { useContext, useState, useEffect } from 'react';
import { ResultsContext } from '../../../service/resultsContext';
import { QuizQuestions } from '../QuizQuestions';
import style from './style.module.css';

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
          <QuizQuestions nickname={username} />
      </section>
      <footer>
        
      </footer>
    </>
  );
};

export default QuizComponent;
