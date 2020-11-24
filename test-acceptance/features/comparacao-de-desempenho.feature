Feature: As a professor
         I want to compare my classes performances
         So that I know where to improve

    Scenario: Average grade chart with the last 4 classes
        Given I am at the classes page
        And I can see the class "2017.2" with average grade "6.7" at the classes list
        And I can see the class "2018.1" with average grade "7.3" at the classes list
        And I can see the class "2018.2" with average grade "7.1" at the classes list
        And I can see the class "2019.1" with average grade "6.8" at the classes list
        And I can see the class "2019.2" with average grade "7.8" at the classes list
        When I request a performance comparison
        And I select the option to compare the last four classes
        Then I am at the performance comparison page
        And I can see a chart with the classes average grades
        And the average grade chart has "4" points
        And the average grade chart associates the class "2018.1" to the average grade "7.3"
        And the average grade chart associates the class "2018.2" to the average grade "7.1"
        And the average grade chart associates the class "2019.1" to the average grade "6.8"
        And the average grade chart associates the class "2019.2" to the average grade "7.8"

    Scenario: Average grade chart with chosen classes
        Given I am at the classes page
        And I can see the class "2017.2" with average grade "6.7" at the classes list
        And I can see the class "2018.1" with average grade "7.3" at the classes list
        And I can see the class "2018.2" with average grade "7.1" at the classes list
        And I can see the class "2019.1" with average grade "6.8" at the classes list
        And I can see the class "2019.2" with average grade "7.8" at the classes list
        When I request a performance comparison
        And I select the option to choose classes
        And I choose the classes "2017.2" and "2019.1"
        Then I am at the performance comparison page
        And I can see a chart with the classes average grades
        And the average grade chart has "2" points
        And the average grade chart associates the class "2017.2" to the average grade "6.7"
        And the average grade chart associates the class "2019.1" to the average grade "6.8"

    Scenario: Average grade chart with all classes
        Given I am at the classes page
        And I can see the class "2017.2" with average grade "6.7" at the classes list
        And I can see the class "2018.1" with average grade "7.3" at the classes list
        And I can see the class "2018.2" with average grade "7.1" at the classes list
        And I can see the class "2019.1" with average grade "6.8" at the classes list
        And I can see the class "2019.2" with average grade "7.8" at the classes list
        When I request a performance comparison
        And I select the option to compare all classes
        Then I am at the performance comparison page
        And I can see a chart with the classes average grades
        And the average grade chart has "5" points
        And the average grade chart associates the class "2017.2" to the average grade "6.7"
        And the average grade chart associates the class "2018.1" to the average grade "7.3"
        And the average grade chart associates the class "2018.2" to the average grade "7.1"
        And the average grade chart associates the class "2019.1" to the average grade "6.8"
        And the average grade chart associates the class "2019.2" to the average grade "7.8"

    Scenario: Attempt to compare when there is only 1 class
        Given I am at the classes page
        And I can only see the class "2019.2" in the classes list
        When I request a performance comparison
        Then I can see an error message stating I can't request a performance comparison