class SessionController < ApplicationController
  def new
  end

  def create
    
    # raise 'hell'

    # 1. Check that the email address entered is actually in the DB
    user = User.find_by email: params[:email]

    # 2. Did we actually find a user with that email address (or was
    # it nil), AND if we did find a user, is the password entered the
    # correct password for this email address?
    # Note that .authenticate will encrypt the password entered via the
    # form on-the-fly, and compare it to the user.password_digest
    if user.present? && user.authenticate( params[:password] )

      # credentials are correct - successful login!

      # 'session' is a special Rails hash which REMEMBERS its contents
      # across page reloads - recall that most variables in our controllers
      # are not shared across reloads in this way.
      # The way Rails causes this session hash to be remembered is by
      # storing it in an HTTP cookie - i.e. ask the browser to remember
      # something via a response header for this page load
      # For every subsequent request from the browser, it will re-present
      # that cookie to the server as a request header

      session[:user_id] = user.id   # ALSO do this when creating a new user!

      redirect_to root_path  # back to /

    else

      # Either user was nil (no account with that email address),
      # or the password given did not, when encrypted, match the
      # password digest stored for that user account

      redirect_to login_path   # try again! TODO: show error message

    end # else

  end  # create

  def destroy
    session[:user_id] = nil    # logs out the user
    redirect_to login_path     # back to the login page
  end
end
