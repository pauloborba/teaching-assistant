import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Turma } from '../../../../common/turma';

@Injectable()
export class RelatoriosService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private taURL = 'http://localhost:3000';
  private turmasURL = 'http://localhost:3000/turmas';

  constructor(private http: HttpClient) { }

  getTurma(descricao: string): Observable<Turma> {
    return this.http.get<Turma>(this.taURL + `/turmas/${descricao}`)
      .pipe(
        retry(2)
      );
  }

  getTurmas(): Observable<Turma[]> {
    return this.http.get<Turma[]>(this.turmasURL)
      .pipe(
        retry(2)
      );
  }

}
