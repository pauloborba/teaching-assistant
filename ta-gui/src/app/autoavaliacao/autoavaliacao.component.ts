import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Aluno } from '../../../../common/aluno';
import { Matricula } from '../../../../common/matricula';
import { Avaliacao } from '../../../../ta-server/avaliacao';

@Component({
  selector: 'app-autoavaliacao',
  templateUrl: './autoavaliacao.component.html',
  styleUrls: ['./autoavaliacao.component.css']
})
export class AutoavaliacaoComponent implements OnInit {
  alunos: Aluno[] = [];
  avaliacoes: Avaliacao[] = [];
  matricula: Matricula;
  constructor(private router: Router) { }

  ngOnInit() {

  }

  cadastrarAutoAvaliacao(matricula: Matricula, avaliacoes: Avaliacao[]): void { }
  notificarAutoAvaliacao(matricula: Matricula): void { }
  carregarDiscrepantes(){
    this.router.navigate(['/discrepantes'])
    .then(success => console.log('navigation success?' , success))
    .catch(console.error); 
  }
 
} 

