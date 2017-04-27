require 'capybara/cucumber'


Etantdonnéque(/^l'utilisateur est connecté et que l'utilisateur est un auteur ou que l'utilisateur est un chef d'équipe$/) do
  visit 'http://www.google.fr'
end

Quand(/^l'utilisateur consulte les informations relatives à un auteur$/) do
  fill_in 'gbqfq', searchText
end

Alors(/^l'utilisateur devrait accéder au rapport d'activité de cet auteur$/) do
  page.should have_content(expectedText)
end
