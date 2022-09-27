class User < ApplicationRecord
  has_secure_password # use the bcrypt gem to encrypt and verify passwords

  has_many :reservations
  has_many :flights, through: :reservations
end
