import { Injectable } from '@angular/core';
import { Turma } from '../../../../common/turma'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface StatusNotificacao {
    nome: String;
    cpf: String;
    notificado: boolean;
}

@Injectable({
    providedIn: "root"
})
export class TurmasService {
    constructor(private http: HttpClient) { }
    private url = "http://localhost:3000/notificacaoResultadoFinal"

    notificar(turma: Turma): Observable<StatusNotificacao[]> {
        return this.http.post<StatusNotificacao[]>(this.url, turma);
    }
}