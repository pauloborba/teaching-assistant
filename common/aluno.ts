export class Aluno {
  nome: string;
  cpf: string;
  email: string;

  constructor(nome: string = '', cpf: string = '', email: string = '') {
    this.nome = nome;
    this.cpf = cpf;
    this.email = email;
  }

  copyFrom(from: Aluno): void {
    this.nome = from.nome;
    this.cpf = from.cpf;
    this.email = from.email;
  }
}
