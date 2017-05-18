require 'capybara/cucumber'


Etantdonné /je suis chef d'équipe/ do
end

Quand /je vérifie l'avancement de mon équipe/ do
  click_on('Avancement')
  visit('http://publications.icd.utt.fr/avancement')
  expect(page).to have_current_path('/avancement')
end

Alors /je dois cliquer sur l'outil de statistiques et une liste des chercheurs classée par ordre alphabétique doit apparaître avec la mention "a mis en ligne un ou plusieurs Tiré à part" s'il en a publié, ou "n'a pas mis en ligne de Tiré à part" s'il n'en a pas mis en ligne/ do
  expect(page).to have_content('Dernière publication')
end
