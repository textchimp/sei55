class ArtistsController < ApplicationController
  
  # CREATE
  
  def new
    @artist = Artist.new  # No ID yet, i.e. create
  end

  def create
    # raise 'hell'  # debugging - lets us see 'params'

    # After lunch: how to reduce this repetition using a 'doorman'
    # Artist.create(
    #   name: params[:artist][:name],
    #   nationality: params[:artist][:nationality],
    #   dob: params[:artist][:dob],
    #   period: params[:artist][:period],
    #   bio: params[:artist][:bio],
    #   roundness: params[:artist][:roundness],
    #   image: params[:artist][:image]
    # )

    Artist.create artist_params # filtered list of fields

    redirect_to artists_path  # back to /artists index page

  end  # create


  # READ

  def index
    @artists = Artist.all
  end

  # i.e. GET /artists/:id
  def show
    @artist = Artist.find params[:id]
  end

  # UPDATE

  # 1. Pre-filled form, based on artist ID
  def edit
    @artist = Artist.find params[:id]
  end

  def update
    # raise 'hell'
    artist = Artist.find params[:id]

    artist.update artist_params 

    redirect_to artist_path(artist.id)
  end

  def destroy
    # raise 'hell'
    Artist.destroy params[:id]

    redirect_to artists_path   # back to index
  end

  # 'private' in general OOP means methods which are not
  # visible/callable from 'outside' the class, i.e. can't be
  # called on an object made from the class - they can only
  # be called by other methods within the class

  # What it means in a Rails controller is that this method
  # is NOT an 'action' - it's not a handler for a route, it's
  # just a toolkit function to be used by the actions 
  # (route-handling methods)
  

  private ##################################################

  # this method will return a special locked-down/'whitelisted'
  # version of params - only the specified keys within the
  # params hash will be allowed through - and then we can
  # use this version of params directly with Artist.create etc
  def artist_params
    # GOTCHA: if you add new columns to your table, they
    # will also have to be named here
    params.require(:artist).permit(:name, :nationality, :dob, :period, :roundness, :bio, :image)
  end


end # class ArtistsController
