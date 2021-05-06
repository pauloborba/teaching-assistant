import { Component, OnInit } from '@angular/core';
import { Avaliacao } from '../../../../common/avaliacao';
import { Turma } from '../../../../common/turma';
import { TurmasService } from '../turmas/turmas.service';
import { TurmasComponent } from '../turmas/turmas.component';
import { Peso } from '../../../../common/peso';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

  //variaveis para manipular turma
  listaTurmas: Turma[];
  turmaSelecionada: Turma = new Turma();
  descricaoTurmaSelecionada: string = '';
  
  //Manipular pesos
  turmaPesos: number []=[];
  
  //Editar peso em turma
  turmaPesoEditar: Turma = new Turma();

  //bool para erros
  turmaInexistente: boolean = false;


  constructor(
    private turmasService: TurmasService
  ) {}

  ngOnInit(): void {
    this.turmasService.getTurmas().subscribe(
      (turmas) => {
        this.listaTurmas = turmas;
      },
      (msg) => {
        alert(msg.message);
      }
    );
  }

  atualizaTurmaSelecionada() {
    let selecionada = this.listaTurmas.find(
      (turma) => turma.descricao == this.descricaoTurmaSelecionada
    );
    if (selecionada) {
      this.turmaSelecionada = selecionada;
      this.turmaPesos=[];      
      this.turmaPesos = this.turmaSelecionada.peso;

      console.log(this.turmaSelecionada);
    }else{
      this.turmaInexistente = true;
    }
  }

  editarPeso(t: Turma): void {
    console.log(this.turmaPesoEditar);
    console.log(this.descricaoTurmaSelecionada);
    this.turmaPesoEditar.copyFrom(t);
    this.turmaPesos = t.peso;
  }

  atualizarPeso(t: Turma): void {
    this.turmasService.atualizar(this.turmaPesoEditar)
      .subscribe(
        turma => {
          if (turma) {
            this.turmaPesoEditar = new Turma();
            this.turmaPesoEditar.peso = [];
            Object.assign(t, turma);
          } else {
            alert('A turma não foi atualizada');
          }
        }
      );
  }
}
