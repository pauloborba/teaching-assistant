import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Injectable()
export class ComparacaoDeDesempenhoService {
    private URLServidor: string = 'http://localhost:3000';

    constructor(private http: HttpClient) { }

    compararTurmas(descricoes: string[]): Observable<any> {
        const options: any = {
            params: (new HttpParams).set('turmas', descricoes.join(','))
        };

        return this.http.get<any>(this.URLServidor + '/relatorios/comparacao-de-desempenho', options).pipe(retry(2));
    }
}