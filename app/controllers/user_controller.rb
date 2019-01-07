class UserController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      login(@user)
      render json: @user
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def destroy
    if current_user.id == params[:id]
      @user = User.find_by(id: params[:id])
      @user.destroy
      render json: @user
    else
      render json: ['No access to this action!'], status: 422
    end
  end

  def show
    @user = User.includes(:cities).find_by(id: params[:userId])
    if @user
      @cities = @user.cities
      render :show
    else
      render json: 'No User Found', status: 404
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :password, :email)
  end
end
