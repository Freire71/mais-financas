import React, {useEffect, useState, useContext} from 'react';
import Realm from 'realm';

import Balance, {ICreateBalanceData} from '../models/Balance';
import getRealm from '../realm';
import {useAuth} from './AuthProvider';

const BalanceContext = React.createContext<IBalanceProvider | null>(null);

interface IBalanceProvider {
  createNewBalance: (data: ICreateBalanceData) => void;
  currentBalance: number;
}

const BalanceProvider = ({children}: {children: React.ReactChild}) => {
  let app: Realm;
  const collectionName = 'Balance';

  const {currentUserId, getUser} = useAuth();

  const [currentBalance, setCurrentBalance] = useState(0);
  useEffect(() => {
    if (!currentUserId) {
      return setCurrentBalance(0);
    }
    async function setup() {
      await loadLastBalance();
    }
    setup();
  }, [currentUserId]);

  const loadLastBalance = async () => {
    app = await getRealm();
    const user = await getUser();
    const balances = app
      .objects<Balance>(collectionName)
      .filtered('owner = $0', user)
      .sorted('created_at', true);
    if (!balances[0]) {
      await createNewBalance({amount: 0, owner: user});
    } else {
      setCurrentBalance(balances[0].amount);
    }
  };

  const createNewBalance = async (data: ICreateBalanceData) => {
    app = await getRealm();
    const user = await getUser();
    const balance = new Balance({...data, owner: user});

    try {
      app.write(() => {
        app.create(collectionName, balance, Realm.UpdateMode.Never);
      });
      setCurrentBalance(balance.amount);
    } catch (e) {
      console.log('Erro ao criar o saldo: ', e);
    }
  };

  return (
    <BalanceContext.Provider value={{currentBalance, createNewBalance}}>
      {children}
    </BalanceContext.Provider>
  );
};

const useBalance = () => {
  const value = useContext(BalanceContext);
  if (value == null) {
    throw new Error('useBalance() foi instanciado fora de um BalanceProvider');
  }
  return value;
};

export {BalanceProvider, useBalance};
