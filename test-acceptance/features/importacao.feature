Feature:Importação de alunos
        As a professor
        I want to importar alunos através de uma planilha csv
        So that eu importe vários alunos de uma vez

Scenario: Enviar uma planilha com dados de alunos já cadastrados
Given eu estou na página de alunos
Given apenas os alunos "Lucas" e "Alyson" de emails "lucas@cin.ufpe.br" e "alyson@cin.ufpe.br" estão presentes na lista de alunos cadastrados
When eu vou para a página de importar alunos
And eu seleciono a planilha de nome "alunos_repetidos.csv"
Then aparece um aviso avisando que "2" dos alunos já estavam cadastrados
And eu vejo "lucas@cin.ufpe.br", "alyson@cin.ufpe.br", "gil@cin.ufpe.br", "maria@cin.ufpe.br", "claudia@cin.ufpe.br" e "joão@cin.ufpe.br" nos emails da lista de alunos

Scenario: Enviar uma planilha vazia
Given eu estou na página de alunos
Given não existem alunos cadastrados na lista de alunos
When eu vou para a página de importar alunos
And eu seleciono uma planilha vazia de nome "planilha-vazia.csv"
Then aparece uma mensagem de erro escrito "Foi selecionada uma planilha vazia."
And ainda não existem alunos cadastrados na lista de alunos

Scenario: Enviar uma planilha de alunos com sucesso
Given eu estou na página de alunos
Given não existem alunos cadastrados na lista de alunos
When eu vou para a página de importar alunos
And eu seleciono a planilha de nome "joao-maria.csv"
Then os alunos de email "joao@cin.ufpe.br" e "maria@cin.ufpe.br" aparecem na lista de alunos

Scenario: Enviar uma planilha em um formato diferente do esperado
Given eu estou na página de alunos
Given apenas a aluna de email "julia@cin.ufpe.br" está cadastrada
When eu vou para a página de importar alunos
And eu seleciono o arquivo de uma planilha de nome "sem-email.csv" que não tem os dados do email na coluna de logins
Then aparece uma mensagem de erro escrito "planilha não contém os dados de email de um ou mais alunos!"
And na página de alunos, a aluna de email "julia@cin.ufpe.br" continua sendo a única cadastrada