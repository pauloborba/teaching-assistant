import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map, catchError } from 'rxjs/operators';


import { Aluno } from '../../../../common/aluno';
// import 'rxjs/add/operator/toPromise';

@Injectable()
export class AlunoService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  criar(aluno: Aluno): Observable<Aluno> {
    return this.http.post<any>(this.taURL + "/aluno", aluno, { headers: this.headers })
      .pipe(
        retry(2),
        map(res => { if (res.success) { return aluno; } else { return null; } })
      );
  }

  atualizar(aluno: Aluno): Observable<Aluno> {
    return this.http.put<any>(this.taURL + "/aluno", JSON.stringify(aluno), { headers: this.headers })
      .pipe( 
        retry(2),
        map(res => { if (res.success) { return aluno; } else { return null; } })
      );
  }

  remover(aluno: Aluno): Observable<Aluno> {
    return this.http.delete<any>(this.taURL + "/aluno/id=${aluno.cpf}", { headers: this.headers })
      .pipe(
        retry(2),
        map(res => { if (res.success) { return aluno; } else { return null; } })
        // catchError(this.handleError('delete aluno'))
      )
  }

  getAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.taURL + "/alunos")
      .pipe(
        retry(2)
      );
  }

}