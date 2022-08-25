Rails.application.routes.draw do
  
  root to: 'pages#home'

  # Login/logout (session) routes
  get  '/login'   => 'session#new'     # show login form
  post '/login'   => 'session#create'  # form submit, perform login, redirect
  delete '/login' => 'session#destroy' # logout link goes here, perform logout, redirect

  

end
