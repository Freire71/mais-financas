import React, {useEffect, useState, useContext} from 'react';
import Realm from 'realm';
import ShowSnackBar from '../utils/showSnackBar';

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
  getUser: () => Promise<any | undefined>;
  currentUserId: string | null;
  isLoading: boolean;
}

const AuthProvider = ({children}: {children: React.ReactChild}) => {
  let app: Realm;
  const collectionName = 'User';
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
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
    if (lastSession && lastSession.ended_at === null && lastSession.owner) {
      const user: any = await getUserById(lastSession.owner.id);
      if (user && user.id) {
        setCurrentUserId(user.id);
      }
    }
  };

  const getUserById = async (userId: string) => {
    app = await getRealm();
    const user = app.objectForPrimaryKey('User', userId);
    return user;
  };

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
                owner: createdUser,
              }),
            },
            Realm.UpdateMode.Never,
          );
        }
        app.create(
          'Balance',
          {
            ...new Balance({amount: initialValue, owner: createdUser}),
          },
          Realm.UpdateMode.Never,
        );
        app.create(
          'Session',
          new Session({owner: createdUser}),
          Realm.UpdateMode.Never,
        );
      });
      setCurrentUserId(user.id);
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
      return true;
    }
    return false;
  };

  const getUserByEmail = async (email: string) => {
    app = await getRealm();
    const users = app
      .objects<User>(collectionName)
      .filtered('email = $0', email);
    if (users[0]) {
      return users[0];
    }
    return undefined;
  };

  const login = async (email: string) => {
    app = await getRealm();
    const user = await getUserByEmail(email);
    if (!user) {
      ShowSnackBar('E-mail não cadastrado', -1);

      return false;
    }
    app.write(() => {
      app.create('Session', new Session({owner: user}), Realm.UpdateMode.Never);
    });
    setCurrentUserId(user.id);
    return true;
  };

  const logout = async () => {
    app = await getRealm();
    const user = await getUserById(currentUserId as string);
    const sessions = app
      .objects<Session>('Session')
      .filtered('owner = $0', user)
      .sorted('created_at', true);
    const lastSession = sessions[0];
    app.write(() => {
      app.create(
        'Session',
        {id: lastSession.id, ended_at: new Date()},
        Realm.UpdateMode.Modified,
      );
    });
    setCurrentUserId(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        createNewAccount,
        currentUserId,
        checkIfEmailAlreadyExists,
        login,
        logout,
        getUser: () => getUserById(currentUserId as string),
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
