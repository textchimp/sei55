class ReservationsController < ApplicationController

  skip_before_action :verify_authenticity_token # , raise: false
  FAKE_USER_ID = 16

  def create
    # render json: params  # just to test


    reservation = Reservation.create!(
      user_id: FAKE_USER_ID,
      flight_id: params[:flight_id],
      row: params[:row],
      col: params[:col]
    )

    if reservation.persisted?
      render json: reservation
    else
      render json: { error: true, details: reservation.errors.full_messages  }, status: 422
    end # else


  end # create()


end # class ReservationsController
