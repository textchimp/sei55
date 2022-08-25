class Artist < ApplicationRecord
  has_many :songs

  # 'FREE' association, no extra ID required:
  # an artist has many albums that their songs are on,
  # so we can ask AR to connect us automatically, via
  # the existing 'songs' association defined above;
  # This is a 'through' association - use an in-between
  # model to get to a more remote one
  has_many :albums, through: 'songs'

  has_many :genres, through: 'songs'
end
