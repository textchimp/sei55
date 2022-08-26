class Mixtape < ApplicationRecord
  has_and_belongs_to_many :songs
  belongs_to :user, optional: true 

  # Can't leave names blank for a mixtape!
  # Otherwise there's no link text to click on
  validates :name, presence: true

end
