import { createContext, useEffect, useState } from 'react';
import { ProjectContext } from './context';
import { useQuery } from '@tanstack/react-query';
import { getProfileInformation } from 'API/user';

export const GlobalContextProvider = createContext(ProjectContext);
export const GlobalStoreContext = ({ children }) => {
  const [dataUser, setDataUser] = useState();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    getCurrentUser(currentUser._id);
  }, []);

  const getCurrentUser = async (userId) => {
    try {
      const res = await getProfileInformation({ userId });
      setDataUser(res);
      // console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  const valueContext = {
    profileData: dataUser,
    setDataUser
  };
  return <GlobalContextProvider.Provider value={valueContext}>{children}</GlobalContextProvider.Provider>;
};
