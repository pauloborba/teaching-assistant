import { RelatorioDeDesempenho } from './../../../../../common/relatorioDesempenho';
import { Turma } from './../../../../../common/turma';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TurmasService } from '../turmas.service';

@Component({
  templateUrl: './relatorio-de-desempenho.component.html',
  styleUrls: ['./relatorio-de-desempenho.component.css'],
})
export class RelatorioDeDesempenhoComponent implements OnInit {
  descricaoDaTurma: any;
  dadosFaltando: boolean = false;
  relatorio: RelatorioDeDesempenho;

  constructor(
    private route: ActivatedRoute,
    private turmasService: TurmasService
  ) {}

  ngOnInit() {
    this.descricaoDaTurma = this.route.snapshot.paramMap.get('turma');
    this.turmasService.getRelatorioDeDesempenho(this.descricaoDaTurma).subscribe((relatorio) =>{
      this.relatorio = relatorio;
      if(this.relatorio.aguardandoFinal > 0) this.dadosFaltando = true;
    })
  }

  formataPorcentagem(numero: number) {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numero*100);
  }
}
