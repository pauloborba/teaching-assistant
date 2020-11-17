import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../../common/aluno';
import { AlunoService } from './aluno.service';
import { Matricula } from '../../../common/matricula';
import { Avaliacao } from '../../../ta-server/avaliacao';
import { Turmas } from '../../../ta-server/turmas';

@Component({
   selector: 'autoavaliacao',
   templateUrl: './autoavaliacao.component.html',
   styleUrls: ['./autoavaliacao.component.css']
})

export class AutoavaliacaoComponent implements OnInit {

   constructor(private alunoService: AlunoService, private turmas: Turmas) {}
   alunos: Aluno[] = [];
   metas: string[] = [];
   avaliacoes: Avaliacao[] = [];

   preencherAvaliacao(cpf: string, descricaoTurma: string){
      let turma = this.turmas.getTurma(descricaoTurma);  //pegar do servidor as turmas
      let matricula = turma.getMatricula(cpf); 
      this.metas = turma.getMetas();
      this.avaliacoes = matricula.getAvaliacoes();
   }

	cadastrarAutoAvaliacao(matricula: Matricula, avaliacoes: Avaliacao[]): void {
      
   }
   notificarAutoAvaliacao(matricula: Matricula): void {}
   
   ngOnInit(): void {
      
   }
}