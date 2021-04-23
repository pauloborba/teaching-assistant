import { Aluno } from '../../common/aluno';

export class CadastroDeAlunos {
  private static alunos: Aluno[] = [];

  cadastrar(aluno: Aluno): Aluno {
    var result = null;
    if (this.cpfNaoCadastrado(aluno.cpf)) {
      result = new Aluno();
      result.copyFrom(aluno);
      CadastroDeAlunos.alunos.push(result);
    }
    return result;
  }

  remover(aluno: string): Aluno {
    var result: Aluno = CadastroDeAlunos.alunos.find(a => a.cpf == aluno);
    return result;
  }

  cpfNaoCadastrado(cpf: string): boolean {
    return !CadastroDeAlunos.alunos.find(a => a.cpf == cpf);
  }

  atualizar(aluno: Aluno): Aluno {
    var result: Aluno = CadastroDeAlunos.alunos.find(a => a.cpf == aluno.cpf);
    if (result) result.copyFrom(aluno);
    return result;
  }

  getAlunos(): Aluno[] {
    return CadastroDeAlunos.alunos;
  }
}