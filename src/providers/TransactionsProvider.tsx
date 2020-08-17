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
  transactions: Transaction[];
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

  const {createNewBalance, currentBalance} = useBalance();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
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

  const loadInitialTransactions = async () => {
    app = await getRealm();

    const transactionsRealm = app
      .objects<Transaction>(collectionName)
      .sorted('created_at', true);
    const firstLoadedTransactions = transactionsRealm.slice(0, 25).map(
      (t) =>
        new Transaction({
          amount: t.amount,
          category: t.category,
          created_at: new Date(),
          description: t.description,
          updated_at: new Date(),
          type: t.type,
          id: t.id,
          title: t.title,
        }),
    );
    setTransactions(firstLoadedTransactions);
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
    setTransactions((prevState) => {
      prevState.unshift(transaction);
      return prevState;
    });
    updateTodayTransactionData(transaction);
    const newBalanceAmount =
      transaction.type === ITransactionTypeEnum.INCOME
        ? transaction.amount + currentBalance
        : currentBalance - transaction.amount;
    createNewBalance({amount: newBalanceAmount});
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
        transactions,
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
