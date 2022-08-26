class UsersController < ApplicationController
  
  def new
    @user = User.new  # for the 'form_with'
  end

  def create

    @user = User.create user_params # strong params

    # Did the above User.create actually create an object which was
    # saved into the DB? It might not have, if there was a validation error
    if @user.persisted?
      session[:user_id] = @user.id  # LOGIN automatically!
      redirect_to user_path(@user.id)  # go to user profile page
    else
      # we won't do this:
      # redirect_to new_user_path

      # instead, we render again the 'new' template, i.e. the blank form,
      # and the form will have access to the '@user' variable
      # which includes the error messages from the AR validation process
      
      # This does NOT run the new() method above, just shows the template
      # as the template for the current 'create' method
      render :new  
    end


  end

  def index
  end

  def show
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private

  def user_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

end
