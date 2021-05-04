export class RelatorioDeDesempenho {
	private _turma: string;
	private _aprovados: number;
	private _reprovados: number;
	private _aprovadosPorMedia: number;
	private _reprovadosPorFalta: number;
	private _reprovadosPorNota: number;
	private _aguardandoFinal: number;
	private _total: number;
	private _aprovadosPorcentagem: number;
	private _reprovadosPorcentagem: number;
	private _aprovadosPorMediaPorcentagem: number;
	private _reprovadosPorFaltaPorcentagem: number;
	private _reprovadosPorNotaPorcentagem: number;
	private _aguardandoFinalPorcentagem: number;
	private _totalPorcentagem: number;

	get turma(): string {
		return this._turma;
	}

	get aprovados(): number {
		return this._aprovados;
	}

	get reprovados(): number {
		return this._reprovados;
	}

	get aprovadosPorMedia(): number {
		return this._aprovadosPorMedia;
	}

	get reprovadosPorFalta(): number {
		return this._reprovadosPorFalta;
	}

	get reprovadosPorNota(): number {
		return this._reprovadosPorNota;
	}

	get aguardandoFinal(): number {
		return this._aguardandoFinal;
	}

	get total(): number {
		return this._total;
	}

	get aprovadosPorcentagem(): number {
		return this._aprovadosPorcentagem;
	}

	get reprovadosPorcentagem(): number {
		return this._reprovadosPorcentagem;
	}

	get aprovadosPorMediaPorcentagem(): number {
		return this._aprovadosPorMediaPorcentagem;
	}

	get reprovadosPorFaltaPorcentagem(): number {
		return this._reprovadosPorFaltaPorcentagem;
	}

	get reprovadosPorNotaPorcentagem(): number {
		return this._reprovadosPorNotaPorcentagem;
	}

	get aguardandoFinalPorcentagem(): number {
		return this._aguardandoFinalPorcentagem;
	}

	get totalPorcentagem(): number {
		return this._totalPorcentagem;
	}

	// Setters
	set turma(turma: string) {
		this._turma = turma;
	}

	set aprovados(aprovados: number) {
		this._aprovados = aprovados;
	}

	set reprovados(reprovados: number) {
		this._reprovados = reprovados;
	}

	set aprovadosPorMedia(aprovadosPorMedia: number) {
		this._aprovadosPorMedia = aprovadosPorMedia;
	}

	set reprovadosPorFalta(reprovadosPorFalta: number) {
		this._reprovadosPorFalta = reprovadosPorFalta;
	}

	set reprovadosPorNota(reprovadosPorNota: number) {
		this._reprovadosPorNota = reprovadosPorNota;
	}

	set aguardandoFinal(aguardandoFinal: number) {
		this._aguardandoFinal = aguardandoFinal;
	}

	set total(total: number) {
		this._total = total;
	}

	set aprovadosPorcentagem(aprovadosPorcentagem: number) {
		this._aprovadosPorcentagem = aprovadosPorcentagem;
	}

	set reprovadosPorcentagem(reprovadosPorcentagem: number) {
		this._reprovadosPorcentagem = reprovadosPorcentagem;
	}

	set aprovadosPorMediaPorcentagem(aprovadosPorMediaPorcentagem: number) {
		this._aprovadosPorMediaPorcentagem = aprovadosPorMediaPorcentagem;
	}

	set reprovadosPorFaltaPorcentagem(reprovadosPorFaltaPorcentagem: number) {
		this._reprovadosPorFaltaPorcentagem = reprovadosPorFaltaPorcentagem;
	}

	set reprovadosPorNotaPorcentagem(reprovadosPorNotaPorcentagem: number) {
		this._reprovadosPorNotaPorcentagem = reprovadosPorNotaPorcentagem;
	}

	set aguardandoFinalPorcentagem(aguardandoFinalPorcentagem: number) {
		this._aguardandoFinalPorcentagem = aguardandoFinalPorcentagem;
	}

	set totalPorcentagem(totalPorcentagem: number) {
		this._totalPorcentagem = totalPorcentagem;
	}

	copyFrom(from: RelatorioDeDesempenho) {
		this.turma = from._turma;
		this.aprovados = from._aprovados;
		this.reprovados = from._reprovados;
		this.aprovadosPorMedia = from._aprovadosPorMedia;
		this.reprovadosPorFalta = from._reprovadosPorFalta;
		this.reprovadosPorNota = from._reprovadosPorNota;
		this.aguardandoFinal = from._aguardandoFinal;
		this.total = from._total;
		this.aprovadosPorcentagem = from._aprovados / from._total;
		this.reprovadosPorcentagem = from._reprovados / from._total;
		this.aprovadosPorMediaPorcentagem = from._aprovadosPorMedia / from._total;
		this.reprovadosPorFaltaPorcentagem =
			from._reprovadosPorFalta / from._total;
		this.reprovadosPorNotaPorcentagem = from._reprovadosPorNota / from._total;
		this.aguardandoFinalPorcentagem = from._aguardandoFinal / from._total;
		this.totalPorcentagem = from._total / from._total;
	}
}
