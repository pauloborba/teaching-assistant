Feature: As a professor
         I want to notify students of their self evaluation
         So that I can see how they grade themselves

Scenario: Envio de solicitação de auto-avaliação para alunos da turma
Given I am at the auto-avaliacao page
Given I am at the "ESS" class
When I select the topics "Requisitos" and "Refatoração"
When I send the self-grade request to all students
Then I see an AA in the color green under the selected topics

Scenario: Notificação do fim da auto-avaliação para o professor
Given All students have completed their self evaluation
When I open the auto-avaliacao page
Then I can see a notification stating that the students have completed their self evaluation

Scenario: Notificação de fim de tempo para auto-avaliação
Given At least one student did not do their self evaluation
When I open the auto-avaliacao page
Then I can see a message listing the students who did not complete the self evaluation

Scenario: Envio de solicitação de auto avaliação sem selecionar os tópicos
Given I am at the auto-avaliacao page
Given I am at the "ESS" class
When I send the self-grade request to all students
Then I can see an error message
