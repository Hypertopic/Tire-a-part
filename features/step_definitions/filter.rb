require 'capybara/cucumber'


Etantdonné /je suis un utilisateur/ do
end

Quand /je veux rechercher un certain type de publication qui m'intéresse/ do
  visit('http://publications.icd.utt.fr/publications')
  expect(page).to have_current_path('/publications')

end

Alors /je clique sur un des champs proposant une option pour changer le type de filtre (par défaut, on utilisera respectivement le type de publication, puis la date d'envoi) et la recherche va se lancer selon le critère souhaité/ do
  select('Filtre', :from=>'Filtre Box')
  expect(page).to have_content('listepublis')
end
