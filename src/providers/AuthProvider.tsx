import React, {useEffect, useState, useContext} from 'react';
import Realm from 'realm';
import User, {ICreateUserData} from '../models/User';
import Transaction, {ITransactionTypeEnum} from '../models/Transaction';
import Balance from '../models/Balance';
import getRealm from '../realm';

import Session from '../models/Session';

const AuthContext = React.createContext<IAuthProvider | null>(null);

interface IAuthProvider {
  createNewAccount: (
    data: ICreateUserData,
    initialValue: number,
  ) => Promise<void>;
  checkIfEmailAlreadyExists: (email: string) => Promise<boolean>;
  login: (email: string) => Promise<boolean>;
  logout: () => Promise<void>;
  currentUserId: string | null;
  isLoading: boolean;
}

const AuthProvider = ({children}: {children: React.ReactChild}) => {
  let app: Realm;
  const collectionName = 'User';
  const [currentUserId, setCurrentUserId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function setup() {
      await checkForActiveSession();
      setIsLoading(false);
    }
    setup();
  }, []);

  const checkForActiveSession = async () => {
    app = await getRealm();
    const sessions = app.objects<Session>('Session').sorted('created_at', true);
    const lastSession = sessions[0];
    console.log(lastSession.owner);
    if (lastSession && lastSession.ended_at === null) {
      const user = await getUserById(lastSession.owner.id);
      setCurrentUserId(user.id);
    }
  };

  const loadCurrentUser = async () => {
    app = await getRealm();
  };

  const getUserById = async (userId: string) => {
    app = await getRealm();
    const user = app.objectForPrimaryKey('User', userId);
    return user;
  };

  const getCurrentUserRealmObject = (userId: string) => {};

  const createNewAccount = async (
    data: ICreateUserData,
    initialValue: number,
  ) => {
    const user = new User(data);

    app = await getRealm();
    try {
      app.write(() => {
        const createdUser = app.create(
          collectionName,
          user,
          Realm.UpdateMode.Never,
        );
        if (initialValue !== 0) {
          app.create(
            'Transaction',
            {
              ...new Transaction({
                title: 'Transação inicial',
                amount: initialValue,
                type: ITransactionTypeEnum.INCOME,
              }),
              owner: createdUser,
            },
            Realm.UpdateMode.Never,
          );
        }
        app.create(
          'Balance',
          {
            ...new Balance({amount: initialValue}),
            owner: createdUser,
          },
          Realm.UpdateMode.Never,
        );
        app.create(
          'Session',
          new Session({user: createdUser}),
          Realm.UpdateMode.Never,
        );
      });
    } catch (e) {
      return console.log('Erro ao cadastrar um usuário: ', e);
    }
  };

  const checkIfEmailAlreadyExists = async (email: string) => {
    app = await getRealm();
    const users = app
      .objects<User>(collectionName)
      .filtered('email = $0', email);
    if (users[0]) {
      console.log('Existe usuário');
      return true;
    }
    return false;
  };

  const login = async (email: string) => {
    const exists = await checkIfEmailAlreadyExists(email);
    return exists;
  };

  const logout = async () => {};

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        createNewAccount,
        currentUserId,
        checkIfEmailAlreadyExists,
        login,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const value = useContext(AuthContext);
  if (value === null) {
    throw new Error('useAuth() foi instanciado fora de um AuthProvider');
  }
  return value;
};

export {AuthProvider, useAuth};
