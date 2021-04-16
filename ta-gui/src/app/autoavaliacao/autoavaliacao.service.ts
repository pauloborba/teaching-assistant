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

  getTurmas(descricaoTurma: string): Observable<Turma> {
    return this.http.get<Turma>(this.taURL + "/turmas/?descricaoTurma=" + descricaoTurma).pipe(retry(2));
  }

  notificar(objectAlunoMeta: object): Observable<String> {
    return this.http.post<string>(this.taURL + "/notificar", objectAlunoMeta).pipe(retry(2));
  }
}