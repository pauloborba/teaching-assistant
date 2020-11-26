import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Turma } from '../../../../common/turma';
import { Aluno } from '../../../../common/aluno';

@Injectable()
export class MetasService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}


  atualizar(turma: Turma): Observable<Turma> {
    return this.http.put<any>(this.taURL + "/aluno",JSON.stringify(turma), {headers: this.headers})          .pipe( 
                retry(2),
                map( res => {if (res.success) {return turma;} else {return null;}} )
              ); 
  }

  getTurmas(): Observable<Turma[]> {
    return this.http.get<Turma[]>(this.taURL + "/turma")
              .pipe(
                 retry(2)
               );
  }

  getAlunos(): Observable<Aluno[]> {
    return this.http.get<Aluno[]>(this.taURL + "/metasalunos")
      .pipe(
        retry(2)
      );
  }

  getMediaTurma(): Observable<Number> {
    return this.http.get<Number>(this.taURL + "/mediaturma")
      .pipe(
        retry(2)
      );
  }


}