# == Schema Information
#
# Table name: cities
#
#  id         :bigint(8)        not null, primary key
#  name       :string           not null
#  country    :string           not null
#  lat        :float            not null
#  lon        :float            not null
#  creator_id :integer          not null
#

class City < ApplicationRecord
  validates :name, :country, :lat, :lon, :creator_id, presence: true

  belongs_to :creator, foreign_key: :creator_id, class_name: 'User'

end
