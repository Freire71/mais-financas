import {ObjectId} from 'bson';

export interface ICreateBalanceData {
  id?: string;
  amount: number;
  created_at?: Date;
}

class Balance {
  public id: string;
  public amount: number;
  public created_at: Date;

  constructor(data: ICreateBalanceData) {
    this.id = data.id ? data.id : String(new ObjectId());
    this.amount = data.amount;
    this.created_at = data.created_at ? data.created_at : new Date();
  }
  static schema = {
    name: 'Balance',
    primaryKey: 'id',
    properties: {
      id: {type: 'string', indexed: true},
      amount: 'double',
      created_at: {type: 'date', default: new Date(), indexed: true},
    },
  };
}

export default Balance;
