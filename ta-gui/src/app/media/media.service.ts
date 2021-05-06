import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

import { Turma } from '../../../../common/turma';

@Injectable()
export class MediaService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private turmasURL = 'http://localhost:3000/turmas';

  constructor(private http: HttpClient) { }

  getPeso(peso: number): Observable<Turma> {
    return this.http.get<Turma>(this.turmasURL + `/${peso}`)
      .pipe(
        retry(2)
      );
  }
}
