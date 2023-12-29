import React from 'react';
import {AxiosContextProvider} from './AxiosContext';
import {AuthContextProvider} from './AuthContext';
import {SignContextProvider} from './SignContext';
import {AppContextProvider} from './AppContext';

const Provider = props => {
  return (
    <AuthContextProvider>
      <AxiosContextProvider>
        <SignContextProvider>
          <AppContextProvider>{props.children}</AppContextProvider>
        </SignContextProvider>
      </AxiosContextProvider>
    </AuthContextProvider>
  );
};

export default Provider;
