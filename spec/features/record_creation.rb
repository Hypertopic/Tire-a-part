require 'spec_helper'

feature 'Create a record' do

  scenario 'for an unpublished article' do
    visit '/'
    click_on 'Créer...'
    fill_in 'Auteurs', :with => 'Tryphon Tournesol'
    fill_in 'Titre', :with => 'Synchronisation des couleurs dans la Supercolor-Tryphonar'
    click_on 'Enregistrer'
    bookmark = current_url
    visit '/'
    expect(page).not_to have_content 'Supercolor-Tryphonar'
    visit bookmark
    expect(page).to have_field 'creator', :with => 'Tryphon Tournesol'
  end

  scenario 'for a published article' do
    visit '/'
    click_on 'Créer...'
    fill_in 'Auteurs', :with => 'Professeur Shadoko'
    fill_in 'Titre', :with => 'Psychanalyse quantique'
    fill_in 'In', :with => '10° journées de pataphysique appliquée, "Au delà de la logique shadok"'
    fill_in 'Éditeur', :with => 'ACME'
    fill_in 'Année', :with => '2012'
    fill_in 'URL', :with => 'http://en.wikipedia.org/wiki/Les_Shadoks'
    select 'invitation', :from => 'Type'
    fill_in 'Résumé', :with => 'Je dis des choses tellement intelligentes\nque le plus souvent je ne comprends pas ce que je dis.'
    click_on 'Enregistrer'
    visit '/'
    expect(page).to have_content 'pataphysique'
  end

end

