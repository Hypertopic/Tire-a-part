require('capybara/cucumber')

Etantdonné(/^une "([^"]*)" à laquelle est attaché un "([^"]*)"$/) do |notice, tire-a-part|
  visit('https://publications.icd.utt.fr/' + notice)
  expect(page).to have_content(tire-a-part)
end

Quand(/^je supprime le "([^"]*)"$/) do |tire-a-part|
   click_button 'Supprimer le Tiré-à-part.'
end

Alors(/^aucun "([^"]*)" n'est plus attaché à la "([^"]*)"$/) do |tire-a-part, notice|
  visit('https://publications.icd.utt.fr/' + notice)
  page.should_not have_content(tire-a-part)
end
