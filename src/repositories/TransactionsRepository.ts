import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance() {
    const balance: Balance = {
      income: 0,
      outcome: 0,
      total: 0
    }
    //@ts-ignore
    const sumTransactions = ((a, b) => a + b.value)
    balance.income = this.transactions.filter(transaction => transaction.type === 'income')
      .reduce(sumTransactions, 0);
    balance.outcome = this.transactions.filter(transaction => transaction.type === 'outcome')
      .reduce(sumTransactions, 0);
    balance.total = balance.income - balance.outcome

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction)
    return transaction;
  }
}

export default TransactionsRepository;
