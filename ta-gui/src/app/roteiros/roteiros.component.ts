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

  constructor(private roteiroService: RoteiroService) {}

  ngOnInit() {
    this.roteiroService.getRoteiros().subscribe( as => { this.roteiros = as;}, msg => { alert(msg.message); });
  }

  semDescricao(descricao: string) : boolean{
    if (descricao == "") return true;
    else return false;
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
              }
            },
            msg => { alert(msg.message); }
          );
}
  }
  deletarRoteiro(roteiro: Roteiro): void { }
  atualizarRoteiro(roteiro: Roteiro): void { }
}
