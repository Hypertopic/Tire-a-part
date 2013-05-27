require 'spec_helper'

feature 'Import a record' do

  background do
    visit '/'
    click_on 'Créer...'
    click_on 'Importer...'
  end

  scenario 'from ACM' do
    fill_in 'bibtex', :with => sample('acm')
    in_dialog.click_button 'Importer'
    field('creator').should == 'Frédéric Merle, Aurélien Bénel, Guillaume Doyen, Dominique Gaïti'
    field('title').should == 'Decentralized documents authoring system for decentralized teamwork: matching architecture with organizational structure'
    field('ispartof').should == 'Proceedings of the 17th ACM international conference on Supporting group work'
    field('pages').should == '117--120'
    field('publisher').should == 'ACM'
    field('issued').should == '2012'
    field('url').should == 'http://dx.doi.org/10.1145/2389176.2389195'
    # No abstract
  end

  scenario 'from DBLP' do
    fill_in 'bibtex', :with => sample('dblp')
    click_on 'Importer'
    field('creator').should == 'Frédéric Merle, Aurélien Bénel, Guillaume Doyen, Dominique Gaïti'
    field('title').should == 'Decentralized documents authoring system for decentralized teamwork: matching architecture with organizational structure'
    field('ispartof').should == 'GROUP'
    field('pages').should == '117-120'
    #field('publisher').should == 'ACM'
    field('issued').should == '2012'
    field('url').should == 'http://doi.acm.org/10.1145/2389176.2389195'
    # No abstract
  end

end
