
# Single Table Inheritance: "a Pear is a kind of Fruit"
# We want to use the 'fruits' table to store Pears, Apples,
# Bananas etc, i.e. not have to make a unique table for
# each of these... and we might want all these kinds of fruit
# to share some methods of the base class Fruit
class Pear < Fruit

  # res = detector('listen', [ 'tinsel', 'inlets', 'hello' ] )
  # expect( res ).to include('tinsel', 'listen')
  # expect( res ).to_not include('hello')

  #  add( 2, 3 )  
  #  expect( add(2, 3) ).to eq 

  validates :name, presence: true, uniqueness: true

  def squishy?
    true  # this is a hardcoded return value
  end

end