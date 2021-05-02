import { Aluno } from '../common/aluno';

export class CadastroDeAlunos {
  alunos: Aluno[] = [];

  cadastrar(aluno: Aluno): Aluno {
    var result = null;
    if (aluno.cpf=='' && this.emailNaoCadastrado(<string> aluno.email)) {
      result = new Aluno();
      result.copyFrom(aluno);
      this.alunos.push(result);
    }
    return result;
  }

  cadastarPlanilha(lista: Aluno[]): Aluno[] {
    var sucessos: Aluno[] = [];
    for(const aluno of lista){
      let result = this.cadastrar(aluno);
      if (result != null){
        sucessos.push(aluno);
      }
    }
    return sucessos;
  }

  remover(aluno: string): Aluno {
    var result: Aluno = this.alunos.find(a => a.email == aluno);
    this.alunos.splice(this.alunos.indexOf(result), 1);
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