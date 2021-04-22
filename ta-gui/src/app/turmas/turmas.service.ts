import { Injectable } from '@angular/core';
import { Turma } from '../../../../common/turma'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: "root"
})
export class TurmasService {
    constructor(private http: HttpClient) { }
    private url = "http://localhost:3000/notificacaoResultadoFinal"

    notificar(turma: Turma): Observable<Turma> {
        return this.http.post<Turma>(this.url ,turma);
            
    
    }
   
}