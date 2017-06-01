require 'spec_helper'

feature 'Supprimer une piece jointe' do

  background do
    visit '/'
    click_on 'Créer...'
    fill_in 'creator', :with => 'Frédéric Merle, Aurélien Bénel, Guillaume Doyen, Dominique Gaïti'
    fill_in 'title', :with => == 'Decentralized documents authoring system for decentralized teamwork: matching architecture with organizational structure'
    click_on 'Enregistrer'
    click_on 'Ajouter un fichier'
    attach_file('file','fichierracine.pdf')
    in_dialog.click_button 'Oui'
    click_on 'déposer'
  end
  
  scenario 'supprimer' do
    click_on 'Supprimer la pièce jointe'
    in_dialog.click_button 'Oui'
  end


end
