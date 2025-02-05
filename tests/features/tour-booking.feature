Feature: Tour Booking and Management
  As a user of the booking system
  I want to be able to book tours and manage bookings
  So that I can plan my travels effectively

  Scenario: Guest books a tour from home page
    Given I am on the home page
    When I select a tour from the available tours list
    And I fill in the booking details
      | Field     | Value           |
      | Name      | John Doe        |
      | Email     | john@email.com  |
      | Phone     | +1234567890     |
      | Travelers | 2               |
    And I confirm the booking
    Then I should see a booking confirmation
    And I should be able to generate a ticket

  Scenario: Admin creates a new tour
    Given I am logged in as an admin
    When I navigate to the tour management page
    And I click on "Create New Tour" button
    And I fill in the tour details
      | Field       | Value                     |
      | Name        | Safari Adventure          |
      | Destination | Masai Mara                |
      | Price       | 1500                      |
      | Slots       | 20                        |
      | Description | Experience wildlife safari |
    And I save the tour
    Then the tour should appear in the tours list

  Scenario: Admin views all bookings
    Given I am logged in as an admin
    When I navigate to the bookings page
    Then I should see a list of all bookings
    And each booking should display customer details
    And each booking should have a ticket status

  Scenario: Admin views all tickets
    Given I am logged in as an admin
    When I navigate to the tickets page
    Then I should see a list of all generated tickets
    And each ticket should be linked to a booking
    And I should be able to view ticket details
