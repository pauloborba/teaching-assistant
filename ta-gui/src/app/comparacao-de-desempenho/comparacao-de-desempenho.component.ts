import { AfterViewInit, Component, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Chart } from 'chart.js';
import { ComparacaoDeDesempenhoService } from './comparacao-de-desempenho.service';

@Component({
  selector: 'app-comparacao-de-desempenho',
  templateUrl: './comparacao-de-desempenho.component.html',
  styleUrls: ['./comparacao-de-desempenho.component.css']
})
export class ComparacaoDeDesempenhoComponent implements AfterViewInit {
  @ViewChildren('grafico') graficos: QueryList<any>;
  resumoTurmas: any[] = [];
  
  constructor(private servico: ComparacaoDeDesempenhoService, private rota: ActivatedRoute) { }
  
  ngAfterViewInit(): void {
    this.rota.queryParams.subscribe(params => {
      const turmas: string[] = params.turmas.split(',').sort();
      this.servico.compararTurmas(turmas)
        .subscribe(
          res => {
            this.resumoTurmas = res;
            
            let canvas = this.graficos.find(c => c.nativeElement.id === 'media').nativeElement;
            this.criarGrafico(canvas, 'Média', this.resumoTurmas.map(turma => turma.media));
            
            canvas = this.graficos.find(c => c.nativeElement.id === 'reprovacao').nativeElement;
            this.criarGrafico(canvas, 'Reprovação', this.resumoTurmas.map(turma => turma.reprovacao));
          },
          err => {
            alert(err.message);
          }
        );
    });
  }

  criarGrafico(canvas: any, nome: string, dados: number[]): Chart {
    const labels = this.resumoTurmas.map(turma => turma.descricao);
    canvas.setAttribute('data-labels', labels);
    canvas.setAttribute('data-valores', dados);

    return new Chart(canvas, {
      type: 'line',
      data: {
        labels,
        datasets: [ { label: nome, data: dados } ]
      }
    });
  }
}
