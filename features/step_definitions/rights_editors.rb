require 'capybara/cucumber'

Etantdonnéque(/^il aimerait obtenir les droits de diffusion associés à un "([^"]*)" précis avant de l'importer$/) do |arg1|
  pending # Write code here that turns the phrase above into concrete actions
end

Quand(/^il saisit le nom de l'"([^"]*)" dans le formulaire de création ou d'édition d'une notice$/) do |editeur|
  expect(page).to have_selector('input#editeur', visible: true)
  fill_in 'editeur', :with => 'Elsevier'
end

Quand(/^il clique sur le bouton "([^"]*)"$/) do |button|
  click_on button
end

Alors(/^les droits de diffusion liés à cet "([^"]*)" sont affichés$/) do |editeur|
  visit('http://www.sherpa.ac.uk/romeo/search.php?pub=' + editeur)
end

Alors(/^le chercheur sait exactement quelles versions de son travail il peut rendre publiques$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Etantdonné(/^une "([^"]*)" existante possédant un "([^"]*)"$/) do |notice, tireapart|
  expect(notice).to have_content(tireapart)
end

Quand(/^un utilisateur identifié consulte cette "([^"]*)"$/) do |notice|
  visit('http://publications.icd.utt.fr/' + notice)
end

Alors(/^il peut vérifier les droits de diffusion associés à l'éditeur de la publication$/) do
  expect(page).to have_button('consult_rights')
end