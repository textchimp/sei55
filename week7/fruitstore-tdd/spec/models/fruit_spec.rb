
require 'rails_helper'  # load up Rails context for this test file


# 'describe' blocks are containers for multiple specific
# test examples which all belong together, i.e. we are 
# writing a bunch of tests for the Fruit model
RSpec.describe Fruit, type: :model  do

  # The code in this before block runs uniquely
  # before each specific example ('it' block) below
  #
  # This lets us DRY up our example blocks to ideally
  # contain just the assertions (and sometimes specific
  # actions, but as few as possible)
  before do
    shelf = Shelf.create name: 'test shelf'
    Pear.create name: 'nashi', price: 2, shelf_id: shelf.id
    @fruit_retrieved = Pear.first 
  end



  # We next provide a series of 'examples' as "it" blocks:

  it 'should create a valid Fruit object' do
    
    # AAA: Arrange, Act, Assert

    # Fruit.create   # Run some actual code of your app (Act)
    # fruit_retrieved = Fruit.first  # go and get it again from the DB

    # Assert - did the app code actually work properly?
    # RSpec has its own special syntax for expressing assertions,
    # kind of like a DSL; these are called 'matchers'

    # if fruit_retrieved != nil
    expect( @fruit_retrieved ).to_not be_nil   # assert that it's not nil
    expect( @fruit_retrieved ).to be_a Fruit   # assert that it's actually a Fruit instance
  end

  it 'should remember its name' do
    
    # Fruit.create name: 'nashi'
    # # There is an implicit Fruit.destroy_all before each example runs!
    # fruit_retrieved = Fruit.first  

    expect( @fruit_retrieved.name ).to eq 'nashi'

  end


  it 'should remember its price' do
    # Fruit.create name: 'nashi', price: 2
    # fruit_retrieved = Fruit.first
    # p fruit_retrieved
    expect( @fruit_retrieved.price ).to eq 2
  end


  it 'should remember its class via Single Table Inheritance' do
    expect( @fruit_retrieved.class ).to eq Pear
    expect( @fruit_retrieved ).to be_a Pear
  end


  it 'should not consider Fruits to be Pear' do
    
    expect( Pear.count ).to eq 1  # due to before action

    # Add a Fruit and check that it has not changed
    # the number of Pear results
    Fruit.create name: 'basic fruit'

    expect( Pear.count ).to eq 1

  end


  it 'should be squishy (if a Pear)' do
    # Predicate method
    expect( @fruit_retrieved.squishy? ).to eq true
  end

  it 'should not be squishy (if a base Fruit)' do
    fruit = Fruit.create name: 'base fruit'
    expect( fruit.squishy? ).to eq false
    # expect{ fruit.squishy? }.to raise_error(NoMethodError)
  end


  # Test AR validations

  it 'should fail validation when created without a name' do
    pear = Pear.create
    expect( pear ).to be_invalid
    # expect( pear.invalid? ).to be true
  end

  it 'should validate the uniqueness of the name' do
    pear_duplicate = Pear.create name: 'nashi'
    expect( pear_duplicate ).to be_invalid
    # expect( Pear.count ).to be 1   # don't test the framework
  end

  # Test the association: a Fruit belongs_to a Shelf
  # Note the one-line version of the 'it' block - 
  # no description string, and RSpec can work out from
  # context that the "subject" is the Fruit model itself,
  # due to the describe block this example appears in
  
  # it { should belong_to(:shelf) }


end # describe Fruit
