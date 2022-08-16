# A. Given the following data structure:
#
a = ["Anil", "Erik", "Jonathan"]

#
#     How would you return the string "Erik"?
p a[1]

#     How would you add your name to the array?

a << 'Clarence'

p a

# B. Given the following data structure:
#
h = {
  0 => "Zero",
  1 => "One",
  :two => "Two",
  "two" => 2
  # four: 4
}
#
#     How would you return the string "One"?
p h[1]
#     How would you return the string "Two"?
p h[:two]
#     How would you return the number 2?
p h['two']
#     How would you add {3 => "Three"} to the hash?
h[3] = 'Three'
p h
#     How would you add {:four => 4} to the hash?
h[:four] = 4
p h
#
# C. Given the following data structure:
#
is = {
  true => "It's true!",
  false => "It's false"
}
#
#     What is the return value of is[2 + 2 == 4]?
p is[true]
p is[2 + 2 == 4]
#     What is the return value of is["Erik" == "Jonathan"]?
p is["Erik" == "Jonathan"]
#     What is the return value of is[9 > 10]?
p '9 > 10:', is[9 > 10]
#     What is the return value of is[0]?
p '0:', is[0]
#     What is the return value of is["Erik"]?
p "Erik:", is["Erik"]
#
# D. Given the following data structure:
#
users = {
  "Jonathan" => {
    :twitter => "tronathan",
    :favorite_numbers => [12, 42, 75],
  },
  "Erik" => {
    :twitter => "sferik",
    :favorite_numbers => [8, 12, 24],
  },
  "Anil" => {
    :twitter => "bridgpal",
    :favorite_numbers => [12, 14, 85],
  },
}

require 'pry'; binding.pry


#     How would you access Jonathan's Twitter handle (i.e. the string "tronathan")?
p users['Jonathan'][:twitter]
#     How would you add the number 7 to Erik's favorite numbers?
users['Erik'][:favorite_numbers].push( 7 )

#     How would you add yourself to the users hash?
users['Luke'] = {
  :twitter => 'textchimp',
  favorite_numbers: [12, 14, 85]
}
p users['Luke']
#     How would you return the array of Erik's favorite numbers?
p users['Erik'][:favorite_numbers]
#     How would you return the smallest of Erik's favorite numbers?
p users['Erik'][:favorite_numbers].min
#     How would you return an array of Anil's favorite numbers that are also even?
p users['Anil'][:favorite_numbers].select {  |num|  num.even?  }
# p users['Anil'][:favorite_numbers].map {  |num|  num.even?  }
#     How would you return an array of the favorite numbers common to all users?

# users.values.each do |val|
#   p val
# end

puts "common numbers:"

common = users['Luke'][:favorite_numbers]

users.values.each do |info|
  p "common:", common, "faves:", info[:favorite_numbers]
  common = common & info[:favorite_numbers]
  p "common after comparison:", common, '---------'
end

p common


#     How would you return an array containing all users' favorite numbers, sorted, and excluding duplicates?
# all_faves = []
# users.values.each do |info|
#   all_faves.push info[:favorite_numbers]
# end

all_faves = users.values.map { |info| info[:favorite_numbers] }
p all_faves
p all_faves.flatten.uniq.sort
