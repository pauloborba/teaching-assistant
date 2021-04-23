import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';

import { Turma } from '../../../../common/turma';

@Injectable()
export class AlunoService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000';

  constructor(private http: HttpClient) {}


  atualizar(turma: Turma): Observable<Turma> {
    return this.http.put<any>(this.taURL + "/alunos",JSON.stringify(turma), {headers: this.headers})          .pipe( 
                retry(2),
                map( res => {if (res.success) {return turma;} else {return null;}} )
              ); 
  }

  getTurmas(): Observable<Turma[]> {
    return this.http.get<Turma[]>(this.taURL + "/turmas")
              .pipe(
                 retry(2)
               );
  }

}