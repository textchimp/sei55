class Artist < ApplicationRecord
  # Tell AR to look at the 'artist_id' column
  # of the 'works' table, to find out which
  # works belong to a certain artist
  # We can now say e.g.: a1.works 
  has_many :works
end
