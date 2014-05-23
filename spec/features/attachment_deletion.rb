require 'spec_helper'

feature 'Delete the attachement' do

  background do
    visit '/'
    click_on 'Créer...'
    upload_file('uploader','spec/samples/sample.pdf')
   end
  
  scenario 'Delete' do
    click_on 'Supprimer la pièce jointe'
    in_dialog.click_button 'Oui'
    page.should_not have_content 'sample.pdf'
  end


end
