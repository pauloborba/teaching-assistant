Feature:

Scenario:“Importação de planilha completa”
Given eu estou na página de notas da disciplina “ESS” que possui os alunos “Pedro” e “Mariana”
When Eu importo a planilha “test.csv”
Then eu recebo confirmação do armazenamento das notas

Scenario:“Importação de uma planilha em um disciplina que já tem notas armazenadas”
Given eu estou na página de notas da disciplina “ESS”
And há notas dessa disciplina armazenadas no sistema
When eu importo a planilha “test.csv”
Then uma mensagem é mostrada para o usuário perguntando se o usuário deseja sobrescrever os dados

Scenario:“Importação de apenas uma coluna de uma planilha”
Given eu estou na página de notas da disciplina “ESS” que contém os alunos “Pedro” e “Mariana”
And eu importo a planilha chamada “test.csv”
When seleciono sua coluna de notas “2” 
Then as notas da coluna "2" são registradas pelo sistema
And eu recebo uma confirmação do armazenamento das notas


Scenario:“Importação de uma planilha incompatível à disciplina"
Given eu estou na página de notas da cadeira “ESS” 
When eu importo a planilha “testerrado.csv”
Then o sistema reconhece que o formato da planilha está errado
And uma mensagem de erro é mostrada para o usuário
