# Ask the user for their age.
#     Remember that anytime you get input, it is a string, so you will need to change the age input to a number.
# If age is less than 18, print an appropriate message.
# If the age is equal to or over 18, print a different message.

puts "Drinking Age!"

print "Please enter your age: "  # no newline added
age = gets.to_i

if age < 18
  puts "Scram, kid! Go drink some cordial."
end
# else
#   puts "Come on in and enjoy the liver damage!"
# end
