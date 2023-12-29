import React, {createContext, useState} from 'react';
import { setItemAsync, deleteItemAsync } from "expo-secure-store"

const AuthContext = createContext();
const AuthContextProvider = props => {
  const [pin, setPin] = useState('');
  const [token, setToken] = useState('');

  const savePin = async newPin => {
    setPin(newPin);
    await setItemAsync('@pin', newPin);
  };

  const saveUserToken = async tken => {
    setToken(tken);
    await setItemAsync('@token', tken);
  };

  const removeToken = async () => {
    setPin('');
    setToken('');
    await deleteItemAsync('@pin')
    await deleteItemAsync('@token')
  };

  const providerValue = {
    pin,
    token,
    savePin,
    saveUserToken,
    removeToken,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

const AuthConsumer = AuthContext.Consumer;

export {AuthContext, AuthContextProvider, AuthConsumer};
