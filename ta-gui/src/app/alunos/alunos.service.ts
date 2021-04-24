import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

import { Aluno } from '../../../../common/aluno';

@Injectable()
export class AlunosService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private alunosURL = 'http://localhost:3000/alunos';

  constructor(private http: HttpClient) { }

  getAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.alunosURL + '/')
      .pipe(
        retry(2)
      );
  }

  getAluno(cpf: string): Observable<Aluno> {
    return this.http.get<Aluno>(this.alunosURL + `/${cpf}`)
      .pipe(
        retry(2)
      );
  }

  criar(aluno: Aluno): Observable<Aluno> {
    return this.http.post<any>(this.alunosURL, aluno, { headers: this.headers })
      .pipe(
        retry(2),
        map(res => { if (res.success) { return aluno; } else { return null; } })
      );
  }

  atualizar(aluno: Aluno): Observable<Aluno> {
    return this.http.put<any>(this.alunosURL, JSON.stringify(aluno), { headers: this.headers })
      .pipe(
        retry(2),
        map(res => { if (res.success) { return aluno; } else { return null; } })
      );
  }

  remover(aluno: Aluno): Observable<Aluno> {
    return this.http.delete<any>(this.alunosURL + `/${aluno.cpf}`, { headers: this.headers })
      .pipe(
        retry(2),
        map(res => { if (res.success) { return aluno; } else { return null; } })
      );
  }
}
