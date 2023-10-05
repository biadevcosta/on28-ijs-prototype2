import { Bank } from "./Bank.js";

export class Client {
  name;
  #CPF;
  banks = [];

  constructor(name, CPF){
    this.name = name;
    this.#CPF = CPF;
  }

 addBank(bank){
    if(!(bank instanceof Bank)) {
      throw new Error('Banco inválido');
    }
    //verifica se o banco já é associado ao cliente
    const hasBank = this.banks.some((clientBank) => clientBank.bankCode === bank.bankCode);
    //se já for associado ao banco, lança erro
    if((hasBank)) {
      throw new Error(`${this.name} já é associado(a) ao banco ${bank.bankName}`)
    } else {
      //puxando novo banco ao array de banks
      this.banks.push({ bankCode: bank.bankCode, bankName: bank.bankName});
      //achando o banco passado por parâmetro na array createdBanks da classe de Bank
      const createdBank = Bank.createdBanks.find((createdBank) => createdBank.bankCode === bank.bankCode)
      //adiconando mais um cliente ao banco
      createdBank.qtdClient++     
    }
  }

  removeBank(bank){
    if(!(bank instanceof Bank)) {
      throw new Error('Banco inválido');
    }
    //verifica se o banco já é associado ao cliente
    const hasBank = this.banks.some((clientBank) => clientBank.bankCode === bank.bankCode);
    //se cliente não for associado ao banco lança erro.
    if(!(hasBank)) {
      throw new Error(`${this.name} não é associado(a) ao banco ${bank.bankName}`)
    } else {
      //A variável associatesBanks conterá uma lista de bancos que não têm o mesmo bankCode que o banco que deseja que seja removido
      const associatesBanks = this.banks.filter((associateBank) => associateBank.bankCode !== bank.bankCode);
      //atribuindo a variável filtrada para a array de banks, dessa forma removerá o banco que foi passado por parâmetro
      this.banks = associatesBanks;
      //achando o banco passado por parâmetro na array createdBanks da classe de Bank
      const createdBank = Bank.createdBanks.find((createdBank) => createdBank.bankCode === bank.bankCode)
      //removendo um cliente do banco
      createdBank.qtdClient--  
    }
  }
}


