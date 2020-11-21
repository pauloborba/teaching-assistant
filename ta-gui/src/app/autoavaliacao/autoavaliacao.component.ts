import { Component, OnInit } from '@angular/core';

import { Aluno } from '../../../../common/aluno';
import { Matricula } from '../../../../common/matricula';
import { Avaliacao } from '../../../../ta-server/avaliacao';
import { Turmas } from '../../../../ta-server/turmas';
import { Turma } from '../../../../common/turma';
import { AutoavaliacaoService } from './autoavaliacao.service';

@Component({
  selector: 'app-autoavaliacao',
  templateUrl: './autoavaliacao.component.html',
  styleUrls: ['./autoavaliacao.component.css']
})
export class AutoavaliacaoComponent implements OnInit {
  alunos: Aluno[] = [];
  avaliacoes: Avaliacao[] = [];
  auto_avaliacoes: Avaliacao[] = [];
  matriculas: Matricula[];
  matricula: Matricula;
  turma: Turma = null;
  cpf: string;
  descricaoTurma: string;
  notificar: boolean = false;
  show_turmas: boolean = false;
  selectedMetas: string[] = [];
  index = -1;

  constructor(private aaService: AutoavaliacaoService) { }

  ngOnInit() {

  }

  cadastrarAutoAvaliacao(matricula: Matricula, avaliacoes: Avaliacao[]): void { }
	notificarAutoAvaliacao(): void {
    console.log(this.selectedMetas);
    this.aaService.notificar(this.matriculas[0].aluno.email, this.selectedMetas[0]).subscribe(as => {}, msg => {alert(msg.message);});
  }

  setNotificar(): void {
    this.notificar = true;
  }

  showTurmas(descricaoTurma: string): void {
    this.show_turmas = true;
    this.aaService.getTurmas(descricaoTurma).subscribe(as => {
      this.turma = new Turma();
      this.turma.descricao = as.descricao;
      this.turma.metas = as.metas;
      this.matriculas = as.matriculas;
    }, msg => {alert(msg.message);});
  }

  selected(email: string): void {
    var result: string = this.selectedMetas.find(a => a == email);
    if (!result) {
      this.selectedMetas.push(email);
    } else {
      this.index = this.selectedMetas.indexOf(result)
      if (this.index > -1) {
        this.selectedMetas.splice(this.index, 1)
      }
    }
  }
}
