import {ObjectId} from 'bson';
import User from './User';

export interface ICreateBalanceData {
  id?: string;
  amount: number;
  created_at?: Date;
  owner: User;
}

class Balance {
  public id: string;
  public amount: number;
  public created_at: Date;
  public owner: User;

  constructor(data: ICreateBalanceData) {
    this.id = data.id ? data.id : String(new ObjectId());
    this.amount = data.amount;
    this.created_at = data.created_at ? data.created_at : new Date();
    this.owner = data.owner;
  }
  static schema = {
    name: 'Balance',
    primaryKey: 'id',
    properties: {
      id: {type: 'string', indexed: true},
      amount: 'double',
      created_at: {type: 'date', default: new Date(), indexed: true},
      owner: 'User',
    },
  };
}

export default Balance;
