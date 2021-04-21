Feature: Outliers on students self-evaluations



Scenario: All students did their evaluation and there is no outlier
Given I am at the self-evaluation page
And the class "ESS 2018.1" with the goals "Requisitos", "Gerência de Configuração" e "Testes" is stored in the system
And the student "João" with CPF "123" with "MA" in all his evaluations and self-evaluations enrolled on the "ESS 2018.1" class is stored in the system
And the student "Lais" with CPF "456" with "MA" in all his evaluations and self-evaluations enrolled on the "ESS 2018.1" class is stored in the system
And the student "Gabi" with CPF "789" with "MA" in all his evaluations and self-evaluations enrolled on the "ESS 2018.1" class is stored in the system
And the student "Erick" with CPF "135" with "MA" in all his evaluations and self-evaluations enrolled on the "ESS 2018.1" class is stored in the system
When I request to see the outliers self-evaluations of the class "ESS 2018.1" 
Then I can see the 3 goals "Requisitos", "Gerência de Configuração" e "Testes" 
And I can see "João" with CPF "123" with "MA" in all his evaluations and self-evaluations
And I can see "Lais" with CPF "456" with "MA" in all his evaluations and self-evaluations
And I can see "Gabi" with CPF "789" with "MA" in all his evaluations and self-evaluations
And I can see "Erick" with CPF "135" with "MA" in all his evaluations and self-evaluations
And I see that there is "0" outliers and that there is "0%" of outliers 

Scenario: All students did their evaluation and there is one outlier
Given I am at the self-evaluation page
And the class "ESS 2018.2" with the goals "Requisitos", "Gerência de Configuração" e "Testes" is stored in the system
And the student "João" with CPF "123" with "MPA" in all his evaluations and "MA" in all his self-evaluations enrolled on the "ESS 2018.2" class is stored in the system
And the student "Lais" with CPF "456" with "MA" in all his evaluations and self-evaluations enrolled on the "ESS 2018.2" class is stored in the system
And the student "Gabi" with CPF "789" with "MA" in all his evaluations and self-evaluations enrolled on the "ESS 2018.2" class is stored in the system
And the student "Erick" with CPF "135" with "MA" in all his evaluations and self-evaluations enrolled on the "ESS 2018.2" class is stored in the system
When I request to see the outliers self-evaluations of the class "ESS 2018.2" 
Then I can see the 3 goals "Requisitos", "Gerência de Configuração" e "Testes" 
And I can see "João" with CPF "123" with "MPA" in all his evaluations and "MA" in all his self-evaluations
And I can see "João" with CPF "123" marked with "red"
And I can see "Lais" with CPF "456" with "MA" in all his evaluations and self-evaluations
And I can see "Gabi" with CPF "789" with "MA" in all his evaluations and self-evaluations
And I can see "Erick" with CPF "135" with "MA" in all his evaluations and self-evaluations
And I see that there is "1" outliers and that there is "25%" of outliers 


Scenario: One outlier and one student without self-evaluation
Given I am at the self-evaluation page
And the class "ESS 2019.1" with the goals "Requisitos", "Gerência de Configuração" e "Testes" is stored in the system
And the student "João" with CPF "123" with "MPA" in all his evaluations and "MA" in all his self-evaluations enrolled on the "ESS 2018.2" class is stored in the system
And the student "Lais" with CPF "456" with "MA" in all his evaluations and no self-evaluation enrolled on the "ESS 2018.2" class is stored in the system 
And the student "Gabi" with CPF "789" with "MA" in all his evaluations and self-evaluations enrolled on the "ESS 2018.2" class is stored in the system
And the student "Erick" with CPF "135" with "MA" in all his evaluations and self-evaluations enrolled on the "ESS 2018.2" class is stored in the system
When I request to see the outliers self-evaluations of the class "ESS 2019.1" 
Then I can see the 3 goals "Requisitos", "Gerência de Configuração" e "Testes" 
And I can see "João" with CPF "123" with "MPA" in all his evaluations and "MA" in all his self-evaluations
And I can see "João" with CPF "123" marked with "red"
And I can see "Lais" with CPF "456" with "MPA" in all his evaluations and no self-evaluation
And I can see "Lais" with CPF "456" marked with "orange"
And I can see "Gabi" with CPF "789" with "MA" in all his evaluations and self-evaluations
And I can see "Erick" with CPF "135" with "MA" in all his evaluations and self-evaluations
And I see that there is "1" outliers and that there is "33%" of outliers 

Scenario: No student did their self-evaluation
Given I am at the self-evaluation page
And the class "ESS 2019.2" with the goals "Requisitos", "Gerência de Configuração" e "Testes" is stored in the system
And the student "João" with CPF "123" with "MPA" in all his evaluations and "MA" in all his self-evaluations enrolled on the "ESS 2018.2" class is stored in the system
And the student "Lais" with CPF "456" with "MA" in all his evaluations and no self-evaluation enrolled on the "ESS 2019.2" class is stored in the system 
And the student "Gabi" with CPF "789" with "MA" in all his evaluations and no self-evaluation enrolled on the "ESS 2019.2" class is stored in the system
And the student "Erick" with CPF "135" with "MA" in all his evaluations and no self-evaluation enrolled on the "ESS 2019.2" class is stored in the system
When I request to see the outliers self-evaluations of the class "ESS 2019.2" 
Then I can see the 3 goals "Requisitos", "Gerência de Configuração" e "Testes" 
And I can see "João" with CPF "123" with "MA" in all his evaluations and no self-evaluation 
And I can see "João" with CPF "123" marked with "orange"
And I can see "Lais" with CPF "456" with "MA" in all his evaluations and no self-evaluation
And I can see "Lais" with CPF "456" marked with "orange"
And I can see "Gabi" with CPF "789" with "MA" in all his evaluations and no self-evaluation
And I can see "Gabi" with CPF "789" marked with "orange"
And I can see "Erick" with CPF "135" with "MA" in all his evaluations and no self-evaluation
And I can see "Erick" with CPF "135" marked with "orange"
And I see that there is "0" outliers and that there is "0%" of outliers 

