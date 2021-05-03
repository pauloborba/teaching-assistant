import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../../../common/aluno';
import { Avaliacao } from '../../../../common/avaliacao';
import { Matricula } from '../../../../common/matricula';
import { Turma } from '../../../../common/turma';
import { AlunosService } from '../alunos/alunos.service';
import { MatriculasService } from '../matriculas/matriculas.service';
import { TurmasService } from '../turmas/turmas.service';

@Component({
  selector: 'app-notas',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {

  matriculas: Matricula[] = [];
  matricula: Matricula = new Matricula();
  turmaMetas: string[] = [];
  listMatriculas: Matricula[];
  listaAlunos: Aluno[];
  listaTurmas: Turma[];
  alunoSelecionado: string = '';
  matriculaSelecionada: Matricula = new Matricula();
  descricaoTurmaSelecionada: string = '';
  turmaSelecionada: Turma;
  
  turmaInexistente: boolean = false;
  notaInvalida: boolean = false;

  avaliacaoEditar: Avaliacao = new Avaliacao();

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
    
    this.matriculasService.getMatriculas().subscribe(
      (matriculas) => {
        this.listMatriculas = matriculas;
      },
      (msg) => {
        alert(msg.message);
      }
    )

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

    let matriculaSelected = this.listMatriculas.find(
      (matricula) => matricula.aluno.cpf == this.alunoSelecionado.split(' - ')[0]
    );

    this.matriculaSelecionada = matriculaSelected;
    
    this.matricula.aluno = selecionado;
  }
  
  atualizarNota(m: Matricula, a: Avaliacao): void {
    console.log('chegou no att nota do component');

    console.log(this.avaliacaoEditar, m, a);
    
    if(!this.avaliacaoEditar.nota){
        this.notaInvalida = true;
        return;
    }

    this.matriculasService.atualizarNota(m, this.avaliacaoEditar)
      .subscribe(
        notaResponse => {
          if (notaResponse) {
            this.avaliacaoEditar = new Avaliacao();
            Object.assign(a, notaResponse);

            this.matriculasService.getMatriculas().subscribe(
              (matriculasResponse) => {
                this.matriculaSelecionada = matriculasResponse.find(m => m.aluno.cpf == this.matriculaSelecionada.aluno.cpf);
              },
              (msg) => {
                alert(msg.message);
              }
            )
          } else {
            alert('O aluno não foi atualizado');
          }
        }
      );
  }

  editarNota(avaliacao: Avaliacao): void {
    this.avaliacaoEditar.copyFrom(avaliacao);
  }

  removerNota(matricula: Matricula, avaliacao: Avaliacao): void {
    this.matriculasService.removerNota(matricula, avaliacao).subscribe((matriculaAuxiliar) => {
      if (matriculaAuxiliar) {
        this.turmaSelecionada.matriculas = this.turmaSelecionada.matriculas.filter(
          (matriculasTurma) => matriculasTurma.aluno.cpf == matricula.aluno.cpf
        );
        this.matriculasService.getMatriculas().subscribe(
          (matriculasResponse) => {
            this.matriculaSelecionada = matriculasResponse.find(m => m.aluno.cpf == this.matriculaSelecionada.aluno.cpf);
          },
          (msg) => {
            alert(msg.message);
          }
        )
      } else {
        alert('O aluno não foi removido');
      }
    });
  }


}
