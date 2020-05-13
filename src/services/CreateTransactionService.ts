import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction, { TransactionType } from '../models/Transaction';

interface Request {
  title: string;

  value: number;

  type: TransactionType;
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  private hasNotEnoughBalance(outcomeValue: number): boolean {
    const { total } = this.transactionsRepository.getBalance();

    return total <= outcomeValue;
  }

  public execute({ title, value, type }: Request): Transaction {
    if (type === TransactionType.OUTCOME && this.hasNotEnoughBalance(value)) {
      throw Error('Cannot create outcome without enough balance to withdraw');
    }

    const transaction = this.transactionsRepository.create({
      title,
      value,
      type,
    });

    return transaction;
  }
}

export default CreateTransactionService;
