Rails.application.routes.draw do
  
  # SPA home route: use root_to: ?????
  get '/dashboard' => 'dashboard#app'


  # AJAX API routes - these routes return JSON data for axios requests to use

  get '/uptime' => 'dashboard#uptime'

  get '/cpuhog' => 'dashboard#hog'


  # API endpoints for the Message model (let's still use CRUD conventions)
  get '/messages'     => 'messages#index'
  get '/messages/:id' => 'messages#show'
  # resources :messages, only: [ :index, :show ]

  # Custom route, not really standard CRUD (though it is a kind of Read)
  get '/messages/search/:query' => 'messages#search'

end
