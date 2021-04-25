import { Aluno } from '../common/aluno';

export class CadastroDeAlunos {
  alunos: Aluno[] = [];

  cadastrar(aluno: Aluno): Aluno {
    var result = null;
    if (this.cpfNaoCadastrado(<string> aluno.cpf)) {
      result = new Aluno();
      result.copyFrom(aluno);
      this.alunos.push(result);
    }
    return result;
  }

  cadastarPlanilha(lista: Aluno[]): Aluno[] {
    for(const aluno of lista){
      console.log(aluno.email);
      if (this.emailNaoCadastrado(<string> aluno.email)){
        this.alunos.push(aluno);
      }
    }
    return this.alunos;
  }

  remover(aluno: string): Aluno {
    var result: Aluno = this.alunos.find(a => a.cpf == aluno);
    return result;
  }

  cpfNaoCadastrado(cpf: string): boolean {
    return !this.alunos.find(a => a.cpf == cpf);
  }

  emailNaoCadastrado(email: string): boolean{
    return !this.alunos.find(a => a.email == email);
  }

  atualizar(aluno: Aluno): Aluno {
    var result: Aluno = this.alunos.find(a => a.cpf == aluno.cpf);
    if (result) result.copyFrom(aluno);
    return result;
  }

  getAlunos(): Aluno[] {
    return this.alunos;
  }
}