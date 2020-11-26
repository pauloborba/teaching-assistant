import { Component, OnInit } from '@angular/core';
import { Turma } from '../../../../common/turma';
import { TurmasService } from './turmas.service'

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css']
})
export class TurmasComponent implements OnInit {
  // constructor(private turmaService: TurmasService) { }
  constructor(private service: TurmasService) { }
  turmas: Turma[] = [];
   


  ngOnInit() {
    var turma: Turma = new Turma();
    turma.descricao = "23e1321";
    this.turmas.push(turma);
    turma = new Turma();
    turma.descricao="32fkds"
    this.turmas.push(turma)

  }

  notificarTurma(turma: Turma) :void {
    alert(turma.descricao)
    this.service.notificar(turma).subscribe(
      {
        next: r => {
          if (r) {
            alert("Turma notificada!")
          }
          else {
            alert("Erro ao notificar turma!")
          }
        },
        error: err => {
          console.log(err)
        }
      }
    )
  }






}
