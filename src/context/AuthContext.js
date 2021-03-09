import React from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

export const AuthContext = React.createContext([null, () => {}]);

export const AuthProvider = (props) => {
  const [auth, setAuth] = useLocalStorage('jwt', null); // TODO: use local storage

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {props.children}
    </AuthContext.Provider>
  );
};
