import { useRouter } from 'next/router';
import { useContext } from 'react';
import { ResultsContext } from '../../service/resultsContext';

const Private = ({ children }) => {
  const { username } = useContext(ResultsContext);
  const router = useRouter();

  if (typeof window !== 'undefined' && !username) {
    // Redireciona para a página de login
    router.replace('/');
    return null;
  }

  return <>{children}</>;
};

export default Private;
