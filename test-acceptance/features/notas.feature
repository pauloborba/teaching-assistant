Feature: As a professor
         I want to register students grades

Scenario: Seeing student grade
Given I am at the "notas" page
When I select the turma "2019.2" with matricula "815.098.557-34 - Adriana Vitória Ferreira"
Then I can see student "815.098.557-34 - Adriana Vitória Ferreira" and the matricula grades

Scenario: Changing student grade
Given I am at the "notas" page
When I select the turma "2019.2" with matricula "815.098.557-34 - Adriana Vitória Ferreira"
When I click "Atribuir/Editar" button
When I fill the input with "MANA"
When I click "Salvar" button
Then I must see "MANA" in the grade

Scenario: Remove a student grade
Given I am at the "notas" page
When I select the turma "2019.2" with matricula "815.098.557-34 - Adriana Vitória Ferreira"
When I click "Remover" button
Then I must see "Sem nota" in the grade

Scenario: Changing student grade with an invalid grade
Given I am at the "notas" page
When I select the turma "2019.2" with matricula "815.098.557-34 - Adriana Vitória Ferreira"
When I click "Atribuir/Editar" button
When I fill the input with "10"
When I click "Salvar" button
Then I must see the popup
