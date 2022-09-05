class AddPriceToFruits < ActiveRecord::Migration[5.2]
  def change
    add_column :fruits, :price, :decimal
  end
end
