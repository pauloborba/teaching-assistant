import { Component, OnInit } from '@angular/core';

// Comentado pois não existe Aluno em common ainda
import { Aluno } from '../../../../common/aluno';
import { MetasService } from './metas.service';

@Component({
  selector: 'app-metas',
  templateUrl: './metas.component.html',
  styleUrls: ['./metas.component.css']
})
export class MetasComponent implements OnInit {
  alunos: Aluno[] = [];

  constructor(private metasService: MetasService) {}

  ngOnInit(): void {

    this.metasService.getAlunos()
      .subscribe(
        (as) => {
          this.alunos = as;
          console.log('Alunos:', this.alunos);
        },
        (msg) => { 
          alert(msg.message);
        }
      );
  }

  atualizarAluno(aluno: Aluno): void {

  }
}
