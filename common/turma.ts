import { Matricula } from './matricula';
import { Roteiro } from '../ta-server/roteiro';
import { Aluno } from './aluno';
import { Avaliacao } from '../ta-server/avaliacao';

export class Turma {
    descricao: string = "";
    metas: string[] = [];
    matriculas: Matricula[] = [];
    roteiros: Roteiro[] = [];
    monitores: Aluno[] = [];
    numeroMatriculas: number = 0;

    constructor(descricao: string) {
        this.descricao = descricao;
    }

    ngOnInit() {
        this.descricao = "";
        this.metas = [];
        this.matriculas = [];
        this.roteiros = [];
        this.monitores = [];
        this.numeroMatriculas = 0;
    }
  
    getNumMatriculas(): number {
        return this.numeroMatriculas
    }
    
    getNumAprovados(): number {
        return 0;
    }
    
    getNumReprovados(): number {
        return 0;
    }

    getMedia(): number {
        return 0;
    }

    getMatricula(cpf: string): Matricula {
        return null;
    }

    getRoteiros(): Roteiro[] {
        return [];
    }

    getMonitores(): Aluno[] {
        return [];
    }

    getPercentual(meta: string, conceito: string): number {
        return 0;
    }

    getMatriculas(): Matricula[]{


        //Criando atributos para alunos
        let cpfList = ["123", "456", "789", "135"]
        let nomeList = ["João", "Lais", "Gabi", "Erick"]
        let emailList = ["jcp@cin", "lpm@cin", "gcb@cin", "eoc@cin"]

        //Criando alunos
        let alunosList:Aluno[] = []
        for(let i=0; i<cpfList.length; i++){
            alunosList.push(new Aluno())
            alunosList[i].cpf = cpfList[i]
            alunosList[i].nome = nomeList[i]
            alunosList[i].email = emailList[i]
           
        } 

        //Array de matriculas que será retornado e sua inicialização e atribuicao de aluno
        let res: Matricula[] = []
        for(let i=0; i<4; i++){
            res.push(new Matricula())
            res[i].aluno = alunosList[i]
           
        }

        //Criando atributos para Avaliacao
        let metasList = ["Requisitos", "Gerência de Configuração", "Testes"]
        //let conceitosList = ["MANA", "MPA", "MA"]

        let avaliacoes: Avaliacao[] = []
        let autoavaliacoes: Avaliacao[] = []
        for(let i=0; i<3; i++){
           avaliacoes.push(new Avaliacao())
           avaliacoes[i].meta = metasList[i%3]
           autoavaliacoes.push(new Avaliacao())
           autoavaliacoes[i].meta = metasList[i%3]
        } 

                
       
        //Cenário com todas as autoavaliações realizadas e nenhum aluno discrepante
        if(this.descricao=="ESS 2018.1"){
            for(let i=0; i<res.length; i++){
                for(let j=0; j<avaliacoes.length; j++){
                    res[i].avaliacoes = avaliacoes
                    res[i].avaliacoes[j].nota = "MA"
                    res[i].autoAvaliacoes = autoavaliacoes
                    res[i].autoAvaliacoes[j].nota = "MA"
                }
            }
            
            return res
        //Cenário com todas as autoavaliações realizadas e um aluno discrepante
        }else if(this.descricao=="ESS 2018.2"){
            for(let i=1; i<res.length; i++){
                for(let j=0; j<avaliacoes.length; j++){
                    res[i].avaliacoes = avaliacoes
                    res[i].avaliacoes[j].nota = "MA"
                    res[i].autoAvaliacoes = autoavaliacoes
                    res[i].autoAvaliacoes[j].nota = "MA"
                }
            }

            //Aluno com discrepancia

            for(let i=0; i<3; i++){
                res[0].avaliacoes.push(new Avaliacao())
                res[0].avaliacoes[i].meta = metasList[i%3]
                res[0].avaliacoes[i].nota = "MPA"
                res[0].autoAvaliacoes.push(new Avaliacao())
                res[0].autoAvaliacoes[i].meta = metasList[i%3]
                res[0].autoAvaliacoes[i].nota = "MA"
             } 

            
            return res

        //Cenário com autoavaliação não realizada por 1 aluno e com 1 aluno com discrepância
        }else if(this.descricao=="ESS 2019.1"){
            for(let i=2; i<res.length; i++){
                for(let j=0; j<avaliacoes.length; j++){
                    res[i].avaliacoes = avaliacoes
                    res[i].avaliacoes[j].nota = "MA"
                    res[i].autoAvaliacoes = autoavaliacoes
                    res[i].autoAvaliacoes[j].nota = "MA"
                    
                }
            }

            //Aluno com autoavaliação incompleta
            for(let i=0; i<3; i++){
                res[1].avaliacoes.push(new Avaliacao())
                res[1].avaliacoes[i].meta = metasList[i%3]
                res[1].avaliacoes[i].nota = "MPA"
             } 

            //Aluno com discrepancia
            for(let i=0; i<3; i++){
                res[0].avaliacoes.push(new Avaliacao())
                res[0].avaliacoes[i].meta = metasList[i%3]
                res[0].avaliacoes[i].nota = "MPA"
                res[0].autoAvaliacoes.push(new Avaliacao())
                res[0].autoAvaliacoes[i].meta = metasList[i%3]
                res[0].autoAvaliacoes[i].nota = "MA"
             } 

            return res


        //Cenário no qual nenhuma autoavaliacao foi realizada por nenhum aluno
        }else if(this.descricao=="ESS 2019.2"){
            for(let i=0; i<res.length; i++){
                for(let j=0; j<avaliacoes.length; j++){
                    res[i].avaliacoes = avaliacoes
                    res[i].avaliacoes[j].nota = "MA"
                }
            }
            return res

        }else{
            return null
        }
    }
}
