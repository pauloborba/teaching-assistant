import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, map } from 'rxjs/operators';


import { Roteiro } from '../../../../common/roteiro';
import { Turma } from '../../../../common/turma';




@Injectable({
  providedIn: 'root'
})
export class AtribuirRoteiroService {
  private baseURL: string = "http://localhost:3000/";
  private headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) { }

  atribuirRoteiros(dataInicio : string, dataFim : string, turmas:Turma[], roteiros:Roteiro[]): Observable<any>{
    var params = {"dataInicio": dataInicio, "dataFim": dataFim, "turmas":turmas, "roteiros":roteiros}
    return this.http.post<any>(this.baseURL + "atribuir-roteiro", JSON.stringify(params), {headers: this.headers})
             .pipe( 
                retry(2),
                map( res => {if (res.failure){throw new Error(res.failure); return null;} else{return res;}  } )
              );
  }
}
