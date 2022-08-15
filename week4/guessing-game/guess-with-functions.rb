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


def get_guess( max )
  print "Enter your guess (0-#{max}): "
  gets.to_i
end # get_guess


def give_feedback( secret, guess )
  
  if secret > guess
    "Wrong - guess higher!".red
  elsif secret < guess 
    "Wrong - guess lower!".green
  end

end # give_feedback()


# You could instead use `until secret_number == user_guess`
# if that fits your brain better!
while secret_number != user_guess
  user_guess = get_guess( max_guess )
  puts give_feedback( secret_number, user_guess )
end # while

puts "Congratulations!".yellow