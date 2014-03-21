require 'spec_helper'

feature 'Import a record' do

  background do
    visit '/'
    click_on 'Créer...'
    click_on 'Importer...'
  end

  scenario 'from dysfonctionnement' do
    fill_in 'bibtex', :with => sample('dysfonctionnement')
    in_dialog.click_button 'Importer'
    field('title').should == 'A methodology for probabilistic model-based prognosis'
    field('pages').should == '443--454'
    # No abstract
  end

end
