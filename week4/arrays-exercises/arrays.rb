puts "Arrays!"

# 1. Create an array of the days of the week

# Create a variable named days_of_the_week as an array of the following:


days_of_the_week =  %w{ Monday Tuesday Wednesday Thursday Friday Saturday Sunday }

# require 'pry'; binding.pry

# 2. My calendar says the first day is Sunday...

# Remove Sunday from the last postion and move it to the first position. Use array methods.

moved_day = days_of_the_week.pop
days_of_the_week.unshift moved_day
# days_of_the_week.rotate! -1   # STFW

#  days_of_the_week.unshift days_of_the_week.pop

p days_of_the_week

# 3. Create a new array of the days of the week :

# Re-create the original days_of_the_week array first, to undo the modifications from #2
# Use the values from that array to create a new array whose elements are also arrays, i.e. a nested array:
# The first inner array should be the weekdays
# The second inner array should be the weekend days

# d = [
#   [m t w th f],
#   [sa, su]
# ]

days_of_the_week =  %w{ Monday Tuesday Wednesday Thursday Friday Saturday Sunday }

week_days = days_of_the_week[0, 5] # like .slice()
p "week days:", week_days
weekend_days = days_of_the_week[5, 2] # or [5..6]
p "weekend days:", weekend_days

week_parts = [ week_days, weekend_days ]

# week_parts = [
#   days_of_the_week[0, 5],
#   days_of_the_week[5, 2]
# ]


p "week parts:", week_parts


# 4. Remove either the weekdays or the weekends

week_parts.pop     # remove the weekend sub-array

# Your choice...
# 5. Sort the remaining days alphabetically

sorted = week_parts.first.sort 
p sorted

# require 'pry'; binding.pry