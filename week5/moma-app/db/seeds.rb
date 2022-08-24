
Artist.destroy_all

lee = Artist.create!( 
  name: 'Lee Krasner',
  nationality: 'USA',
  dob: '1908/10/27',  # MUST use the right string format for date fields
  period: '20th century',
  image: 'https://i.pinimg.com/736x/05/62/14/0562148ce05f206e7ad773dc65d565bc--lee-krasner-abstract-expressionism.jpg',
  roundness: 7,
  bio: 'Abstract Expressionist'
)

max = Artist.create!( 
  name: 'Max Ernst',
  nationality: 'German',
  dob: '1891/04/02',  # MUST use the right string format for date fields
  period: '20th century',
  image: 'http://www.max-ernst.com/images/max-ernst-photo.jpg',
  roundness: 8,
  bio: 'Surrealist'
)

jenny = Artist.create!( 
  name: 'Jenny Holzer',
  nationality: 'USA',
  dob: '1950/05/15',  # MUST use the right string format for date fields
  period: '20th century',
  image: 'https://pyxis.nymag.com/v1/imgs/98b/5ab/df3799dcec0cbc7ade43fd4f8bda7563bd-jenny-holzer-1.rvertical.w1200.jpg',
  roundness: 5,
  bio: 'Conceptual/Text'
)


puts "Done! Created #{ Artist.count } artists:"
puts Artist.pluck( :name ).join( ', ' )


### Artwork seeds ##############################################

Work.destroy_all

Work.create!(
  title: 'Gothic Landscape',
  year: '1961',
  medium: 'oil on canvas',
  style: 'abstract expressionism',
  image: 'https://media.tate.org.uk/art/images/work/T/T03/T03291_10.jpg',
  artist_id: lee.id
)

Work.create!(
  title: 'Protect Me From What I Want',
  year: '1988',
  medium: 'text',
  style: 'conceptual/text/multimedia',
  image: 'https://www.sleek-mag.com/wp-content/uploads/2019/03/jenny-holzer-protect-me-times-square.jpg',
  artist_id: jenny.id
)

Work.create!(
  title: 'Some Days You Wake Up...',
  year: '1998',
  medium: 'text/bronze',
  style: 'conceptual/text',
  image: 'https://www.moma.org/media/W1siZiIsIjIwMTQ4NiJdLFsicCIsImNvbnZlcnQiLCItcXVhbGl0eSA5MCAtcmVzaXplIDIwMDB4MjAwMFx1MDAzZSJdXQ.jpg?sha=f4a128f8dd237338',
  artist_id: jenny.id
)

Work.create!(
  title: 'City with Animals',
  year: '1930',
  medium: 'oil on wood',
  style: 'surrealism/cubism',
  image: 'https://i0.wp.com/www.guggenheim.org/wp-content/uploads/1914/01/48.1172.280_web.jpg?w=870',
  artist_id: max.id
)

Work.create!(
  title: 'Die Versuchung des heiligen Antonius',
  year: '1930',
  medium: 'oil on wood',
  style: 'surrealism/cubism',
  image: 'http://www.dandy-club.com/wp-content/uploads/2013/01/main.jart2_.jpg',
  artist_id: max.id
)



puts "Done! Created #{ Work.count } Works:"
puts Work.pluck( :title ).join( ', ' )

