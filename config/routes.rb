Rails.application.routes.draw do
  devise_for :users
  resources :messages, only:[:index]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "messages#index"
  resources :users, only: [:edit,:update]
  resources :groups, only: [:new, :create]
end
