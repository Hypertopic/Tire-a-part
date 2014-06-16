require 'spec_helper'

feature 'Delete a record' do

  $a_title = a_string()

  background do
    visit '/'
    click_on 'Créer...' 
    fill_in 'Titre', :with => $a_title
    fill_in 'Année', :with => '1885'
    click_on 'Enregistrer'    
  end

  scenario 'for any record' do
    click_on 'Supprimer...'
    expect(page).to have_content 'Voulez-vous supprimer cette notice ?'
    in_dialog.click_button 'Supprimer'
    expect(page).to have_content 'Publications de'
    expect(page).not_to have_content $a_title
  end

end
