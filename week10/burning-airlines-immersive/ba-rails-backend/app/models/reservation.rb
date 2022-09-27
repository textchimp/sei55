class Reservation < ApplicationRecord
  belongs_to :user
  belongs_to :flight
  # Ensure that the same seat (row & col combo) cannot be booked twiced for the same flight
  validates :row, uniqueness: { scope: [:col, :flight_id] }
end
