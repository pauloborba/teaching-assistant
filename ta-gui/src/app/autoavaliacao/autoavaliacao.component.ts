import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Aluno } from '../../../../common/aluno';
import { Matricula } from '../../../../common/matricula';
import { Avaliacao } from '../../../../ta-server/avaliacao';
import { Turmas } from '../../../../ta-server/turmas';
import { AutoavaliacaoService } from './autoavaliacao.service';


@Component({
  selector: 'app-autoavaliacao',
  templateUrl: './autoavaliacao.component.html',
  styleUrls: ['./autoavaliacao.component.css']
})

export class AutoavaliacaoComponent implements OnInit {

  constructor(private aaService: AutoavaliacaoService) {}

  cpf: string = "";
  descricaoTurma: string = "";
  showContent: boolean = false;
  showGrades: boolean = false;

  // alunos: Aluno[] = [];
  // metas: string[] = [];
  // turmas: Turmas[] = [];

  avaliacoes: Avaliacao[] = [];
  autoavaliacoes: Avaliacao[] = [];
  matricula: Matricula;

 
  ngOnInit(): void {
    console.log('onInit');
  }

  setShowContent(): void{
    this.showContent = true;
  }
  setShowGrades(cpf: string, descricaoTurma: string): void{
    if(cpf && descricaoTurma){
      this.showGrades = true;
    }
  }


  preencherAutoavaliacao(cpf: string, descricaoTurma: string): void{

     if(cpf && descricaoTurma){
       this.aaService.getMatricula(cpf, descricaoTurma).subscribe(
         ma => {
           this.matricula = ma;
           console.log(ma);
         },
         msg => { alert(msg) }
       );
   
       this.avaliacoes = this.matricula.getAvaliacoes();
       this.autoavaliacoes = this.matricula.getAutoAvaliacoes();
     }
  }

  

  cadastrarAutoavaliacao(matricula: Matricula, avaliacoes: Avaliacao[]): void {
    this.matricula.getAutoAvaliacoes()
  }

  atualizarAutoavaliacao(matricula: Matricula, avaliacoes: Avaliacao[]): void {
    this.aaService.atualizar(matricula, avaliacoes).subscribe(
      (a) => { if (a == null) alert("Erro ao tentar atualizar auto-avaliação! Por favor, contate os administradores do sistema."); },
      (msg) => { alert(msg.message); }
   );
  }
	notificarAutoAvaliacao(matricula: Matricula): void { }
}
