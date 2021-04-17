import { Injectable }    from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';
import { Turma } from '../../../../common/turma';

@Injectable()
export class TurmasService {

  private headers = new HttpHeaders({'Content-Type': 'application/json'});
  private taURL = 'http://localhost:3000/turmas';

  constructor(private http: HttpClient) {}

  getTurmas(): Observable<string[]> {
    return this.http.get<string[]>(this.taURL + "/")
              .pipe(
                 retry(2)
               );
  }

  getMetas(descricao: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.taURL}/${descricao}/metas`)
              .pipe(
                 retry(2)
               );
  }

  postMetas(turma:string, metasDiscrepantes: string[]): Observable<string[]>{
    return this.http.post<string[]>(`${this.taURL}/${turma}/metas`, {metas: metasDiscrepantes}, {headers: this.headers})
    .pipe(
      retry(2),
      map(res =>{ return res//.metas
      })
    );
  }

}