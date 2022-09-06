class Fruit < ApplicationRecord

  belongs_to :shelf, optional: true

  validates :name, presence: true

  def squishy?
    false
  end


end
