require 'spec_helper'

feature 'Internationalization' do

scenario 'french' do
  prefer_language('es;q=1.0,fr-FR;q=0.9,fr;q=0.8,en;q=0.7')
  visit '/'
  expect(page).to have_content 'Publications de'
end

scenario 'english' do
  prefer_language('en-US,en,fr')
  visit '/'
  expect(page).to have_content 'References by'
end

scenario 'other' do
  prefer_language('es')
  visit '/'
  expect(page).to have_content 'References by'
end

end
