Feature: User Authentication
  As a user of the booking system
  I want to be able to authenticate
  So that I can access my account

  Scenario: Failed login with invalid credentials
    Given I am on the login page
    When I enter invalid email "invalid@example.com"
    And I enter invalid password "wrongpassword"
    And I click the login button
    Then I should see an error message

  Scenario: Successful login with valid credentials
    Given I am on the login page
    When I enter valid email "admin@account.com"
    And I enter valid password "password"
    And I click the login button
    Then I should be redirected to the dashboard
