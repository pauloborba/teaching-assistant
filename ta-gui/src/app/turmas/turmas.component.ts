import { Component, OnInit } from '@angular/core';
import { Turma } from '../../../../common/turma';
import { TurmasService } from './turmas.service';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: ['./turmas.component.css']
})
export class TurmasComponent implements OnInit {
  turmas: Turma[] = [];
  turma: Turma = new Turma();
  turmaMetas: string = '';
  turmaRepetida: boolean = false;
  turmaEditar: Turma = new Turma();
  turmaEditarMetas: string = '';

  constructor(private turmasService: TurmasService) { }

  ngOnInit(): void {
    this.turmasService.getTurmas()
      .subscribe(
        turmas => { this.turmas = turmas; },
        msg => { alert(msg.message); }
      );
  }

  criarTurma(): void {
    this.turma.metas = this.splitMetas(this.turmaMetas);
    this.turmasService.criar(this.turma)
      .subscribe(
        turma => {
          if (turma) {
            this.turmas.push(turma);
            this.turma = new Turma();
            this.turmaMetas = '';
          } else {
            this.turmaRepetida = true;
          }
        },
        msg => { alert(msg.message); }
      );
  }

  editarTurma(t: Turma): void {
    this.turmaEditar.copyFrom(t);
    this.turmaEditar.metas = [];
    this.turmaEditarMetas = t.metas.join(', ');
  }

  atualizarTurma(t: Turma): void {
    this.turmaEditar.metas = this.splitMetas(this.turmaEditarMetas);

    this.turmasService.atualizar(this.turmaEditar)
      .subscribe(
        turma => {
          if (turma) {
            this.turmaEditar = new Turma();
            this.turmaEditarMetas = '';
            Object.assign(t, turma);
          } else {
            alert('A turma não foi atualizada');
          }
        }
      );
  }

  removerTurma(t: Turma): void {
    this.turmasService.remover(t)
      .subscribe(turma => {
        if (turma) {
          this.turmas = this.turmas.filter(t => t.descricao !== turma.descricao);
        } else {
          alert('A turma não foi removida');
        }
      });
  }

  private splitMetas(metasStr: string): string[] {
    let metas: string[] = [];

    metasStr.split(',').forEach((meta: string) => {
      if (meta.trim())
        metas.push(meta.trim());
    });

    return metas;
  }
}
