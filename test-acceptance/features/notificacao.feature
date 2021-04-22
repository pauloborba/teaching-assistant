Feature: Notificação
# Cenário de GUI:

Scenario: Quando um aluno específico tirou MA, e outros dois alunos tiraram MPA nessa meta(cenário com 3 alunos).
	Given eu obtive 2.5 acertos na meta "Entender conceitos de Requisitos"	
	And a aluna "Maria Almeida" obteve MPA na meta "Entendendo conceitos de requisitos"
	And o aluno "Carlos Almeida" obteve MPA na meta "Entendendo conceitos de requisitos"
	And estou na tela de caixa de entrada do meu email	
	When clico para ler esse novo email recebido
	Then posso ver um novo email mostrando o meu número de acertos como 2.5 e meu conceito como MA para a meta "Entender conceitos de Requisitos"
	And posso ver os percentuais da turma como "MANA - 0 alunos - 00.0%, MPA - 2 alunos - 66.7%, MA - 1 alunos - 33.3%"

Scenario: Quando um aluno especificado tirou MA, e outros dois alunos tiraram MA também na mesma meta(cenário com 3 alunos).
	Given eu obtive MA (conceito MA) na meta "Entender conceitos de Requisitos"
	And a aluna "Maria Almeida" obteve 2.5 acertos na meta "Entendendo conceitos de requisitos"
	And o aluno "Carlos Almeida" obteve MA na meta "Entendendo conceitos de requisitos"
	And estou na tela de caixa de entrada do meu email
	When clico para ler esse novo email recebido
	Then posso ver um novo email mostrando o meu conceito como MA para a meta "Entender conceitos de Requisitos"
	And posso ver os percentuais da turma como "MANA - 0 alunos - 00.0%, MPA - 0 alunos -0.00%, MA - 1 alunos - 100%"

Scenario: Quando um aluno especificado tirou MPA, e outros dois alunos tiraram MA e MANA, respectivamente( cenário com 3 alunos).
	Given eu obtive MPA (conceito MPA) na meta "Entender conceitos de Requisitos"
	And a aluna "Maria Almeida" obteve MA na meta "Entendendo conceitos de requisitos"
	And o aluno "Carlos Almeida" obteve 1 acertos na meta "Entendendo conceitos de requisitos"
	And estou na tela de caixa de entrada do meu email
	And recebo um email da disciplina a respeito do questionário
	When clico para ler esse novo email recebido
	Then posso ver um novo email mostrando o meu número de acertos como 2.5 e meu conceito como MA para a meta "Entender conceitos de Requisitos"
	And posso ver os percentuais da turma como "MANA - 1 alunos - 33.3%, MPA - 1 alunos - 33.3%, MA - 1 alunos - 33.3%"

# Cenário de Serviço
Scenario: Quando um aluno específico tirou MA, e outros dois alunos tiraram MPA nessa meta(cenário com 3 alunos).
	Given o sistema está com nenhum questionário sobre "Entendendo conceitos de requisitos" respondido armazenado
	Given o aluno "João Oliveira" obteve 2.5 acertos na meta "Entendendo conceitos de requisitos"
	And a aluna "Maria Almeida" obteve MPA na meta "Entendendo conceitos de requisitos"
	And o aluno "Carlos Almeida" obteve MPA na meta "Entendendo conceitos de requisitos"
	When o sistema coleta as respostas de todos os alunos
	Then o sistema envia um email para "João Oliveira" informando que ele obteve 2.5 acertos e conceito MA
	And informando os percentuais da turma como "MANA - 0 alunos - 00.0%, MPA - 2 alunos - 66.7%, MA - 1 alunos - 33.3%"

Scenario: Quando um aluno específico tirou MA, e outros dois alunos tiraram MA nessa meta(cenário com 3 alunos).
	Given o sistema está com nenhum questionário sobre "Entendendo conceitos de requisitos" respondido armazenado
	Given o aluno "João Oliveira" obteve MA na meta "Entendendo conceitos de requisitos"
	And a aluna "Maria Almeida" ainda não preencheu o questionário
	And o aluno "Carlos Almeida" ainda não preencheu o questionário
	When o sistema coleta as respostas de todos os alunos
	Then o sistema ainda não envia um email para "João Oliveira"