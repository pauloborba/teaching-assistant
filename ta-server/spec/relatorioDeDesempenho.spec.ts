import { RelatorioDeDesempenho } from "../../common/relatorioDesempenho";
import request = require("request-promise");

var base_url = "http://localhost:3000/";

describe("O servidor", () => {
	var server: any;
	beforeAll(() => {
		server = require("../ta-server");
	});
	afterAll(() => {
		server.closeServer();
	});

	it("retorna relatorio de desempenho da turma 2020.1", () => {
		var relatorioDeDesempenho = `{"turma":"2020.1","aprovados":7,"reprovados":0,"aprovadosPorMedia":3,"reprovadosPorFalta":7,"reprovadosPorNota":0,"aguardandoFinal":3,"total":10,"aprovadosPorcentagem":0.7,"reprovadosPorcentagem":0,"aprovadosPorMediaPorcentagem":0.3,"reprovadosPorFaltaPorcentagem":0.7,"reprovadosPorNotaPorcentagem":0,"aguardandoFinalPorcentagem":0.3,"totalPorcentagem":1}`;

		return request
			.get(base_url + "turmas/relatorio-de-desempenho/2020.1")
			.then((body) => {
				expect(body).toBe(relatorioDeDesempenho);
			})
			.catch((e) => {
				expect(e).toEqual(null);
			});
	});

	it("retorna relatorio de desempenho da turma 2019.2", () => {
		var relatorioDeDesempenho = `{"turma":"2019.2","aprovados":7,"reprovados":0,"aprovadosPorMedia":3,"reprovadosPorFalta":0,"reprovadosPorNota":0,"aguardandoFinal":3,"total":10,"aprovadosPorcentagem":0.7,"reprovadosPorcentagem":0,"aprovadosPorMediaPorcentagem":0.3,"reprovadosPorFaltaPorcentagem":0,"reprovadosPorNotaPorcentagem":0,"aguardandoFinalPorcentagem":0.3,"totalPorcentagem":1}`;
		return request
			.get(base_url + "turmas/relatorio-de-desempenho/2019.2")
			.then((body) => {
				expect(body).toBe(relatorioDeDesempenho);
			})
			.catch((e) => {
				expect(e).toEqual(null);
			});
	});

	it("retorna relatorio de desempenho da turma 2020.2", () => {
		var relatorioDeDesempenho =
			'{"turma":"2020.2","aprovados":3,"reprovados":7,"aprovadosPorMedia":2,"reprovadosPorFalta":0,"reprovadosPorNota":7,"aguardandoFinal":0,"total":10,"aprovadosPorcentagem":0.3,"reprovadosPorcentagem":0.7,"aprovadosPorMediaPorcentagem":0.2,"reprovadosPorFaltaPorcentagem":0,"reprovadosPorNotaPorcentagem":0.7,"aguardandoFinalPorcentagem":0,"totalPorcentagem":1}';
		return request
			.get(base_url + "turmas/relatorio-de-desempenho/2020.2")
			.then((body) => {
				expect(body).toBe(relatorioDeDesempenho);
			})
			.catch((e) => {
				expect(e).toEqual(null);
			});
	});

	it("retorna relatorio de desempenho da turma 2020.3", () => {
		var relatorioDeDesempenho =
			'{"turma":"2020.3","aprovados":1,"reprovados":0,"aprovadosPorMedia":1,"reprovadosPorFalta":0,"reprovadosPorNota":0,"aguardandoFinal":9,"total":10,"aprovadosPorcentagem":0.1,"reprovadosPorcentagem":0,"aprovadosPorMediaPorcentagem":0.1,"reprovadosPorFaltaPorcentagem":0,"reprovadosPorNotaPorcentagem":0,"aguardandoFinalPorcentagem":0.9,"totalPorcentagem":1}';
		return request
			.get(base_url + "turmas/relatorio-de-desempenho/2020.3")
			.then((body) => {
				expect(body).toBe(relatorioDeDesempenho);
			})
			.catch((e) => {
				expect(e).toEqual(null);
			});
	});
});
