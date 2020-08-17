import React, {useEffect, useState, useContext} from 'react';
import Realm from 'realm';
import Balance, {ICreateBalanceData} from '../models/Balance';

import getRealm from '../realm';

const BalanceContext = React.createContext<IBalanceProvider | null>(null);

interface IBalanceProvider {
  createNewBalance: (data: ICreateBalanceData) => void;
  currentBalance: number;
}

const BalanceProvider = ({children}: {children: React.ReactChild}) => {
  let app: Realm;
  const collectionName = 'Balance';

  const [currentBalance, setCurrentBalance] = useState(0);
  useEffect(() => {
    async function setup() {
      await loadLastBalance();
    }
    setup();
  });

  const loadLastBalance = async () => {
    app = await getRealm();
    const balances = app
      .objects<Balance>(collectionName)
      .sorted('created_at', true);
    if (!balances[0]) {
      await createNewBalance({amount: 0});
    } else {
      setCurrentBalance(balances[0].amount);
    }
  };

  const createNewBalance = async (data: ICreateBalanceData) => {
    const balance = new Balance(data);
    app = await getRealm();
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
