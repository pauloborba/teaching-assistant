Feature: As a professor
         I want to assign roteiros to turmas
         So that I can evaluate students development

Scenario: Assign Roteiro to Turma with scheduled deadline(success)
Given I am logged in
Given I am at the "Associar Roteiros" page
Given I can see “Roteiro 3” on the roteiros list
Given I can see “Turma 2020.1” on the turma list
When I select the roteiro "Roteiro 3"
When I select the turma "Turma 2020.1"
When I select the due date "12/02/2020"
Then I am at the "Turma 2020.1" info page
Then I can see "Roteiro 3" assigned with due date "12/02/2020"

Scenario: Assign Roteiro to Turma with no scheduled deadline(success)
Given I am logged in
Given I am at the "Associar Roteiros" page
Given I can see “Roteiro 3” on the roteiros list
Given I can see “Turma 2020.1” on the turma list
When I select the roteiro "Roteiro 3"
When I select the turma "Turma 2020.1"
When I select no due date
Then I am at the "Turma 2020.1" info page
Then I can see "Roteiro 3" assigned with no due date

Scenario: Assign Roteiro to Turma with no roteiro selected(fail)
Given I am logged in
Given I am at the "Associar Roteiros" page
Given I can see "Turma 2020.1" on the turmas list
When I select the turma "Turma 2020.1"
When I select the due date "12/02/2020"
Then I can see a fail message about the unselected roteiro

Scenario: Assign Roteiro to more than one Turma(success)
Given I am logged in
Given I am at the "Associar Roteiros" page
When I select the roteiro "Roteiro 3"
When I select the turma "Turma 2020.1"
When I select the turma "Turma 2020.1 2"
When I select the due date "12/02/2020"
Then I can see a success message about the Roteiros assignment
Then I can see the “Roteiro 3” on the "Turma 2020.1" roteiros list
Then I can see the “Roteiro 3” on the "Turma 2020.1 2" roteiros list
