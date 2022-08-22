Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # get '/' => 'stocks#welcome'
  root to: 'stocks#welcome'

  # 1. Search form
  get '/stocks' => 'stocks#form'

  # 2. Form submit, use gem to perform lookup, show results
  get '/stocks/lookup' => 'stocks#lookup'


  ##################### MOVIES

  # 1. Movie search form - create a new controller
  get '/movies' => 'movies#search_form'

  # 2. Movie search form submit, use HTTParty to lookup movie
  # submitted by user, loop over results in template
  get '/movies/search' => 'movies#results'


end
