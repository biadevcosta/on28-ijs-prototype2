import { Bank } from './Bank.js';
import { Client } from './Client.js';

export class BankAccount {
  client;
  bank;
  accountNumber;
  agencyNumber;
  #balance = 0;


  constructor(client,bank,accountNumber,agencyNumber){
    if(!(client instanceof Client)) {
      throw new Error('Não é possível abrir conta, cliente inválido');
    }

    if(!(bank instanceof Bank)) {
      throw new Error('Não é possível abrir conta, cliente inválido');
    }

    this.client = client;
    this.bank = bank;
    this.accountNumber = accountNumber;
    this.agencyNumber = agencyNumber;
  }

  credit(amount) {
    if(typeof amount !== Number) {
      throw new Error('Não é possível creditar valor, valor passado não é do tipo number');
    }

    if(amount < 0) {
      throw new Error('Não é possível creditar valor, valor passado é menor que 0')
    }

    this.#balance += amount;

    console.log(`O novo saldo da conta é: R$ ${this.#balance.toFixed(2)}`)
  }

  debit(amount) {
    if(typeof amount !== Number) {
      throw new Error('Não é possível debitar valor, valor passado não é do tipo number');
    }

    if(amount < 0) {
      throw new Error('Não é possível debitar valor, valor passado é menor que 0')
    }

    this.#balance -= amount;

    console.log(`O novo saldo da conta é: R$ ${this.#balance.toFixed(2)}`)
  }

   transferTo(anotherAccount, amount) {
    //verifica se anotherAccount não é transferência de BankAccount, se não for, lança erro
    if (!(anotherAccount instanceof BankAccount)) {
      throw new Error('Não é possível fazer transferência, conta inválida');
    }

    //verifica se valor passado para transferência é menor do que 0, se sim, lança erro
    if(amount < 0) {
      throw new Error('Não é possível fazer transferência, valor passado é menor que 0');
    }

    //verifica se a transferência é para outro banco
    isTransferToOtherBank = this.bank.bankCode !== anotherAccount.bank.bankCod;

    // Verifica se isTransferToOtherBank é verdadeiro (a transferência é para outro banco).
    // Se for verdadeiro, adiciona a taxa de transferência (this.bank.transferTax) ao valor original (amount) e armazena o resultado em totalAmount.
    // Se for falso (a transferência não é para outro banco), apenas atribui o valor original (amount) a totalAmount.
    totalAmount = isTransferToOtherBank ? (amount + this.bank.transferTax) : amount;

    //valida se há saldo suficiente para realizar transferência
    if(totalAmount < this.#balance) {
      throw new Error(`Não é possível fazer transferência, saldo insuficiente.
       Seu saldo é R${this.#balance} e o valor da transferência R$ ${totalAmount}`)
    }

    //retira do valor da conta o valor de transferência + taxa (se a taxa for aplicável)
    this.#balance -= totalAmountamount;

    //credita na outra conta o valor passado por parãmetro
    this.anotherAccount.credit(amount);

    console.log(`O saldo atual da conta de origem é de R$ ${this.#balance}`);
   }

   closeAccount(){
    //verifica se o saldo na conta é diferente de zero, se for lança erro
    if(this.#balance !== 0) {
      throw new Error(`Não é possível encerra conta, ainda há o saldo de R$ ${this.#balance}`)
    }

    //atribuindo undefined a todas propriedades da conta
    this.accountNumber = undefined;
    this.agencyNumber = undefined;
    this.bank = undefined;
    this.client = undefined;

    console.log(`Conta encerrada!`);
   }

}