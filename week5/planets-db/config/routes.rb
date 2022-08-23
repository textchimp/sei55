Rails.application.routes.draw do

  # for '/'
  root to: 'planets#home'

  # Planets CRUD


  # Create

  # 1. Blank form
  get '/planets/new' => 'planets#new', as: 'new_planet'  # new_planet_path()

  # 2. Form submits here, create planet, redirect to index
  post '/planets' => 'planets#create'

  # Read

  # 1. Index page of all planets

  get '/planets' => 'planets#index'

  # 2. Show/details page of one planet by ID
  get '/planets/:id' => 'planets#show', as: 'planet'
                                        # gives us 'planet_path()' as a helper


  # Update

  # 1. Pre-filled form (i.e. requires Planet.find with params[:id])
  get '/planets/:id/edit' => 'planets#edit', as: 'edit_planet'

  # 2. Form submits here, update existing planet, redirect to show
  patch '/planets/:id' => 'planets#update'


  # Delete

  # Delete planet by ID, redirect to index
  get '/planets/:id/delete' => 'planets#destroy', as: 'destroy_planet'  # destroy_planet_path( ID )


end
