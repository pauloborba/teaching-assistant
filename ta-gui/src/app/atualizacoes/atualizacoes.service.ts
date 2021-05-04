import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, retry } from 'rxjs/operators';

import { AtualizacaoNotas } from '../../../../common/atualizacaoNotas';

@Injectable()
export class AtualizacoesService {
  private atualizacoesNotasURL = 'http://localhost:3000/notificacoes/atualizacoes-notas';

  constructor(private http: HttpClient) { }

  getAtualizacoesNotas(): Observable<AtualizacaoNotas[]> {
    return this.http.get<AtualizacaoNotas[]>(this.atualizacoesNotasURL + '/')
      .pipe(
        retry(2),
        map(atualizacoes =>
          atualizacoes.map((atualizacao) => {
            atualizacao.dataHora = new Date(atualizacao.dataHora);
            return atualizacao;
          })
        )
      );
  }
}
