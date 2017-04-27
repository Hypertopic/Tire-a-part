require 'capyraba/cucumber'
Capyraba.app = MyRackApp

When /I sign in/ do
	within("#session") do
	 fill_in 'Email', with: 'user@example.com'
	 fill_in 'Password', with: 'password'
	end
	click_button 'Sign in'
end
