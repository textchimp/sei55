class Album < ApplicationRecord
  has_many :songs

  has_many :artists, through: 'songs'

  # custom method in this model to get the single artist for an album
  def artist
    self.artists.first  # ignore duplicates, pull out of array
  end

  def song_titles
    self.songs.pluck(:title).join(', ')
  end

  # Nice formatting of album title + artist name
  # If you call this method 'to_s', you will be overriding the default
  # AR behaviour which prints out '#<Album:0x768767sd>', and instead show
  # something more readable; 'puts' will automatically call this method,
  # as will string interpolation
  def to_s
    "'#{ self.title }' by #{ self.artist.name }"
  end

end
