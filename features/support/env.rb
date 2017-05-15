require 'capybara/poltergeist'


Capybara.run_server = false
Capybara.default_driver = :poltergeist
Capybara.app_host = "http://localhost:5984/"

