class User < ApplicationRecord

  # Use the 'bcrypt' gem to encrypt passwords at the point of
  # creating a new user object - this will happen transparently,
  # and then we ONLY store the encrypted version ('digest') - 
  # NEVER the 'plaintext'
  # To use use this system, when we create a user we specify the
  # field 'password: "chicken"', but it will be SAVED in a field
  # called 'password_digest' 
  # i.e.
  # User.create! email: 'user@ga.co', password: 'chicken'
  #            ----------------------> password_digest: '798sfd8shdfiushdfkjsdhfsere4'

  validates :name, length: { minimum: 2 }

  # Don't allow a User.create to proceed when the email field is left blank
  validates :email, presence: true, uniqueness: true

  has_secure_password

  has_many :mixtapes
end
