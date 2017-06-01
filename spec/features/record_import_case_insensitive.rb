require 'spec_helper'

feature 'BibTeX import fields case-insensitive' do

	background do
    		visit '/'
    		click_on 'Créer...'
    		click_on 'Importer...'
  	end

	scenario 'import BibTeX content' do
		fill_in 'bibtex', :with => '@article{Lort12a,Author = {A. Lorton and M. Fouladirad and A. Grall}}'
		in_dialog.click_on 'Importer'
		field('creator').should == 'A. Lorton and M. Fouladirad and A. Grall'
	end
end
