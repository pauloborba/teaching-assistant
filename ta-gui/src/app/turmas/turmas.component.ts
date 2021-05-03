import { Component, OnInit } from '@angular/core';
import { Turma } from '../../../../common/turma';
import { TurmasService } from './turmas.service';

@Component({
  selector: 'app-turmas',
  templateUrl: './turmas.component.html',
  styleUrls: [ './turmas.component.css' ]
})
export class TurmasComponent implements OnInit {
  turmas: Turma[] = [];
  turma: Turma = new Turma();
  turmaMetas: string = '';
  turmaRepetida: boolean = false;
  turmaEditar: Turma = new Turma();
  turmaEditarMetas: string = '';

  constructor(private turmasService: TurmasService) { }

  turmasStub = [
    {
      descricao: "2018.1",
      metas: ["Requisitos", "Ger. Config.", "Ger. Proj.", "Testes", "Projeto"],
      peso: [1, 2, 2, 2, 3],
      vagas: 60,
      matriculas: [],
      roteiros: [],
      monitores: []
    },
    {
      descricao: "2018.2",
      metas: ["Requisitos", "Ger. Config.", "Ger. Proj.", "Testes", "Projeto"],
      peso: [2, 1, 1, 3, 3],
      vagas: 60,
      matriculas: [],
      roteiros: [],
      monitores: []
    },
    {
      descricao: "2019.1",
      metas: ["Requisitos", "Ger. Config.", "Ger. Proj.", "Testes", "Projeto"],
      peso: [1, 2, 2, 2, 3],
      vagas: 60,
      matriculas: [],
      roteiros: [],
      monitores: []
    },
    {
      descricao: "2019.2",
      metas: ["Requisitos", "Ger. Config.", "Ger. Proj.", "Testes", "Projeto"],
      peso: [1, 2, 2, 2, 3],
      vagas: 60,
      matriculas: [],
      roteiros: [],
      monitores: []
    },
    {
      descricao: "2020.1",
      metas: ["Requisitos", "Ger. Config.", "Ger. Proj.", "Testes", "Projeto"],
      peso: [1, 2, 2, 2, 3],
      vagas: 60,
      matriculas: [],
      roteiros: [],
      monitores: []
    },
    {
      descricao: "2020.2",
      metas: ["Requisitos", "Ger. Config.", "Ger. Proj.", "Testes", "Projeto"],
      peso: [1, 2, 2, 2, 3],
      vagas: 60,
      matriculas: [],
      roteiros: [],
      monitores: []
    },
    {
      descricao: "2020.3",
      metas: ["Requisitos", "Ger. Config.", "Ger. Proj.", "Testes", "Projeto"],
      peso: [1, 2, 2, 2, 3],
      vagas: 60,
      matriculas: [],
      roteiros: [],
      monitores: []
    },
    {
      descricao: "2021.1",
      metas: ["Anderson", "Ger. Config.", "Ger. Proj.", "Testes", "Projeto"],
      peso: [1, 2, 2, 2, 3],
      vagas: 60,
      matriculas: [],
      roteiros: [],
      monitores: []
    },
  ]

  ngOnInit(): void {
    this.turmasService.getTurmas()
      .subscribe(
        turmas => { this.turmas = turmas; },
        msg => { alert(msg.message); }
      );

    this.turmasStub.forEach((turma) => {
      let tempTurma = new Turma()
      tempTurma.descricao = turma.descricao;
      tempTurma.metas = turma.metas;
      tempTurma.peso = turma.peso;
      tempTurma.vagas = turma.vagas;
      this.turmasService.criar(tempTurma)
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
    })
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
