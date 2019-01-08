class CreateCitiesTable < ActiveRecord::Migration[5.2]
  def change
    create_table :cities do |t|
      t.string :name, null: false
      t.string :country, null: false
      t.float :lat, null: false
      t.float :lon, null: false
    end

    add_index :cities, :name
  end
end
