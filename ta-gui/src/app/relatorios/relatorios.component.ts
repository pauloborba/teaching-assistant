import { Component, OnInit } from '@angular/core';
import { Statistics } from "statistics.js";
import { Turma } from '../../../../common/turma';
import { RelatoriosService } from './relatorios.service';
import { Roteiro } from '../../../../common/roteiro';
import { count } from 'rxjs/operators';
import { TurmasService } from '../turmas/turmas.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorios.component.html',
  styleUrls: ['./relatorios.component.css'],
  providers: [RelatoriosService]
})
export class RelatoriosComponent implements OnInit {

  turma: Turma;
  turma2: Turma;
  descricao: String;
  buscaTurma: String;
  turmaInexistente: boolean = false; //Dá trigger no input caso a turma não exista
  turmaSelecionada: Turma;
  turmaSelecionada2: Turma;
  listaTurmas: Turma[];
  descricaoTurmaSelecionada: string = '';
  descricaoTurmaSelecionada2: string = '';
  mensagemComparacao: string = '';
  // media: Number;
  // desvio: Number;
  // corr: Number;

  constructor(private service: RelatoriosService, private turmasService: TurmasService) {
  }

  ngOnInit() {
    this.turmasService.getTurmas().subscribe(
      (turmas) => {
        this.listaTurmas = turmas;
      },
      (msg) => {
        alert(msg.message);
      }
    );
  }

  atualizaTurmaSelecionada() {
    let selecionada = this.listaTurmas.find(
      (turma) => turma.descricao == this.descricaoTurmaSelecionada
    );
    if (selecionada) {
      this.turmaSelecionada = selecionada;
    } else {
      this.turmaInexistente = true;
    }
  }

  atualizaTurmaSelecionada2() {
    let selecionada = this.listaTurmas.find(
      (turma) => turma.descricao == this.descricaoTurmaSelecionada2
    );
    if (selecionada) {
      this.turmaSelecionada2 = selecionada;
      this.compareTurmas();
    } else {
      this.turmaInexistente = true;
    }
  }

  compareTurmas(): void {
    // @ts-ignore
    this.turma = this.service.getTurma(this.descricaoTurmaSelecionada)
      .subscribe(
        (as) => {
          if (as) {
            var count: number = 0;
            var qtdeResp: number = 0;
            as.matriculas.forEach(m => {
              m.respostasDeRoteiros.forEach(rr => {
                qtdeResp++;
                rr.respostasDeQuestoes.forEach(rq => {
                  if (rq.correcao == 'certo') {
                    count++;
                  }
                })
              })
            })
            as.questoesCertas = Math.round((count / qtdeResp) * 100);
            as.questoesErradas = Math.round(100 - as.questoesCertas);
            this.turma = as;

            // @ts-ignore
            this.turma2 = this.service.getTurma(this.descricaoTurmaSelecionada2)
              .subscribe(
                (as) => {
                  if (as) {
                    var count: number = 0;
                    var qtdeResp: number = 0;
                    as.matriculas.forEach(m => {
                      m.respostasDeRoteiros.forEach(rr => {
                        qtdeResp++;
                        rr.respostasDeQuestoes.forEach(rq => {
                          if (rq.correcao == 'certo') {
                            count++;
                          }
                        })
                      })
                    })
                    as.questoesCertas = Math.round((count / qtdeResp) * 100);
                    as.questoesErradas = Math.round(100 - as.questoesCertas);
                    this.turma2 = as;

                    // comment

                    if (this.turma.questoesCertas > this.turma2.questoesCertas) {
                      this.mensagemComparacao = `A turma ${this.turma.descricao} teve ${this.turma.questoesCertas}% de questões corretas no roteiro. ${this.turma.questoesCertas - this.turma2.questoesCertas}% a mais que a turma ${this.turma2.descricao}.`
                    } else {
                      this.mensagemComparacao = `A turma ${this.turma.descricao} teve ${this.turma.questoesCertas}% de questões corretas no roteiro. ${this.turma2.questoesCertas - this.turma.questoesCertas}% a menos que a turma ${this.turma2.descricao}.`
                    }
                  }
                }
              );
          }
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
      medias.push(somaDuracao / count);
    });

    for (var i = 0; i < medias.length; i++) {
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
    return desvio / count
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
        if (questao.correcao == 'Errado') {
          measurements.push({ duracao: questao.duracao, correcao: 0 });
        }
        else if (questao.correcao == 'Certo') {
          measurements.push({ duracao: questao.duracao, correcao: 1 });
        }
      })
    })

    let stats = new Statistics(measurements, vars);
    var r = stats.correlationCoefficient('duracao', 'correcao');

    return r.correlationCoefficient.toFixed(2)
  }

}
