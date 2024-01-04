import { createContext } from 'react';
import { ProjectContext } from './context';
import { useQuery } from '@tanstack/react-query';
import { getProfileInformation } from 'API/user';

export const GlobalContextProvider = createContext(ProjectContext);
export const GlobalStoreContext = ({ children }) => {
  const dataUser = JSON.parse(localStorage.getItem('currentUser'));

  const { data: profileData } = useQuery({
    queryKey: ['user_profile'],
    queryFn: () => getProfileInformation({ userId: dataUser?._id }),
    enabled: !!dataUser?._id && !!dataUser?.CMND,
    retry: 1
  });

  const valueContext = {
    profileData
  };
  return <GlobalContextProvider.Provider value={valueContext}>{children}</GlobalContextProvider.Provider>;
};
