import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Aluno } from '../../../../common/aluno';
import { Matricula } from '../../../../common/matricula';
import { RespostaDeQuestao } from '../../../../common/respostaDeQuestao';
import { RespostaDeRoteiro } from '../../../../common/respostaDeRoteiro';
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
  listaAlunos: Aluno[];
  listaTurmas: Turma[];
  alunoSelecionado: string = '';
  descricaoTurmaSelecionada: string = '';
  turmaSelecionada: Turma = new Turma();
  cpfDuplicado: boolean = false;
  turmaInexistente: boolean = false;
  matriculaEditar: Matricula = new Matricula();

  constructor(
    private matriculasService: MatriculasService,
    private alunosService: AlunosService,
    private turmasService: TurmasService
  ) { }

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

    var respostasArray = ['certo', 'errado'];

    if (!matricula || this.descricaoTurmaSelecionada == '' || this.alunoSelecionado == '') return;
    this.turmaSelecionada.metas.forEach(meta => {
      var respostaDeQuestoes: RespostaDeQuestao = new RespostaDeQuestao;
      respostaDeQuestoes.correcao = respostasArray[Math.floor(Math.random() * respostasArray.length)];

      var respostaDeRoteiro: RespostaDeRoteiro = new RespostaDeRoteiro;
      respostaDeRoteiro.respostasDeQuestoes.push(respostaDeQuestoes);
      matricula.respostasDeRoteiros.push(respostaDeRoteiro);
    })
    this.matriculasService.criar(matricula).subscribe(
      (matriculaAuxiliar) => {
        if (matriculaAuxiliar) {
          this.turmaSelecionada.matriculas.push(matricula);
          this.turmasService.atualizar(this.turmaSelecionada).subscribe(
            (turma) => {
              if (turma) {
                this.matricula = new Matricula();
                console.log(matriculaAuxiliar);
              } else {
                console.log('Erro ao cadastrar aluno na turma');
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
      const selecionadaAux = new Turma();
      selecionadaAux.copyFrom(selecionada);
      this.turmaSelecionada = selecionadaAux;
      this.matriculas = this.turmaSelecionada.matriculas;
    } else {
      this.turmaInexistente = true;
    }
  }

  atualizaAlunoSelecionado() {
    let selecionado = this.listaAlunos.find(
      (aluno) => aluno.cpf == this.alunoSelecionado.split(' - ')[0]
    );
    this.matricula.aluno = selecionado;
    this.matricula.media = Math.floor(Math.random() * 10);
    this.matricula.reprovadoPorFalta = Math.random() < 0.2;

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
