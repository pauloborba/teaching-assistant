import { Component, OnInit } from '@angular/core';

import { Turma } from '../../../../common/turma';
import { TurmasService } from '../turmas/turmasService';
import { Aluno } from '../../../../common/aluno';

@Component({
  selector: 'app-turmas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.css']
})
export class MetasComponent implements OnInit {
  //turmas: Turma[] = [];
  turmasDescricao: string[] =[];
  metasTurma: string[] = [];
  turmaDestino: string;
  turmaOrigem: string;
  metasDestino: string [] = [];
  metasOrigem: string[] = [];
  metasDiscrepantes: string[];
  metasIguais: string[];

  constructor(private turmasService: TurmasService) { //erro aqui!
  }

  ngOnInit() {
    this.turmasService.getTurmas()
             .subscribe(
               res => {
                 let descricoes = res;
                 console.log(res)
                 this.turmasDescricao = descricoes
               },
               msg => { alert(msg.message); }
              );
  }

  isShow = false;
  isShowClone = false;

batata(){
  console.log("funcionando");
  //checa se estava pegando a turma selecionada
}

  toggleDisplayMainButton() {
    if (this.isShow == false){
      this.isShow = !this.isShow;
    }
  }
  toggleDisplayHide() {
      this.isShow = false;
  } 
  
  toggleDisplayShowClone(){
    if (confirm("voce realmente deseja clonar as metas?")){
      this.clonarMetas(this.turmaDestino, this.turmaOrigem);
      setTimeout(() => this.toggleDisplayHide(), 500);
    }
  }

  

  clonarMetas(turmaDestino: string, turmaOrigem: string){
    // this.metasDestino = this.getMetas(this.turmaDestino); //await
    // this.metasOrigem = this.getMetas(this.turmaOrigem); //await

    this.metasDiscrepantes = this.metasOrigem
                 .filter(x => !this.metasDestino.includes(x));

    this.turmasService.postMetas(this.turmaDestino, this.metasDiscrepantes)
    .subscribe(
      ar => {
        this.metasDestino = ar;
        console.log(ar);
      },
       msg => {alert(msg.message);}
        
    )
        console.log(this.metasDestino);
    }

  getMetas(turma: string, tipo: "origem" | "destino"){
    this.turmasService.getMetas(turma)
    .subscribe(
      res => {
        const metas = res;
        if(tipo == "origem"){
          this.metasOrigem = metas;
        }else {
          this.metasDestino = metas;
        }
      },
      msg => { alert(msg.message); }
     );
  }

}

