class Mixtape < ApplicationRecord
  has_and_belongs_to_many :songs
  belongs_to :user, optional: true 

  # Can't leave names blank for a mixtape!
  # Otherwise there's no link text to click on
  validates :name, presence: true

  # GEOCODING: automatically lookup the GPS coordinates for the address
  # of a mixtape, as it is .created

  geocoded_by :address

  after_validation :geocode  # actually do lookup when .create-ing

end
