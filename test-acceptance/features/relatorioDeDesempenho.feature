Feature: Relatório de Desempenho
    As um monitor ou professor
    I want to ver o relatório de uma turma
    So that eu possa ter um panorama de como está a situação da turma

Scenario: Visualizando o relatório de desempenho da turma com parte dos dados
Given eu estou na página Relatório de desempenho da turma na visualização da turma "2019.2"
Given a turma possui "10" alunos
Given ainda não foram atribuídas notas da prova final
Then eu poderei ver a tabela com as quantidade e porcentagens para cada categoria
And abaixo da tabela haverá a informação "Dados apresentados estão incompletos"

Scenario: Visualizando o relatório de desempenho da turma com todos os dados e alta taxa de reprovação por falta
Given eu estou na página Relatório de desempenho da turma na visualização da turma "2020.1"
Given a turma possui "10" alunos
Given todas as notas já foram atribuídas
Then eu poderei ver a tabela com as quantidade e porcentagens para cada categoria
And "7" dos "10" alunos da turma foram "Reprovados por falta"
And a linha "Reprovados por falta", coluna "Percentual de Alunos" apresentará a informação "70,00%"

Scenario: Visualizando o relatório de desempenho da turma com todos os dados e baixa taxa de aprovação
Given eu estou na página Relatório de desempenho da turma na visualização da turma "2020.2"
Given a turma possui "10" alunos
Given todas as notas já foram atribuídas
Then eu poderei ver a tabela com as quantidade e porcentagens para cada categoria
And "3" dos "10" alunos da turma foram "Aprovados"
And a linha "Aprovados", coluna "Percentual de Alunos" apresentará a informação "30,00%"

Scenario: Visualizando o relatório de desempenho da turma com todos os dados e alta taxa de alunos na final
Given eu estou na página Relatório de desempenho da turma na visualização da turma "2020.3"
Given a turma possui "10" alunos
Given ainda não foram atribuídas notas da prova final
Then eu poderei ver a tabela com as quantidade e porcentagens para cada categoria
And "9" dos "10" alunos da turma estão "Aguardando final"
And a linha "Aguardando final", coluna "Percentual de Alunos" apresentará a informação "90,00%"
And abaixo da tabela haverá a informação "Dados apresentados estão incompletos"
