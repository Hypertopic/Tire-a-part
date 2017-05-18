require 'capybara/cucumber'

Etantdonnéque(/^un utilisateur consulte l'activité des auteurs pour une équipe$/) do
  visit 'http://publications.icd.utt.fr/lasmis/dashboard'
end

Quand(/^il choisit une équipe de recherche et une durée d'inactivité$/) do
  select('LM2S', from: 'equipe')
  select('6 mois', from: 'duree')
end

Alors(/^il est affiché une liste d'auteurs correspndant à ces critères$/) do
  expect(page).to have_content 'Date de modifcation'
end
