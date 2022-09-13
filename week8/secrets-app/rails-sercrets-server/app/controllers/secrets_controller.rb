class SecretsController < ApplicationController

  # Skip the check for the authenticity token which is
  # generated by the form_with helper - we are submitting
  # our form from the React frontend, so we won't have this token
  skip_before_action :verify_authenticity_token, raise: false

  def index
    # Send to the AJAX JS code, as JSON,
    # an array of Secret objects

    # Deal with the browser's CORS header checking for AJAX
    # requests by defining a response header which states that
    # any domain ('*') is allowed to make AJAX requests to
    # this route
    # headers['Access-Control-Allow-Origin'] = '*'

    # sleep 3

    render json: Secret.all.reverse  # show most-recent-first
  end  # index


  def create

    # headers['Access-Control-Allow-Origin'] = '*'

    secret = Secret.create content: params[:content]

    if secret.persisted?
      render json: secret  # send the created Secret object as JSON response
    else
      render json: { error: 'Could not create secret' }, status: 422  # 'Unprocessable Entity', i.e. force an HTTP error code
    end # else

  end # create


end
