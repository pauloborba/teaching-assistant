import { Component, OnInit } from '@angular/core';

import { Aluno } from '../../../../common/aluno';
import { Matricula } from '../../../../common/matricula';
import { Avaliacao } from '../../../../ta-server/avaliacao';
import { Turmas } from '../../../../ta-server/turmas';

@Component({
  selector: 'app-autoavaliacao',
  templateUrl: './autoavaliacao.component.html',
  styleUrls: ['./autoavaliacao.component.css']
})
export class AutoavaliacaoComponent implements OnInit {
  alunos: Aluno[] = [];
  avaliacoes: Avaliacao[] = [];
  auto_avaliacoes: Avaliacao[] = [];
  matricula: Matricula;
  turmas: Turmas;
  cpf: string;
  descricaoTurma: string;
  notificar: boolean = false;
  show_matriculas: boolean = false;

  constructor() { }

  ngOnInit() {

  }

  cadastrarAutoAvaliacao(matricula: Matricula, avaliacoes: Avaliacao[]): void { }
	notificarAutoAvaliacao(cpf: string, descricaoTurma: string): void {}

  setNotificar(): void {
    this.notificar = true;
  }

  showMatriculas(descricaoTurma: string): void {
    this.show_matriculas = true;
    let turma = this.turmas.getTurma(descricaoTurma);
    let matriculas = turma.getMatriculas();
  }
}
