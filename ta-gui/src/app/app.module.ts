import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AlunosComponent } from './alunos/alunos.component';
import { TurmasComponent } from './turmas/turmas.component';
import { RelatoriosComponent } from './relatorios/relatorios.component';
import { AutoavaliacaoComponent } from './autoavaliacao/autoavaliacao.component';
import { RoteirosComponent } from './roteiros/roteiros.component';
import { DiscrepantesComponent } from './discrepantes/discrepantes.component';
import { ComparacaoDeDesempenhoComponent } from './comparacao-de-desempenho/comparacao-de-desempenho.component';

import { AlunosService } from './alunos/alunos.service';
import { TurmasService } from './turmas/turmas.service';
import { RelatoriosService } from './relatorios/relatorios.service';
import { AutoavaliacaoService } from './autoavaliacao/autoavaliacao.service';
import { RoteirosService } from './roteiros/roteiros.service';
import { DiscrepantesService } from './discrepantes/discrepantes.service';
import { ComparacaoDeDesempenhoService } from './comparacao-de-desempenho/comparacao-de-desempenho.service';

@NgModule({
  declarations: [
    AppComponent,
    AlunosComponent,
    TurmasComponent,
    RelatoriosComponent,
    AutoavaliacaoComponent,
    RoteirosComponent,
    DiscrepantesComponent,
    ComparacaoDeDesempenhoComponent
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
      }
    ])
  ],
  providers: [ AlunosService, TurmasService, RelatoriosService, AutoavaliacaoService, RoteirosService, DiscrepantesService, ComparacaoDeDesempenhoService,  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
