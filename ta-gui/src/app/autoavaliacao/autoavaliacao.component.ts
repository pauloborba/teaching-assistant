import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';
import { Aluno } from '../../../../common/aluno';
import { Matricula } from '../../../../common/matricula';
import { Avaliacao } from '../../../../ta-server/avaliacao';
import { Turmas } from '../../../../ta-server/turmas';
import { Turma } from '../../../../common/turma';
import { AutoavaliacaoService } from './autoavaliacao.service';
import { Meta } from '@angular/platform-browser';

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


 
  ngOnInit(): void {
    console.log('onInit');
  }

  avaliacoes: Avaliacao[] = [];
  auto_avaliacoes: Avaliacao[] = [];
  matriculas: Matricula[];
  matricula: Matricula;
  turma: Turma = null;
  notificar: boolean = false;
  show_turmas: boolean = false;
  show_matriculas: boolean = false;
  confirmacao: boolean = false;
  erro: boolean = false;
  erro_turma: boolean = false;
  selectedMetas: string[] = [];
  index = -1;
  metas: string[] = [];

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
       this.aaService.getMetas(descricaoTurma).subscribe(
         me => {
           this.metas = me;
         },
         msg => { alert(msg.message) }
       );
       this.aaService.getMatricula(cpf, descricaoTurma).subscribe(
         ma => {
           if(!ma){
             this.matriculaNaoEncontrada = true;
             return;
           }
           else{
            this.matriculaNaoEncontrada = false;
           }
           this.matricula = new Matricula();
           this.matricula.autoAvaliacoes = ma.autoAvaliacoes;
           this.matricula.avaliacoes = ma.avaliacoes;
           this.avaliacoes = this.matricula.getAvaliacoes();
           this.auto_avaliacoes = this.adicionarMetas(this.metas, this.matricula.getAutoAvaliacoes());
          },
          msg => { alert(msg.message) }
       );

      
      // this.aaService.getTurma(descricaoTurma).subscribe(
      //   tu => {
      //     this.turma = new Turma();
      //     this.turma.matriculas = tu.matriculas;
      //     this.turma.metas = tu.metas;
      //     this.matricula = this.turma.getMatricula(cpf);

      //     if(!this.matricula){
      //       this.matriculaNaoEncontrada = true;
      //       return;
      //     }
      //     else{
      //       this.matriculaNaoEncontrada = false;
      //     }
      //     this.autoavaliacoes = this.adicionarMetas(this.turma.metas, this.matricula.autoAvaliacoes);
      //     this.matricula.autoAvaliacoes = this.autoavaliacoes;
      //     this.avaliacoes = this.matricula.avaliacoes;
      // }, 
      //   msg => { alert(msg.message) }
      // );
     }
  }

  atualizarAutoavaliacao(cpf: string, descricaoTurma: string, autoavaliacoes: Avaliacao[]): void {
    this.aaService.atualizar(cpf, descricaoTurma, autoavaliacoes).subscribe(
      (a) => { if (a == null){ alert("Erro ao tentar atualizar auto-avaliação! Por favor, contate os administradores do sistema.");} else{alert(a)}  },
      (msg) => { alert(msg.message); }
   );
  }


  cadastrarAutoAvaliacao(matricula: Matricula, avaliacoes: Avaliacao[]): void { }

	notificarAutoAvaliacao(): void {
    var toNotify = [];
    for (var i = 0; i < this.matriculas.length; i++) {
      var toNotifyMetas = [];
      for (var j = 0; j < this.selectedMetas.length; j++) {
        for (var k = 0; k < this.matriculas[i].autoAvaliacoes.length; k++) {
          if (this.matriculas[i].autoAvaliacoes[k].meta === this.selectedMetas[j] && this.matriculas[i].autoAvaliacoes[k].nota === "") {
            toNotifyMetas.push(this.selectedMetas[j]);
          }
        }
      }
      if (toNotifyMetas.length > 0) {
        this.confirmacao = true;
        var aux = {"email": this.matriculas[i].aluno.email, "meta": toNotifyMetas};
        console.log(aux);
        toNotify.push(aux);
      }
    }
    if (toNotify.length === 0) {
      this.erro = true;
    } else {
      this.aaService.notificar(toNotify).subscribe(as => {}, msg => {alert(msg.message);});
    }
  }

  setNotificar(): void {
    this.notificar = true;
  }

  showTurmas(descricaoTurma: string): void {
    console.log(descricaoTurma);
    if (!descricaoTurma) {
      this.erro_turma = true;
    } else {
      this.show_turmas = true;
      this.show_matriculas = true;
      this.aaService.getTurmas(descricaoTurma).subscribe(as => {
        this.turma = new Turma("");
        this.turma.descricao = as.descricao;
        this.turma.metas = as.metas;
        this.matriculas = as.matriculas;
      }, msg => {alert(msg.message);});
    }
  }

  selected(meta: string): void {
    var result: string = this.selectedMetas.find(a => a == meta);
    if (!result) {
      this.selectedMetas.push(meta);
    } else {
      this.index = this.selectedMetas.indexOf(result)
      if (this.index > -1) {
        this.selectedMetas.splice(this.index, 1)
      }
    }
  }
}