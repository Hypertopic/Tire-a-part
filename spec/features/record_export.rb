require 'spec_helper'

feature 'Export multiple records' do

  background do
    visit '/'
  end

  scenario 'for LM2S since 2013' do
    page.select 'LM2S', :from => 'selV31_chzn'
    page.select '2013', :from => 'issued_chzn'
    click_on 'Exporter...'
    page.driver.response.headers['Content-Disposition'].should include("filename=\"LM2S-since-2013.bib\"")
  end

end
