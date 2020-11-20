import { Component, OnInit } from '@angular/core';
import { Turma } from '../../../../common/turma';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css']
})
export class TurmasComponent implements OnInit {
  turmas: Turma[] = [];
  descricaoNovaTurma: string = '';

  turmasEscolhidas: string[] = [];
  modalAtivo: string = '';
  opcaoSelecionada: string = '';

  constructor() { }

  ngOnInit() {

  }

  adicionarTurma(): void {
    const turma = new Turma();
    turma.descricao = this.descricaoNovaTurma;
    this.turmas.push(turma);
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
    if (!this.turmasEscolhidas.find(turma => turma === descricao)) {
      this.turmasEscolhidas.push(descricao);
    } else {
      this.turmasEscolhidas = this.turmasEscolhidas.filter(turma => turma !== descricao);
    }
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
