export class Aluno {
  nome: string = '';
  cpf: string = '';
  email: string = '';

  copyFrom(from: Aluno): void {
    this.nome = from.nome;
    this.cpf = from.cpf;
    this.email = from.email;
  }
}
