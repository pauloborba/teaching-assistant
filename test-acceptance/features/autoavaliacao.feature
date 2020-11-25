Feature: As a estudante usuário do sistema teaching assistant
         I want adicionar uma nota para uma  meta de conhecimento
	     So that eu poderia ver todas as minhas notas de auto-avaliação


Scenario: adicionar novas notas de auto-avaliação
    Given eu estou na página de "auto-avaliacao"
	And eu logo no sistema com CPF "123" e turma "ESS"
	And eu vejo que não possuo nota para a meta de "entender requisitos"
	When eu seleciono para preencher as auto-avaliações
	And eu preencho nota "7" para a meta "entender requisitos"
    # And eu preencho nota “6” para a meta “elicitar requisitos”
	# And eu preencho nota “8” para a meta “refatorar código com qualidade”
	# And eu seleciono para armazenar as notas
	Then eu posso ver uma mensagem  de confirmação de armazenamento dos dados 
	And eu posso ver que possuo nota "7" para a meta de "entender requistos"
