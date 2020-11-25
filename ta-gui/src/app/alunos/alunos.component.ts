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
  clickedBtm = false

  constructor(private alunoService: AlunoService) { }

  ngOnInit() {

  }

  carregarMatriculas() {
    
    this.metas = []

    //Chamando autoavaliacao.service que faz a req pro server para pegar a turma indicada pelo usuário
    this.alunoService.getTurma(this.nomeTurma).subscribe(

      (a) => {

        this.turma = new Turma()
        this.turma.descricao = a.descricao
        this.matriculas = a.matriculas
        
        console.log(this.matriculas)
      },
      (msg) => { alert(msg.message); }
    )

    this.header = ["Nome", "CPF", "Email", "Status de Auto-Avaliação"]
    this.clickedBtm = true

  }

  corDoBloco(matricula: Matricula): String {
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

}
