Feature: As a professor
         I want to notify students of their self evaluation
         So that I can see how they grade themselves

Scenario: Envio de solicitação de auto-avaliação para alunos da turma
Given I am at the auto-avaliacao page
Given I am at the "ESS" class
When I select the topics "Requisitos" and "Refatoração"
When I send the self-grade request to all students
Then I see a confirmation message

Scenario: Escolha de turma inexistente
Given I am at the auto-avaliacao page
When I select the class ""
Then I see an error message

Scenario: Notificação de fim de tempo para auto-avaliação
Given At least one student did not do their self evaluation
When I open the auto-avaliacao page
Then I can see a message listing the students who did not complete the self evaluation

Scenario: Envio de solicitação de auto avaliação sem selecionar os tópicos
Given I am at the auto-avaliacao page
Given I am at the "ESS" class
When I send the self-grade request to all students
Then I see an error message

Feature: As a estudante usuário do sistema teaching assistant
         I want adicionar uma nota para uma  meta de conhecimento
	     So that eu poderia ver todas as minhas notas de auto-avaliação


Scenario: adicionar novas notas de auto-avaliação
    Given eu estou na página de auto-avaliacao
    Given eu busco no sistema por CPF "123" e turma "ESS"
    Given eu vejo que não possuo nota para a meta de "entender requisitos"
    When eu preencho nota "7" para a meta "entender requisitos"
    Then eu posso ver um alerta de confirmação de armazenamento dos dados 
    Then eu posso ver que possuo nota "7" para a meta de "entender requisitos"



Scenario: adicionar novos conceitos de auto-avaliação
	Given o sistema não possui nenhuma nota de auto-avaliação na meta "entender requisitos" para o aluno com CPF "123" na turma "ESS"
    When eu adiciono a nota "7" a meta "entender requisitos" ao aluno com CPF "123" na turma "ESS"
	Then a nota "7" para a meta "entender requisitos" do aluno com CPF "123" na turma "ESS" é salvo no sistema

