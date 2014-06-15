require 'spec_helper'

feature 'Report the activity' do

  background do
    visit '/'
    click_on 'Créer...'
    fill_in 'Auteurs', :with => 'Martin Gardner'
    fill_in 'Titre', :with => 'Introduction to Alice\'s adventures under ground by Lewis Carroll'
    fill_in 'Année', :with => '1965'
    click_on 'Enregistrer'
    visit '/'
    click_on 'Créer...'
    fill_in 'Auteurs', :with => 'Anne Clark'
    fill_in 'Titre', :with => 'The real Alice'
    fill_in 'Année', :with => '1982'
    click_on 'Enregistrer'
    visit '/'
    click_on 'Créer...'
    fill_in 'Auteurs', :with => 'Martin Gardner'
    fill_in 'Titre', :with => 'The annotated Alice'
    fill_in 'Année', :with => '2000'
    click_on 'Enregistrer'
  end

  scenario 'of a researcher' do
    visit '/'
    fill_in_and_select 'Gardner', :from => 'Publications de'
    expect(page).not_to have_content 'real'
    expect(page).to have_content 'annotated'
  end

  scenario 'since a given year' do
    visit '/'
    fill_in_and_select '1982', :from => 'depuis'
    expect(page).not_to have_content 'adventures'
    expect(page).to have_content 'real'
    expect(page).to have_content 'annotated'
  end

  scenario 'of a researcher since a given year as a bibtex file' do
    visit '/'
    fill_in_and_select 'Gardner', :from => 'Publications de'
    fill_in_and_select '1965', :from => 'depuis'
    click_on 'Exporter'
    expect(downloaded_file_name).to eq 'activity_by_MARTIN_GARDNER_since_1965.bib' 
  end

end
