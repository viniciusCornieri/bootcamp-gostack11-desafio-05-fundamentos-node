import { uuid } from 'uuidv4';

export enum TransactionType {
  INCOME = 'income',
  OUTCOME = 'outcome',
}
class Transaction {
  id: string;

  title: string;

  value: number;

  type: TransactionType;

  constructor({ title, value, type }: Omit<Transaction, 'id'>) {
    this.id = uuid();
    this.title = title;
    this.value = value;
    this.type = type;
  }
}

export default Transaction;
