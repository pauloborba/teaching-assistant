import { Component, OnInit } from '@angular/core';
import { Turma } from '../../../../common/turma';
import { Aluno } from '../../../../common/aluno';
import { AlunoService } from './alunos.service';
import { Matricula } from '../../../../common/matricula';

@Component({
  selector: 'app-root',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css']
})

export class AlunosComponent implements OnInit {
  nomeTurma: string = ""
  turma: Turma
  matriculas: Matricula[] = []
  header: String[] = []
  metas: String[] = []
  aluno: Aluno = new Aluno();
  alunos: Aluno[] = [];
  cpfduplicado: boolean = false;

  constructor(private alunoService: AlunoService) { }

  criarAluno(a: Aluno): void {
    this.alunoService.criar(a)
      .subscribe(
        ar => {
          if (ar) {
            this.alunos.push(ar);
            this.aluno = new Aluno();
          } else {
            this.cpfduplicado = true;
          }
        },
        msg => { alert(msg.message); }
      );
  }

  carregarMatriculas() {
    
    this.metas = []
    let achou: boolean = false;
    //Chamando autoavaliacao.service que faz a req pro server para pegar a turma indicada pelo usuário
    this.alunoService.getTurma(this.nomeTurma).subscribe(

      (a) => {
        this.turma = new Turma(a.descricao)
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

  removerAluno(a: Aluno): void {
    this.alunoService.remover(a)
      .subscribe(a => {
        if (a) {
          this.alunos = this.alunos.filter(b => b.email !== a.email);
        }
      })
  }

  ngOnInit(): void {
    this.alunoService.getAlunos()
      .subscribe(
        as => { this.alunos = as; },
        msg => { alert(msg.message); }
      );
  }

}
