import { Aluno } from '../common/aluno';
import { Turma } from '../common/turma';
import { Matricula } from '../common/matricula';

export class Stub {
  alunos: Aluno[] = [];
  turmas: Turma[] = [];

  criarStubAlunos() {

    var aluno: Aluno = new Aluno();

    aluno.nome = 'João';
    aluno.cpf = '12345';
    aluno.email = 'joao@cin.ufpe.br';
    
    this.alunos.push(aluno);

    aluno = new Aluno();
    aluno.nome = 'Maria';
    aluno.cpf = '34567';
    aluno.email = 'maria@cin.ufpe.br';

    this.alunos.push(aluno);

    aluno = new Aluno();
    aluno.nome = 'Paulo';
    aluno.cpf = '13579';
    aluno.email = 'paulo@cin.ufpe.br';

    this.alunos.push(aluno);

    aluno = new Aluno();
    aluno.nome = 'Gabriel';
    aluno.cpf = '40028922';
    aluno.email = 'gabriel@cin.ufpe.br';

    this.alunos.push(aluno);

    return this.alunos;
  }

  criarStubMetas() {

    var turma: Turma = new Turma();
    var matricula: Matricula = new Matricula();
    var aluno: Aluno = new Aluno();

    turma.descricao = 'ESS 2020.3';
    turma.matriculas = [];
    turma.numeroMatriculas = turma.getNumMatriculas();

    aluno.nome = 'João';
    aluno.cpf = '12345';
    aluno.email = 'joao@cin.ufpe.br';

    matricula.aluno = aluno;
    turma.matriculas.push(matricula);

    aluno = new Aluno();
    matricula = new Matricula();

    aluno.nome = 'Maria';
    aluno.cpf = '34567';
    aluno.email = 'maria@cin.ufpe.br';

    matricula.aluno = aluno;
    turma.matriculas.push(matricula);

    aluno = new Aluno();
    matricula = new Matricula();

    aluno.nome = 'Paulo';
    aluno.cpf = '13579';
    aluno.email = 'paulo@cin.ufpe.br';

    matricula.aluno = aluno;
    turma.matriculas.push(matricula);

    aluno = new Aluno();
    matricula = new Matricula();

    aluno.nome = 'Gabriel';
    aluno.cpf = '40028922';
    aluno.email = 'gabriel@cin.ufpe.br';

    matricula.aluno = aluno;
    turma.matriculas.push(matricula);

    return (turma);

  }

}