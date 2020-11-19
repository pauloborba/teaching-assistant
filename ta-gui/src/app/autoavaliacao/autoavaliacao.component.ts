import { Component, OnInit } from '@angular/core';

import { Aluno } from '../../../../common/aluno';
import { Matricula } from '../../../../common/matricula';
import { Avaliacao } from '../../../../ta-server/avaliacao';
import { Turmas } from '../../../../ta-server/turmas';
import { AutoAvaliacaoService } from './autoavaliacao.service';


@Component({
  selector: 'app-autoavaliacao',
  templateUrl: './autoavaliacao.component.html',
  styleUrls: ['./autoavaliacao.component.css']
})
export class AutoavaliacaoComponent implements OnInit {
  alunos: Aluno[] = [];
  metas: string[] = [];
  avaliacoes: Avaliacao[] = [];
  turmas: Turmas[] = [];

  constructor(private aaService: AutoAvaliacaoService) {
    
   }

  preencherAvaliacao(cpf: string, descricaoTurma: string){
    let turma = turmas.getTurma(descricaoTurma);  //pegar do servidor as turmas
    let matricula = turma.getMatricula(cpf); 
    this.metas = turma.getMetas();
    this.avaliacoes = matricula.getAvaliacoes();
 }

  ngOnInit() {
    this.turmasService.getTurmas()
         .then(as => this.turmas = as)
         .catch(erro => alert(erro));
  }

  cadastrarAutoAvaliacao(matricula: Matricula, avaliacoes: Avaliacao[]): void { }
	notificarAutoAvaliacao(matricula: Matricula): void { }
}
