
# To actually run these lines, and create items in the database,
# you need to run the terminal command:
#   rails db:seed

Planet.destroy_all  # BADASS.... ActiveVader... DarthRecord

Planet.create!(
  name: 'Earth',
  image_url: 'https://scitechdaily.com/images/earth-losing-mass.jpg',
  orbit: 1,
  mass: 1,
  moons: 1
)

Planet.create!(
  name: 'Mars',
  image_url: 'https://space-facts.com/wp-content/uploads/mars.jpg',
  orbit: 60,
  mass: 0.1,
  moons: 2
)

Planet.create!(
  name: 'Venus',
  image_url: 'https://cdn.mos.cms.futurecdn.net/pNX8eVGowB6WT8tyrTMufk-1200-80.jpg',
  orbit: 0.5,
  mass: 0.2,
  moons: 1
)

Planet.create!(
  name: 'Jupiter',
  image_url: 'https://www.bu.edu/files/2022/01/feat-PIA21984_orig.jpg',
  orbit: 400,
  mass: 10_000,
  moons: 13
)

puts "Done! Created #{ Planet.count } planets."
puts Planet.pluck( :name ).join(', ')




