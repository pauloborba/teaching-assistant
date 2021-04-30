Feature: As a teacher,
    I want to verificar o status de notificações de notas do alunos
    So that eu consiga saber quais alunos foram notificados e quais não foram notificados

    Scenario: Indica que uma disciplina possui novas atualizações de status de notificação (novas notas notificadas)
        Given eu estou na tela "Turmas"
        And eu vejo a turma "ESS-2020.1"
        When eu seleciono a turma "ESS-2020.1"
        And envio novas notificações de notas aos alunos da turma "ESS-2020.1"
        Then eu vejo na tela uma mensagem indicando que a turma "ESS-2020.1" possui novas atualizações de status de notificações

    Scenario: Indica que uma disciplina não possui notificações de notas a serem exibidas, pois não há alunos matriculados
        Given eu estou na tela "Turmas"
        And eu vejo a turma "ESS-2020.2"
        And a turma "ESS-2020.2" não possui nenhum aluno matriculado
        When eu seleciono a turma "ESS-2020.2"
        Then eu vejo na tela uma mensagem indicando que a turma "ESS-2020.2" ainda não possui notas enviadas aos alunos, pois não há aluno matriculado

     Scenario: Indica que todos os alunos de uma turma foram notificados
        Given eu estou na tela "Turmas"
        And eu vejo a turma "ESS-2020.1"
        When eu seleciono a turma "ESS-2020.1"
        And envio novas notificações de notas aos alunos da turma "ESS-2020.1"
        Then eu vejo a mensagem "Todos os alunos receberam todas as notas da disciplina"

      Scenario: Indica quais alunos de uma turma foram notificados
        Given eu estou na tela "Turmas"
        And eu vejo a turma "SI-2020.1"
        When eu seleciono a turma "SI-2020.1"
        And envio novas notificações de notas aos alunos da turma "SI-2020.1"
        Then eu vejo o aluno "Lucas" com o status "Notificado: Sim" e o aluno "João" com o status "Notificado: Sim"