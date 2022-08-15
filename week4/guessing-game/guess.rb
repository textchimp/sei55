# Activity:

# You are to generate a basic "guess my number" game. The computer will pick a random number between 0 and 10. The user will guess the number until they guess correctly.

# Specification:

# The user should be asked to guess a number
# If the user's guess is correct, the user should see a congratulatory message
# If the user's guess is not correct, the user should be asked to guess the number again.

# Extensions:

# Let the user choose the maximum value (so they can play a long game with a random value between 0 and 10000, for example).
# Give feedback to the user: "Wrong, guess higher!" or "Wrong, guess lower!"

require 'colorize' # like a <script> tag to load the jQuery library

print "Enter maximum guess number: "
max_guess = gets.to_i

secret_number = rand max_guess
user_guess = -1  # initialise to a number that guarantees the loop runs at least once

while secret_number != user_guess
  print "Enter your guess (0-#{max_guess}): "
  user_guess = gets.to_i

  if secret_number > user_guess
    puts "Wrong - guess higher!".red
  elsif secret_number < user_guess 
    puts "Wrong - guess lower!".green
  end

end # while

puts "Congratulations!".yellow