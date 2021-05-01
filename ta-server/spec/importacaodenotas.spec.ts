import { ImportacaoDeNotas} from '../importacaodenotas';
import {Matricula} from '../../common/matricula';
import{ Turma } from '../../common/turma';
import {Avaliacao} from '../../ta-server/avaliacao'
import {Aluno } from '../../common/aluno';

var stub_turma1 = new Turma("");
stub_turma1.descricao = "ESS";
stub_turma1.metas = ["Requisitos", "Ger. de Configuração", "Ger. de Projetos"];
var stub_matricula1 = new Matricula();
var stub_matricula2 = new Matricula();
var stub_aluno1 = new Aluno();
var stub_aluno2 = new Aluno();
stub_aluno1.nome = "João";
stub_aluno1.cpf = "123";
stub_aluno2.nome = "Maria";
stub_aluno2.cpf = "456";
stub_matricula1.aluno = stub_aluno1;
stub_matricula2.aluno = stub_aluno2;
let stub_avalicao = new Avaliacao;
stub_avalicao.setMeta("Requisitos");
stub_avalicao.setNota("");
let stub_avalicao1 = new Avaliacao;
stub_avalicao1.setMeta("Ger. de Configuração");
stub_avalicao1.setNota("");
let stub_avalicao2 = new Avaliacao;
stub_avalicao2.setMeta("Ger. de Projetos");
stub_avalicao2.setNota("");
stub_matricula1.avaliacoes = [stub_avalicao,stub_avalicao1,stub_avalicao2];
stub_matricula2.avaliacoes = [stub_avalicao,stub_avalicao1,stub_avalicao2];
stub_turma1.matriculas = [stub_matricula1, stub_matricula2];

function getaval(cpf:string){
    return stub_turma1.getMatricula(cpf).getAvaliacoes()
}

describe("A importação de notas", () =>{
    let importacao: ImportacaoDeNotas;

    beforeEach(() => importacao = new ImportacaoDeNotas)
    beforeEach(() => stub_turma1.matriculas = [stub_matricula1, stub_matricula2])
    

    it("agrupa notas corretamente", () =>{
        const planilha = [{"CPF":"123","Meta1":"MA","Meta2":"MPA","Meta3": "MA"},
                          {"CPF":"456","Meta1":"MA","Meta2":"MA","Meta3": "MPA"}]
        let retorno = importacao.metaGroup(planilha);
        expect(retorno[0][1].nota).toEqual("MPA");
        expect(retorno[1][1].nota).toEqual("MA");
    })

    it("importa planilhas corretamente",() =>{
        const planilha = [{"CPF":"123","Requisitos":"MA","Ger. de Configuração":"MPA","Ger. de Projetos": "MA"},
                          {"CPF":"456","Requisitos":"MA","Ger. de Configuração":"MA","Ger. de Projetos": "MPA"}]
        let retorno = importacao.metaGroup(planilha);
        
        expect(importacao.importar(stub_turma1,retorno)).toBe(true);
        let avals = getaval("123")
        expect(avals[0].nota).toEqual("MA")
    })


    it("importa colunas corretamente",() =>{
        const planilha = [{"CPF":"123","Ger. de Configuração":"MPA"},
                          {"CPF":"456","Ger. de Configuração":"MA"}]
        let retorno = importacao.metaGroup(planilha);
        
        expect(importacao.importar(stub_turma1,retorno)).toBe(true);
        let avals = getaval("456")
        expect(avals[1].nota).toEqual("MA")
    })

    it("rejeita planilhas com um formato diferente",() =>{
        const planilha = [{"CPF":"123","Requisitos":"MA","Curvas de Bezier":10,"Ger. de Projetos": "MA"},
                          {"CPF":"456","Requisitos":"MA","Curvas de Bezier":10,"Ger. de Projetos": "MPA"}]
        let retorno = importacao.metaGroup(planilha);
        
        expect(importacao.importar(stub_turma1,retorno)).toBe(false);
        let avals = getaval("123")
        expect(avals[0].nota).toEqual("MA")
    })
});