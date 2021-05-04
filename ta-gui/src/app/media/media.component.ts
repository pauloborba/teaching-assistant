import { Component, OnInit } from '@angular/core';
import { Avaliacao } from '../../../../common/avaliacao';
import { Turma } from '../../../../common/turma';
import { TurmasService } from '../turmas/turmas.service';
import { TurmasComponent } from '../turmas/turmas.component';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

  turmaMetas: string[] = [];
  listaTurmas: Turma[];
  alunoSelecionado: string = '';
  descricaoTurmaSelecionada: string = '';
  turmaSelecionada: Turma;
  turmas: Turma[]=[];
  turma: Turma = new Turma();
  
  turmaInexistente: boolean = false;
  notaInvalida: boolean = false;

  avaliacaoEditar: Avaliacao = new Avaliacao();

  turmaChamar: TurmasComponent;

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
      console.log(this.turmaSelecionada);
    }else{
      this.turmaInexistente = true;
    }
  }

//atualizarNota(m: Matricula, a: Avaliacao): void {
//  console.log('chegou no att nota do component');
//
//  console.log(this.avaliacaoEditar, m, a);
//  
//  if(!this.avaliacaoEditar.nota){
//      this.notaInvalida = true;
//      return;
//  }
//
//  this.matriculasService.atualizarNota(m, this.avaliacaoEditar)
//    .subscribe(
//      notaResponse => {
//        if (notaResponse) {
//          this.avaliacaoEditar = new Avaliacao();
//          Object.assign(a, notaResponse);
//
//          this.matriculasService.getMatriculas().subscribe(
//            (matriculasResponse) => {
//              this.matriculaSelecionada = matriculasResponse.find(m => m.aluno.cpf == this.matriculaSelecionada.aluno.cpf);
//            },
//            (msg) => {
//              alert(msg.message);
//            }
//          )
//        } else {
//          alert('O aluno não foi atualizado');
//        }
//      }
//    );
//}

  editarNota(avaliacao: Avaliacao): void {
    this.avaliacaoEditar.copyFrom(avaliacao);
  }
}
