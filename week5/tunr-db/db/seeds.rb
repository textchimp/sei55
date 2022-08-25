
print "Creating songs... "

Song.destroy_all

s1 = Song.create! title: 'Achy Breaky Heart'
s2 = Song.create! title: 'Draw Us In'
s3 = Song.create! title: 'Burn the Witch'
s4 = Song.create! title: 'Identikit'

puts "created #{ Song.count } songs."

############################################

print "Creating artists... "

Artist.destroy_all

art1 = Artist.create! name: 'Billy Ray Cyrus'
art2 = Artist.create! name: 'Metz'
art3 = Artist.create! name: 'Radiohead'

puts "created #{ Artist.count } artists."

# Create associations from artists to their songs
art1.songs << s1  # THIS ACTUALLY UPDATES THE songs TABLE

# This means "The song s1 has its artist_id set to art1.id"
#
# i.e. the query is something like:
#   s1.update artist_id: art1.id
#   UPDATE songs SET artist_id = art1.id WHERE id = s1.id

art2.songs << s2   # " 'Draw Us In' (s2) is by Metz (art2)"

# Both 'Burn the Witch' (s3) and 'Identikit' (s4) are by Radiohead (art3)
art3.songs << s3 << s4

# Test the associations we just made:
puts "Testing artist -< songs associations:"
puts "  • the song '#{ Song.first.title }' is by #{ Song.first.artist.name }"
puts "  • the artist #{ Artist.last.name } has the songs: #{ Artist.last.songs.pluck(:title).join(', ') }"

############################################

print "Creating albums... "

Album.destroy_all

alb1 = Album.create! title: 'Some Gave All', year: '1992'
alb2 = Album.create! title: 'Atlas Vending', year: '2021'
alb3 = Album.create! title: 'A Moon-Shaped Pool', year: '2016'

puts "created #{ Album.count } albums."

# Create associations from songs to albums
alb1.songs << s1

alb2.songs << s2

alb3.songs << s3 << s4 

puts "Testing album -< songs association:"
puts "  • the song '#{ Song.first.title }' is on the album '#{ Song.first.album.title }' "
puts "  • the album '#{ Album.last.title }' has the songs: #{ Album.last.songs.pluck(:title).join(', ') } "

#######################################

print "Creating genres... "

Genre.destroy_all

g1 = Genre.create! name: 'Post Punk'
g2 = Genre.create! name: 'Math Rock'
g3 = Genre.create! name: 'Paranoid Art Rock'
g4 = Genre.create! name: 'Sadcore'
g5 = Genre.create! name: 'Country'
g6 = Genre.create! name: 'IDM'  # Intelligent Dance Music

puts "created #{ Genre.count } genres."

# Create Genre >--< Song many-to-many associations:

# s1 ('Achy Breaky Heart') is in the genre g5 ('Country')
# In other words, in the join table genres_songs, create a
# new row with song_id = s1.id, genre_id = g5.id
s1.genres << g5

# This song is in three genres, i.e. create THREE rows in 
# the genres_songs table
s2.genres << g1 << g2 << g4  

s3.genres << g3 << g4 << g6

s4.genres << g3 << g4

# Because it's a many-to-many association, you could instead start
# from the genre side, and add multiple songs:
#       g5.songs << s1 << s5

# Test genres >-< songs associations:
puts "Genre '#{ g3.name }' has songs: #{ g3.songs.pluck(:title).join(', ') }"
puts "Song '#{ s4.title }' has genres: #{ s4.genres.pluck(:name).join(', ') } "

###################################################

print "Creating mixtapes... "

Mixtape.destroy_all

m1 = Mixtape.create! name: 'Code Jams'
m2 = Mixtape.create! name: 'Post-Lockdown Dance Party'
m3 = Mixtape.create! name: 'Make-out Music'

puts "created #{ Mixtape.count } mixtapes."

# Create songs >-< mixtapes associations, i.e. add songs to mixtapes
m1.songs << s1 << s2 << s3 << s4
m2.songs << s3 << s4
m3.songs << s1 << s2

# Test associations
puts "Mixtape '#{ m1.name }' has the songs: #{ m1.songs.pluck(:title).join(', ') }"
puts "Song '#{ s3.title }' is on mixtapes: #{ s3.mixtapes.pluck(:name).join(', ') }" 

#####################################

print "Creating users... "

User.destroy_all

u1 = User.create! email: 'luke@ga.co', name: 'Luke', password: 'chicken'
u2 = User.create! email: 'kris@ga.co', name: 'Kris', password: 'chicken'
u3 = User.create! email: 'shayni@ga.co', name: 'Shayni', password: 'chicken'

puts "created #{ User.count } users."

# Add user -< mixtapes associations
u1.mixtapes << m1 << m3
u2.mixtapes << m2

puts "User #{ u1.name } has mixtapes: #{ u1.mixtapes.pluck(:name).join(', ') }"
puts "Mixtape '#{ m1.name }' belongs to #{ m1.user.name }"
