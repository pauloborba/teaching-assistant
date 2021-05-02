import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

import { Matricula } from '../../../../common/matricula';

@Injectable()
export class MatriculasService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private matriculasURL = 'http://localhost:3000/matriculas';

  constructor(private http: HttpClient) { }

  getMatriculas(): Observable<Matricula[]> {
    return this.http.get<Matricula[]>(this.matriculasURL + '/')
      .pipe(
        retry(2)
      );
  }

  getMatricula(cpf: string): Observable<Matricula> {
    return this.http.get<Matricula>(this.matriculasURL + `/${cpf}`)
      .pipe(
        retry(2)
      );
  }

  criar(matricula: Matricula): Observable<Matricula> {
    return this.http.post<any>(this.matriculasURL, matricula, { headers: this.headers })
      .pipe(
        retry(2),
        map(res => { if (res.success) { return matricula; } else { return null; } })
      );
  }

  atualizar(matricula: Matricula): Observable<Matricula> {
    return this.http.put<any>(this.matriculasURL, JSON.stringify(matricula), { headers: this.headers })
      .pipe(
        retry(2),
        map(res => { if (res.success) { return matricula; } else { return null; } })
      );
  }

  remover(matricula: Matricula): Observable<Matricula> {
    return this.http.delete<any>(this.matriculasURL + `/${matricula. aluno.cpf}`, { headers: this.headers })
      .pipe(
        retry(2),
        map(res => { if (res.success) { return matricula; } else { return null; } })
      );
  }
}
