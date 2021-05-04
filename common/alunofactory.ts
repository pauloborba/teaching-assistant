import { Aluno } from "./aluno";

export type AlunoData = {
    nome: string,
    email: string
}

export class AlunoFactory {
    criarAluno(alunoData: AlunoData): Aluno {
        const aluno = new Aluno();

        // Setar o nome do aluno
        aluno.nome = alunoData.nome;
        // Setar o email do aluno
        aluno.email = alunoData.email;

        return aluno;
    }
}