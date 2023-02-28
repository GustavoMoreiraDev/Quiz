import { createContext, useState, useEffect } from 'react';

export const ResultsContext = createContext();

export const ResultsProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedNickname = localStorage.getItem('nickname');

    // Verifica se os valores armazenados existem antes de definir o estado inicial
    if (storedUsername) {
      setUsername(storedUsername);
    }

    if (storedNickname) {
      setNickname(storedNickname);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('username', username);
    localStorage.setItem('nickname', nickname);
  }, [username, nickname]);

  return (
    <ResultsContext.Provider value={{ username, setUsername, nickname, setNickname }}>
      {children}
    </ResultsContext.Provider>
  );
};
