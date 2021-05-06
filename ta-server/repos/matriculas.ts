import { Avaliacao } from '../../common/avaliacao';
import { Matricula } from '../../common/matricula';

export class Matriculas {
  private static matriculas: Matricula[] = [];

  getMatriculas(): Matricula[] {
    return Matriculas.matriculas;
  }

  getMatricula(cpf: string): Matricula {
    return Matriculas.matriculas.find(a => a.aluno.cpf === cpf);
  }

  cadastrarMatricula(a: Matricula): Matricula {
    const matricula: Matricula = new Matricula();
    matricula.copyFrom(a);
    console.log(matricula);

    if (matricula.aluno.cpf && this.cpfNaoCadastrado(matricula.aluno.cpf)) {
      Matriculas.matriculas.push(matricula);
      return matricula;
    }

    return null;
  }

  atualizarMatricula(a: Matricula): Matricula {
    const Matricula: Matricula = Matriculas.matriculas.find(l => l.aluno.cpf === a.aluno.cpf);
    if (Matricula)
      Matricula.copyFrom(a);
    return Matricula;
  }

  atualizarNota(m: Matricula, a: Avaliacao): Matricula {
    console.log(m, a);
    
    const Matricula: Matricula = Matriculas.matriculas.find(l => l.aluno.cpf === m.aluno.cpf);
    if (Matricula)
      Matriculas.matriculas.find(mat => mat.aluno.cpf == m.aluno.cpf).avaliacoes.find(av => av.meta == a.meta).nota = a.nota;
      console.log(Matriculas.matriculas.find(mat => mat.aluno.cpf == m.aluno.cpf));
      
    return Matricula;
  }

  removerMatricula(cpf: string): Matricula {
    const Matricula: Matricula = Matriculas.matriculas.find(a => a.aluno.cpf === cpf);
    if (Matricula) {
      Matriculas.matriculas = Matriculas.matriculas.filter(a => a.aluno.cpf !== cpf);
      return Matricula;
    } else {
      return null;
    }
  }

  removerNota(cpf: string, meta: string): Avaliacao {
    console.log('removernota repo');
    const Avaliacao: Avaliacao = Matriculas.matriculas.find(a => a.aluno.cpf === cpf).avaliacoes.find(as => as.meta === meta);
    console.log(Avaliacao);
    if (Avaliacao) {
      Matriculas.matriculas.find(a => a.aluno.cpf === cpf).avaliacoes.find(as => as.meta === meta).nota = '';
      console.log(Matriculas.matriculas.find(a => a.aluno.cpf === cpf).avaliacoes.find(as => as.meta === meta));
      
      return Avaliacao;
    } else {
      return null;
    }
  }

  private cpfNaoCadastrado(cpf: string): boolean {
    return !Matriculas.matriculas.find(matricula => matricula.aluno.cpf === cpf);
  }
}
