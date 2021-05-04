import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../../../common/aluno';
import { Avaliacao } from '../../../../common/avaliacao';
import { Matricula } from '../../../../common/matricula';
import { Turma } from '../../../../common/turma';
import { AlunosService } from '../alunos/alunos.service';
import { TurmasService } from '../turmas/turmas.service';
import { MatriculasService } from './matriculas.service';

@Component({
  selector: 'app-matriculas',
  templateUrl: './matriculas.component.html',
  styleUrls: ['./matriculas.component.css'],
})
export class MatriculasComponent implements OnInit {
  matriculas: Matricula[] = [];
  matricula: Matricula = new Matricula();
  turmaMetas: string[] = [];
  listaAlunos: Aluno[];
  listaTurmas: Turma[];
  alunoSelecionado: string = '';
  descricaoTurmaSelecionada: string = '';
  turmaSelecionada: Turma;
  cpfDuplicado: boolean = false;
  turmaInexistente: boolean = false;
  matriculaEditar: Matricula = new Matricula();

  constructor(
    private matriculasService: MatriculasService,
    private alunosService: AlunosService,
    private turmasService: TurmasService
  ) {}

  ngOnInit(): void {
    this.alunosService.getAlunos().subscribe(
      (alunos) => {
        this.listaAlunos = alunos;
      },
      (msg) => {
        alert(msg.message);
      }
    );

    this.turmasService.getTurmas().subscribe(
      (turmas) => {
        this.listaTurmas = turmas;
      },
      (msg) => {
        alert(msg.message);
      }
    );
  }

  criarMatricula(matricula: Matricula): void {
    if(!matricula || this.descricaoTurmaSelecionada == '' || this.alunoSelecionado == '') return;
    
    var turmaSelecionadaMetas = this.turmaSelecionada.metas;

    turmaSelecionadaMetas.forEach(meta => {
      var avaliacao: Avaliacao = {
        meta: meta,
        nota: "",
        copyFrom: null
      }

      matricula.avaliacoes.push(avaliacao);
    });

    this.matriculasService.criar(matricula).subscribe(
      (matriculaAuxiliar) => {
        if (matriculaAuxiliar) {      
          this.turmaSelecionada.matriculas.push(matriculaAuxiliar);
          this.turmasService.atualizar(this.turmaSelecionada).subscribe(
            (turma) => {
              if (turma) {
                //this.matriculas.push(matriculaAuxiliar);
                this.matricula = new Matricula();
              } 
            },
            (msg) => {
              alert(msg.message);
            }
          );
        } else {
          this.cpfDuplicado = true;
        }
        this.alunoSelecionado = '';
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
      this.matriculas = [];
      this.matriculas = this.turmaSelecionada.matriculas;
    }else{
      this.turmaInexistente = true;
    }
  }

  atualizaAlunoSelecionado() {
    let selecionado = this.listaAlunos.find(
      (aluno) => aluno.cpf == this.alunoSelecionado.split(' - ')[0]
    );
    this.matricula.aluno = selecionado;
  }

  editarMatricula(matricula: Matricula): void {
    this.matriculaEditar.copyFrom(matricula);
  }

  atualizarMatricula(matricula: Matricula): void {
    this.matriculasService
      .atualizar(this.matriculaEditar)
      .subscribe((matriculaAuxiliar) => {
        if (matriculaAuxiliar) {
          this.matriculaEditar = new Matricula();
          Object.assign(matricula, matriculaAuxiliar);
        } else {
          alert('O aluno não foi atualizado');
        }
      });
  }

  removerMatricula(matricula: Matricula): void {
    this.matriculasService.remover(matricula).subscribe((matriculaAuxiliar) => {
      if (matriculaAuxiliar) {
        this.turmaSelecionada.matriculas = this.turmaSelecionada.matriculas.filter(
          (matriculasTurma) => matriculasTurma.aluno.cpf != matricula.aluno.cpf
        );
        this.turmasService
          .atualizar(this.turmaSelecionada)
          .subscribe((turmaAuxiliar) => {
            this.matriculas = this.turmaSelecionada.matriculas;
          });
      } else {
        alert('O aluno não foi removido');
      }
    });
  }
}
