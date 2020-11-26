import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Matricula } from '../../../../../common/matricula';
import { Aluno } from '../../../../../common/aluno';
import { Turma } from '../../../../../common/turma';
import { Turmas } from '../../../../../ta-server/turmas'; 
import { Roteiro } from '../../../../../ta-server/roteiro';

@Injectable()
export class AdicionarTurmaService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private taURL:string = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // methods go herea
 // metas: string, matricula:Matricula, roteiro:Roteiro, monitores:Aluno, numeroMatricula: number &metas=" + metas
  adicionarTurmaServe(descricaoTurma: string,): Observable<string> {
    return this.http.post<string>(this.taURL + "/adicionar-turma/?descricaoTurma=" + descricaoTurma  , {headers: this.headers}) ;
  }

  
}