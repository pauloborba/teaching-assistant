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
  descricao2:string;
  teste:string;

  turma: Turma = new Turma();
  turmas: Turma[] = [];

  
  constructor(private atService: AdicionarTurmaService) { }

  ngOnInit() {
  }

  adicionarTurma(a: Turma): void{
    this.atService.adicionarTurmaServe(a).subscribe(
      data => {
        let a = this.turmas.push(data)
        this.turma = new Turma();
        console.log("valor: " + a)
      },
      error => console.log(error),
      () => console.log("acesso pegou")
    );
    console.log(a)
  }


}
