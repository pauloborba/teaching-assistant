import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { Matricula } from '../../../../common/matricula';


@Injectable()
export class SheetImportService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  
  atualizar(descricaoTurma: string, JSON): Observable<boolean>{
    return this.http.put<any>(this.taURL + `/importacaodenota?turma=${descricaoTurma}`, JSON,  {headers: this.headers})
    .pipe(
      retry(2),
      map(res => {if (res.success) {return res.success;} else {return res.failure}})
    );
  }


  hasnota(descricaoTurma: string): Observable<boolean>{
    let getUrl = this.taURL + `/importacaodenota?turma=${descricaoTurma}`;
    
    return this.http.get<any>(getUrl,  {headers: this.headers})
    .pipe(
      retry(2),
    );
  }

  getMatriculas(descricaoTurma: string): Observable<any>{
    let getUrl = this.taURL + `/matriculas?turma=${descricaoTurma}`;
    
    return this.http.get<Matricula[]>(getUrl,  {headers: this.headers})
    .pipe(
      retry(2),
    );
  }

}