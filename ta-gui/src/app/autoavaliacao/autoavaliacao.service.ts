import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Matricula } from '../../../../common/matricula';
import { Aluno } from '../../../../common/aluno';
import { RespostaDeRoteiro } from '../../../../common/respostaDeRoteiro';
import { Avaliacao } from '../../../../common/avaliacao';
import { Turma } from '../../../../common/turma';

@Injectable()
export class AutoavaliacaoService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // methods go here

  getTurmas(descricaoTurma: string): Observable<Turma> {
    return this.http.get<Turma>(this.taURL + "/turmas/" + descricaoTurma).pipe(retry(2));
  }

  notificar(objectAlunoMeta: object): Observable<String> {
    return this.http.post<string>(this.taURL + "/notificacoes/auto-avaliacao", objectAlunoMeta).pipe(retry(2));
  }

  getMetas(descricaoTurma: string): Observable<string[]>{
    let getUrl = this.taURL + `/turmas/${descricaoTurma.toString().toLowerCase()}/metas`;
    let response = this.http.get<string[]>(getUrl, { headers: this.headers })
    .pipe(
      retry(2),
    );
    return response;
  }

  getMatricula(cpf: string, descricaoTurma: string): Observable<Matricula>{

    let getUrl = this.taURL + `/turmas/matriculas?cpf=${cpf.toString().toLowerCase()}&&descricaoTurma=${descricaoTurma.toString().toLowerCase()}`;
    let response = this.http.get<Matricula>(getUrl, { headers: this.headers })
    .pipe(
      retry(2),
    );
    return response;
  }

  atualizar(cpf: string, descricaoTurma: string, autoavaliacoes: Avaliacao[]): Observable<Avaliacao[]>{
    return this.http.put<any>(this.taURL + "/auto-avalicoes", JSON.stringify({"cpf": cpf, "descricaoTurma": descricaoTurma, "autoavaliacoes": autoavaliacoes}),  {headers: this.headers})
    .pipe(
      retry(2),
      map(res => {if (res.success) {return res.success;} else {return null}})
    );
  }

}
