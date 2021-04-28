Feature: As a teacher,
    I want to verificar o status de notificações de notas do alunos
    So that eu consiga saber quais alunos foram notificados e quais não foram notificados

    Scenario: Indica que uma disciplina possui novas atualizações de status de notificação (novas notas notificadas)
        Given Eu estou na tela "Turmas"
        And Eu vejo a turma "ESS-2020.1"
        When eu seleciono a turma "ESS-2020.1"
        And envio novas notificações de notas aos alunos da turma "ESS-2020.1"
        Then eu vejo na tela uma mensagem indicando que a turma "ESS-2020.1" possui novas atualizações de status de notificações

    Scenario: Indica que uma disciplina não possui notificações de notas a serem exibidas, pois todas as notas enviadas já foram notificadas
        Given Eu estou na tela "Turmas"
        And A turma "ESS-2020.1" não possui nenhum aluno matriculado
        When eu seleciono a turma "ESS-2020.1"
        Then eu vejo na tela uma mensagem indicando que a turma "ESS-2020.1" ainda não possui notas enviadas aos alunos, pois não há aluno matriculado

    Scenario: Uma turma possui novos status de notificações de 2 alunos
        Given Eu estou na tela "Turmas"
        And Eu vejo a turma "ESS-2020.1"
        When Eu seleciono a turma "ESS-2020.1"
        Then Eu vejo a mensagem "Essa turma possui um novo de status de notificações"
        Then Eu vejo o aluno "Lucas" com o status "Notificado: Sim" e o aluno "Jorge" com o status "Notificado: Sim"

    Scenario: Indica que todos os alunos de uma turma foram notificados
        Given Eu estou na tela "Turmas"
        And Eu vejo a turma "ESS-2020.1"
        And Todos os alunos da turma "ESS-2020.1" foram notificados
        Then Eu seleciono a turma "ESS-2020.1"
        And Eu vejo a mensagem "Todos os alunos receberam todas as notas da disciplina."