Scenario:“Importação de planilha completa”
Given eu estou na página de notas da disciplina “ESS” que possui os alunos “Pedro” e “Mariana”
And no arquivo “planilha.csv” temos os alunos “Pedro” com as notas “8”, “8” e “10”
And “Mariana” com as notas “9”, “7” e “10”
And não há notas dessa disciplina armazenadas no sistema
When eu importo a planilha “planilha.csv”
//And seleciono sua coluna de nome “A”
//And suas colunas de nota “B” e “D”
Then as notas “8”, ”8” e ”10” do aluno “Pedro” são registradas pelo sistema
And as notas “9”, “7” e “10” da aluna “Mariana” são registradas pelo sistema
And as notas são mostradas para o usuário

Scenario:“Importação de apenas uma coluna de uma planilha”
Given eu estou na página de notas da disciplina “ESS” que possui os alunos “Pedro” e “Mariana”
And no arquivo “planilha.csv” temos os alunos “Pedro” com as notas “8”, “8” e “10”
And “Mariana” com as notas “9”, “7” e “10”
And não há notas dessa disciplina armazenadas no sistema
When eu importo a planilha “planilha.csv”
And seleciono sua coluna de nome “A”
And suas colunas de nota “C” e “C”
Then as notas da coluna C da planilha, ”8” e “7”, são registradas pelo sistema
And o usuário pode ver a nova coluna que foi adicionada

Scenario:“Importação de uma planilha incompatível à disciplina"
Given eu estou na página de notas da disciplina “ESS” que possui os alunos “Pedro” e “Mariana”
And no arquivo “planilhaerrada.csv” temos os alunos “Pedro” com as notas “8”, “B” e “10”
And “Mariana” com as notas “9”, “7”, “A” e “35”
When eu importo a planilha “planilhaerrada.csv”
And seleciono sua coluna de nome “A”
And suas colunas de nota “B” e “Z”
Then o sistema reconhece que o formato da planilha está errado
And uma mensagem de erro é mostrada para o usuário

Scenario:“Importação de uma planilha em um disciplina que já tem notas armazenadas”
Given eu estou na página de notas da disciplina “ESS”
And há notas dessa disciplina armazenadas no sistema
When eu importo a planilha “planilha.csv”
And seleciono sua coluna de nome “A”
And suas colunas de nota “B” e “D”
Then uma mensagem é mostrada para o usuário perguntando se o usuário deseja sobrescrever os dados
