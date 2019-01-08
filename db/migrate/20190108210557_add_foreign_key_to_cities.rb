class AddForeignKeyToCities < ActiveRecord::Migration[5.2]
  def change
    drop_table :cities

    create_table :cities do |t|
      t.string :name, null: false
      t.string :country, null: false
      t.float :lat, null: false
      t.float :lon, null: false
      t.integer :creator_id, null: false
    end

    add_index :cities, :name
  end
end
