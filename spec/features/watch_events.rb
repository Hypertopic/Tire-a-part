require 'spec_helper'

feature 'Watch events' do

  background do
    pending 'stay updated about article lifecycle'
    visit '/'
    click_on 'Créer...'
    fill_in 'Auteurs', :with => 'John Ronald Reuel Tolkien'
    fill_in 'Titre', :with => 'Silmarillion'
    fill_in 'Année', :with => '1977'
    click_on 'Enregistrer'
  end

  scenario 'from any filter' do
    pending 'stay updated about article lifecycle'
    visit '/'
    fill_in_and_select 'John Ronald Reuel Tolkien', :from => 'Publications de'
    fill_in_and_select '1977', :from => 'depuis'
    click_on 'Surveiller les publications'
    check_path_content '/atom'
    check_query_content 'by=JOHN+RONALD+REUEL+TOLKIEN&since=1977'
    page.should have_content 'Silmarillion'
  end

  scenario 'of an updated entry' do
    pending 'stay updated about article lifecycle'
    visit '/'
    first(:link, 'Silmarillion.').click
    click_on 'Modifier...'
    fill_in 'Année', :with => '2014'
    click_on 'Terminé'
    visit '/'
    fill_in_and_select 'John Ronald Reuel Tolkien', :from => 'Publications de'
    fill_in_and_select '1977', :from => 'depuis'
    click_on 'Surveiller les publications'
    page.should have_content '1977'
    page.should have_content '2014'
  end

end
