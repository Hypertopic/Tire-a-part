require 'spec_helper'

feature 'Create a record' do

  scenario 'for an unpublished article' do
    visit '/'
    click_on '+'
    fill_in 'creator', :with => 'Tryphon Tournesol'
    fill_in 'title', :with => 'Synchronisation des couleurs dans la Supercolor-Tryphonar'
    click_on 'Enregistrer'
    bookmark = current_url
    click_on 'Retour'
    page.should_not have_content 'Supercolor-Tryphonar'
    visit bookmark
    page.should have_field 'creator', :with => 'Tryphon Tournesol'
  end

  scenario 'for a published article' do
    visit '/'
    click_on '+'
    fill_in 'creator', :with => 'Professeur Shadoko'
    fill_in 'title', :with => 'Psychanalyse quantique'
    fill_in 'ispartof', :with => '10° journées de pataphysique appliquée, "Au delà de la logique shadok"'
    fill_in 'publisher', :with => 'ACME'
    fill_in 'issued', :with => '2012'
    fill_in 'url', :with => 'http://en.wikipedia.org/wiki/Les_Shadoks'
    check 'ISI'
    select 'invitation', :from => 'aeresType'
    fill_in 'abstract', :with => 'Je dis des choses tellement intelligentes\nque le plus souvent je ne comprends pas ce que je dis.'
    click_on 'Enregistrer'
    click_on 'Retour'
    page.should have_content 'pataphysique'
  end

end

