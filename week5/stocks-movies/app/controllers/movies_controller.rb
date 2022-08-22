class MoviesController < ApplicationController

  def search_form
  end
  
  
  def results

    @query = params[:query]
  
    @response = HTTParty.get "https://api.themoviedb.org/3/search/movie?api_key=24d863d54c86392e6e1df55b9a328755&query=#{ @query }"

    # raise 'hell'

  end # results

end  # class MoviesController