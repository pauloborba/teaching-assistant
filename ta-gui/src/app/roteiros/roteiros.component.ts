import { Component, OnInit } from '@angular/core';

import { Roteiro } from '../../../../common/roteiro';
import { BlocoDeQuestoes } from '../../../../common/blocoDeQuestoes';
import { Questao } from '../../../../common/questao';
import { RoteirosService } from './roteiros.service';


@Component({
  selector: 'app-roteiros',
  templateUrl: './roteiros.component.html',
  styleUrls: ['./roteiros.component.css']
})
export class RoteirosComponent implements OnInit {
  roteiro: Roteiro = new Roteiro();
  roteiros: Roteiro[] = [];
  bloco: BlocoDeQuestoes = new BlocoDeQuestoes();
  roteiroJaExiste: boolean = false;
  altBloco: boolean = false;
  altQuestao: boolean = false;
  descricaoTurma: string;

  constructor(private roteirosService: RoteirosService) {}

  cadastroNaTurma(descricao: string, roteiro: Roteiro): void {
    //this.turmasService.associarRoteiro(descricao, roteiro);
  }

  ngOnInit() {
    this.roteirosService.getRoteiros().subscribe( as => { this.roteiros = as;}, msg => { alert(msg.message); });
  }

  semDescricao(descricao: string) : boolean{
    if (descricao == "") return true;
    else return false;
  }

  onMove(){
    this.roteiroJaExiste = false;
  }

  criarRoteiro(roteiro: Roteiro): void {
    if(this.semDescricao(roteiro.descricao)) return alert("Roteiro sem nome");
    else{
      this.roteirosService.criar(roteiro)
          .subscribe(
            ar => {
              if(ar){
                this.roteiros.push(ar);
                this.roteiro = new Roteiro();
              } else this.roteiroJaExiste = true;
            },
            msg => { alert(msg.message); }
          );
        }
  }

  deletarRoteiro(r: Roteiro): void {
    this.roteirosService.remover(r).subscribe(
      ar => {
        if (ar){
          var result: Roteiro = this.roteiros.find(a => a.descricao == r.descricao);
          var index = this.roteiros.indexOf(result);
          this.roteiros.splice(index, 1);
        } else  alert("Erro ao remover o roteiro");
          }
    );
  }

  atualizarRoteiro(roteiro: Roteiro): void {
    this.roteirosService.atualizar(roteiro).subscribe(
           (a) => { if (a == null) alert("Erro ao atualizar o roteiro"); },
           (msg) => { alert(msg.message); }
  );
}

  adicionarBloco(roteiro: Roteiro, bloco: BlocoDeQuestoes): void {
    if(this.semDescricao(bloco.tipo)) return alert("Não foi escolhido um tipo para o bloco de questões");
    else{
      roteiro.blocos.push(bloco);
      this.atualizarRoteiro(roteiro);
      this.bloco = new BlocoDeQuestoes();
    }
  }

  removerBloco(roteiro: Roteiro, bloco: BlocoDeQuestoes) : void{
    var index = roteiro.blocos.indexOf(bloco);
    roteiro.blocos.splice(index, 1);
    this.atualizarRoteiro(roteiro);
}

  atualizarBloco(roteiro: Roteiro): void{
    this.atualizarRoteiro(roteiro);
    this.altBloco = false;
}

  alterarBloco() : void {
    this.altBloco = !this.altBloco;
  }

  adicionarQuestao(roteiro: Roteiro, bloco: BlocoDeQuestoes): void{
    var questao = new Questao();
    questao.pergunta = (bloco.questoes.length + 1).toString();
    bloco.questoes.push(questao);
    this.atualizarRoteiro(roteiro);
  }

  removerQuestao(roteiro: Roteiro, bloco: BlocoDeQuestoes, questao: Questao) : void{
    var index = bloco.questoes.indexOf(questao);
    bloco.questoes.splice(index, 1);
    this.atualizarRoteiro(roteiro);
  }

  atualizarQuestao(roteiro: Roteiro): void{
    this.atualizarRoteiro(roteiro);
    this.altQuestao = false;
  }

  alterarQuestao() : void {
    this.altQuestao = !this.altQuestao;
  }
}
