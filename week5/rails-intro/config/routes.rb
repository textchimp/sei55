Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # verb '/path' => 'controller#method'

  # GENERALLY our controller names will match our
  # table names, i.e. 'pets#' instead of 'pages#'
  # BUT we are not creating tables today, so 'pages'
  # is just a generic name for non-DB-based pages

  get '/hello' => 'pages#say_hi'

  get '/funny' => 'pages#haha'

  # Dynamic route
  get '/hello/:person' => 'pages#greet' 

  # Calculator

  #     /calc/5/*/6   show result: 30
  get '/calc/:first/:op/:second' => 'calculator#do_calculation'

  # Form-based calculator
  
  # 1. Show the form
  get '/calc' => 'calculator#home'

  # 2. Form submit, show results
  # (Note that we can re-use the URL-based calculator
  # because we have used the same names from that
  # dynamic URL i.e. :first etc as the names of our
  # form fields, i.e. name="first" ... and the
  # submitted form data from the querystring ends up
  # in 'params' just as the dynamic URL parts do)
  get '/calc/answer' => 'calculator#do_calculation'

end

# DO NOT ADD ROUTES AFTER THE 'end'
