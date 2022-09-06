class FruitsController < ApplicationController
  # def new
  # end

  def create
    @fruit = Fruit.create fruit_params

    if @fruit.persisted?
      redirect_to @fruit  # go to the show page for this fruit object
    else
      render :new
    end

  end

  def index
    # render plain: 'hello'  # trick the test!
    @fruits = Fruit.all.reverse
  end

  # def show
  # end

  # def edit
  # end

  # def update
  # end

  # def destroy
  # end

  private

  def fruit_params
    params.require(:fruit).permit(:name, :shelf_id)
  end

end
