import { Component, OnInit } from '@angular/core';

import { Roteiro } from '../../../../ta-server/roteiro';
import { BlocoDeQuestoes } from '../../../../ta-server/blocodequestoes';
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
  deletarRoteiro(roteiro: Roteiro): void { }

  atualizarRoteiro(roteiro: Roteiro): void {
  this.roteiroService.atualizar(roteiro).subscribe(
           (a) => { if (a == null) alert("Erro ao atualizar o roteiro"); },
           (msg) => { alert(msg.message); }
  );
}
}
