import React, {useEffect, useState, useContext} from 'react';
import Realm from 'realm';
import Transaction, {
  ITransactionTypeEnum,
  ITransactionCreateData,
  ITransactionUpdateData,
} from '../models/Transaction';

import {useBalance} from './BalanceProvider';

import getRealm from '../realm';

const TransactionsContext = React.createContext<ITransactionsProvider | null>(
  null,
);

interface ITransactionsProvider {
  createTransaction: (data: ITransactionCreateData) => void;
  updateTransaction: (id: string, data: ITransactionUpdateData) => void;
  deleteTransaction: (id: string) => void;
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
  console.log({dayStart});

  const dayEnd = new Date();
  dayEnd.setHours(23, 59, 59, 999);
  console.log({dayEnd});

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
    async function setup() {
      await loadInitialTransactions();
      await getTodayIncomeTransactionAmount();
      await getTodayOutcomeTransactionAmount();
    }

    setup();
  }, []);

  const parseRealmObject = (realmObject: any) =>
    new Transaction({
      amount: realmObject.amount,
      category: realmObject.category,
      created_at: new Date(),
      description: realmObject.description,
      updated_at: new Date(),
      type: realmObject.type,
      id: realmObject.id,
      title: realmObject.title,
    });

  const loadInitialTransactions = async () => {
    app = await getRealm();

    const transactionsRealm = app
      .objects<Transaction>(collectionName)
      .sorted('created_at', true);
    const firstLoadedTransactions = transactionsRealm
      .slice(0, 100)
      .map((t) => parseRealmObject(t));
    setTransactions(firstLoadedTransactions);
    setLastTransactions(firstLoadedTransactions.slice(0, 4));
  };

  const getTodayIncomeTransactionAmount = async () => {
    app = await getRealm();
    const result = app
      .objects<Transaction>(collectionName)
      .filtered(
        'created_at >= $0 && created_at < $1 AND type = $2',
        dayStart,
        dayEnd,
        ITransactionTypeEnum.INCOME,
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
        'created_at >= $0 && created_at < $1 AND type = $2',
        dayStart,
        dayEnd,
        ITransactionTypeEnum.OUTCOME,
      );
    let amount = 0;
    result.forEach((t) => (amount += t.amount));
    setTodayOutcomeTransactionAmount(amount);
  };

  const getArrayCopy = (list: Transaction[]) =>
    list.map((t) => Object.assign({}, t));

  const createTransaction = async (data: ITransactionCreateData) => {
    const transaction = new Transaction(data);
    app = await getRealm();
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
    createNewBalance({amount: newBalanceAmount});
  };

  const filterTransactions = async (type: string, category: string | null) => {
    app = await getRealm();

    let transactionsRealm;
    if (type === 'Todos') {
      transactionsRealm = app
        .objects<Transaction>(collectionName)
        .sorted('created_at', true);
    } else if (
      type === ITransactionTypeEnum.INCOME ||
      (type === ITransactionTypeEnum.OUTCOME &&
        (category === null || category === 'Todas'))
    ) {
      transactionsRealm = app
        .objects<Transaction>(collectionName)
        .filtered('type = $0', type)
        .sorted('created_at', true);
    } else {
      transactionsRealm = app
        .objects<Transaction>(collectionName)
        .filtered('type = $0', type)
        .filtered('category = $0', category)
        .sorted('created_at', true);
    }

    const filteredTransactions = transactionsRealm
      .slice(0, 100)
      .map((t) => parseRealmObject(t));
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

  const updateTransaction = (id: string, data: ITransactionUpdateData) => {
    const index = transactions.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error('Não encontramos a transação que você deseja atualizar');
    }
    // TODO implement update logic
  };

  const deleteTransaction = (id: string) => {
    const index = transactions.findIndex((t) => t.id === id);
    if (index === -1) {
      throw new Error('Não encontramos a transação que você deseja remover');
    }
    transactions.splice(index, 1);
    setTransactions(transactions);
  };
  return (
    <TransactionsContext.Provider
      value={{
        createTransaction,
        deleteTransaction,
        updateTransaction,
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
