class Fruit < ApplicationRecord

  belongs_to :shelf, optional: true

  
  def squishy?
    false
  end


end
