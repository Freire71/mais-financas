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
  title: string;
  amount: number;
  description?: string;
  type: ITransactionTypeEnum;
  category?: ITransactionCategoryEnum;
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
    this.id = Date.now().toString();
    this.title = data.title;
    this.amount = data.amount;
    this.description = data.description || '';
    this.type = data.type;
    this.category = data.category;
    this.created_at = new Date();
    this.updated_at = new Date();
  }
}
export default Transaction;
