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
            // Todos os alunos da planilha forma adicionados
            if(res.success == 0){
              return alunos;
            }else{
              // Vai retornar um array do tamanho do número de alunos que foi adicionado
              return alunos.slice(0, res.success);
            }
          } else { 
            return null; 
          } 
        })
      );
  } 
}
