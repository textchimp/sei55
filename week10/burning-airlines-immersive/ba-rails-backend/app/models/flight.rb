class Flight < ApplicationRecord
  belongs_to :airplane
  has_many :reservations
  has_many :users, through: :reservations

  # custom model method for providing a nicely-formatted date string
  def departure_date_formatted
    # f1.departure_date_formatted ----> self will be f1
    # flight.departure_date_formatted --> self will be flight
    self.departure_date.strftime '%d %b %Y, %H:%M'
  end


end
