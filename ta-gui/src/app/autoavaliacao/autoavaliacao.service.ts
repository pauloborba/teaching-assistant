import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Matricula } from '../../../../common/matricula';
import { Aluno } from '../../../../common/aluno';
import { RespostaDeRoteiro } from '../../../../ta-server/respostaderoteiro';
import { Avaliacao } from '../../../../ta-server/avaliacao';
import { Turma } from '../../../../common/turma';
import { Turmas } from '../../../../ta-server/turmas';

@Injectable()
export class AutoavaliacaoService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // methods go here

  getMatricula(cpf: string, descricaoTurma: string): Observable<Matricula>{

    let getUrl = this.taURL + `/matriculas?cpf=${cpf.toString().toLowerCase()}&&descricaoTurma=${descricaoTurma.toString().toLowerCase()}`;
    console.log(getUrl);
    // let response = this.http.get<Matricula>(getUrl, { headers: this.headers })
    // .pipe(
    //   retry(2),
    // );
    // console.log(response);
    // return response;

    //stub

    let aluno = new Aluno();
    aluno.cpf = '123';
    aluno.email = 'eulalia@';

    let aluno2 = new Aluno();
    aluno2.cpf = '456';
    aluno2.email = 'eunice@';

    let autoavaliacao1 = new Avaliacao();
    autoavaliacao1.meta = 'requisitos';
    autoavaliacao1.nota = 'MANA';

    let autoavaliacao2 = new Avaliacao();
    autoavaliacao2.meta = 'gerencia de configuracao';
    autoavaliacao2.nota = 'MPA';

    let avaliacao1 = new Avaliacao();
    avaliacao1.meta = 'requisitos';
    avaliacao1.nota = 'MANA';

    let avaliacao2 = new Avaliacao();
    avaliacao2.meta = 'gerencia de configuracao';
    avaliacao2.nota = 'MA';

    let respostasDeRoteiros = new RespostaDeRoteiro();

    let matricula1 = new Matricula();
    matricula1.aluno = aluno;
    matricula1.autoAvaliacoes = [autoavaliacao1,autoavaliacao2];
    matricula1.avaliacoes = [avaliacao1,avaliacao2];

    let matricula2 = new Matricula();
    matricula2.aluno = aluno2;
    matricula2.autoAvaliacoes = [autoavaliacao1,autoavaliacao2];
    matricula2.avaliacoes = [avaliacao1,avaliacao2];

    let turma1 = new Turma();
    turma1.matriculas = [matricula1];
    turma1.descricao = 'ess';

    let turma2 = new Turma();
    turma2.matriculas = [matricula1,matricula2];
    turma2.descricao = 'compiladores';

    let turmas = new Turmas();
    turmas.turmas = [turma1, turma2];

    const turma = turmas.getTurma(descricaoTurma.toLowerCase());

    const matricula = turma.matriculas.find(matricula => matricula.getAluno().cpf == cpf)
    
    let response = of(matricula);

    
    return response;
  }

  atualizar(matricula: Matricula, autoavaliacoes: Avaliacao[]): Observable<Avaliacao[]>{
    return this.http.put<any>(this.taURL + "/autoavaliacoes/atualizar", {"matricula": matricula, "autoavaliacoes": autoavaliacoes})
    .pipe(
      retry(2),
      map(res => {if (res.success) {return res.success;} else {return null}})
    );
  }

}

