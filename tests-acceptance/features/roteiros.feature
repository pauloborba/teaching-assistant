  Feature: As a professor
    I want to cadastrar, atualizar e remover roteiros
    So that Eu possa oferecer atividades aos alunos

    Scenario: Criar um roteiro novo
      Given Eu estou na página roteiros
      And Eu não vejo o roteiro “Roteiro de requisitos” na lista de roteiros
      When Eu tento adicionar um roteiro de nome “Roteiro de requisitos”
      Then Eu vejo o roteiro “Roteiro de requisitos” na lista de roteiros

    Scenario: Acrescentar blocos de questão a um roteiro
      Given Eu estou na página roteiros
      And Eu vejo o roteiro “Roteiro de requisitos” nos roteiros
      And Eu não vejo blocos do tipo "Sequencial" e blocos do tipo "Paralelo"
      When Eu tento registrar um bloco do tipo "Sequencial"
      And Eu tento registrar um bloco do tipo "Paralelo"
      Then Eu vejo "1" blocos do tipo "Sequencial" e "1" blocos do tipo "Paralelo"

    Scenario: Erro ao criar um roteiro com mesmo nome de um já existente
      Given Eu estou na página roteiros
      And Eu vejo o roteiro “Roteiro de requisitos” na lista de roteiros
      When Eu tento adicionar um roteiro de nome “Roteiro de requisitos”
      Then Eu vejo um único roteiro “Roteiro de requisitos” na lista de roteiros

    Scenario: Remover um roteiro existente
      Given Eu estou na página roteiros
      And Eu vejo o roteiro “Roteiro de requisitos” na lista de roteiros
      When Eu tento remover o roteiro “Roteiro de requisitos”
      Then Eu não vejo “Roteiro de requisitos” na lista de roteiros
