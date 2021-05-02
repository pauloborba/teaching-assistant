import { Component, OnInit } from '@angular/core';
import { Aluno } from '../../../../common/aluno';
import { AlunosService } from './alunos.service';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.component.html',
  styleUrls: ['./alunos.component.css'],
})
export class AlunosComponent implements OnInit {
  alunos: Aluno[] = [];
  aluno: Aluno = new Aluno();
  cpfDuplicado: boolean = false;
  alunoEditar: Aluno = new Aluno();

  constructor(private alunosService: AlunosService) {}

  ngOnInit(): void {
    this.alunosService.getAlunos().subscribe(
      (alunos) => {
        this.alunos = alunos;
      },
      (msg) => {
        alert(msg.message);
      }
    );
  }

  criarAluno(a: Aluno): void {
    this.alunosService.criar(a).subscribe(
      (aluno) => {
        if (aluno) {
          this.alunos.push(aluno);
          this.aluno = new Aluno();
        } else {
          this.cpfDuplicado = true;
        }
      },
      (msg) => {
        alert(msg.message);
      }
    );
  }

  editarAluno(a: Aluno): void {
    this.alunoEditar.copyFrom(a);
  }

  atualizarAluno(a: Aluno): void {
    this.alunosService.atualizar(this.alunoEditar).subscribe((aluno) => {
      if (aluno) {
        this.alunoEditar = new Aluno();
        Object.assign(a, aluno);
      } else {
        alert('O aluno não foi atualizado');
      }
    });
  }

  removerAluno(a: Aluno): void {
    this.alunosService.remover(a).subscribe((aluno) => {
      if (aluno) {
        this.alunos = this.alunos.filter((a) => a.cpf !== aluno.cpf);
      } else {
        alert('O aluno não foi removido');
      }
    });
  }
}
