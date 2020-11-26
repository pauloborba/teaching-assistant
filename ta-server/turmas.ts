import { Turma } from '../common/turma';
import { Matricula } from '../common/matricula'
import { Avaliacao } from "../ta-server/avaliacao"
import { Aluno } from '../common/aluno';
export class Turmas {
    turmas: Turma[] = []


    cadastrarTurma(turma: Turma): Turma {
        return null;
    }

    removerTurma(descricao: string): Turma {
        return null;
    }

    atualizarTurma(turma: Turma): Turma {
        return null;
    }

    compararTurmas(turmas: Turma[]): any {
        return null;
    }
    //tenho que usar o get turmas e procurar a turma
    getTurma(descricao: string): Turma {
        if (descricao == "ESS 2018.1") {
            var turma = new Turma()
            turma.descricao = "ESS 2018.1"
            //crio as matrículas
            var matricula1 = new Matricula();
            var matricula2 = new Matricula();
            var matricula3 = new Matricula();
            //crio os alunos
            var aluno1 = new Aluno();
            var aluno2 = new Aluno();
            var aluno3 = new Aluno();
            //dou nome aos alunos
            aluno1.nome = "Carlos Eduardo";
            
            aluno2.nome = "Carimbo da Silva";
            aluno3.nome = "Macaule Cauque";
            //dou cpf aos alunos
            aluno1.cpf = "123";
            aluno2.cpf = "321";
            aluno3.cpf = "231";
            //email
            aluno1.email = "c@gmail";
            aluno2.email = "cs@gmail";
            aluno3.email = "m@gmail";
            //crio autoavaliacoes para botar no array depois
            var autoAvalicao1 = new Avaliacao();
            var autoAvalicao2 = new Avaliacao();
            var autoAvalicao3 = new Avaliacao();
            var autoAvalicao4 = new Avaliacao();

            autoAvalicao1.meta = "testes";
            autoAvalicao1.nota = "MPA";
            autoAvalicao2.meta = "requisitos";
            autoAvalicao2.nota = "MANA";
            autoAvalicao3.meta = "Gerencia de Projetos";
            autoAvalicao3.nota = "MA";
            autoAvalicao4.meta = "Gerencia de Projetos";
            autoAvalicao4.nota = "";
            //crio os arrays de auto avaliacoes 
            var autoAvaliacaoArray1: Avaliacao[] = [];
            var autoAvaliacaoArray2: Avaliacao[] = [];
            var autoAvaliacaoArray3: Avaliacao[] = [];
            //coloco as autoavaliacoes para ter o status como "completo"
            autoAvaliacaoArray1.push(autoAvalicao1);
            autoAvaliacaoArray1.push(autoAvalicao2);
            autoAvaliacaoArray1.push(autoAvalicao3);
            //coloco as autoavaliacoes para ter o status como "incompleto"
            autoAvaliacaoArray2.push(autoAvalicao1);
            autoAvaliacaoArray2.push(autoAvalicao2);
            autoAvaliacaoArray2.push(autoAvalicao4);
            //coloco as autoavaliacoes para ter o status como "não feito"
            autoAvaliacaoArray3.push(autoAvalicao4);
            autoAvaliacaoArray3.push(autoAvalicao4);
            autoAvaliacaoArray3.push(autoAvalicao4);
            
            matricula1.aluno = aluno1;
            matricula2.aluno = aluno2;
            matricula3.aluno = aluno3;
            
            matricula1.autoAvaliacoes = autoAvaliacaoArray1;
            matricula2.autoAvaliacoes = autoAvaliacaoArray2;
            matricula3.autoAvaliacoes = autoAvaliacaoArray3;
            turma.matriculas.push(matricula1);
            turma.matriculas.push(matricula2);
            turma.matriculas.push(matricula3);
            return turma
        } else if(descricao == "ESS 2018.2") {
            var turma = new Turma()
            turma.descricao = "ESS 2018.2"
            //crio as matrículas
            var matricula1 = new Matricula();
            var matricula2 = new Matricula();
            var matricula3 = new Matricula();
            //crio os alunos
            var aluno1 = new Aluno();
            var aluno2 = new Aluno();
            var aluno3 = new Aluno();
            //dou nome aos alunos
            aluno1.nome = "Pablo";
            aluno2.nome = "Luciano";
            aluno3.nome = "Brenner";
            //dou cpf aos alunos
            aluno1.cpf = "124";
            aluno2.cpf = "320";
            aluno3.cpf = "235";
            //email
            aluno1.email = "p@gmail";
            aluno2.email = "l@gmail";
            aluno3.email = "b@gmail";
            //crio autoavaliacoes para botar no array depois
            var autoAvalicao1 = new Avaliacao();
            var autoAvalicao2 = new Avaliacao();
            var autoAvalicao3 = new Avaliacao();
            var autoAvalicao4 = new Avaliacao();

            autoAvalicao1.meta = "testes";
            autoAvalicao1.nota = "MPA";
            autoAvalicao2.meta = "requisitos";
            autoAvalicao2.nota = "MANA";
            autoAvalicao3.meta = "Gerencia de Projetos";
            autoAvalicao3.nota = "MA";
            autoAvalicao4.meta = "Gerencia de Projetos";
            autoAvalicao4.nota = "";
            //crio os arrays de auto avaliacoes 
            var autoAvaliacaoArray1: Avaliacao[] = [];
            var autoAvaliacaoArray2: Avaliacao[] = [];
            var autoAvaliacaoArray3: Avaliacao[] = [];
            //coloco as autoavaliacoes para ter o status como "completo"
            autoAvaliacaoArray1.push(autoAvalicao1);
            autoAvaliacaoArray1.push(autoAvalicao2);
            autoAvaliacaoArray1.push(autoAvalicao3);
            //coloco as autoavaliacoes para ter o status como "incompleto"
            autoAvaliacaoArray2.push(autoAvalicao4);
            autoAvaliacaoArray2.push(autoAvalicao4);
            autoAvaliacaoArray2.push(autoAvalicao4);
            //coloco as autoavaliacoes para ter o status como "não feito"
            autoAvaliacaoArray3.push(autoAvalicao4);
            autoAvaliacaoArray3.push(autoAvalicao4);
            autoAvaliacaoArray3.push(autoAvalicao4);
            
            matricula1.aluno = aluno1;
            matricula2.aluno = aluno2;
            matricula3.aluno = aluno3;
            
            matricula1.autoAvaliacoes = autoAvaliacaoArray1;
            matricula2.autoAvaliacoes = autoAvaliacaoArray2;
            matricula3.autoAvaliacoes = autoAvaliacaoArray3;
            turma.matriculas.push(matricula1);
            turma.matriculas.push(matricula2);
            turma.matriculas.push(matricula3);
            return turma
        }
        return null;
    }
}