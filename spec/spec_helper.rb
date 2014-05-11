require 'capybara/rspec'
require 'capybara/webkit'

Capybara.run_server = false
Capybara.default_driver = :webkit
Capybara.app_host = 
  'http://127.0.0.1:5984/tire-a-part/_design/tire-a-part/_rewrite'

RSpec.configure do |config|
  config.before(:each) do
    prefer_language 'fr'
  end
end

def a_string()
  s = ('a'..'z').to_a.shuffle[0,8].join
end

def in_dialog()
  f = find('.ui-dialog')
end

def prefer_language(language)
  page.driver.header 'Accept-Language', language
end

def sample(name)
  IO.read("spec/samples/#{name}.bib")
end

def field(id)
  find_by_id(id).value
end 

# for select boxes handled by Chosen
def fill_in_and_select(value, options)
  options[:visible] = false
  select value, options
end

def check_downloaded_file_name(filename)
  page.driver.response_headers['Content-Disposition'].should have_content filename
end
