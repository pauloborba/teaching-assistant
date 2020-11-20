Feature: As a professor
         I want to notify students of their self evaluation
         So that I can see how they grade themselves

Scenario: Envio de solicitação de auto-avaliação para alunos da turma
Given I am at the "auto-avaliacao" page
Given I am logged as a "professor"
When I select the topics "Entender conceitos de requisitos" and "Especificar requisitos com qualidade"
And I set the time limit as "5 dias
And send the self-grade request to all students
Then I see an "AA" in the color "green" under the selected topics

Scenario: Notificação do fim da auto-avaliação para o professor
Given I am logged in the application as a "professor"
Given All students have completed their self evaluation
When I open the "auto-avaliacao" page
Then I can see a notification stating that the students have completed their self evaluation

Scenario: Notificação de fim de tempo para auto-avaliação
Given I am logged in the application as a "professor"
Given At least one student did not do their self evaluation
When I open the "auto-avaliacao" page
Then I can see a message listing the students who did not complete the self evaluation

Scenario: Envio de solicitação de auto avaliação sem selecionar os tópicos
Given I am logged as a "professor"
Given I am at the "auto-avaliacao" page
When I send the self-grade request, but with no topics
Then I can see and error message
