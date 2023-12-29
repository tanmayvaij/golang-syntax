import React, {createContext, useContext, useState} from 'react';
import axios from 'axios';
import Constants from '../utils/constant';
import {AuthContext} from './AuthContext';

const AxiosContext = createContext(null);

const AxiosContextProvider = props => {
  const authContext = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);

  const axiosInstance = axios.create({
    baseURL: Constants.BASE_URL,
  });

  const setIsLoading = loading => {
    setLoading(loading);
  };

  const providerValue = {
    axiosInstance,
    isLoading,
    setIsLoading,
  };

  return (
    <AxiosContext.Provider value={providerValue}>
      {props.children}
    </AxiosContext.Provider>
  );
};

const AxiosConsumer = AxiosContext.Consumer;

export {AxiosContext, AxiosContextProvider, AxiosConsumer};
