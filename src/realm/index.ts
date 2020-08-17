import Realm from 'realm';
import Transaction from '../models/Transaction';
import Balance from '../models/Balance';
import User from '../models/User';
import Session from '../models/Session';

let app: Realm;

const getRealm = async () => {
  if (!app) {
    try {
      app = await Realm.open({
        schema: [
          Transaction.schema,
          Balance.schema,
          User.schema,
          Session.schema,
        ],
      });
      console.log('Realm instanciado com sucesso');
    } catch (err) {
      console.log('Error ao instanciar o Realm: ', err);
    }
  }
  return app;
};
export default getRealm;
