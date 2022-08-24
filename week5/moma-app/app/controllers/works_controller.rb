class WorksController < ApplicationController
  def new
    @work = Work.new
  end

  def create
    Work.create! work_params
    redirect_to works_path  # back to index /works
  end

  def index
    @works = Work.all
  end

  def show
    @work = Work.find params[:id]
  end

  def edit
    @work = Work.find params[:id]
  end

  def update
    work = Work.find params[:id]
    work.update work_params

    # Back to show page, i.e. /works/5 or whatever
    redirect_to work_path(work.id) 
  end

  def destroy
    Work.destroy params[:id]
    redirect_to works_path # index
  end

  private

  def work_params
    params.require(:work).permit( :title, :year, :medium, :style, :image, :artist_id )
  end

end # class WorksController
