import { Aluno } from '../common/aluno';
import { Turma } from '../common/turma';
import { Matricula } from '../common/matricula';
import { Avaliacao } from '../ta-server/avaliacao';

export class Stub {
  alunos: Aluno[] = [];
  turmas: Turma[] = [];
  avaliacao: Avaliacao;

  criarStubAlunos() {

    this.alunos = [];

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
    var avaliacaoIndivudual: Avaliacao = new Avaliacao;

    turma.descricao = 'ESS 2020.3';
    turma.matriculas = [];
    turma.numeroMatriculas = turma.getNumMatriculas();

    aluno.nome = 'João';
    aluno.cpf = '12345';
    aluno.email = 'joao@cin.ufpe.br';
    aluno.matriculas = ['ESS', 'ESS'];

    avaliacaoIndivudual.setMeta('Projeto');
    avaliacaoIndivudual.setNota('6.7');

    matricula.aluno = aluno;
    matricula.avaliacoes.push(avaliacaoIndivudual);
    turma.matriculas.push(matricula);

    aluno = new Aluno();
    avaliacaoIndivudual = new Avaliacao();
    matricula = new Matricula();

    aluno.nome = 'Maria';
    aluno.cpf = '34567';
    aluno.email = 'maria@cin.ufpe.br';
    aluno.matriculas = ['ESS', 'IP', 'ESS'];

    // Em maria se baixarmos a nota pra 7.2 ela fica abaixo da média com a segunda avaliação de paulo
    avaliacaoIndivudual.setMeta('Projeto');
    avaliacaoIndivudual.setNota('7.3');

    matricula.aluno = aluno;
    matricula.avaliacoes.push(avaliacaoIndivudual);
    turma.matriculas.push(matricula);

    aluno = new Aluno();
    avaliacaoIndivudual = new Avaliacao();
    matricula = new Matricula();

    aluno.nome = 'Paulo';
    aluno.cpf = '13579';
    aluno.email = 'paulo@cin.ufpe.br';
    aluno.matriculas = ['ESS'];

    avaliacaoIndivudual.setMeta('Projeto');
    avaliacaoIndivudual.setNota('6.0');

    matricula.avaliacoes.push(avaliacaoIndivudual);
    avaliacaoIndivudual = new Avaliacao;

    // Adicionando uma segunda avaliação em paulo
    avaliacaoIndivudual.setMeta('Prova Final');
    avaliacaoIndivudual.setNota('7.0');

    matricula.aluno = aluno;
    matricula.avaliacoes.push(avaliacaoIndivudual);
    turma.matriculas.push(matricula);

    aluno = new Aluno();
    avaliacaoIndivudual = new Avaliacao();
    matricula = new Matricula();

    aluno.nome = 'Gabriel';
    aluno.cpf = '40028922';
    aluno.email = 'gabriel@cin.ufpe.br';
    aluno.matriculas = ['ESS', 'IP'];

    avaliacaoIndivudual.setMeta('Projeto');
    avaliacaoIndivudual.setNota('8.5');

    matricula.aluno = aluno;
    matricula.avaliacoes.push(avaliacaoIndivudual);
    turma.matriculas.push(matricula);

    return (turma);

  }

}