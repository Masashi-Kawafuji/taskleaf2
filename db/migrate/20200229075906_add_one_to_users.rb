class AddOneToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :one, :string, true
  end
end
