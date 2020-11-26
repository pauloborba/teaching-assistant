import { Component, OnInit } from '@angular/core';

import { Roteiro } from '../../../../ta-server/roteiro';
import { BlocoDeQuestoes } from '../../../../ta-server/blocodequestoes';
import { Questao } from '../../../../ta-server/questao';
import { RoteiroService } from './roteiro.service';

@Component({
  selector: 'app-roteiros',
  templateUrl: './roteiros.component.html',
  styleUrls: ['./roteiros.component.css']
})
export class RoteirosComponent implements OnInit {
  roteiro: Roteiro = new Roteiro();
  roteiros: Roteiro[] = [];
  bloco: BlocoDeQuestoes = new BlocoDeQuestoes();
  questao: Questao = new Questao();
  roteiroJaExiste: boolean = false;
  altBloco: boolean = false;

  constructor(private roteiroService: RoteiroService) {}

  ngOnInit() {
    this.roteiroService.getRoteiros().subscribe( as => { this.roteiros = as;}, msg => { alert(msg.message); });
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
      this.roteiroService.criar(roteiro)
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

  deletarRoteiro(descricao: string): void {
    this.roteiroService.deletar(descricao).subscribe(
      ar => {
        if (ar){
          var index = this.roteiros.indexOf(ar);
          this.roteiros.splice(index, 1);
        } else  alert("Erro ao remover o roteiro");
          }
    );
  }

  atualizarRoteiro(roteiro: Roteiro): void {
    this.roteiroService.atualizar(roteiro).subscribe(
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

  adicionarQuestao(roteiro: Roteiro, bloco: BlocoDeQuestoes, questao: Questao): void{
    if(this.semDescricao(questao.pergunta)) return alert("Não foi escolhido uma pergunta para a questão");
    else{
      bloco.questoes.push(questao);
      this.atualizarRoteiro(roteiro);
      this.questao = new Questao();
    }
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
