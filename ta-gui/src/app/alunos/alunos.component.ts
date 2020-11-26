import { Component, OnInit } from '@angular/core';
import { Turma } from '../../../../common/turma';
import { Aluno } from '../../../../common/aluno';
import { AlunoService } from './alunos.service';
import { Matricula } from '../../../../common/matricula';
@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})
export class AlunosComponent implements OnInit {

  nomeTurma: string = ""
  turma: Turma
  matriculas: Matricula[] = []
  header: String[] = []
  metas: String[] = []

  constructor(private alunoService: AlunoService) { }

  ngOnInit() {

  }

  carregarMatriculas() {
    
    this.metas = []
    let achou: boolean = false;
    //Chamando autoavaliacao.service que faz a req pro server para pegar a turma indicada pelo usuário
    this.alunoService.getTurma(this.nomeTurma).subscribe(

      (a) => {
        this.turma = new Turma()
        this.turma.descricao = a.descricao
        this.matriculas = a.matriculas
      },
      (msg) => { alert(msg.message); }
    )

  }

  statusDeAutoAvaliacao(matricula: Matricula): String {
    let fezAlgumaQuestao: boolean = false;
    let fezTodasQuestoes: boolean = false;
    let autoAvaliacoesFeitas: number = 0;
    
    //Checa se foi feita a autoavaliacao de todas as meta
    matricula.autoAvaliacoes.forEach((autoAvaliacao) => {
      
      if (autoAvaliacao.nota != "" && autoAvaliacoesFeitas == (matricula.autoAvaliacoes.length-1) && fezAlgumaQuestao) {
        autoAvaliacoesFeitas++;
        fezTodasQuestoes = true;
      } else if (autoAvaliacao.nota != "") {
        autoAvaliacoesFeitas++;
        fezAlgumaQuestao = true;
      } else{
        autoAvaliacoesFeitas++;
      }
    })
    if(fezTodasQuestoes){
      return "concluido";
    } else if(fezAlgumaQuestao) {
      return "iniciado mas nao concluido";
    }
    return "nao iniciado";
  }


  corDoBloco(matricula: Matricula): String{
    let status: String = "";
    status = this.statusDeAutoAvaliacao(matricula);
    if(status=="concluido"){
      return "concluido";
    } else if(status=="iniciado mas nao concluido") {
      return "iniciadoMasNaoConcluido";
    }
    return "naoIniciado";
  }

}
