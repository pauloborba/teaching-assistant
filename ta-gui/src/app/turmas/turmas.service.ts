import { RelatorioDeDesempenho } from './../../../../common/relatorioDesempenho';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

import { Turma } from '../../../../common/turma';

@Injectable()
export class TurmasService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private turmasURL = 'http://localhost:3000/turmas';

  constructor(private http: HttpClient) { }

  getTurmas(): Observable<Turma[]> {
    return this.http.get<Turma[]>(this.turmasURL)
      .pipe(
        retry(2)
      );
  }

  getTurma(descricao: string): Observable<Turma> {
    return this.http.get<Turma>(this.turmasURL + `/${descricao}`)
      .pipe(
        retry(2)
      );
  }

  getRelatorioDeDesempenho(descricao: string): Observable<RelatorioDeDesempenho> {
    return this.http.get<RelatorioDeDesempenho>(this.turmasURL + `/relatorio-de-desempenho/${descricao}`)
      .pipe(
        retry(2)
      );
  }

  criar(turma: Turma): Observable<Turma> {
    return this.http.post<any>(this.turmasURL, turma, { headers: this.headers })
      .pipe(
        retry(2),
        map(res => { if (res.success) { return turma; } else { return null; } })
      );
  }

  atualizar(turma: Turma): Observable<Turma> {
    return this.http.put<any>(this.turmasURL, turma, { headers: this.headers })
      .pipe(
        retry(2),
        map(res => { if (res.success) { return turma; } else { return null; } })
      );
  }

  remover(turma: Turma): Observable<Turma> {
    return this.http.delete<any>(this.turmasURL + `/${turma.descricao}`, { headers: this.headers })
      .pipe(
        retry(2),
        map(res => { if (res.success) { return turma; } else { return null; } })
      );
  }
}
