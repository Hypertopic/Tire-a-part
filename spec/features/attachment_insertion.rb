require 'spec_helper'

feature 'Insert the attachement' do
  background do
    visit '/'
    click_on 'Créer...'
    fill_in 'Auteurs', :with => 'Professeur Shadoko'
  end

  scenario 'Insert' do
    upload_file('uploader','spec/samples/sample.pdf')
    page.should have_content 'sample.pdf'
    page.should have_content 'Professeur Shadoko'
  end
  

end
