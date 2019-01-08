Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root to: 'static_pages#root'

  resources :users, only: [:create, :destroy, :show], format: :json
  resources :cities, only: [:create, :destroy, :show, :index], format: :json
  resource :session, only: [:create, :destroy], format: :json

end
