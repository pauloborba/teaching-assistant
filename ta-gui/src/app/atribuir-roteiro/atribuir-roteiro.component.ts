import { Component, OnInit } from '@angular/core';
import { Roteiro } from '../../../../common/roteiro';
import { Turma } from '../../../../common/turma';
import { AtribuirRoteiroService } from './atribuir-roteiro.service';

@Component({
  selector: 'app-atribuir-roteiro',
  templateUrl: './atribuir-roteiro.component.html',
  styleUrls: ['./atribuir-roteiro.component.css']
})
export class AtribuirRoteiroComponent implements OnInit {

  constructor(private service: AtribuirRoteiroService) {
    this.turmas.push(new Turma("1"));
    this.turmas.push(new Turma("2"));
    this.turmas.push(new Turma("3"));
    
    var temp1 :Roteiro = new Roteiro();
    temp1.descricao = "aa";

    var temp2 :Roteiro = new Roteiro();
    temp2.descricao = "ab";

    var temp3 :Roteiro = new Roteiro();
    temp3.descricao = "ac";

    this.roteiros.push(temp1);
    this.roteiros.push(temp2);
    this.roteiros.push(temp3);
    
  }

  dataInicioNovo : string = "";
  dataFimNovo : string = "";
  turmas : Turma[] = [];
  turmasSelecionadas : Turma[] = [];
  
  roteiros : Roteiro[] = [];
  roteirosSelecionados : Roteiro[] = [];
  
  adicionarTurma(a : Turma) : void{
    var tempTurmas = this.turmasSelecionadas.filter( t => t.descricao == a.descricao );
    
    if(tempTurmas.length==0){
      this.turmasSelecionadas.push(a);
    }
  }
  removerTurma(a : Turma) : void{
    var tempTurmas = this.turmasSelecionadas.filter( t => t.descricao != a.descricao );
    this.turmasSelecionadas = tempTurmas;
  }
  



  adicionarRoteiro(r :Roteiro) : void{
    var tempRoteiros = this.roteirosSelecionados.filter( t => t.descricao == r.descricao );

    if(tempRoteiros.length==0){
      this.roteirosSelecionados.push(r);
    }
  }
  removerRoteiro(r :Roteiro) : void{
    var tempRoteiros = this.roteirosSelecionados.filter( t => t.descricao != r.descricao );
    this.roteirosSelecionados = tempRoteiros;
  }

  atribuirRoteiros() : void{
    this.service.atribuirRoteiros(this.dataInicioNovo, this.dataFimNovo, this.turmasSelecionadas, this.roteirosSelecionados)
      .subscribe(
        ar => {
          if (ar) {
            alert("ok");
            console.log(ar);
          }
        },
        msg => { alert(msg.message); }
      );
    
  }

  ngOnInit() {
  }

}
