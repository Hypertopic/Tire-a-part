require 'spec_helper'

feature 'Delete a record' do

  $a_title = a_string()

  background do
    visit '/'
    click_on '+' 
    fill_in 'title', :with => $a_title
    fill_in 'issued', :with => '1885'
    select 'invitation', :from => 'aeresType'    
    click_on 'Enregistrer'    
  end

  scenario 'for any record' do
    click_on 'Supprimer...'
    page.should have_content 'Voulez-vous supprimer cette notice ?'
    in_dialog.click_button 'Supprimer'
    page.should have_content 'Publications de'
    page.should_not have_content $a_title
  end

end
