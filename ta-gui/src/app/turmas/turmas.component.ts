import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../../../common/aluno';
import { Matricula } from '../../../../common/matricula';
import { Turma } from '../../../../common/turma';
import { TurmasService } from './turmas.service'

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css']
})

export class TurmasComponent implements OnInit {
  // constructor(private turmaService: TurmasService) { }
  constructor(private service: TurmasService) { }
  turmas: Turma[] = [];
  descricaoNovaTurma: string = '';
  turmasEscolhidas: string[] = [];
  modalAtivo: string = '';
  opcaoSelecionada: string = '';
  novasNotificacoes: boolean = false;
  todosNotificados: boolean = false;
  turmaVisualizacao: Turma;

  ngOnInit() {
    var stub_turma1 = new Turma("");
    var stub_turma2 = new Turma("");
    var stub_turma3 = new Turma("");
    stub_turma1.descricao = "ESS-2020.1";
    stub_turma2.descricao = "ESS-2020.2";
    stub_turma3.descricao = "SI-2020.1";
    var stub_matricula1 = new Matricula();
    var stub_matricula2 = new Matricula();
    var stub_matricula3 = new Matricula();
    var stub_aluno1 = new Aluno();
    var stub_aluno2 = new Aluno();
    var stub_aluno3 = new Aluno();
    stub_aluno1.nome = "João";
    stub_aluno1.cpf = "123";
    stub_aluno1.email = "joao@cin.ufpe.br";
    stub_aluno2.nome = "Maria";
    stub_aluno2.cpf = "456";
    stub_aluno2.email = "maria@cin.ufpe.br";
    stub_aluno3.nome = "Lucas";
    stub_aluno3.cpf = "789";
    stub_aluno3.email = "Lucas@cin.ufpe.br";
    stub_matricula1.aluno = stub_aluno1;
    stub_matricula2.aluno = stub_aluno2;
    stub_matricula3.aluno = stub_aluno3;
    stub_turma1.matriculas = [stub_matricula1, stub_matricula2];
    stub_turma3.matriculas = [stub_matricula1, stub_matricula3];
    stub_turma1.statusNotificacao = [{ nome: 'João', cpf: '123', notificado: false }, { nome: 'Maria', cpf: '456', notificado: false }]
    stub_turma3.statusNotificacao = [{ nome: 'João', cpf: '123', notificado: false }, { nome: 'Lucas', cpf: '789', notificado: false }]
    // stub_turma2.statusNotificacao = [{ nome: 'João', cpf: '123', notificado: false }, { nome: 'Maria', cpf: '456', notificado: false }]

    this.turmas.push(stub_turma1);
    this.turmas.push(stub_turma2);
    this.turmas.push(stub_turma3);
    // this.turmas.push(stub_turma2);
  }


  visualizarStatusNotificacao(event) {
    const id = event.target.id.substring(7, event.target.id.length);
    const turma = this.turmas.filter((t) => t.descricao == id);
    console.log(turma)
    this.turmaVisualizacao = turma[0]
  }

  notificarTurma(turma: Turma): void {
    this.service.notificar(turma).subscribe(
      res => {
        if (res.length > 0) {
          turma.statusNotificacao = res;
          this.novasNotificacoes = true;
          const naoNotificados = turma.statusNotificacao.filter(s => s.notificado == false);
          if (naoNotificados.length == 0) {
            this.todosNotificados = true;
          }
          setTimeout(() => { this.novasNotificacoes = false }, 10000)
        }
        // return res; // Retorna a resposta que contém o array de alunos notificados
      },
      err => {
        console.log(err)
      }
    )
  }

  adicionarTurma(): void {
    this.turmas.push(new Turma(this.descricaoNovaTurma));
    this.descricaoNovaTurma = '';
  }

  mostrarOpcoesComparacao(): void {
    if (this.turmas.length < 2) {
      this.modalAtivo = 'erro';
    } else {
      this.modalAtivo = 'opcoes';
      this.opcaoSelecionada = '';
      this.turmasEscolhidas = [];
    }
  }

  mostrarTurmas(): void {
    this.modalAtivo = 'turmas';
    this.turmasEscolhidas = [];
  }

  esconderModal(): void {
    if (this.modalAtivo === 'turmas') {
      this.mostrarOpcoesComparacao();
    } else {
      this.modalAtivo = '';
    }
  }

  atualizarTurmasEscolhidas(descricao: string): void {
    if (this.turmaNaoFoiEscolhida(descricao)) {
      this.turmasEscolhidas.push(descricao);
    } else {
      this.turmasEscolhidas = this.turmasEscolhidas.filter(turma => turma !== descricao);
    }
  }

  turmaNaoFoiEscolhida(descricao: string): boolean {
    return !this.turmasEscolhidas.find(turma => turma === descricao);
  }

  selecionarTodas(): void {
    this.turmasEscolhidas = this.turmas.map(turma => turma.descricao);
    this.opcaoSelecionada = 'todas';
  }

  selecionarUltimasQuatro(): void {
    this.turmasEscolhidas = [];
    for (let i = this.turmas.length - 1; this.turmasEscolhidas.length < 4; i--) {
      this.turmasEscolhidas.push(this.turmas[i].descricao);
    }

    this.opcaoSelecionada = 'ultimas-quatro';
  }
}
