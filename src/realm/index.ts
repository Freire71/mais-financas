import Realm from 'realm';
import Transaction from '../models/Transaction';
import Balance from '../models/Balance';

let app: Realm;

const getRealm = async () => {
  if (!app) {
    try {
      app = await Realm.open({
        schema: [Transaction.schema, Balance.schema],
      });
      console.log('Realm instanciado com sucesso');
    } catch (err) {
      console.log('Error ao instanciar o Realm');
    }
  }
  return app;
};
export default getRealm;
