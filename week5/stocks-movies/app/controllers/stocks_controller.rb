
class StocksController < ApplicationController

  def welcome
  end  # welcome

  def form
  end  # form

  def lookup
    @stock_code = params[:stock_code]

    # Perform lookup using gem
    # NO NEED FOR require 'stock_quote' - as long as it's in the
    # Gemfile and you have run 'bundle install' in the terminal
    # and restarted the server, you can now use that gem anywhere

    StockQuote::Stock.new(api_key: 'pk_16a849fd637243a79fff90fa4d42bc5d')

    @results = StockQuote::Stock.quote @stock_code

    # raise 'hell'  # FORCE an error, so we can use the 'web console'

  end # lookup

end # class StocksController