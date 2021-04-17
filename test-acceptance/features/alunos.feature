Feature: As a professor
         I want to register students
         So that I can manage their learning goals

Scenario: Registering student with registered CPF
Given I am at the students page
Given I can see a student with CPF "09876543210" in the students list
When I try to register the student "Morais Lucas" with CPF "09876543210"
Then I cannot see "Morais Lucas" with CPF "09876543210" in the students list
And I can see an error message

Scenario: Registering student with non registered CPF, service
Given the system has no student with CPF "12345678901" 
When I register the student "Lucas" with CPF "12345678901"
Then the system now stores "Lucas" with CPF "12345678901"

Scenario: Registering student with non registered CPF
Given I am at the students page
Given I cannot see a student with CPF "20035989423" in the students list
When I try to register the student "José" with CPF "20035989423"
Then I can see "José" with CPF "20035989423" in the students list