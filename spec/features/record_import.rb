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

  scenario 'from SCOPUS' do
    pending '3 lines header not handled'
    fill_in 'bibtex', :with => sample('scopus')
    click_on 'Importer'
    field('creator').should == 'F.a Merle, A.b Bénel, G.a Doyen, D.a  Gaïti'
    field('title').should == 'Decentralized documents authoring system for decentralized teamwork matching architecture with organizational structure'
    field('ispartof').should == 'GROUP\'12 - Proceedings of the ACM 2012 International Conference on Support Group Work'
    field('pages').should == '117-120'
    # No publisher
    field('issued').should == '2012'
    field('url').should == 'http://dx.doi.org/10.1145/2389176.2389195'
    field('abstract').should == 'While systems for collaborative distributed works focus on enhancing distributed work group productivity, little attention has been paid to their architecture. In fact, most of these systems rely on centralized ones for both user communications and data hosting. These architectures raise issues about the administrative control, maintenance and management of the central entity. In this paper, we present a new architecture based on peer-to-peer (P2P) model driven by user relationship. In our architecture, users choose the trusted co-workers they are connected with. Thus, only the most trusted users manage to obtain a high number of connections which grant them a relative authority inside the system. Copyright © 2012 by the Association for Computing Machinery, Inc. (ACM).'
  end

  scenario 'from Google Scholar' do
    fill_in 'bibtex', :with => sample('google')
    in_dialog.click_button 'Importer'
    field('creator').should == 'Frédéric Merle, Aurélien Bénel, Guillaume Doyen, Dominique Gaïti'
    field('title').should == 'Decentralized documents authoring system for decentralized teamwork: matching architecture with organizational structure'
    field('ispartof').should == 'Proceedings of the 17th ACM international conference on Supporting group work'
    field('pages').should == '117--120'
    field('publisher').should == 'ACM'
    field('issued').should == '2012'
    # No URI nor DOI
    # No abstract
  end

  scenario 'from Jabref' do
      fill_in 'bibtex', :with => sample('jabref')
      in_dialog.click_button 'Importer'
      field('owner').should == 'Arthur Bourjac'
      field('title').should == 'A lifetime a ginger thought'
      field('author').should == 'Arthur Bourjac'
      field('journal').should == 'Reflections'
      field('year').should == '2014'
  end

end
