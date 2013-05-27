require 'spec_helper'

feature 'Import a record' do

  scenario 'from ACM' do
    visit '/'
    click_on 'Créer...'
    click_on 'Importer...'
    fill_in 'bibtex', :with => sample('acm')
    in_dialog.click_button 'Importer'
    page.should have_field 'creator', :with => 'Frédéric Merle, Aurélien Bénel, Guillaume Doyen, Dominique Gaïti'
    page.should have_field 'title', :with => 'Decentralized documents authoring system for decentralized teamwork: matching architecture with organizational structure'
    page.should have_field 'ispartof', :with => 'Proceedings of the 17th ACM international conference on Supporting group work'
    page.should have_field 'pages', :with => '117--120'
    page.should have_field 'publisher', :with => 'ACM'
    page.should have_field 'issued', :with => '2012'
    page.should have_field 'url', :with => 'http://doi.acm.org/10.1145/2389176.2389195'
    # No abstract
  end

end
