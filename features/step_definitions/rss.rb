require 'capybara/cucumber'

Etantdonné(/^un utilisateur visiteur ou inscrit$/) do
  #pending # Write code here that turns the phrase above into concrete actions
end

Quand(/^il sélectionne la page d'accueil$/) do
  #pending # Write code here that turns the phrase above into concrete actions
  visit('http://publications.icd.utt.fr')
  expect(page).to have_current_path('publications')
end

Quand(/^il déroule le menu du flux RSS$/) do
  #pending # Write code here that turns the phrase above into concrete actions
  click_button('rss_flow')
end

Alors(/^il voit l'activité du site en temps réel$/) do
  #pending # Write code here that turns the phrase above into concrete actions
  expect(rrs_field).to should_not have_field("foo", with: "")
  #Vérifie que le flux RSS n'est pas vide
end
