import { RelatorioDeDesempenho } from "./relatorioDesempenho";
import { Matricula } from "./matricula";
import { Roteiro } from "./roteiro";
import { Aluno } from "./aluno";

export class Turma {
	descricao: string;
	metas: string[];
	vagas: number;
	matriculas: Matricula[];
	roteiros: Roteiro[];
	monitores: Aluno[];
	questoesCertas: number;
	questoesErradas: number;


	constructor() {
		this.descricao = "";
		this.vagas = 0;
		this.metas = [];
		this.matriculas = [];
		this.roteiros = [];
		this.monitores = [];
		this.questoesCertas = 0;
		this.questoesErradas = 0;
	}

	copyFrom(from: Turma): void {
		this.descricao = from.descricao;
		this.vagas = from.vagas;
		this.metas = from.metas;
		this.matriculas = from.matriculas;
		this.roteiros = from.roteiros;
		this.monitores = from.monitores;
	}

	get numMatriculas(): number {
		return this.matriculas.length;
	}

	get numAprovados(): number {
		let numAprovados = 0;

		this.matriculas.forEach((matricula: Matricula) => {
			const matriculaAux = new Matricula();
			matriculaAux.copyFrom(matricula);
			if (matriculaAux.media >= 5) ++numAprovados;
		});
		return numAprovados;
	}

	get numAprovadosPorMedia(): number {
		let aprovadosPorMedia = 0;
		this.matriculas.forEach((matricula: Matricula) => {
			const matriculaAux = new Matricula();
			matriculaAux.copyFrom(matricula);
			if (matriculaAux.media >= 7) ++aprovadosPorMedia;
		});

		return aprovadosPorMedia;
	}

	get numReprovadosPorNota(): number {
		let reprovadosPorNota = 0;
		this.matriculas.forEach((matricula: Matricula) => {
			const matriculaAux = new Matricula();
			matriculaAux.copyFrom(matricula);
			if (matriculaAux.media < 3) ++reprovadosPorNota;
		});

		return reprovadosPorNota;
	}

	get numReprovados(): number {
		let reprovados =
			this.numMatriculas - this.numAprovados - this.aguardandoFinal;
		return reprovados;
	}

	get media(): number {
		if (this.numMatriculas > 0) {
			let totalMedias = 0;

			this.matriculas.forEach((matricula: Matricula) => {
				const matriculaAux = new Matricula();
				matriculaAux.copyFrom(matricula);
				totalMedias += matriculaAux.media;
			});

			return totalMedias / this.numMatriculas;
		}

		return 0;
	}

	get aguardandoFinal() {
		let aguardandoFinal = 0;
		this.matriculas.forEach((matricula: Matricula) => {
			const matriculaAux = new Matricula();
			matriculaAux.copyFrom(matricula);
			if (matriculaAux.media >= 3 && matriculaAux.media <= 5)
				++aguardandoFinal;
		});

		return aguardandoFinal;
	}

	get reprovadoPorFalta() {
		let reprovadosPorFalta = 0;
		this.matriculas.forEach((matricula: Matricula) => {
			const matriculaAux = new Matricula();
			matriculaAux.copyFrom(matricula);
			if (matriculaAux.reprovadoPorFalta) ++reprovadosPorFalta;
		});

		return reprovadosPorFalta;
	}

	getMatricula(cpf: string): Matricula {
		return this.matriculas.find((matricula) => matricula.aluno.cpf === cpf);
	}

	getPercentual(meta: string, conceito: string): number {
		return 0; /* TODO */
	}
}
