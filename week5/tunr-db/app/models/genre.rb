class Genre < ApplicationRecord

  # This defines one end of a many-to-many association;
  # it requires/assumes that the 'genres_songs' join table already exists
  # and that the table has 'genre_id' and 'song_id' intger columns
  # ... also known as HABTM
  has_and_belongs_to_many :songs

  has_many :artists, through: 'songs'
end
