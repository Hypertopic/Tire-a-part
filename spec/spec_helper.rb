require 'capybara/rspec'
require 'capybara/webkit'

Capybara.run_server = false
Capybara.default_driver = :webkit
Capybara.app_host = 
  'http://127.0.0.1:5984/tire-a-part/_design/tire-a-part/_rewrite'

def a_string()
  s = ('a'..'z').to_a.shuffle[0,8].join
end

def in_dialog()
  f = find('.ui-dialog')
end

def prefer_language(language)
  page.driver.header 'Accept-Language', language
end
