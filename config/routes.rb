Rails.application.routes.draw do
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'

  namespace :admin do
    resources :users
  end

  get '/users/:id', to: 'users#show'

  root to: 'tasks#index'

  resources :tasks do
    post :confirm, action: :confirm_new, on: :new
    post :import, on: :collection
    get :export, action: :export, on: :collection
  end

  post '/tasks/:id/done', to: 'tasks#done'
end
