import { Aluno } from '../common/aluno';
import { Turma } from '../common/turma';
import { Matricula } from '../common/matricula';
import { Stub } from '../common/stub';

export class CadastroDeAlunos {
    alunos: Aluno[] = [];
    turma: Turma[] = [];
    stub: Stub = new Stub();
 
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

      return (this.stub.criarStubAlunos());
    }

    getMetasAlunos() {

      var result: any = [];

      var turmaEss = this.stub.criarStubMetas();
      this.alunos = this.getAlunos();

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