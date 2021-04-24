import { Aluno } from '../../common/aluno';

export class Alunos {
  private static alunos: Aluno[] = [];

  getAlunos(): Aluno[] {
    return Alunos.alunos;
  }

  getAluno(cpf: string): Aluno {
    return Alunos.alunos.find(a => a.cpf === cpf);
  }

  cadastrarAluno(a: Aluno): Aluno {
    const aluno: Aluno = new Aluno();
    aluno.copyFrom(a);

    if (aluno.cpf && this.cpfNaoCadastrado(aluno.cpf)) {
      Alunos.alunos.push(aluno);
      return aluno;
    }

    return null;
  }

  atualizarAluno(a: Aluno): Aluno {
    const aluno: Aluno = Alunos.alunos.find(l => l.cpf === a.cpf);
    if (aluno)
      aluno.copyFrom(a);
    return aluno;
  }

  removerAluno(cpf: string): Aluno {
    const aluno: Aluno = Alunos.alunos.find(a => a.cpf === cpf);
    if (aluno) {
      Alunos.alunos = Alunos.alunos.filter(a => a.cpf !== cpf);
      return aluno;
    } else {
      return null;
    }
  }

  private cpfNaoCadastrado(cpf: string): boolean {
    return !Alunos.alunos.find(a => a.cpf === cpf);
  }
}
