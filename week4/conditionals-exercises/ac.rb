# Air Conditionals

# Ask the user what the current temperature is, if the A/C is functional, and what temperature they wish it was.

print "Enter current temp: "
current_temp = gets.to_i

print "Is AC functional? (y/n): "
ac_is_functional = gets.chomp

print "Enter desired temp: "
desired_temp = gets.to_i

# p current_temp, ac_is_functional, desired_temp

#     If the airconditioner is functional and the current temperature is above the the desired temperature... display "Turn on the A/C Please"
#     If the airconditioner is non-functional and the current temperature is above the the desired temperature... display "Fix the A/C now! It's hot!"
#     If the airconditioner is non-functional and the current temperature is below the the desired temperature... display "Fix the A/C whenever you have the chance... It's cool..."

if ac_is_functional == "y"
  if current_temp > desired_temp
    puts "Turn on the A/C please, set to #{desired_temp}"
  end
else

  # AC is *not* functional
  if current_temp > desired_temp
    puts "Fix the AC soon please, it's too hot!"
  else
    # desired temp must be below/equal to current temp, all is well
    puts "Fix the AC sometime, but no rush..."
  end
end  # else ac_is_functional
