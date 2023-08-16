/* eslint-disable indent */
import React, { createContext, useContext, useState } from 'react';
import { Status } from '../constants/enum';
import { IAlertContext, IAlert, IAlertParam } from '../interfaces/IAlert';

interface IProps {
  children: React.ReactNode;
}

const AlertContext = createContext({} as IAlertContext);

export const AlertProvider: React.FC<IProps> = ({ children }) => {
  const [alert, setAlert] = useState<IAlert>({
    isOpen: false,
    title: '',
    desc: '',
    status: Status.Success,
  });

  const checkStatus = (status: number) => {
    if (status >= 200 && status <= 300) {
      return Status.Success;
    } else if (status === 999) {
      return Status.Warn;
    } else {
      return Status.Error;
    }
  };

  const showAlert = (items: IAlertParam) => {
    if (items.status)
      setAlert({
        title: items.title || '',
        desc: items.desc || '',
        status: checkStatus(items.status) || 'warning',
        isOpen: true,
      });
  };

  const hideAlert = () => {
    setAlert({
      isOpen: false,
      title: '',
      desc: '',
      status: Status.Success,
    });
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert, hideAlert }}>
      {children}
    </AlertContext.Provider>
  );
};

export const useAlert = () => {
  return useContext(AlertContext);
};
