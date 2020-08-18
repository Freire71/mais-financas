import React, {useEffect, useState, useContext} from 'react';
import Realm from 'realm';
import Transaction, {
  ITransactionTypeEnum,
  ITransactionCreateData,
  ITransactionUpdateData,
} from '../models/Transaction';

import {useBalance} from './BalanceProvider';
import {useAuth} from './AuthProvider';

import getRealm from '../realm';
import User from '../models/User';

const TransactionsContext = React.createContext<ITransactionsProvider | null>(
  null,
);

interface ITransactionsProvider {
  createTransaction: (data: ITransactionCreateData) => void;
  filterTransactions: (type: string, category: string | null) => void;
  transactions: Transaction[];
  lastTransactions: Transaction[];
  todayIncomeTransactionAmount: number;
  todayOutcomeTransactionAmount: number;
}

const TransactionsProvider = ({children}: {children: React.ReactChild}) => {
  let app: Realm;
  const collectionName = 'Transaction';

  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0);

  const dayEnd = new Date();
  dayEnd.setHours(23, 59, 59, 999);

  const {realmUserObject} = useAuth();

  const {createNewBalance, currentBalance} = useBalance();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [lastTransactions, setLastTransactions] = useState<Transaction[]>([]);
  const [
    todayIncomeTransactionAmount,
    setTodayIncomeTransactionAmount,
  ] = useState(0);
  const [
    todayOutcomeTransactionAmount,
    setTodayOutcomeTransactionAmount,
  ] = useState(0);

  useEffect(() => {
    if (!realmUserObject) {
      setTodayIncomeTransactionAmount(0);
      setTodayOutcomeTransactionAmount(0);
      setTransactions([]);
      setLastTransactions([]);
      return;
    }

    async function setup() {
      await loadInitialTransactions();
      await getTodayIncomeTransactionAmount();
      await getTodayOutcomeTransactionAmount();
    }

    setup();
  }, [realmUserObject]);

  const parseRealmObject = (realmObject: any, user: User) =>
    new Transaction({
      owner: user,
      amount: realmObject.amount,
      category: realmObject.category,
      created_at: realmObject.created_at,
      description: realmObject.description,
      updated_at: realmObject.updated_at,
      type: realmObject.type,
      id: realmObject.id,
      title: realmObject.title,
    });

  const loadInitialTransactions = async () => {
    app = await getRealm();
    console.log({realmUserObject});
    const transactionsRealm = app
      .objects<Transaction>(collectionName)
      .filtered('owner = $0', realmUserObject)
      .sorted('created_at', true);
    const firstLoadedTransactions = transactionsRealm
      .slice(0, 100)
      .map((t) => parseRealmObject(t, realmUserObject));
    setTransactions(firstLoadedTransactions);
    setLastTransactions(firstLoadedTransactions.slice(0, 4));
  };

  const getTodayIncomeTransactionAmount = async () => {
    app = await getRealm();

    const result = app
      .objects<Transaction>(collectionName)
      .filtered(
        'created_at >= $0 && created_at < $1 AND type = $2 AND owner = $3',
        dayStart,
        dayEnd,
        ITransactionTypeEnum.INCOME,
        realmUserObject,
      );
    let amount = 0;
    result.forEach((t) => (amount += t.amount));
    setTodayIncomeTransactionAmount(amount);
  };

  const getTodayOutcomeTransactionAmount = async () => {
    app = await getRealm();

    const result = app
      .objects<Transaction>(collectionName)
      .filtered(
        'created_at >= $0 && created_at < $1 AND type = $2 AND owner = $3',
        dayStart,
        dayEnd,
        ITransactionTypeEnum.OUTCOME,
        realmUserObject,
      );
    let amount = 0;
    result.forEach((t) => (amount += t.amount));
    setTodayOutcomeTransactionAmount(amount);
  };

  const createTransaction = async (data: ITransactionCreateData) => {
    app = await getRealm();
    const transaction = new Transaction({...data, owner: realmUserObject});
    try {
      app.write(() => {
        app.create(collectionName, transaction, Realm.UpdateMode.Never);
      });
    } catch (e) {
      console.log('Erro ao criar uma transação: ', e);
    }
    transactions.unshift(transaction);
    setTransactions(transactions);

    setLastTransactions(transactions.slice(0, 4));

    updateTodayTransactionData(transaction);
    const newBalanceAmount =
      transaction.type === ITransactionTypeEnum.INCOME
        ? transaction.amount + currentBalance
        : currentBalance - transaction.amount;
    createNewBalance({amount: newBalanceAmount, owner: realmUserObject});
  };

  const filterTransactions = async (type: string, category: string | null) => {
    app = await getRealm();

    let transactionsRealm;
    if (type === 'Todos') {
      transactionsRealm = app
        .objects<Transaction>(collectionName)
        .filtered('owner = $0', realmUserObject)
        .sorted('created_at', true);
    } else if (
      type === ITransactionTypeEnum.INCOME ||
      (type === ITransactionTypeEnum.OUTCOME &&
        (category === null || category === 'Todas'))
    ) {
      transactionsRealm = app
        .objects<Transaction>(collectionName)
        .filtered('type = $0 AND owner = $1', type, realmUserObject)
        .sorted('created_at', true);
    } else {
      transactionsRealm = app
        .objects<Transaction>(collectionName)
        .filtered('type = $0', type)
        .filtered('category = $0 AND owner = $1', category, realmUserObject)
        .sorted('created_at', true);
    }

    const filteredTransactions = transactionsRealm
      .slice(0, 100)
      .map((t) => parseRealmObject(t, realmUserObject));
    setTransactions(filteredTransactions);
  };

  const updateTodayTransactionData = (lastCreatedTransaction: Transaction) => {
    lastCreatedTransaction.type === ITransactionTypeEnum.INCOME
      ? setTodayIncomeTransactionAmount(
          (prevState) => prevState + lastCreatedTransaction.amount,
        )
      : setTodayOutcomeTransactionAmount(
          (prevState) => prevState + lastCreatedTransaction.amount,
        );
  };

  return (
    <TransactionsContext.Provider
      value={{
        createTransaction,
        filterTransactions,
        transactions,
        lastTransactions,
        todayIncomeTransactionAmount,
        todayOutcomeTransactionAmount,
      }}>
      {children}
    </TransactionsContext.Provider>
  );
};

const useTransactions = () => {
  const value = useContext(TransactionsContext);
  if (value == null) {
    throw new Error(
      'useTransactions() foi instanciado fora de um TransactionsProvider',
    );
  }
  return value;
};

export {TransactionsProvider, useTransactions};
