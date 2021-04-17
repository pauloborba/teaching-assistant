import { Component, OnInit } from '@angular/core';
import {EditarTurmaService} from './editar-turma.service';

@Component({
  selector: 'app-editar-turma',
  templateUrl: './editar-turma.component.html',
  styleUrls: ['./editar-turma.component.css'],
  providers: [
    EditarTurmaService
  ],
})
export class EditarTurmaComponent implements OnInit {
  descricao:string;

  constructor(private etService: EditarTurmaService) { }

  ngOnInit() {
  }

  editarTurma(){
    console.log("editarTurma")
    this.etService.editarTurmaServe(this.descricao).subscribe(
      data => this.descricao = data,
      error => console.log(error),
      () => console.log("acesso pegou")
    );
    console.log(this.descricao);
  }
}
