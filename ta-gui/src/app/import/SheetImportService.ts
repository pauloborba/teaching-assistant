import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Matricula } from '../../../../common/matricula';
import { Aluno } from '../../../../common/aluno';
import { Avaliacao } from '../../../../ta-server/avaliacao';
import { Turma } from '../../../../common/turma';
import { Turmas } from '../../../../ta-server/turmas';

@Injectable()
export class SheetImportService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  
  atualizar(descricaoTurma: string, JSON): Observable<boolean>{
    return this.http.put<any>(this.taURL + "/importacaodenota", JSON,  {headers: this.headers})
    .pipe(
      retry(2),
      map(res => {if (res.success) {return res.success;} else {return null}})
    );
  }


  hasnota(descricaoTurma: string): Observable<boolean>{
    let getUrl = this.taURL + `/importacaodenota?turma=${descricaoTurma}`;
    console.log(getUrl);
    let response = this.http.get<string[]>(getUrl, { headers: this.headers });
    return this.http.get<any>(getUrl,  {headers: this.headers})
    .pipe(
      retry(2),
    );
  }

}