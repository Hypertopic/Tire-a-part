require 'capybara/cucumber'


Etantdonné /je suis un visiteur du site/ do

end

Quand /je souhaite consulter la notice d'un article/ do
  visit('http://publications.icd.utt.fr/publications')
  expect(page).to have_current_path('/publications')
end

Alors /je choisis un article dans la liste qui m'est proposée sur la page d'accueil ou après une recherche, et en cliquant sur le lien de l'article, j'accède à la notice de cet article/ do
  click_link('Article')
end
