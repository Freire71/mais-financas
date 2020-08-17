import {ObjectId} from 'bson';

export enum ITransactionTypeEnum {
  INCOME = 'Entrada',
  OUTCOME = 'Saída',
}

export enum ITransactionCategoryEnum {
  FOOD = 'Alimentação',
  HABITATION = 'Habitação',
  HEALTHCARE = 'Saúde',
  EDUCATION = 'Educação',
  FUN = 'Lazer',
  GENERAL = 'Geral',
}

export interface ITransactionCreateData {
  id?: string;
  title: string;
  amount: number;
  description?: string;
  type: ITransactionTypeEnum;
  category?: ITransactionCategoryEnum;
  created_at?: Date;
  updated_at: Date;
}

export interface ITransactionUpdateData {
  title?: string;
  amount?: string;
  description?: string;
  category?: ITransactionCategoryEnum;
}

class Transaction {
  public id?: string;

  public title: string;

  public amount: number;

  public description: string;

  public type: ITransactionTypeEnum;

  public category?: ITransactionCategoryEnum;

  public created_at: Date;

  public updated_at: Date;

  constructor(data: ITransactionCreateData) {
    this.id = data.id ? data.id : String(new ObjectId());
    this.title = data.title;
    this.amount = data.amount;
    this.description = data.description || '';
    this.type = data.type;
    this.category = data.category;
    this.created_at = data.created_at ? data.created_at : new Date();
    this.updated_at = data.updated_at ? data.updated_at : new Date();
  }
  static schema = {
    name: 'Transaction',
    primaryKey: 'id',
    properties: {
      id: {type: 'string', indexed: true},
      title: 'string',
      amount: 'double',
      description: 'string?',
      type: {type: 'string', indexed: true},
      category: {type: 'string?', indexed: true},
      created_at: {type: 'date', default: new Date(), indexed: true},
      updated_at: {type: 'date', default: new Date()},
      owner: 'User',
    },
  };
}
export default Transaction;
