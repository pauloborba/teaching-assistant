import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Turma } from '../../../../common/turma';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css']
})
export class TurmasComponent implements OnInit {
  turmas: Turma[] = [];
  turmasEscolhidas: string[] = [];
  modalOpcoesComparacaoAtivo: boolean = false;
  modalTurmasAtivo: boolean = false;

  constructor(private router: Router) { }

  ngOnInit() {

  }

  alternarVisualizacaoOpcoesComparacao(): void {
    this.modalOpcoesComparacaoAtivo = !this.modalOpcoesComparacaoAtivo;
    this.turmasEscolhidas = [];
  }

  alternarVisualizacaoTurmas(): void {
    this.alternarVisualizacaoOpcoesComparacao();
    this.modalTurmasAtivo = !this.modalTurmasAtivo;
  }

  atualizarTurmasEscolhidas(descricaoTurma: string): void {
    if (!this.turmasEscolhidas.find(descricao => descricao === descricaoTurma)) {
      this.turmasEscolhidas.push(this.turmas.find(turma => turma.descricao === descricaoTurma).descricao);
    } else {
      this.turmasEscolhidas = this.turmasEscolhidas.filter(descricao => descricao !== descricaoTurma);
    }
  }

  compararTodas(): void {
    this.turmasEscolhidas = this.turmas.map(turma => turma.descricao);
    this.compararTurmasEscolhidas();
  }
  
  compararUltimasQuatro(): void {
    this.turmasEscolhidas = [];
    for (let i = this.turmas.length; this.turmasEscolhidas.length < 4; i--) {
      this.turmasEscolhidas.push(this.turmas[i].descricao);
    }
    
    this.compararTurmasEscolhidas();
  }

  compararTurmasEscolhidas(): void {
    this.router.navigate(['comparacao-de-desempenho'], { state: { turmas: this.turmasEscolhidas } });
  }
}
