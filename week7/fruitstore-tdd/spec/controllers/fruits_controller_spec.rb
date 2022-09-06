
require 'rails_helper'

RSpec.describe FruitsController, type: :controller do
  
  describe 'GET #index' do

    # 'before' actions are scoped to their parent 'describe' block,
    # i.e. this one only runs for the 'it' examples related to
    # the "GET #index"
    before do
      @shelf = Shelf.create name: 'test shelf'
      3.times do |i|
        Fruit.create! name: "Test Fruit #{i}", shelf_id: @shelf.id
      end
      @test_fruits = Fruit.all
      get :index  # simulate making a request to fruits#index, creates 'response'
    end

    
    it 'returns HTTP success' do
      expect( response ).to have_http_status( :success )
    end # it returns sucess

    it 'renders the index template' do
      expect( response ).to render_template( :index )
    end # it renders the template

    it 'assigns the instance variable @fruits' do
      expect( assigns(:fruits) ).to be
    end

    # QUESTION: has this test become too 'brittle', too dependent
    # on the implementation details of the controller,
    # i.e. what the exact instance variable is named?
    it 'assigns @fruits to contain all the fruits in the DB table' do
      expect( assigns(:fruits).length ).to eq @test_fruits.length  
      expect( assigns(:fruits).first  ).to be_a Fruit   
      # expect( assigns(:fruits) ).to eq @test_fruits
    end

    # Mgmt says the fruits should be listed in the reverse order
    it 'assigns to @fruits the DB fruits in the reverse order' do
      expect( assigns(:fruits).first.name ).to eq @test_fruits.last.name
      expect( assigns(:fruits) ).to eq @test_fruits.reverse
    end


  end # describe GET #index



  describe 'POST to #create' do
    
    describe 'a fruit with valid information' do
      
      before do
        # Fake a form POST which creates a new Fruit
        post :create, params: {
          fruit: {
            name: 'Strawberry',
            shelf_id: Shelf.create(name: 'test').id 
          }                     
        }
      end # before

      it 'should increase the number of fruits in the DB by 1' do
        expect( Fruit.count ).to eq 1
      end

      it 'should create a fruit using the correct form fields' do
        expect( Fruit.first.name ).to eq 'Strawberry'
      end

      it 'should redirect to the show action for the created fruit' do
        expect( response ).to redirect_to( Fruit.first )
      end

    end # valid


    describe 'a fruit with invalid information' do
      
      before do
        # Fake a form POST with a field missing
        post :create, params: {
          fruit: {
            name: '',  # INVALID!
            shelf_id: Shelf.create(name: 'test').id
          }
        }
      end

      it 'should not increase the number of fruits in the DB' do
        expect( Fruit.count ).to eq 0
      end

      it 'should render the #new template again' do
        expect( response ).to render_template( :new )
      end

    end # invalid


  end # describe POST #create



end # describe FruitsController