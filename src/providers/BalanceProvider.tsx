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

  const {realmUserObject} = useAuth();

  const [currentBalance, setCurrentBalance] = useState(0);
  useEffect(() => {
    if (!realmUserObject) {
      return setCurrentBalance(0);
    }
    async function setup() {
      await loadLastBalance();
    }
    setup();
  }, [realmUserObject]);

  const loadLastBalance = async () => {
    app = await getRealm();

    const balances = app
      .objects<Balance>(collectionName)
      .filtered('owner = $0', realmUserObject)
      .sorted('created_at', true);
    if (!balances[0]) {
      await createNewBalance({amount: 0, owner: realmUserObject});
    } else {
      setCurrentBalance(balances[0].amount);
    }
  };

  const createNewBalance = async (data: ICreateBalanceData) => {
    app = await getRealm();
    const balance = new Balance({...data, owner: realmUserObject});

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
