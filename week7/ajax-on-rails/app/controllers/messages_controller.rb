class MessagesController < ApplicationController

  def index
    # messages = Message.all
    render json: Message.all
  end 


  def show
    # /messages/:id
    render json: Message.find( params[:id] ) 
  end


  def search
    # /messages/search/:query
    # "SELECT * FROM messages WHERE content ILIKE '%hello%' 
    # .... OR description ILIKE '%hello' " etc
    render json: Message.where('content ILIKE ?', "%#{params[:query]}%" )
  end


end
