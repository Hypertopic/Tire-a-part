require 'spec_helper'

feature 'Import a record' do

  background do
    visit '/'
    click_on 'Créer...'
    click_on 'Importer...'
  end
  
  scenario 'from JabRef' do
      fill_in 'bibtex', :with => sample('toto')
      in_dialog.click_button 'Importer'
      field('title').should == 'Story of Toto'
      field('author').should == 'toto'
      field('publisher').should == 'JabRef'
      field('issued').should == '2014'
      field('url').should == 'http://dx.doi.org/10.1145/2389176.2389195'
      # No abstract
  end
  
  scenario 'from ACM' do
    fill_in 'bibtex', :with => sample('acm')
    in_dialog.click_button 'Importer'
    expect(field 'creator').to eq 'Frédéric Merle, Aurélien Bénel, Guillaume Doyen, Dominique Gaïti'
    expect(field 'title').to eq 'Decentralized documents authoring system for decentralized teamwork: matching architecture with organizational structure'
    expect(field 'ispartof').to eq 'Proceedings of the 17th ACM international conference on Supporting group work'
    expect(field 'pages').to eq '117--120'
    expect(field 'publisher').to eq 'ACM'
    expect(field 'issued').to eq '2012'
    expect(field 'url').to eq 'http://dx.doi.org/10.1145/2389176.2389195'
    # No abstract
  end

  scenario 'from DBLP' do
    fill_in 'bibtex', :with => sample('dblp')
    click_on 'Importer'
    expect(field 'creator').to eq 'Frédéric Merle, Aurélien Bénel, Guillaume Doyen, Dominique Gaïti'
    expect(field 'title').to eq 'Decentralized documents authoring system for decentralized teamwork: matching architecture with organizational structure'
    expect(field 'ispartof').to eq 'GROUP'
    expect(field 'pages').to eq '117-120'
    #field('publisher').should == 'ACM'
    expect(field 'issued').to eq '2012'
    expect(field 'url').to eq 'http://doi.acm.org/10.1145/2389176.2389195'
    # No abstract
  end

  scenario 'from SCOPUS' do
    fill_in 'bibtex', :with => sample('scopus')
    click_on 'Importer'
    expect(field 'creator').to eq 'F.a Merle, A.b Bénel, G.a Doyen, D.a  Gaïti'
    expect(field 'title').to eq 'Decentralized documents authoring system for decentralized teamwork matching architecture with organizational structure'
    expect(field 'ispartof').to eq 'GROUP\'12 - Proceedings of the ACM 2012 International Conference on Support Group Work'
    expect(field 'pages').to eq '117-120'
    # No publisher
    expect(field 'issued').to eq '2012'
    expect(field 'url').to eq 'http://dx.doi.org/10.1145/2389176.2389195'
    expect(field 'abstract').to eq 'While systems for collaborative distributed works focus on enhancing distributed work group productivity, little attention has been paid to their architecture. In fact, most of these systems rely on centralized ones for both user communications and data hosting. These architectures raise issues about the administrative control, maintenance and management of the central entity. In this paper, we present a new architecture based on peer-to-peer (P2P) model driven by user relationship. In our architecture, users choose the trusted co-workers they are connected with. Thus, only the most trusted users manage to obtain a high number of connections which grant them a relative authority inside the system. Copyright © 2012 by the Association for Computing Machinery, Inc. (ACM).'
  end

  scenario 'from Google Scholar' do
    fill_in 'bibtex', :with => sample('google')
    in_dialog.click_button 'Importer'
    expect(field 'creator').to eq 'Frédéric Merle, Aurélien Bénel, Guillaume Doyen, Dominique Gaïti'
    expect(field 'title').to eq 'Decentralized documents authoring system for decentralized teamwork: matching architecture with organizational structure'
    expect(field 'ispartof').to eq 'Proceedings of the 17th ACM international conference on Supporting group work'
    expect(field 'pages').to eq '117--120'
    expect(field 'publisher').to eq 'ACM'
    expect(field 'issued').to eq '2012'
    # No URI nor DOI
    # No abstract
  end
  
  scenario 'from ISI' do
    fill_in 'bibtex', :with => sample('isi')
    click_on 'Importer'
    expect(field 'creator').to eq 'Frederic Merle, Aurelien Benel, Guillaume Doyen, Dominique Gaiti'
    expect(field 'title').to eq 'Decentralized Documents Authoring System for Decentralized Teamwork'
    expect(field 'ispartof').to eq 'PROCEEDINGS OF THE 17TH ACM INTERNATIONAL CONFERENCE ON SUPPORTING GROUP WORK'
    expect(field 'pages').to eq '117-120'
    expect(field 'publisher').to eq 'ASSOC COMPUTING MACHINERY'
    expect(field 'issued').to eq '2012'
    # No URI nor DOI
    expect(field 'abstract').to eq 'While systems for collaborative distributed works focus on enhancing distributed work group productivity, little attention has been paid to their architecture. In fact, most of these systems rely on centralized ones for both user communications and data hosting. These architectures raise issues about the administrative control, maintenance and management of the central entity. In this paper, we present a new architecture based on peer-to-peer (P2P) model driven by user relationship. In our architecture, users choose the trusted co-workers they are connected with. Thus, only the most trusted users manage to obtain a high number of connections which grant them a relative authority inside the system.'
  end

  scenario 'which author has "and" in his name' do
    fill_in 'bibtex', :with => '@book{alexandre,
      author = {Lepetit, Alexandre and Segouin, Florent and Le, Minh}
    }'
    in_dialog.click_button 'Importer'
    expect(field 'creator').to eq 'Alexandre Lepetit, Florent Segouin, Minh Le'
  end

  scenario 'from JabRef' do
      fill_in 'bibtex', :with => sample('jabref')
      in_dialog.click_button 'Importer'
      expect(field 'creator').to eq 'Arthur Bourjac'
      expect(field 'title').to eq 'A lifetime a ginger thought'
      expect(field 'ispartof').to eq 'Reflections'
      expect(field 'issued').to eq '2014'
  end

end
