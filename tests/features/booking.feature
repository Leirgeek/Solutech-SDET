Feature: Tour Booking
  As a guest user
  I want to be able to book tours
  So that I can plan my travel

  Scenario: View available tours
    Given I am on the home page
    Then I should see a list of available tours
    And each tour should display destination, price, and description

  Scenario: Book a tour as a guest
    Given I am on the home page
    When I select a tour from the list
    And I click on "Book Now"
    And I fill in the booking form with:
      | Field       | Value            |
      | Name        | John Doe         |
      | Email       | john@example.com |
      | Phone       | +1234567890      |
      | Passengers  | 2                |
    And I submit the booking form
    Then I should see a booking confirmation message
    And I should be able to generate a ticket

  Scenario: Generate ticket after booking
    Given I have completed a tour booking
    When I click on "Generate Ticket"
    Then I should see my ticket with booking details
    And the ticket should include:
      | Field       |
      | Tour Name   |
      | Date        |
      | Passengers  |
      | Total Price |
      | Booking ID  |
