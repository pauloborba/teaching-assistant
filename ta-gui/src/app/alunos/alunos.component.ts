import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../../../common/aluno';
import { AlunosService } from './alunos.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: [ './alunos.component.css' ]
})
export class AlunosComponent implements OnInit {
  alunos: Aluno[] = [];
  aluno: Aluno = new Aluno();
  cpfDuplicado: boolean = false;
  alunoEditar: Aluno = new Aluno();

  constructor(private alunosService: AlunosService) { }

  alunosStub = [
    {
        "nome": "Adriana Vitória Ferreira",
        "cpf": "815.098.557-34",
        "email": "adrianavitoriaferreira_@uel.br"
    },
    {
        "nome": "Tiago Julio Silva",
        "cpf": "249.897.251-07",
        "email": "tiagojuliosilva-79@tec3.com.br"
    },
    {
        "nome": "Olivia Márcia Fernandes",
        "cpf": "490.323.329-45",
        "email": "oliviamarciafernandes-90@hotmai.com.br"
    },
    {
        "nome": "Bento Vinicius Manoel Santos",
        "cpf": "294.861.134-24",
        "email": "bentoviniciusmanoelsantos@milimoveis.com.br"
    },
    {
        "nome": "Betina Giovana Daniela Duarte",
        "cpf": "055.698.877-92",
        "email": "bbetinagiovanadanieladuarte@usa.com"
    },
    {
        "nome": "Edson Danilo Baptista",
        "cpf": "553.135.553-08",
        "email": "edsondanilobaptista_@sestito.com.br"
    },
    {
        "nome": "Isaac Pietro Kauê Novaes",
        "cpf": "275.004.226-79",
        "email": "isaacpietrokauenovaes@avantii.com.br"
    },
    {
        "nome": "Luzia Elaine Daiane da Mata",
        "cpf": "576.789.268-71",
        "email": "luziaelainedaianedamata-90@knowconsulting.com.br"
    },
    {
        "nome": "Lorena Jéssica Elza Peixoto",
        "cpf": "969.407.241-76",
        "email": "lorenajessicaelzapeixoto_@dhl.com"
    },
    {
        "nome": "Vitória Manuela Almeida",
        "cpf": "723.765.427-66",
        "email": "vitoriamanuelaalmeida@oliveiraesouza.adv.br"
    },
    {
        "nome": "Lorena Teresinha Vera Campos",
        "cpf": "556.642.012-58",
        "email": "llorenateresinhaveracampos@gsw.com.br"
    },
    {
        "nome": "Raimunda Emilly da Silva",
        "cpf": "775.363.926-99",
        "email": "raimundaemillydasilva@camilapassos.com.br"
    },
    {
        "nome": "Laís Heloisa Santos",
        "cpf": "131.710.697-09",
        "email": "llaisheloisasantos@sectron.com.br"
    },
    {
        "nome": "Kamilly Nicole Moura",
        "cpf": "489.846.314-26",
        "email": "kamillynicolemoura@adiretoria.com.br"
    },
    {
        "nome": "Marcelo Renato da Rosa",
        "cpf": "593.972.609-79",
        "email": "marcelorenatodarosa_@libero.it"
    },
    {
        "nome": "Nicole Elaine Moraes",
        "cpf": "262.461.661-64",
        "email": "nicoleelainemoraes_@gerdau.com.br"
    },
    {
        "nome": "Emilly Laís Alves",
        "cpf": "172.843.512-92",
        "email": "emillylaisalves@skapcom.com.br"
    },
    {
        "nome": "Yago Jorge Monteiro",
        "cpf": "574.950.804-85",
        "email": "yyagojorgemonteiro@sofisticattomoveis.com.br"
    },
    {
        "nome": "Diego Fábio Caldeira",
        "cpf": "958.558.358-55",
        "email": "diegofabiocaldeira-98@esplanadaviagens.com.br"
    },
    {
        "nome": "Carla Betina Débora Assunção",
        "cpf": "145.448.416-07",
        "email": "carlabetinadeboraassuncao@foar.unesp.br"
    },
    {
        "nome": "Alexandre Luan Souza",
        "cpf": "437.097.631-69",
        "email": "alexandreluansouza-82@alesalvatori.com"
    },
    {
        "nome": "Luís Lorenzo Teixeira",
        "cpf": "362.006.287-00",
        "email": "luislorenzoteixeira@cosma.com"
    },
    {
        "nome": "Vitória Lúcia Milena Baptista",
        "cpf": "098.355.580-00",
        "email": "vitorialuciamilenabaptista_@contabilidadevictoria.com.br"
    },
    {
        "nome": "Osvaldo Rafael Carlos Eduardo Fernandes",
        "cpf": "448.246.681-66",
        "email": "osvaldorafaelcarloseduardofernandes@mosman.com.br"
    },
    {
        "nome": "Guilherme Francisco Almada",
        "cpf": "875.407.274-38",
        "email": "guilhermefranciscoalmada@eptv.com.br"
    },
    {
        "nome": "Mariana Luciana Maya Viana",
        "cpf": "699.247.417-06",
        "email": "marianalucianamayaviana@belaggiovini.com.br"
    },
    {
        "nome": "Elza Betina Monteiro",
        "cpf": "992.288.130-67",
        "email": "elzabetinamonteiro@origamieventos.com.br"
    },
    {
        "nome": "Lorena Bruna dos Santos",
        "cpf": "022.899.003-38",
        "email": "lorenabrunadossantos@picolotoengenharia.com.br"
    },
    {
        "nome": "Luciana Luzia Nicole Mendes",
        "cpf": "759.658.468-35",
        "email": "lucianaluzianicolemendes-84@mpcnet.com.br"
    },
    {
        "nome": "Cristiane Emanuelly Cardoso",
        "cpf": "846.376.043-03",
        "email": "cristianeemanuellycardoso@numero.com.br"
    }
]

  ngOnInit(): void {
    this.alunosService.getAlunos()
      .subscribe(
        alunos => { this.alunos = alunos; },
        msg => { alert(msg.message); }
      );

    this.alunosStub.forEach((aluno) => {
      let tempAluno = new Aluno();
      tempAluno.nome = aluno.nome;
      tempAluno.cpf = aluno.cpf;
      tempAluno.email = aluno.email;
      this.criarAluno(tempAluno);
    })
  }

  criarAluno(a: Aluno): void {
    this.alunosService.criar(a)
      .subscribe(
        aluno => {
          if (aluno) {
            this.alunos.push(aluno);
            this.aluno = new Aluno();
          } else {
            this.cpfDuplicado = true;
          }
        },
        msg => { alert(msg.message); }
      );
  }

  editarAluno(a: Aluno): void {
    this.alunoEditar.copyFrom(a);
  }

  atualizarAluno(a: Aluno): void {
    this.alunosService.atualizar(this.alunoEditar)
      .subscribe(
        aluno => {
          if (aluno) {
            this.alunoEditar = new Aluno();
            Object.assign(a, aluno);
          } else {
            alert('O aluno não foi atualizado');
          }
        }
      );
  }

  removerAluno(a: Aluno): void {
    this.alunosService.remover(a)
      .subscribe(aluno => {
        if (aluno) {
          this.alunos = this.alunos.filter(a => a.cpf !== aluno.cpf);
        } else {
          alert('O aluno não foi removido');
        }
      });
  }
}
