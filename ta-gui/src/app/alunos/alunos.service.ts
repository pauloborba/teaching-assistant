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

  getTurma(turma: string): Observable<Turma> {
    return this.http.get<Turma>(this.taURL + `/turma/${turma}`)
              .pipe(
                  retry(2)
              );
  }

}