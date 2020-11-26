Feature: As um Aluno
         I want ver as metas de cada aluno
         So visualizar com cores

Scenario: Visualizando aluno abaixo da media e reprovado em anos anteriores
Given Eu estou na pagina de metas
Given Eu vejo o aluno com CPF "12345" na lista de estudantes
Then Eu vejo a linha da cor do aluno com CPF "12345" na cor "orange"

Scenario: Visualizando aluno reprovado em anos anteriores
Given Eu estou na pagina de metas
Given Eu vejo o aluno com CPF "34567" na lista de estudantes
Then Eu vejo a linha da cor do aluno com CPF "34567" na cor "yellow"

Scenario: Visualizando aluno reprovado em anos anteriores
Given Eu estou na pagina de metas
Given Eu vejo o aluno com CPF "13579" na lista de estudantes
Then Eu vejo a linha da cor do aluno com CPF "13579" na cor "red"

Scenario: Visualizando aluno sem reprovações anteriores e acima da nota
Given Eu estou na pagina de metas
Given Eu vejo o aluno com CPF "40028922" na lista de estudantes
Then Eu vejo a linha da cor do aluno com CPF "40028922" na cor "white"