require 'capybara/poltergeist'

Capybara.run_server=false
Capybara.default_driver = :poltergeist
Capybara.app_host = 'https://localhost:5984/'
