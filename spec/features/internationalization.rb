require 'spec_helper'

feature 'Internationalization' do

scenario 'french' do
  prefer_language('es;q=1.0,fr-FR;q=0.9,fr;q=0.8,en;q=0.7')
  visit '/'
  page.should have_content 'Publications de'
end

scenario 'english' do
  prefer_language('en-US,en,fr')
  visit '/'
  page.should have_content 'References by'
end

scenario 'other' do
  prefer_language('es')
  visit '/'
  page.should have_content 'References by'
end

end
