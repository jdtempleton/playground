Feature: Visit the Home page
	Everybody wants to visit the home page

	Scenario:
		Given I visit the homepage
		Then I should see the title 'Vite + React + TS'

	Scenario:
		Given I visit the homepage
		Then I should see the heading 'Vite + React'

	Scenario:
		Given I visit the homepage
		Then I should see the Vite logo

	Scenario:
		Given I visit the homepage
		Then I should see the React logo
