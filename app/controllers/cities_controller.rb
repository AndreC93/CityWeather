class CitiesController < ApplicationController
  def create
    complete_city_params = city_params
    complete_city_params[:creator_id] = current_user.id
    @city = City.new(complete_city_params)
    if @city.save
      render json: @city
    else
      render json: @city.errors.full_messages, status: 422
    end
  end

  def destroy
    @city = City.find_by(id: params[:id])
    if current_user.id == @city.creator_id
      @city.destroy
      render json: @city
    else
      render json: ['No access to this action!'], status: 422
    end
  end

  def show
    name = params[:name]
    RestClient.get("https://api.openweathermap.org/data/2.5/weather?q=#{name}&APPID=c0a9b33f3889ab4f0926ba26ed8c9638")
    @city = City.find_by(id: params[:userId])
    if @city
      @cities = @user.cities
      render :show
    else
      render json: 'No City Found', status: 404
    end
  end

  def index
    @cities = City.where(creator_id: current_user.id);
    render json: @cities
  end

  private

  def city_params
    params.require(:city).permit(:name)
  end
end