import {ObjectId} from 'bson';

export interface ICreateUserData {
  id?: string;
  name: string;
  email: string;
  password: string;
  created_at?: Date;
  updated_at?: Date;
}

class User {
  public id: string;
  public name: string;
  public email: string;
  public password: string;
  public created_at: Date;
  public updated_at: Date;

  constructor(data: ICreateUserData) {
    this.id = data.id ? data.id : String(new ObjectId());
    this.name = data.name;
    this.email = data.email;
    this.password = data.password;
    this.created_at = data.created_at ? data.created_at : new Date();
    this.updated_at = data.updated_at ? data.updated_at : new Date();
  }
  static schema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
      id: {type: 'string', indexed: true},
      name: 'string',
      email: {type: 'string', indexed: true},
      password: {type: 'string', indexed: true},
      created_at: {type: 'date', default: new Date()},
      updated_at: {type: 'date', default: new Date()},
      transactions: {
        type: 'linkingObjects',
        objectType: 'Transaction',
        property: 'owner',
      },
      balances: {
        type: 'linkingObjects',
        objectType: 'Balance',
        property: 'owner',
      },
      sessions: {
        type: 'linkingObjects',
        objectType: 'Session',
        property: 'owner',
      },
    },
  };
}

export default User;
