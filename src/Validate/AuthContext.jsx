import React, { useState } from 'react';
import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';

//authcontext init
export const Authenticate = createContext();

const AuthContext = ({ children }) => {
  const navigate = useNavigate();
  //auth data default false
  const [isAuth, setAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const logout = () => {
    setCurrentUser({});
    setAuth(false);
    localStorage.removeItem('currentUser');
    localStorage.removeItem('isAuth');
    navigate('/');
  };

  return (
    <Authenticate.Provider value={{ isAuth, setAuth, currentUser, setCurrentUser, logout }}>
      {children}
    </Authenticate.Provider>
  );
};

export default AuthContext;
