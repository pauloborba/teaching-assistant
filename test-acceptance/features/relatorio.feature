Feature: Relatório de informações (média, desvio, etc.) sobre o tempo levado para responder os roteiros, correlacionando com erros e acertos.

Cenário: relatório com preenchimento vazio
Given o aluno está na pagina inicial
Given o sistema tem "0" matriculas
When o aluno entrar na tela de relatório sobre os roteiros
Then ele visualiza o campo média com o valor em branco
Then o campo desvio com o valor em branco  
Then o campo de correlacao com o valor em branco


Cenário: relatório com preenchimento total
Given o aluno está na pagina de roteiros
Given o sistema tem "2" matriculas
Given a matricula "1" respondeu a questao "1" em "2" miniutos
Given a questao "1" da matricula "1" está com o campo "correcao" igual a "Errado"
Given a matricula "1" respondeu a questao "2" em "7" miniutos
Given a questao "2" da matricula "1" está com o campo "correcao" igual a "Certo"
Given a matricula "2" respondeu a questao "1" em "1" miniutos
Given a questao "1" da matricula "2" está com o campo "correcao" igual a "Errado"
Given a matricula "1" respondeu a questao "2" em "6" miniutos
Given a questao "2" da matricula "2" está com o campo "correcao" igual a "Certo"
Given a média de preenchimento foi "4"
Given o desvio da média foi de "2.5"
Given a correlacao foi de "0.98"
When ele entrar na tela de relatório sobre os roteiros
Then ele visualiza o campo média com o valor "4"
Then ele visualiza o campo desvio da média com o valor "2.5"
Then ele visualiza o campo corelacao com o valor "0.98"