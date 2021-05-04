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

  constructor(private service: AtribuirRoteiroService) {  }

  dataInicioNovo : string = "";
  dataFimNovo : string = "";
  turmas : Turma[] = [];
  resultados : Turma[] = [];

  turmasSelecionadas : Turma[] = [];
  mensagem: string = "";
  
  roteiros : Roteiro[] = [];
  roteirosSelecionados : Roteiro[] = [];
  
  adicionarTurma(a : Turma) : void{
    if(this.notExists(this.turmasSelecionadas, a, (s: Turma,b)=>s.equals(b))){
      this.turmasSelecionadas.push(a);
    }
  }
  removerTurma(a : Turma) : void{
    var tempTurmas = this.turmasSelecionadas.filter( t => t.descricao != a.descricao );
    this.turmasSelecionadas = tempTurmas;
  }
  



  adicionarRoteiro(r :Roteiro) : void{
    if(this.notExists(this.roteirosSelecionados, r,(s: Roteiro,b)=>s.equals(b))){
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
            this.mensagem = "Roteiros adicionados com sucesso";
            this.resultados = (ar.turmas as Turma[]);
            console.log(this.resultados);
          }
        },
        msg => { 
          this.mensagem = msg;
        }
      );
    
  }

  ngOnInit() {
    this.service.getActiveTurmas().subscribe(res => {
      (res.turmas as Turma[]).forEach( t => this.turmas.push(new Turma(t.descricao)));
      (res.roteiros as Roteiro[]).forEach( r => {
        var temp = new Roteiro();
        temp.descricao = r.descricao;
        this.roteiros.push(temp)
      });
    });
  }
  hide(): void{
    this.mensagem = "";
    this.resultados = [];

  }
  //extrair equals para uma interface
  notExists(list, a, equals) : boolean{
    var temp = list.filter( t => equals(t, a) );
    return temp.length==0;
  }

  

}
