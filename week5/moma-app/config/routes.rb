Rails.application.routes.draw do

  # root page (get '/')
  root to: 'pages#home'

  # Artist CRUD

  # CREATE

  # 1. Blank form
  get '/artists/new' => 'artists#new', as: 'new_artist'

  # 2. Form submit, create artist, redirect to index
  post '/artists' => 'artists#create'

  # READ

  # 1. Index of all artists
  get '/artists' => 'artists#index'

  # 2. Show/details page for one artist by ID
  get '/artists/:id' => 'artists#show', as: 'artist'  # artist_path(ID)


  # UPDATE 

  # 1. Pre-filled form based on the artist ID
  get '/artists/:id/edit' => 'artists#edit', as: 'edit_artist'

  # 2. Form submit, perform update, redirect to show page
  patch '/artists/:id' => 'artists#update'

  # DESTROY
  delete '/artists/:id' => 'artists#destroy'


  # CRUD routes for Works
  resources :works
  
  #     works GET    /works(.:format)            works#index
  #           POST   /works(.:format)            works#create
  #  new_work GET    /works/new(.:format)        works#new
  # edit_work GET    /works/:id/edit(.:format)   works#edit
  #      work GET    /works/:id(.:format)        works#show
  #           PATCH  /works/:id(.:format)        works#update
  #           PUT    /works/:id(.:format)        works#update
  #           DELETE /works/:id(.:format)        works#destroy



end
