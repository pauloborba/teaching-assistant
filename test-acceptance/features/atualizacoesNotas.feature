Feature: Sending email with student grade updates, at most one per day
    -- Implementar parte dos testes do seu projeto: aceitação (um para cada cenário), de classe (pelo menos um, mas busque a quantidade suficiente para testar os aspectos mais relevantes da funcionalidade associada), e de serviço (pelo menos um, mas busque a quantidade suficiente para testar os aspectos mais relevantes da funcionalidade associada)

    Scenario: no updated grades
        Given that no student grades have been updated
        And no updated grades failed to send
        When I go to the "Updated grades" page
        Then I see a message that there no updated grades

    Scenario: one updated grade for each of three students
        Given that the student "Sofia Barros" had the "Configuration Management" grade updated to "MA" at "2021-01-01 19:11"
        And that the student "Davi Santos" had the "Configuration Management" grade updated to "MPA" at "2021-01-02 14:36"
        And that the student "Felipe Souza" had the "Configuration Management" grade updated to "MPA" at "2021-01-02 17:59"
        And it is not past 18:00
        When I go to the "Updated grades" page
        Then I see a list with "Sofia Barros - Configuration Management: MA - 2021-01-01 at 19:11"
        And I see a list with "Davi Santos - Configuration Management: MPA - 2021-01-02 at 14:36"
        And I see a list with "Felipe Souza - Configuration Management: MPA - 2021-01-02 at 17:59"

    Scenario: one updated grade for two students and two updated grades for another
        Given that the student "Diogo Correia" had the "Configuration Management" grade updated to "MPA" at "2021-01-01 18:01"
        And that the student "Ana Silva" had the "Configuration Management" grade updated to "MA" at "2021-01-02 11:54"
        And that the student "Laura Melo" had the "Requirements" grade updated to "MA" at "2021-01-02 15:29"
        And that the student "Laura Melo" had the "Configuration Management" grade updated to "MPA" at "2021-01-02 15:29"
        And it is not past 18:00
        When I go to the "Updated grades" page
        Then I see a list with "Diogo Correia - Configuration Management: MPA - 2021-01-01 at 18:01"
        And I see a list with "Ana Silva - Configuration Management: MA - 2021-01-02 at 11:54"
        And I see a list with "Laura Melo - Requirements: MA; Configuration Management: MPA - 2021-01-02 at 15:29"

    Scenario: failed to send two updated grades to one student
        Given that the student "Laura Melo" had the "Requirements" grade updated to "MA" at "2021-01-02 15:29"
        And that the student "Laura Melo" had the "Configuration Management" grade updated to "MPA" at "2021-01-02 15:29"
        And it is past 18:00
        And it failed to send the updated grades to the student "Laura Melo"
        And no student grades have been updated after 18:00
        When I go to the "Updated grades" page
        Then I see a list with "Laura Melo - Requirements: MA; Configuration Management: MPA - 2021-01-02 at 15:29 - Failed to send; Next try: 2021-01-02 at 19:00"
