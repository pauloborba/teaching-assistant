import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AlunosComponent } from './alunos/alunos.component';
import { TurmasComponent } from './turmas/turmas.component';
import { MatriculasComponent } from './matriculas/matriculas.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { AutoavaliacaoComponent } from './autoavaliacao/autoavaliacao.component';
import { RoteirosComponent } from './roteiros/roteiros.component';
import { DiscrepantesComponent } from './discrepantes/discrepantes.component';
import { ComparacaoDeDesempenhoComponent } from './comparacao-de-desempenho/comparacao-de-desempenho.component';

import { AlunosService } from './alunos/alunos.service';
import { MatriculasService } from './matriculas/matriculas.service';
import { TurmasService } from './turmas/turmas.service';
import { RelatoriosService } from './relatorios/relatorios.service';
import { AutoavaliacaoService } from './autoavaliacao/autoavaliacao.service';
import { RoteirosService } from './roteiros/roteiros.service';
import { DiscrepantesService } from './discrepantes/discrepantes.service';
import { ComparacaoDeDesempenhoService } from './comparacao-de-desempenho/comparacao-de-desempenho.service';
import { RelatorioDesempenhoComponent } from './turmas/relatorio-de-desempenho/relatorio-desempenho/relatorio-desempenho.component';
import { NotasComponent } from './notas/notas.component';
import { NotasService } from './notas/notas.service';

@NgModule({
  declarations: [
    AppComponent,
    AlunosComponent,
    MatriculasComponent,
    TurmasComponent,
    RelatoriosComponent,
    AutoavaliacaoComponent,
    RoteirosComponent,
    DiscrepantesComponent,
    ComparacaoDeDesempenhoComponent,
    RelatorioDesempenhoComponent,
    NotasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'alunos',
        component: AlunosComponent
      },
      {
        path: 'turmas',
        component: TurmasComponent
      },
      {
        path: 'matriculas',
        component: MatriculasComponent
      },
      {
        path: 'relatorios',
        component: RelatoriosComponent
      },
      {
        path: 'auto-avaliacao',
        component: AutoavaliacaoComponent
      },
      {
        path: 'roteiros',
        component: RoteirosComponent
      },
      {
        path: 'discrepantes',
        component: DiscrepantesComponent
      },
      {
        path: 'comparacao-de-desempenho',
        component: ComparacaoDeDesempenhoComponent
      },
      {
        path: 'notas',
        component: NotasComponent
      }
    ])
  ],
  providers: [ AlunosService, TurmasService, MatriculasService, RelatoriosService, AutoavaliacaoService, RoteirosService, DiscrepantesService, ComparacaoDeDesempenhoService, NotasService  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
