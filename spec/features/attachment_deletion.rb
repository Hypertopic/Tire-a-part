require 'spec_helper'

feature 'Delete the attachement' do

  background do
    visit '/'
    click_on 'Créer...'
    click_on 'Importer un fichier'
    attach_file('file','example.pdf')
    click_on 'déposer'
  end
  
  scenario 'Delete' do
    click_on 'Supprimer la pièce jointe'
    in_dialog.click_button 'Oui'
  end


end
