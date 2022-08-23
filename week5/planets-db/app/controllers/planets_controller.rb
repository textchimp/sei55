
class PlanetsController < ApplicationController

  def home
  end

  # CREATE

  # 1. blank form
  def new
    @planet = Planet.new
  end

  # 2. form submit, create, redirect
  def create
    # raise 'hell'

    # Because the 'form_with' helper created form input names like
    # name="planet[moons]" and name="planet[image_url]",
    # the posted form data we get in params is more nested:
    # to access the moons, you write 'params[:planet][:moons]' etc

    # TODO: make sure the planet was actually created!
    # i.e. validation + user feedback --- later in the week
    Planet.create(
      name:      params[:planet][:name],
      mass:      params[:planet][:mass],
      orbit:     params[:planet][:orbit],
      moons:     params[:planet][:moons],
      image_url: params[:planet][:image_url]
    )

    # The 'create' route should not show its own template due to issues
    # around reloading a page reached by a form POST submit
    # (i.e. duplicating the create action in the database)
    # ... so instead we redirect somewhere else

    redirect_to planets_path  # '/planets'

  end  # create



  # READ

  # 1. Index of all planets
  def index
    @planets = Planet.all
    # raise 'hell'
  end

  # 2. Show page for a planet by ID
  # get /planets/:id
  def show
    @planet = Planet.find params[:id]
  end

  # UPDATE

  # 1. Pre-filled form
  def edit
    @planet = Planet.find params[:id]
  end

  # 2. Form submits here, perform update, redirect

  def update
    # raise 'hell'

    # FIRST: use the id from the URL /planets/5 (:id)
    planet = Planet.find params[:id]

    planet.update(
      name:      params[:planet][:name],
      mass:      params[:planet][:mass],
      orbit:     params[:planet][:orbit],
      moons:     params[:planet][:moons],
      image_url: params[:planet][:image_url]
    )

    # Redirect to the show page for 
    # the planet we just updated
    redirect_to planet_path(planet.id)


  end # update

  # DELETE

  def destroy
    Planet.destroy params[:id]  # TODO: validate that the destroy worked
    redirect_to planets_path  # back to index
  end


end # class PlanetsController
