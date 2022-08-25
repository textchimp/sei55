class Song < ApplicationRecord
  belongs_to :artist, optional: true  
  #                   ^^^^^^^^^^^^^^^ You don't HAVE TO specify the artist_id when you create a Song
  # i.e. disable the 'validation' that requires a Song to belong to an artist when created,
  # so that we can add that artist ID at a later stage using a nice short AR syntax

  belongs_to :album, optional: true

  has_and_belongs_to_many :genres  # Many-to-many association with Genre

  has_and_belongs_to_many :mixtapes
end
