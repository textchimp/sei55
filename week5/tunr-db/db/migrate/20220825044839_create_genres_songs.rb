class CreateGenresSongs < ActiveRecord::Migration[5.2]
  def change
    create_table :genres_songs do |t|
      t.integer :song_id
      t.integer :genre_id
    end
  end
end
