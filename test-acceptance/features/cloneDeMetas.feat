Feature: As a professor
         Eu quero clonar metas de uma outra turma
         Para que eu nao precise cadastrar todas as metas sempre

Scenario: clone de metas
Given eu estou na página de “Metas”
And eu não tenho metas cadastradas para a turma “ESS 2020.3”
And a turma “ESS 2019.2” possui as seguintes metas cadastradas “Requisitos” e “Gerência de Configurações” 
When eu tento clonar as metas da turma “ESS 2019.2” para “ESS 2020.3”
Then eu recebo uma mensagem de confirmacao
And eu seleciono “confirmar”
Then eu estou na página de “Metas”
And turma “ESS 2020.3” tem as metas “Requisitos” e “Gerência de Configurações” cadastradas no sistema.	

Scenario: clone de meta já cadastrada
Given eu estou na página de “Metas”
And a turma “ESS 2020.3” tem a meta “Requisitos” cadastrada
And turma “ESS 2019.2” tem a meta “Requisitos” cadastrada
When eu tento clonar as metas da turma “ESS 2019.2” para “ESS 2020.3”
Then eu recebo uma mensagem de confirmacao
And eu seleciono “confirmar”
And eu estou na página de “Metas”
And turma “ESS 2020.3” possui a meta “Requisitos” 

Scenario: clone de metas
Given eu estou na página de “Metas”
And a turma “ESS 2020.3” tem a meta “Testes” cadastrada
And turma “ESS 2019.2” possui as seguintes metas cadastradas “Requisitos” e “Gerência de Configurações” 
When eu tento clonar as metas da turma “ESS 2019.2” para “ESS 2020.3”
Then eu recebo uma mensagem de confirmacao
And eu seleciono “confirmar”
Then eu estou na página de “Metas”
And turma “ESS 2020.3” tem as metas “Testes”, “Requisitos” e “Gerência de Configurações” cadastradas no sistema.	

Scenario: get metas
Given a turma “ESS 2018.1” está armazenada no sistema com as metas “Requisitos”, “Projetos” e “Testes”
When eu solicito ao sistema as metas de “ESS 2018.1”
Then o sistema retorna “Requisitos”, “Projetos” e “Testes”
And a turma “ESS 2018.1” está armazenada no sistema com as metas “Requisitos”, “Projetos” e “Testes”
