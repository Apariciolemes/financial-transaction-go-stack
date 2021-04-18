import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';
import { Router } from 'express';

interface Request {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, value, type }: Request) {
    const balance = this.transactionsRepository.getBalance();
    if (type === 'outcome' && value > balance.total) {
      throw Error("Not posible this type because total < outcome");
    }
    const transaction = this.transactionsRepository.create({ title, value, type })
    return transaction;

  }
}

export default CreateTransactionService;
