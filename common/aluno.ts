export class Aluno {
    nome: String;
    cpf: String;
    email: String;
    metas: Map<string,string>;
    
    getNome(): String {
        return this.nome
    }
  
    constructor() {
      this.clean();
    }
  
    clean(): void {
      this.nome = "";
      this.cpf = "";
      this.email = "";
      this.metas = new Map<string,string>();
    }
  
    clone(): Aluno {
      var aluno: Aluno = new Aluno();
      aluno.metas = new Map<string,string>();
      aluno.copyFrom(this);
      return aluno;
    }
  
    copyFrom(from: Aluno): void {
      this.nome = from.nome;
      this.cpf = from.cpf;
      this.email = from.email;
      this.copyMetasFrom(from.metas);
    }
  
    copyMetasFrom(from: Map<string,string>): void {
      this.metas = new Map<string,string>();
      for (let key in from) {
        this.metas[key] = from[key];
      }
    }
}