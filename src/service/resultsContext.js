import { createContext, useState, useEffect } from 'react';

export const ResultsContext = createContext();

export const ResultsProvider = ({ children }) => {

  const [username, setUsername] = useState('');
  const [nickname, setNickname] = useState('');

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
