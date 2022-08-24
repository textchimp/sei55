class CreateArtists < ActiveRecord::Migration[5.2]
  def change
    create_table :artists do |t|
      t.string :name
      t.string :nationality
      t.date :dob
      t.string :period
      t.text :image
      t.integer :roundness
      t.text :bio

      t.timestamps  # gives us :created_at, :updated_at
    end
  end
end
