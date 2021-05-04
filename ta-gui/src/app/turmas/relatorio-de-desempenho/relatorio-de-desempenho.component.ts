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
  descricaoDaTurma: string;
  dadosFaltando: boolean = false;
  relatorio: RelatorioDeDesempenho;
  relatorioCarregado: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private turmasService: TurmasService
  ) {}

  ngOnInit() {
    this.descricaoDaTurma = this.route.snapshot.paramMap.get('turma');
    this.turmasService.getRelatorioDeDesempenho(this.descricaoDaTurma).subscribe((relatorio) =>{
      this.relatorio = new RelatorioDeDesempenho();
      this.relatorio.copyFrom(relatorio);
      if(this.relatorio.aguardandoFinal > 0) this.dadosFaltando = true;
      this.relatorioCarregado = true;
    })
  }

  formataPorcentagem(numero: number) {
    return new Intl.NumberFormat('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(numero*100);
  }
}
