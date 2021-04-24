import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

import { Roteiro } from '../../../../common/roteiro';

@Injectable()
export class RoteirosService {
  private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private roteirosURL = 'http://localhost:3000/roteiros';

  constructor(private http: HttpClient) { }

  getRoteiros(): Observable<Roteiro[]> {
    return this.http.get<Roteiro[]>(this.roteirosURL)
      .pipe(
        retry(2)
      );
  }

  getRoteiro(descricao: string): Observable<Roteiro> {
    return this.http.get<Roteiro>(this.roteirosURL + `/${descricao}`)
      .pipe(
        retry(2)
      );
  }

  criar(roteiro: Roteiro): Observable<Roteiro> {
    return this.http.post<any>(this.roteirosURL, roteiro, { headers: this.headers })
      .pipe(
        retry(2),
        map(res => { if (res.success) { return roteiro; } else { return null; } })
      );
  }

  atualizar(roteiro: Roteiro): Observable<Roteiro> {
    return this.http.put<any>(this.roteirosURL, roteiro, { headers: this.headers })
      .pipe(
        retry(2),
        map(res => { if (res.success) { return roteiro; } else { return null; } })
      );
  }

  remover(roteiro: Roteiro): Observable<Roteiro> {
    return this.http.delete<any>(this.roteirosURL + `/${roteiro.descricao}`, { headers: this.headers })
      .pipe(
        retry(2),
        map(res => { if (res.success) { return roteiro; } else { return null; } })
      );
  }
}
