import { Router } from 'express';
import { Request, Response } from 'express'
import TransactionsRepository from '../repositories/TransactionsRepository';

import CreateTransactionService from '../services/CreateTransactionService';
const transactionsRepository = new TransactionsRepository();
const transactionRouter = Router();

interface TransactionDTO {
  title: string; 
  value: number;
  type: 'income' | 'outcome';
}

transactionRouter.get('/', (request: Request, response: Response) => {
  try {
    const transactions = transactionsRepository.all();
    const balance = transactionsRepository.getBalance();
    response.json({ transactions, balance })
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request: Request, response: Response) => {
  try {
    const { title, value, type } = request.body;
    const newTransaction: TransactionDTO = {
      title,
      value,
      type
    }
    const transctionService = new CreateTransactionService(transactionsRepository);
    const transaction = transctionService.execute(newTransaction)
    response.json(transaction)
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
