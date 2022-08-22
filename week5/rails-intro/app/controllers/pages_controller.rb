
class PagesController < ApplicationController


  def say_hi
    #  puts "say_hi method was called"

  end  # say_hi


  def haha
    puts "Is this running?"
    @page_title = 'Get Ready for Laffs'
  end  # haha

  def greet
    @number = rand 100  # just an example

    @name = params[:person].capitalize

  end  # greet


end  # class PagesController