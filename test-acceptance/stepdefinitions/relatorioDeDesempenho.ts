import { defineSupportCode } from "cucumber";
import {
	browser,
	$,
	element,
	by,
} from "protractor";
let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;
import request = require("request-promise");

defineSupportCode(function ({ Given, When, Then }) {
	Given(
		/^eu estou na página Relatório de desempenho da turma na visualização da turma "(.*)"$/,
		async (turma) => {
			await browser.get(
				`http://localhost:4200/relatorio-de-desempenho/${turma}`
			);
			await expect(browser.getTitle()).to.eventually.equal("TaGui");
		}
	);

	Given(/^a turma possui "(\d*)" alunos$/, async (qtdDeAlunos) => {
		element(by.name("total"))
			.getText()
			.then((text) => text == qtdDeAlunos);
	});

	Given(/^ainda não foram atribuídas notas da prova final$/, async () => {
		element(by.name("aguardandoFinal"))
			.getText()
			.then((text) => parseInt(text) > 0);
	});

	Then(
		/^eu poderei ver a tabela com as quantidade e porcentagens para cada categoria$/,
		async () => {
			await expect(
				await element(by.name("aprovados")).getText()
			).not.equal("NaN");
			await expect(
				await element(by.name("reprovados")).getText()
			).not.equal("NaN");
			await expect(
				await element(by.name("aprovadosPorMedia")).getText()
			).not.equal("NaN");
			await expect(
				await element(by.name("reprovadosPorNota")).getText()
			).not.equal("NaN");
			await expect(
				await element(by.name("reprovadosPorFalta")).getText()
			).not.equal("NaN");
			await expect(
				await element(by.name("aguardandoFinal")).getText()
			).not.equal("NaN");
			await expect(await element(by.name("total")).getText()).not.equal(
				"NaN"
			);
			await expect(
				await element(by.name("aprovadosPercentual")).getText()
			).not.equal("NaN%");
			await expect(
				await element(by.name("reprovadosPercentual")).getText()
			).not.equal("NaN%");
			await expect(
				await element(by.name("aprovadosPorMediaPercentual")).getText()
			).not.equal("NaN%");
			await expect(
				await element(by.name("reprovadosPorNotaPercentual")).getText()
			).not.equal("NaN%");
			await expect(
				await element(by.name("reprovadosPorFaltaPercentual")).getText()
			).not.equal("NaN%");
			await expect(
				await element(by.name("aguardandoFinalPercentual")).getText()
			).not.equal("NaN%");
			await expect(
				await element(by.name("totalPercentual")).getText()
			).not.equal("NaN%");
		}
	);

	Then(/^abaixo da tabela haverá a informação "(.*)"$/, async (info) => {
		await expect(
			await element(by.name("dadosFaltando")).getText()
		).equal(info);
	});

	Given(/^todas as notas já foram atribuídas$/, async () => {
		element(by.name("aguardandoFinal"))
			.getText()
			.then((text) => parseInt(text) == 0);
	});

	Then(
		/^"(\d*)" dos "(\d*)" alunos da turma foram "(.*)"$/,
		async (alunos, totalDeAlunos, tipoDaInformacao) => {
			if (
				tipoDaInformacao == "Reprovados por falta"
			) {
				await expect(
					await element(by.name("reprovadosPorFalta")).getText()
				).equal(alunos);
				await expect(await element(by.name("total")).getText()).equal(
					totalDeAlunos
				);
			}
			else if (
				tipoDaInformacao == "Aprovados"
			) {
				await expect(
					await element(by.name("aprovados")).getText()
				).equal(alunos);
				await expect(await element(by.name("total")).getText()).equal(
					totalDeAlunos
				);
			}
		}
	);

	Then(
		/^"(\d*)" dos "(\d*)" alunos da turma estão "(.*)"$/,
		async (alunosReprovadosPorFalta, totalDeAlunos, tipoDaInformacao) => {
			if (tipoDaInformacao == "Aguardando final") {
				await expect(
					await element(by.name("aguardandoFinal")).getText()
				).equal(alunosReprovadosPorFalta);
				await expect(await element(by.name("total")).getText()).equal(
					totalDeAlunos
				);
			}
		}
	);

	Then(
		/^a linha "(.*)", coluna "(.*)" apresentará a informação "(.*)"$/,
		async (linha, coluna, reprovadosPorFaltaPercentual) => {
			if (linha == "Reprovados por falta" && coluna == "Percentual de Alunos") {
				await expect(
					await element(
						by.name("reprovadosPorFaltaPercentual")
					).getText()
				).equal(reprovadosPorFaltaPercentual);
			}
			else if (linha == "Aprovados" && coluna == "Percentual de Alunos") {
				await expect(
					await element(
						by.name("aprovadosPercentual")
					).getText()
				).equal(reprovadosPorFaltaPercentual);
			}
			else if (linha == "Aguardando final" && coluna == "Percentual de Alunos") {
				await expect(
					await element(
						by.name("aguardandoFinalPercentual")
					).getText()
				).equal(reprovadosPorFaltaPercentual);
			}
		}
	);
});
