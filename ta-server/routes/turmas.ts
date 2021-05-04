import { Request, Response, Router } from 'express';
import { Aluno } from '../../common/aluno';
import { Matricula } from '../../common/matricula';
import { Turma } from '../../common/turma';
import { Turmas } from '../repos/turmas';

const turmasRoute = Router();
const turmasRepo: Turmas = new Turmas();

const alunosStub = [
  {
    nome: 'Adriana Vitória Ferreira',
    cpf: '815.098.557-34',
    email: 'adrianavitoriaferreira_@uel.br',
  },
  {
    nome: 'Tiago Julio Silva',
    cpf: '249.897.251-07',
    email: 'tiagojuliosilva-79@tec3.com.br',
  },
  {
    nome: 'Olivia Márcia Fernandes',
    cpf: '490.323.329-45',
    email: 'oliviamarciafernandes-90@hotmai.com.br',
  },
  {
    nome: 'Bento Vinicius Manoel Santos',
    cpf: '294.861.134-24',
    email: 'bentoviniciusmanoelsantos@milimoveis.com.br',
  },
  {
    nome: 'Betina Giovana Daniela Duarte',
    cpf: '055.698.877-92',
    email: 'bbetinagiovanadanieladuarte@usa.com',
  },
  {
    nome: 'Edson Danilo Baptista',
    cpf: '553.135.553-08',
    email: 'edsondanilobaptista_@sestito.com.br',
  },
  {
    nome: 'Isaac Pietro Kauê Novaes',
    cpf: '275.004.226-79',
    email: 'isaacpietrokauenovaes@avantii.com.br',
  },
  {
    nome: 'Luzia Elaine Daiane da Mata',
    cpf: '576.789.268-71',
    email: 'luziaelainedaianedamata-90@knowconsulting.com.br',
  },
  {
    nome: 'Lorena Jéssica Elza Peixoto',
    cpf: '969.407.241-76',
    email: 'lorenajessicaelzapeixoto_@dhl.com',
  },
  {
    nome: 'Vitória Manuela Almeida',
    cpf: '723.765.427-66',
    email: 'vitoriamanuelaalmeida@oliveiraesouza.adv.br',
  },
];


const turmasStub: any = [
  {
    descricao: "2019.2",
    metas: ["Requisitos", "Ger. Config.", "Ger. Proj.", "Testes", "Projeto"],
    vagas: 60,
    matriculas: [],
    roteiros: [],
    monitores: []
  },
  {
    descricao: "2020.1",
    metas: ["Requisitos", "Ger. Config.", "Ger. Proj.", "Testes", "Projeto"],
    vagas: 60,
    matriculas: [],
    roteiros: [],
    monitores: []
  },
  {
    descricao: "2020.2",
    metas: ["Requisitos", "Ger. Config.", "Ger. Proj.", "Testes", "Projeto"],
    vagas: 60,
    matriculas: [],
    roteiros: [],
    monitores: []
  },
  {
    descricao: "2020.3",
    metas: ["Requisitos", "Ger. Config.", "Ger. Proj.", "Testes", "Projeto"],
    vagas: 60,
    matriculas: [],
    roteiros: [],
    monitores: []
  },
]

let matricula1 = new Matricula();
let matricula2 = new Matricula();
let matricula3 = new Matricula();
let matricula4 = new Matricula();
let matricula5 = new Matricula();
let matricula6 = new Matricula();
let matricula7 = new Matricula();
let matricula8 = new Matricula();
let matricula9 = new Matricula();
let matricula10 = new Matricula();
let aluno1 = new Aluno();
let aluno2 = new Aluno();
let aluno3 = new Aluno();
let aluno4 = new Aluno();
let aluno5 = new Aluno();
let aluno6 = new Aluno();
let aluno7 = new Aluno();
let aluno8 = new Aluno();
let aluno9 = new Aluno();
let aluno10 = new Aluno();

// 2019.2
let turma = turmasStub[0];
let tempTurma = new Turma();
tempTurma.descricao = turma.descricao;
tempTurma.metas = turma.metas;
tempTurma.vagas = turma.vagas;
let alunos = alunosStub.slice(0, 10);
aluno1.nome = alunos[0].nome;
aluno1.cpf = alunos[0].cpf;
aluno1.email = alunos[0].email;
aluno2.nome = alunos[1].nome;
aluno2.cpf = alunos[1].cpf;
aluno2.email = alunos[1].email;
aluno3.nome = alunos[2].nome;
aluno3.cpf = alunos[2].cpf;
aluno3.email = alunos[2].email;
aluno4.nome = alunos[3].nome;
aluno4.cpf = alunos[3].cpf;
aluno4.email = alunos[3].email;
aluno5.nome = alunos[4].nome;
aluno5.cpf = alunos[4].cpf;
aluno5.email = alunos[4].email;
aluno6.nome = alunos[5].nome;
aluno6.cpf = alunos[5].cpf;
aluno6.email = alunos[5].email;
aluno7.nome = alunos[6].nome;
aluno7.cpf = alunos[6].cpf;
aluno7.email = alunos[6].email;
aluno8.nome = alunos[7].nome;
aluno8.cpf = alunos[7].cpf;
aluno8.email = alunos[7].email;
aluno9.nome = alunos[8].nome;
aluno9.cpf = alunos[8].cpf;
aluno9.email = alunos[8].email;
aluno10.nome = alunos[9].nome;
aluno10.cpf = alunos[9].cpf;
aluno10.email = alunos[9].email;
matricula1.aluno = aluno1;
matricula2.aluno = aluno2;
matricula3.aluno = aluno3;
matricula4.aluno = aluno4;
matricula5.aluno = aluno5;
matricula6.aluno = aluno6;
matricula7.aluno = aluno7;
matricula8.aluno = aluno8;
matricula9.aluno = aluno9;
matricula10.aluno = aluno10;
tempTurma.matriculas.push(matricula1);
tempTurma.matriculas.push(matricula2);
tempTurma.matriculas.push(matricula3);
tempTurma.matriculas.push(matricula4);
tempTurma.matriculas.push(matricula5);
tempTurma.matriculas.push(matricula6);
tempTurma.matriculas.push(matricula7);
tempTurma.matriculas.push(matricula8);
tempTurma.matriculas.push(matricula9);
tempTurma.matriculas.push(matricula10);
turmasRepo.cadastrarTurma(tempTurma);

turmasRoute.get('/', (req: Request, res: Response) => {
  res.send(turmasRepo.getTurmas());
});

turmasRoute.get('/:id', (req: Request, res: Response) => {
  const turma: Turma = turmasRepo.getTurma(req.params.id);
  res.send(turma || null);
});

turmasRoute.post('/', (req: Request, res: Response) => {
  const turma: Turma = <Turma>req.body;

  if (turmasRepo.cadastrarTurma(turma)) {
    res.send({ 'success': 'A turma foi cadastrada com sucesso' });
  } else {
    res.send({ 'failure': 'A turma não foi cadastrada' });
  }
});

turmasRoute.put('/', (req: Request, res: Response) => {
  const turma: Turma = <Turma>req.body;

  if (turmasRepo.atualizarTurma(turma)) {
    res.send({ 'success': 'A turma foi atualizada com sucesso' });
  } else {
    res.send({ 'failure': 'A turma não foi atualizada' });
  }
});

turmasRoute.delete('/:id', (req: Request, res: Response) => {
  if (turmasRepo.removerTurma(req.params.id)) {
    res.send({ 'success': 'A turma foi removida com sucesso' });
  } else {
    res.send({ 'failure': 'A turma não foi removida' });
  }
});

export default turmasRoute;
