class MixtapesController < ApplicationController
  
  # Index and Show don't require a user to be logged in,
  # but all the other actions do (create, update, destroy)
  before_action :check_if_logged_in, except: [ :index, :show ]

  def new
    @mixtape = Mixtape.new
  end

  def create

    raise 'hell'  # so we can inspect 'params'

    # DO NOT SEND user_ids THROUGH A FORM! Anyone can change form data
    # from the dev tools!
    # Use @current_user.id here to associate with a user - this assumes
    # that the current action is locked down by 
    #   before_action :check_if_logged_in

    # Option 2. Use .new instead of .create, and 
    # then use '=' and '.save'
    @mixtape = Mixtape.new mixtape_params
    @mixtape.user_id = @current_user.id

    # Check if a file was uploaded via the form, and if so,
    # forward that file onto cloudinary,
    # and then save the file ID it gives us back, into the
    # mixtapes object
    if params[:mixtape][:image].present?
      # Upload to Cloudinary and capture the response, which includes a new ID
      response = Cloudinary::Uploader.upload params[:mixtape][:image]
      # p response  # view in iTerm/terminal

      # set the ID into the model object to save
      @mixtape.image = response["public_id"]  
    end # image upload

    # NOTE: for the 'update', be sure to remove
    # the image field from your strong params 
    # - otherwise you might overwrite the Cloudinary ID 
    # if you perform your @mixtape.update mixtape_params 
    # after the Cloudinary upload


    @mixtape.save  # this is actually the create, the DB insert

    # Option 1. Make a separate DB query using the '<<' syntax
    # @current_user.mixtapes << @mixtape

    if @mixtape.persisted?
      redirect_to mixtapes_path
    else
      render :new
    end  # else


  end  # create

  def index
    @mixtapes = Mixtape.all
  end

  def show
    @mixtape = Mixtape.find params[:id]
  end

  def edit
    @mixtape = Mixtape.find params[:id]

    # Don't even show the edit form if the
    # mixtape doesn't belong to this user

    # TODO: model method in app/models/user.rb:
    # if @current_user.owns( @mixtape )

    if @mixtape.user_id != @current_user.id
      redirect_to login_path
    end

  end


  def update

    @mixtape = Mixtape.find params[:id]

    # Check AGAIN that this mixtape belongs
    # to the logged-in user, since people can
    # still work out the edit URL even if they
    # aren't shown it 
    if @mixtape.user_id != @current_user.id
      redirect_to login_path
      return 
      # STOP THE REST OF THE CODE FROM RUNNING
      # i.e. prevent .update that follows
      #
      # Note: a redirect_to does NOT on its own
      # prevent the rest of the controller action's
      # code from running
    end

    if @mixtape.update mixtape_params
      redirect_to @mixtape  # defaults to show
    else
      render :edit
    end # else


  end  # update

  def destroy
  end

  private

  def mixtape_params
    params.require(:mixtape).permit(:name, :image) # REMOVE :image when using Cloudinary
  end

end # class
