import { Turmas } from "../turmas";
import { Turma } from "../../common/turma";

describe("Retorno de turma", () => {
    var turmas: Turmas = new Turmas()


  it("retorna turma correta com base na descricao", () => {
    var turma = new Turma()
    turma.descricao = "ESS 2018.1"
    turma.metas = ["Requisitos", "Gerência de Configuração", "Testes"]
    expect(turmas.getTurma("ESS 2018.1")).toEqual(turma)
  })  
})

