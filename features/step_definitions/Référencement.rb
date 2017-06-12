require('capybara/cucumber')

# titre_publication = A Survey and Synthesis of User Behavior Measurements in P2P Streaming Systems

Etantdonné(/^un chercheur saisit un article "([^"]*)" sur la plateforme$/) do |titre_publication|
  fill_in('title', with: titre_publication)
  fill_in('creator', with: 'Ihsan Ullah, Guillaume Doyen, Grégory Bonnet, Dominique Gaïti,')
  select('IEEE Communications Surveys and Tutorials', from: 'aeresType')
  fill_in('ispartof', with: '')
  fill_in('volume', with: '14')
  fill_in('issue', with: '3')
  fill_in('pages', with: '734-749')
  fill_in('publisher', with: 'IEEE')
  fill_in('issued', with: '2012')
  fill_in('url', with: 'http://dx.doi.org/10.1109/SURV.2011.082611.00134')
  check('ISI')
  check('SCOPUS')
  check('DBLP')
  fill_in('abstract', with: 'In terms of scalability, cost and ease of deployment [...] require further investigations')
  select('ERA', from: 'affiliation')
  click_button 'Enregistrer'
end

Quand(/^l'article "([^"]*)" est publié$/) do |titre_publication|
  visit('https://publications.icd.utt.fr/')
  expect(page).to have_content (titre_publication)
end

Alors(/^l'article "([^"]*)" doit être référencé sur Google Scholar$/) do |titre_publication|
  visit('https://scholar.google.fr/scholar?hl=fr&q=A+Survey+and+Synthesis+of+User+Behavior+Measurements+in+P2P+Streaming+Systems&btnG=&lr=')
  expect(page).to have_content(titre_publication)
end