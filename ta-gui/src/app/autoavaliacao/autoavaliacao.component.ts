import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  show_matriculas: boolean = false;
  confirmacao: boolean = false;
  erro: boolean = false;
  erro_turma: boolean = false;
  selectedMetas: string[] = [];
  index = -1;

  constructor(private aaService: AutoavaliacaoService, private router: Router) { }

  ngOnInit() {

  }

  cadastrarAutoAvaliacao(matricula: Matricula, avaliacoes: Avaliacao[]): void { }
	notificarAutoAvaliacao(): void {
    var toNotify = [];
    for (var i = 0; i < this.matriculas.length; i++) {
      var toNotifyMetas = [];
      for (var j = 0; j < this.selectedMetas.length; j++) {
        for (var k = 0; k < this.matriculas[i].autoAvaliacoes.length; k++) {
          if (this.matriculas[i].autoAvaliacoes[k].meta === this.selectedMetas[j] && this.matriculas[i].autoAvaliacoes[k].nota === "") {
            toNotifyMetas.push(this.selectedMetas[j]);
          }
        }
      }
      if (toNotifyMetas.length > 0) {
        this.confirmacao = true;
        var aux = {"email": this.matriculas[i].aluno.email, "meta": toNotifyMetas};
        console.log(aux);
        toNotify.push(aux);
      }
    }
    if (toNotify.length === 0) {
      this.erro = true;
    } else {
      this.aaService.notificar(toNotify).subscribe(as => {}, msg => {alert(msg.message);});
    }
  }

  setNotificar(): void {
    this.notificar = true;
  }

  showTurmas(descricaoTurma: string): void {
    console.log(descricaoTurma);
    if (!descricaoTurma) {
      this.erro_turma = true;
    } else {
      this.show_turmas = true;
      this.show_matriculas = true;
      this.aaService.getTurmas(descricaoTurma).subscribe(as => {
        this.turma = new Turma(as.descricao);
        this.turma.metas = as.metas;
        this.matriculas = as.matriculas;
      }, msg => {alert(msg.message);});
    }
  }

  selected(meta: string): void {
    var result: string = this.selectedMetas.find(a => a == meta);
    if (!result) {
      this.selectedMetas.push(meta);
    } else {
      this.index = this.selectedMetas.indexOf(result)
      if (this.index > -1) {
        this.selectedMetas.splice(this.index, 1)
      }
    }
  }
} 
