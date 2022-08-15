# Sydney Suburbs

# Create a program that asks what suburbs you live in.
# Depending on the answer, print an appropriate response of your choosing (you should be able to give a custom response for at least 3 different suburbs).
# If the program does not recognise the suburb, print a generic message like "Sounds nice!"
# BONUS: use a case statement instead of an if-elsif chain to solve the suburbs exercise.

print "What is your suburb? "
suburb = gets.chomp.downcase

# if suburb == "bondi"
#   puts "Nice boat shoes."
# elsif suburb == "manly"
#   puts "Surf's up bro! Watch out for tourists."
# elsif suburb == "newtown"
#   puts "Nice tatt. Smash the state."
# else
#   puts "I'm sure it's very nice there."
# end

answer = case suburb
  when "bondi"   then "Nice boat shoes."
  when "manly"   then "Surf's up bro! Watch out for tourists."
  when "newtown" then "Nice tatt. Smash the state."
  else "I'm sure it's very nice there."
  end

puts answer
