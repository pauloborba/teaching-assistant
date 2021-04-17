import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
    var turma: Turma = new Turma();
    turma.descricao = "23e1321";
    this.turmas.push(turma);
    turma = new Turma();
    turma.descricao="32fkds"
    this.turmas.push(turma)

  }


  notificarTurma(turma: Turma) :void {
    alert(turma.descricao)
    this.service.notificar(turma).subscribe(
      {
        next: r => {
          if (r) {
            alert("Turma notificada!")
          }
          else {
            alert("Erro ao notificar turma!")
          }
        },
        error: err => {
          console.log(err)
        }
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
