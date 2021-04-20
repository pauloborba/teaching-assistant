import { Component, OnInit } from '@angular/core';
import { Turma } from '../../../../common/turma';


import { Observable } from 'rxjs';
import { RelatorioService } from './relatorio.service';
import { Roteiro } from '../../../../common/roteiro';
import { BlocoDeQuestoes } from '../../../../ta-server/blocodequestoes';
import { Matricula } from '../../../../common/matricula';
import { Statistics } from "statistics.js";

@Component({
    selector: 'app-relatorio',
    templateUrl: './relatorio.component.html',
    styleUrls: ['./relatorio.component.css'],
    providers: [RelatorioService]
  })
export class RelatorioComponent implements OnInit{

  turma: Turma;
  roteiros: Roteiro[];
  roteiro: Roteiro;
  media: Number;
  desvio: Number;
  corr: Number;

  constructor(private service: RelatorioService) {
   }
  
  ngOnInit() {
    // @ts-ignore
    this.turma = this.service.getTurma('ess')
    .subscribe(
      (as) => {
        this.turma = as;
        this.media = this.getMedia(this.turma);
        this.desvio = this.getDesvio(this.turma);
        this.corr = this.getCorr(this.turma);
      }
    );

  }

  getMedia(turma: Turma): Number {
    let matriculas = turma.matriculas;
    let qtdMatriculas = matriculas.length
    let somaDuracao = 0
    let medias = []
    let count = 0
    let total = 0;

    matriculas.forEach(matricula => {
      somaDuracao = 0;
      count = 0;
      matricula.respostasDeRoteiros['respostasDeQuestoes'].forEach(questao => {
        somaDuracao += questao.duracao;
        count += 1;
      });
      medias.push(somaDuracao/count);
      });

    for(var i = 0; i < medias.length; i++) {
        total += medias[i];
    }
    var media = total / medias.length;

    return media
  }

  getDesvio(turma: Turma): Number {
    let matriculas = this.turma.matriculas;
    let qtdMatriculas = matriculas.length;
    let media = this.getMedia(turma);
    let desvio = 0;
    let count = 0

    matriculas.forEach(matricula => {
      matricula.respostasDeRoteiros['respostasDeQuestoes'].forEach(questao => {
        // @ts-ignore
        desvio += Math.abs(questao.duracao - media);
        count += 1;
      })

      })

    return desvio/count

    }

  getCorr(turma): Number {
    let matriculas = this.turma.matriculas;
    let measurements = [];

    let vars = {
      duracao: 'metric',
      correcao: 'metric'
    };

    matriculas.forEach(matricula => {
      matricula.respostasDeRoteiros['respostasDeQuestoes'].forEach(questao => {
        if(questao.correcao == 'Errado'){
          measurements.push({duracao:questao.duracao, correcao: 0});
        }
        else if (questao.correcao == 'Certo'){
          measurements.push({duracao:questao.duracao, correcao: 1});
        }
      })
      console.log(measurements);

      })

    let stats = new Statistics(measurements, vars);
    var r = stats.correlationCoefficient('duracao', 'correcao');
    
    return r.correlationCoefficient.toFixed(2)
  }

}