Feature: Relatório de informações (média, desvio, etc.) sobre o tempo levado para responder os roteiros, correlacionando com erros e acertos.

Cenário: relatório com preenchimento vazio
Given nenhum aluno preencheu o roteiro
When ele entrar na “tela de relatório sobre os roteiros”
Then ele visualiza o campo média com o valor ‘Não calculada’
Then o campo desvio com o valor ’Não calculado’  
Then gráficos de barras com pouco destaque e com uma mensagem de fundo ‘Não informado’ 

Cenário: relatório com preenchimento parcial
Given o sistema tem os alunos “Gabriel” e “Marcos”
Given o aluno “Gabriel” respondeu em “120m”
Given o aluno “Marcos” respondeu em “240m”
Given a média de preenchimento foi “180m”
Given o desvio da média foi de “60”
When ele entrar na “tela de relatório sobre os roteiros”
Then ele visualiza o campo média com o valor “180 m”
Then o desvio da média foi “60”
Then O valor d

Cenário: relatório com preenchimento total
And o sistema tem os alunos “Gabriel” e “Marcos”
And o aluno “Gabriel” respondeu em “120m”
And o aluno “Marcos” respondeu em “240m”
And a média de preenchimento foi “180m”
And o desvio da média foi de “60”
When ele entrar na “tela de relatório sobre os roteiros”
Then ele visualiza o campo média com o valor "180m"
And o desvio da média foi “60”

Cenário:  relatório com informações detalhadas
And o sistema tem os alunos “Gabriel” e “Marcos”
And o aluno “Gabriel” respondeu em “120m”
And o aluno “Marcos” respondeu em “240m”
And a média de preenchimento foi “180m”
And o desvio da média foi de “60”
When ele entrar na “tela de relatório sobre os roteiros”
And expande as informações que estão em detalhes
Then ele visualiza o campo média com o valor “180m”
And o desvio da média com “60”
And um gráfico relacionando o tempo de resposta e a taxa de acerto das questões
