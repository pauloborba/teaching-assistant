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
  
  constructor(private comparacaoDeDesempenhoService: ComparacaoDeDesempenhoService, private rota: ActivatedRoute) { }
  
  ngAfterViewInit(): void {
    let turmas: string[] = [];
    this.rota.params.subscribe(params => {
      turmas = params.turmas.split(',');
    });

    this.comparacaoDeDesempenhoService.compararTurmas(turmas)
      .subscribe(
        res => {
          this.resumoTurmas = res;
        },
        err => {
          alert(err.message);
        }
      );

    const canvasMedia = this.graficos.find(c => c.nativeElement.id === 'media').nativeElement;
    this.criarGrafico(canvasMedia, 'Média', this.resumoTurmas.map(turma => turma.media));
    
    const canvasReprovacao = this.graficos.find(c => c.nativeElement.id === 'reprovacao').nativeElement;
    this.criarGrafico(canvasReprovacao, 'Reprovação', this.resumoTurmas.map(turma => turma.reprovacao));
  }

  criarGrafico(canvas: any, nome: string, dados: number[]): Chart {
    return new Chart(canvas, {
      type: 'line',
      data: {
        labels: this.resumoTurmas.map(turma => turma.descricao),
        datasets: [
          {
            label: nome,
            data: dados
          }
        ]
      }
    })
  }
}
