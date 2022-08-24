class ArtistsController < ApplicationController
  
  # CREATE
  
  def new
    @artist = Artist.new  # No ID yet, i.e. create
  end

  def create
    # raise 'hell'  # debugging - lets us see 'params'

    # After lunch: how to reduce this repetition using a 'doorman'
    Artist.create(
      name: params[:artist][:name],
      nationality: params[:artist][:nationality],
      dob: params[:artist][:dob],
      period: params[:artist][:period],
      bio: params[:artist][:bio],
      roundness: params[:artist][:roundness],
      image: params[:artist][:image]
    )

    redirect_to artists_path  # back to /artists index page

  end


  # READ

  def index
    @artists = Artist.all
  end

  # i.e. GET /artists/:id
  def show
    @artist = Artist.find params[:id]
  end

  def edit
  end

  def update
  end

  def destroy
  end
end
