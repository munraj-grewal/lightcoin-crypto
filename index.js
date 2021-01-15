let balance = 500.00;

class Transaction {
  constructor(amount, account) {
    this.amount  = amount;
    this.account = account;
  }
  commit() {
    if (!this.isAllowed()) return false;
    this.time = new Date();
    this.account.addTransaction(this);
    return true;
  }
}

class Deposit extends Transaction {
  get getAmount() {
    return this.amount
  }
  isAllowed() {
    return (this.account.balance - this.amount >= 0);
  }
}

class Withdrawal extends Transaction {
  get getAmount() {
    return 0 - this.amount;
  }
  isAllowed() {
    return true;
  }
}

class Account {
  constructor(username) {
    this.username = username;
    this.transactions = [];
  }
  get balance() {
    // Calculate the balance using the transaction objects.
    let balance = 0;
    for (let t of this.transactions) {
    	balance += t.value;
    }
    return balance;
  }
  addTransaction(transaction) {
    this.transactions.push(transaction);
  }
}

// DRIVER CODE BELOW
// We use the code below to "drive" the application logic above and make sure it's working as expected
const myAccount = new Account("snow-patrol");

const t1 = new Deposit(120.00, myAccount);
t1.commit();

const t2 = new Withdrawal(50.00, myAccount);
t2.commit();

console.log('Ending Balance:', myAccount.balance);
