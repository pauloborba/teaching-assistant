import { Component, OnInit } from '@angular/core';
import { AtualizacaoNotas } from '../../../../common/atualizacaoNotas';
import { AtualizacoesService } from './atualizacoes.service';

@Component({
  selector: 'app-atualizacoes',
  templateUrl: './atualizacoes.component.html',
  styleUrls: [ './atualizacoes.component.css' ]
})
export class AtualizacoesComponent implements OnInit {
  atualizacoes: AtualizacaoNotas[] = [];
  proximoEnvio: Date;
  proximaTentativa: Date;

  constructor(private atualizacoesService: AtualizacoesService) {
    this.proximoEnvio = new Date();
    this.proximoEnvio.setDate(this.proximoEnvio.getDate() + (this.proximoEnvio.getHours() > 18 ? 1 : 0));
    this.proximoEnvio.setHours(18, 0, 0, 0);

    this.proximaTentativa = new Date();
    this.proximaTentativa.setHours(this.proximaTentativa.getHours() + 1, 0, 0, 0);
  }

  ngOnInit(): void {
    this.atualizacoesService.getAtualizacoesNotas()
      .subscribe(
        atualizacoes => {
          this.atualizacoes = atualizacoes.sort((a, b) =>
            a.dataHora.getTime() > b.dataHora.getTime() ? 1 : a.dataHora.getTime() === a.dataHora.getTime() ? 0 : -1
          );
        },
        msg => { alert(msg.message); }
      );
  }
}
