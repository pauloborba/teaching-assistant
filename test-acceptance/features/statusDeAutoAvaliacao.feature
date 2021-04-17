Feature: As a professor
         I want to see students self-evaluation
         So that I can go along with their learning goals

Scenario: Getting Class 1 with three different self-evaluation status strings
Given I am at the students page
When I try to get a class with id "ESS 2020.1"
Then I can see a class with id "ESS 2020.1"
Then I can see "Carlos Eduardo" with status "concluido" in the students list
Then I can see "Carimbo da Silva" with status "iniciado mas nao concluido" in the students list
Then I can see "Macaule Cauque" with status "nao iniciado" in the students list

Scenario: Getting Class 2 with three different self-evaluation status strings
Given I am at the students page
When I try to get a class with id "ESS 2020.3"
Then I can see a class with id "ESS 2020.3"
Then I can see "Pablo" with status "concluido" in the students list
Then I can see "Luciano" with status "nao iniciado" in the students list
Then I can see "Brenner" with status "nao iniciado" in the students list

Scenario: Getting Class 1 with three different self-evaluation status
Given I am at the students page
When I try to get a class with id "ESS 2020.1"
Then I can see a class with id "ESS 2020.1"
Then I can see "Carlos Eduardo" with color status "green" in the students list
Then I can see "Carimbo da Silva" with color status "blue" in the students list
Then I can see "Macaule Cauque" with color status "orange" in the students list



Scenario: Getting Class 2 with three different self-evaluation status
Given I am at the students page
When I try to get a class with id "ESS 2020.3"
Then I can see a class with id "ESS 2020.3"
Then I can see "Pablo" with color status "green" in the students list
Then I can see "Luciano" with color status "orange" in the students list
Then I can see "Brenner" with color status "orange" in the students list