export class Aluno {
    nome: String;
    cpf: String;
    email: String;
    matriculas: String[] = [];

    getNome(): String {
        return this.nome
    }

    getCpf(): String {
        return this.cpf
    }

    getEmail(): String {
        return this.email
    }
    getMatriculas(): String[] {
        return this.matriculas;
    }
}