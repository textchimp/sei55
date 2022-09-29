class FlightsController < ApplicationController

  def index
    render json: Flight.all
  end # index


  def search

    flights = Flight.where origin: params[:origin], destination: params[:destination]

    # sleep 3  # test the loading message in the frontend

    # render json: flights, include: 'airplane'

    # For testing error-handling on the frontend:
    # render json: { error: 'Database disconnected' }, status: 422

    render json: flights, include: {
      airplane: {
        only: [ :name ] #   except: [ :created_at, :updated_at ]
      }
    }, methods: [ :departure_date_formatted ] 

  end # search


  def show
    flight = Flight.find params[:id]
    # TODO: Look into GraphQL as a way to specify from the actual frontend query
    # TODO: exactly which fields and which nested association data you need from the backend
    
    reservations_lookup = {}

    flight.reservations.each do |r|
      reservations_lookup[ "#{r.row}-#{r.col}" ] = r.user_id
    end


    render json: {
      flight: flight,
      reservations: reservations_lookup
    }, include: {
      
      # "When you give me the JSON for a flight, include the .airplane belongs_to association"
      airplane: {
        # "When you give me the airplane, only give me the following columns:"
        only: [ :name, :rows, :cols ]
        # except: [ :created_at, :updated_at ]
      } # airplane

      # "When you give a flight, also include the .reservations has_many association"
      # reservations: {
      #   # ...and only give me the following columns:
      #   only: [ :row, :col, :user_id ],
      #   # ...but also give me the .user that each reservation belongs_to
      #   include: {
      #     user: {
      #       # ... but only the 'name' column, no password data!
      #       only: [ :name ]
      #     } # user
      #   } # include
      # } # reservations

    }, # top-level include: for the flight JSON
    methods: [ :departure_date_formatted ]

  end # show

end
