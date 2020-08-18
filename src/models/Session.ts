import {ObjectId} from 'bson';
import User from './User';

export interface ICreateSessionData {
  id?: string;
  owner: User;
  created_at?: Date;
  ended_at?: Date;
}

class Session {
  public id: string;
  public owner: User;
  public created_at: Date;
  public ended_at: Date | null;

  constructor(data: ICreateSessionData) {
    this.id = data.id ? data.id : String(new ObjectId());
    this.owner = data.owner;
    this.created_at = data.created_at ? data.created_at : new Date();
    this.ended_at = data.ended_at ? data.ended_at : null;
  }
  static schema = {
    name: 'Session',
    primaryKey: 'id',
    properties: {
      id: {type: 'string', indexed: true},
      created_at: {type: 'date', default: new Date(), indexed: true},
      ended_at: {type: 'date?', indexed: true},
      owner: 'User',
    },
  };
}

export default Session;
