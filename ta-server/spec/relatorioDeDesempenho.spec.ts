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
		var relatorioDeDesempenho = `{"_turma":"2020.1","_aprovados":7,"_reprovados":0,"_aprovadosPorMedia":3,"_reprovadosPorFalta":7,"_reprovadosPorNota":0,"_aguardandoFinal":3,"_total":10,"_aprovadosPorcentagem":0.7,"_reprovadosPorcentagem":0,"_aprovadosPorMediaPorcentagem":0.3,"_reprovadosPorFaltaPorcentagem":0.7,"_reprovadosPorNotaPorcentagem":0,"_aguardandoFinalPorcentagem":0.3,"_totalPorcentagem":1}`;

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
		var relatorioDeDesempenho = `{"_turma":"2019.2","_aprovados":7,"_reprovados":0,"_aprovadosPorMedia":3,"_reprovadosPorFalta":0,"_reprovadosPorNota":0,"_aguardandoFinal":3,"_total":10,"_aprovadosPorcentagem":0.7,"_reprovadosPorcentagem":0,"_aprovadosPorMediaPorcentagem":0.3,"_reprovadosPorFaltaPorcentagem":0,"_reprovadosPorNotaPorcentagem":0,"_aguardandoFinalPorcentagem":0.3,"_totalPorcentagem":1}`;
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
			'{"_turma":"2020.2","_aprovados":3,"_reprovados":7,"_aprovadosPorMedia":2,"_reprovadosPorFalta":0,"_reprovadosPorNota":7,"_aguardandoFinal":0,"_total":10,"_aprovadosPorcentagem":0.3,"_reprovadosPorcentagem":0.7,"_aprovadosPorMediaPorcentagem":0.2,"_reprovadosPorFaltaPorcentagem":0,"_reprovadosPorNotaPorcentagem":0.7,"_aguardandoFinalPorcentagem":0,"_totalPorcentagem":1}';
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
			'{"_turma":"2020.3","_aprovados":1,"_reprovados":0,"_aprovadosPorMedia":1,"_reprovadosPorFalta":0,"_reprovadosPorNota":0,"_aguardandoFinal":9,"_total":10,"_aprovadosPorcentagem":0.1,"_reprovadosPorcentagem":0,"_aprovadosPorMediaPorcentagem":0.1,"_reprovadosPorFaltaPorcentagem":0,"_reprovadosPorNotaPorcentagem":0,"_aguardandoFinalPorcentagem":0.9,"_totalPorcentagem":1}';
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
