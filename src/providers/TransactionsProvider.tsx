import React, {useEffect, useState, useContext} from 'react';
import Transaction, {
  ITransactionCategoryEnum,
  ITransactionTypeEnum,
  ITransactionCreateData,
  ITransactionUpdateData,
} from '../models/Transaction';

const TransactionsContext = React.createContext<ITransactionsProvider | null>(
  null,
);

interface ITransactionsProvider {
  createTransaction: (data: ITransactionCreateData) => void;
  updateTransaction: (id: string, data: ITransactionUpdateData) => void;
  deleteTransaction: (id: string) => void;
  transactions: Transaction[];
}

const TransactionsProvider = ({children}: {children: React.ReactChild}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: Date.now().toString(),
      title: 'Teste de transação',
      type: ITransactionTypeEnum.INCOME,
      description: '',
      amount: 100.0,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]);
  useEffect(() => {
    console.log('First Life Cycle Method');
  }, []);

  const createTransaction = (data: ITransactionCreateData) => {
    const transaction = new Transaction(data);
    transactions.unshift(transaction);
    setTransactions(transactions);
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
      }}>
      {children}
    </TransactionsContext.Provider>
  );
};

const useTransactions = () => {
  const value = useContext(TransactionsContext);
  if (value == null) {
    throw new Error(
      'useTransactions() called outside of a TransactionsProvider',
    );
  }
  return value;
};

export {TransactionsProvider, useTransactions};
