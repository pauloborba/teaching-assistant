import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Matricula } from '../../../../common/matricula';
import { Aluno } from '../../../../common/aluno';
import { Avaliacao } from '../../../../ta-server/avaliacao';

@Injectable()
export class AutoAvaliacaoService {

  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // methods go here

  getMatricula(cpf: string, descricaoTurma: string): Observable<Matricula>{
    let getUrl = this.taURL + `/matriculas?cpf=${cpf.toString()}&&descricaoTurma=${descricaoTurma.toString()}`;
    console.log(getUrl);
    let aluno = new Aluno();
    aluno.cpf = '123';
    aluno.email = 'eulalia@'
    let autoavaliacao1 = new Avaliacao();
    autoavaliacao1.meta = 'requisitos'
    autoavaliacao1.meta = 'MANA';
    let autoavaliacao2 = new Avaliacao();
    let a:Matricula = {aluno, autoAvaliacoes: [autoavaliacao1,autoavaliacao2]};
    let response = of(a);
    // let response = this.http.get<Turma[]>(getUrl, { headers: this.headers })
    // .pipe(
    //   retry(2),
    // );
    console.log(response);
    return response;
  }

}