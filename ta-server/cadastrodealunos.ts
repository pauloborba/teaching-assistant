import { Aluno } from '../common/aluno';
import { Turma } from '../common/turma';
import { Matricula } from '../common/matricula';

export class CadastroDeAlunos {
    alunos: Aluno[] = [];
    turma: Turma[] = [];
 
     cadastrar(aluno: Aluno): Aluno {
      return null;
    }
 
     cpfNaoCadastrado(cpf: string): boolean {
       return false;
    }
 
     atualizar(aluno: Aluno): Aluno {
      return null;
    }
    
    getAlunos(): Aluno[] {
      var aluno1: any = null;
      var aluno2: any = null;
      var aluno3: any = null;

      aluno1 = new Aluno();
      aluno2 = new Aluno();
      aluno3 = new Aluno();

      aluno1.nome = 'Sicraninho';
      aluno1.cpf = '12345';
      aluno1.email = 'sicraninho@email';

      aluno2.nome = 'Fulaninho';
      aluno2.cpf = '34567';
      aluno2.email = 'fulainho@email';

      aluno3.nome = 'Beltraninho';
      aluno3.cpf = '35790';
      aluno3.email = 'beltraninho@email';

      this.alunos = [aluno1, aluno2, aluno3];

      return (this.alunos);
    }

    getMetasAlunos() {

      var result: any = [];

      var turmaEss: Turma = null;
      turmaEss = new Turma();

      var matricula1: Matricula = null;
      var matricula2: Matricula = null;
      var matricula3: Matricula = null;

      matricula1 = new Matricula();
      matricula2 = new Matricula();
      matricula3 = new Matricula();

      this.alunos = this.getAlunos();

      // Criação das matriculas
      matricula1.aluno = this.alunos[0];
      matricula2.aluno = this.alunos[1];
      matricula3.aluno = this.alunos[2];

      // Criação da Turma
      turmaEss.descricao = 'ESS 2020.3';
      turmaEss.matriculas = [matricula1, matricula2, matricula3];
      turmaEss.numeroMatriculas = 3;

      let mediaTurma = turmaEss.getMedia();

      for (let i = 0; i < turmaEss.getNumMatriculas(); i++) {
        let matriculaAux = turmaEss.getMatricula(String(this.alunos[i].cpf));
        
        var aux = {
          'nome' : '',
          'cpf' : '',
          'email' : '',
          'media' : '',
          'color' : '',
        };
        
        aux.nome = String(matriculaAux.aluno.nome);
        aux.cpf = String(matriculaAux.aluno.cpf);
        aux.email = String(matriculaAux.aluno.email);
        aux.media = String(matriculaAux.getMediaGeral());
        aux.color = 'white';

        if (Number(aux.media) < Number(mediaTurma)) {
          aux.color = 'red';
        }

        if (matriculaAux.reprovacoesAnteriores(aux.cpf)) {
          aux.color = 'yellow';
        }

        if (Number(aux.media) < Number(mediaTurma) && matriculaAux.reprovacoesAnteriores(aux.cpf)) {
          aux.color = 'orange';
        }

        result.push(aux);

      }
      
      return(result);
      
    }

    deletar(email: string): Aluno {
        return null;
      }
 
 }