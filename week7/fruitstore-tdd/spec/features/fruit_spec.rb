
require 'rails_helper'

RSpec.describe Fruit, type: :feature do
  
  describe 'Loading the /fruits index' do
    
    before do
      shelf = Shelf.create name: 'test shelf'
      3.times do |i|
        Fruit.create! name: "Fruit number #{i}", shelf_id: shelf.id
      end

      visit fruits_path # go the index /fruits

    end # before

    it 'has the correct heading' do
      # puts page.body
      expect( page ).to have_css('div#heading', text: 'Fruit') 
      # expect( page ).to have_css('div#heading', text: /fruit/i) 
    end

    it 'lists the fruits from the DB' do
      expect( page ).to have_css('ul > li', text: 'Fruit number 0')
      expect( page ).to have_css('ul > li', text: 'Fruit number 1')
      expect( page ).to have_css('ul > li', text: 'Fruit number 2')
    end


  end # /fruits index


end # describe Fruit feature