import { Component, OnInit } from '@angular/core';
import { AdicionarTurmaService } from './adicionar-turma.service'
import { Matricula } from '../../../../../common/matricula';
import { Aluno } from '../../../../../common/aluno'
import { Roteiro } from '../../../../../ta-server/roteiro'
import { Turma } from '../../../../../common/turma'
 
@Component({
  selector: 'app-adicionar-turma',
  templateUrl: './adicionar-turma.component.html',
  styleUrls: ['./adicionar-turma.component.css'],
  providers: [
    AdicionarTurmaService
  ],
})
export class AdicionarTurmaComponent implements OnInit {
  descricao:string;
  metas:string;
  matriculas: Matricula[] = [];
  roteiro: Roteiro[] = [];
  monitores: Aluno[] = [];
  numeroMatriculas: number;
  turma: Turma = null;
  descricao2:string;

  
  constructor(private atService: AdicionarTurmaService) { }

  ngOnInit() {
  }

  adicionarTurma(){
    this.atService.adicionarTurmaServe(this.descricao).subscribe(
      data => {this.descricao2 = data},
      error => console.log(error),
      () => console.log("acesso pegou")
    );
    console.log(this.descricao);
  }

}
