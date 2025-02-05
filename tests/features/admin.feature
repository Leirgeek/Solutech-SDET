Feature: Admin Tour Management
  As an admin
  I want to manage tours and view bookings
  So that I can maintain the booking system

  Scenario: Create new tour
    Given I am logged in as an admin
    When I navigate to "Create Tour" page
    And I fill in the tour details:
      | Field         | Value                     |
      | Name         | Paris City Tour           |
      | Destination  | Paris, France             |
      | Description  | Explore the city of love  |
      | Price        | 299.99                    |
      | Available    | 20                        |
      | Start Date   | 2025-03-01               |
    And I click "Create Tour"
    Then I should see a success message
    And the new tour should appear in the tours list

  Scenario: View all bookings
    Given I am logged in as an admin
    When I navigate to "All Bookings" page
    Then I should see a list of all bookings
    And each booking should display:
      | Field        |
      | Booking ID   |
      | Customer     |
      | Tour         |
      | Date        |
      | Status      |

  Scenario: View all tickets
    Given I am logged in as an admin
    When I navigate to "All Tickets" page
    Then I should see a list of all generated tickets
    And each ticket should display:
      | Field        |
      | Ticket ID    |
      | Booking ID   |
      | Customer     |
      | Tour         |
      | Status      |

  Scenario: Filter and search bookings
    Given I am logged in as an admin
    And I am on the "All Bookings" page
    When I search for "Paris"
    Then I should see bookings related to "Paris" tours
    When I filter by date "2025-03-01"
    Then I should see bookings for that date
