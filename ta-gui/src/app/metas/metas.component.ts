import { Component, OnInit } from '@angular/core';
import { Turma } from '../../../../common/turma';

@Component({
  selector: 'app-turmas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.css']
})
export class MetasComponent implements OnInit {
  turmas: Turma[] = [];
  turmasDescricao: string[] =["ess 2020.1", "gerencia de projetos", "teste"];
  metasTurma: string[] = [];
  turmaAtual: string;
  turmaClonada: string;
  metasAtual: string [];
  metasClonadas: string[];
  metasDiscrepantes: string[];
  metasIguais: string[];

  constructor() { }

  ngOnInit() {

  }

  isShow = false;
  isShowClone = false;

batata(){
  console.log(this.turmaClonada);
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
    
  toggleDisplayHideClone() {
    this.isShow = false;
}

  metasCadastradas(){
    //checar se existe alguma meta igual já cadastrada,
    //se sim confirmar se deseja clonar, se nao clonar
    //dar hide
    this.metasAtual = this.getMetas(this.turmaAtual, this.turmasDescricao);
    this.metasClonadas = this.getMetas(this.turmaClonada, this.turmasDescricao);

    for (var i = 0; i < this.metasAtual.length; i++){
      for (var j = 0; j<this.metasClonadas.length; j++){
        if(this.metasAtual[i].toLowerCase == this.metasClonadas[j].toLowerCase){
          this.metasIguais.push;
        }else{
          this.metasDiscrepantes.push;
        }
      }

    }

    if (this.metasIguais.length == 0){
      this.metasAtual = this.clonarMetas(this.metasDiscrepantes);
    }else{
      this.temMetaIgual();
    }
  }


  temMetaIgual(){
    this.isShowClone = true;
  }

  clonarMetas(metasDiscrepantes: string[]): string []{
    //cadastrar metas do array
    //igualar um array ao outro deve resolver.
    this.metasTurma = this.metasTurma.concat(metasDiscrepantes);
    return [];
  }

  getTurmas(): void{
    this.turmasDescricao = this.turmas.map(turma => turma.descricao);
  }

  getMetas(descricao: string, turmas: string[]): string []{
    var turmaX: Turma;
    turmaX = this.turmas.find(turma => turma.descricao === descricao);
    // this.turmaAtual = this.turmasDescricao.find(turma => turma === this.turmaAtual);
    // this.metasTurma = this.turma.metas;
    var metas: string[];
    metas = turmaX.getMetas();
    return metas;
  }
}

