class Work < ApplicationRecord
  # Tell AR to use the 'artist_id' of this
  # 'works' table to find the artist associated
  # with this artwork
  # We can now say e.g.:  w1.artist 
  belongs_to :artist
end
