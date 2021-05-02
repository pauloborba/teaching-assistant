import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Aluno } from '../../../../common/aluno';

@Injectable({
  providedIn: 'root'
})
export class ImportacaoService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  cadastrarAlunos(alunos: Aluno[]): Observable<Aluno[]>{
    return this.http.post<any>(this.taURL + "/alunos", alunos, { headers: this.headers })
      .pipe(
        retry(2),
        map(res => { 
          if (res.success) {
            // Retorna o array de falhos
            var falhos = alunos.filter(aluno => !res.success.map(alunoAux => alunoAux.email).includes(aluno.email));
            return falhos;
          }
          else { 
            return null; 
          } 
        })
      );
  } 
}
