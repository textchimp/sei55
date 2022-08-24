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

  # DESTROY




end
