Feature: As a estudante usuário do sistema teaching assistant
         I want adicionar uma nota para uma  meta de conhecimento
	     So that eu poderia ver todas as minhas notas de auto-avaliação


Scenario: adicionar novas notas de auto-avaliação
    Given eu estou na página de auto-avaliacao
    Given eu busco no sistema por CPF "123" e turma "ESS"
    Given eu vejo que não possuo nota para a meta de "entender requisitos"
    When eu preencho nota "7" para a meta "entender requisitos"
    Then eu posso ver um alerta de confirmação de armazenamento dos dados 
    Then eu posso ver que possuo nota "7" para a meta de "entender requistos"



Scenario: adicionar novos conceitos de auto-avaliação
	Given o sistema não possui nenhuma nota de auto-avaliação na meta "entender requisitos" para o aluno com CPF "123" na turma "ESS"
    When eu adiciono a nota "7" a meta "entender requisitos" ao aluno com CPF "123" na turma "ESS"
	Then a nota "7" para a meta "entender requisitos" do aluno com CPF "123" na turma "ESS" é salvo no sistema
    # And a nota do aluno com CPF "123" na turma "ESS" agora é “7” para a meta “entender requisitos”

