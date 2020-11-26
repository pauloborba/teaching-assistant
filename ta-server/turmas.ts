import { Turma } from '../common/turma';
import { Matricula } from '../common/matricula';
import { Avaliacao } from './avaliacao';

export class Turmas {
    turmas: Turma[ ] = [ ]


    cadastrarTurma(turma: Turma): Turma{
        return null;
    }

    removerTurma(descricao: string): Turma{
        return null;
    }

    atualizarTurma(turma: Turma): Turma{
        return null;
    }
    
    compararTurmas(turmas: Turma []): any{
        return null;
    }

    getTurma(descricao: string): Turma{
        if(descricao=="ESS 2018.1"){
            var turma = new Turma()
            turma.descricao = "ESS 2018.1"
            turma.metas = ["Requisitos", "Gerência de Configuração", "Testes"]
            return turma
    
        }else if (descricao=="ESS 2018.2"){
            var turma = new Turma()
            turma.descricao = "ESS 2018.2"
            turma.metas = ["Requisitos", "Gerência de Configuração", "Testes"]
            return turma

        }else if(descricao=="ESS 2019.1"){
            var turma = new Turma()
            turma.descricao = "ESS 2019.1"
            turma.metas = ["Requisitos", "Gerência de Configuração", "Testes"]
            return turma
           
        }else if(descricao=="ESS 2019.2"){
            var turma = new Turma()
            turma.descricao = "ESS 2019.2"
            turma.metas = ["Requisitos", "Gerência de Configuração", "Testes"]
            return turma

        }else{
            return null;
        }

    }
}