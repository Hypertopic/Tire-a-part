require('capybara/cucumber')

Etantdonné(/^un chercheur ne connaissant pas toutes les fonctionnalités de la plateforme$/) do
  pending # Write code here that turns the phrase above into concrete actions
end

Quand(/^il consulte la page d'accueil du site$/) do
   visit('https://publications.icd.utt.fr/')
end

Alors(/^les informations liées aux fonctionnalités lui sont affichées$/) do
   page.should have_css('#bloc_information')
end

Alors(/^le chercheur peut profiter pleinement de la plateforme$/) do
  pending # Write code here that turns the phrase above into concrete actions
end