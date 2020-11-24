import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';

import { Aluno } from '../../../../common/aluno';
import { Matricula } from '../../../../common/matricula';
import { Avaliacao } from '../../../../ta-server/avaliacao';
import { Turmas } from '../../../../ta-server/turmas';
import { AutoavaliacaoService } from './autoavaliacao.service';
import { Turma } from '../../../../common/turma';


@Component({
  selector: 'app-autoavaliacao',
  templateUrl: './autoavaliacao.component.html',
  styleUrls: ['./autoavaliacao.component.css']
})

export class AutoavaliacaoComponent implements OnInit {

  constructor(private aaService: AutoavaliacaoService) {}

  cpf: string = "";
  descricaoTurma: string = "";

  //estados para mostrar conteúdo ou mensagens de erro
  showContent: boolean = false;
  showGrades: boolean = false;
  cpfObrigatorio: boolean = false;
  turmaObrigatorio: boolean = false;
  matriculaNaoEncontrada: boolean = false;

  
  turma: Turma;
  avaliacoes: Avaliacao[] = [];
  autoavaliacoes: Avaliacao[] = [];
  matricula: Matricula;

 
  ngOnInit(): void {
    console.log('onInit');
  }

  setShowContent(): void{
    this.showContent = true;
  }
  setShowGrades(cpf: string, descricaoTurma: string): void{
    if(cpf && descricaoTurma){
      this.showGrades = true;
    }
  }

  // adiciona avaliacoes com as metas da turma e notas vazias ao array de autoavaliacao
  adicionarMetas(metas: string[], avaliacoes: Avaliacao[]): Avaliacao[]{
    metas.map((meta) => {
      const metaExistente = avaliacoes.find(avaliacao => avaliacao.meta === meta);
      if(!metaExistente){
        const av = new Avaliacao();
        av.setMeta(meta);
        av.setNota('');
        avaliacoes.push(av);
      }
    })
    return avaliacoes;
  }

  preencherAutoavaliacao(cpf: string, descricaoTurma: string): void{

     if(cpf === ''){
      this.cpfObrigatorio = true;
     }
     else{
      this.cpfObrigatorio = false;
     }
     if(descricaoTurma === ''){
      this.turmaObrigatorio = true;
     }
     else{
      this.turmaObrigatorio = false;
     }
     

     if(cpf && descricaoTurma){
      //  this.aaService.getMatricula(cpf, descricaoTurma).subscribe(
      //    ma => {
      //      this.matricula = new Matricula();
      //      this.matricula.autoAvaliacoes = ma.autoAvaliacoes;
      //      this.matricula.avaliacoes = ma.avaliacoes;
      //      this.avaliacoes = this.matricula.getAvaliacoes();
      //      this.autoavaliacoes = this.matricula.getAutoAvaliacoes();
      //     },
      //     msg => { alert(msg.message) }
      //  );

      
      this.aaService.getTurma(descricaoTurma).subscribe(
        tu => {
          this.turma = new Turma();
          this.turma.matriculas = tu.matriculas;
          this.turma.metas = tu.metas;
          this.matricula = this.turma.getMatricula(cpf);

          if(!this.matricula){
            this.matriculaNaoEncontrada = true;
            return;
          }
          else{
            this.matriculaNaoEncontrada = false;
          }
          this.autoavaliacoes = this.adicionarMetas(this.turma.metas, this.matricula.autoAvaliacoes);
          this.matricula.autoAvaliacoes = this.autoavaliacoes;
          this.avaliacoes = this.matricula.avaliacoes;
      }, 
        msg => { alert(msg.message) }
      );
     }
  }

  atualizarAutoavaliacao(cpf: string, descricaoTurma: string, autoavaliacoes: Avaliacao[]): void {
    this.aaService.atualizar(cpf, descricaoTurma, this.autoavaliacoes).subscribe(
      (a) => { if (a == null){ alert("Erro ao tentar atualizar auto-avaliação! Por favor, contate os administradores do sistema.");} else{console.log('teste', a);}  },
      (msg) => { alert(msg.message); }
   );
  }

  //  atualizarAutoavaliacao(matricula: Matricula, autoavaliacoes: Avaliacao[]): void {
  //   this.aaService.atualizar(this.matricula, autoavaliacoes).subscribe(
  //     (a) => { if (a == null){ alert("Erro ao tentar atualizar auto-avaliação! Por favor, contate os administradores do sistema.");} else{console.log('teste', a);}  },
  //     (msg) => { alert(msg.message); }
  //  );
  // }
	notificarAutoAvaliacao(matricula: Matricula): void { }
}
