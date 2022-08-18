
require 'sinatra'
require 'sinatra/reloader'
require 'sqlite3'
require 'pry'


def db_query( sql )

  puts "=============================\n\n"
  puts sql
  puts "\n=============================\n\n"

  # Connect to our SQL database
  db = SQLite3::Database.new 'database.db'
  db.results_as_hash = true
  results = db.execute sql
  db.close

  results   # implicit return

end # db_query()



# binding.pry  # pause in pry

# Home/root route
get '/' do
  erb :home
end  

# CRUD ROUTES

# Create

# 1. Blank form (new)

get '/pets/new' do
  erb :new
end  # get /pets/new  (form)

# 2. Form action submits here (create)

post '/pets' do

  insert_sql = "
    INSERT INTO pets ( name, species, description, roundness, alive, age, image_url )
    VALUES (
      '#{ params[:name] }',
      '#{ params[:species] }',
      '#{ params[:description] }',
      #{ params[:roundness] },
      #{ params[:alive] },
      #{ params[:age] },
      '#{ params[:image_url] }'
    );
  "

    db_query insert_sql


    # After processing this form submit and inserting the details
    # into the DB, we don't want this route to show its own template 
    #  - what if someone tries to reload that template? It would cause
    # the INSERT to be duplicated.
    # It's safer and better practice to redirect to a completely
    # different route

    redirect '/pets'  # go to the index - there we will see the new item

end  # post /pets  (form submit)


# Read

# 1. Index (all rows in table)

get '/pets' do
  @results = db_query 'SELECT * FROM pets;'
  erb :index
end  # get /pets   (index)

# 2. Show/Details (one row by ID)

#    /pets/3
get '/pets/:id' do
  @pet = db_query "SELECT * FROM pets WHERE id = #{ params[:id] };"
  @pet = @pet.first
  erb :show
end  # get /pets/:id   (show)


# Update

# 1. Pre-filled form using the item ID
get '/pets/:id/edit' do
  @pet = db_query "SELECT * FROM pets WHERE id = #{ params[:id] };"
  @pet = @pet.first
  erb :edit
end  # get /pets/:id/edit


# 2. Form submit, perform DB update, redirect
post '/pets/:id' do
  
  update_sql = "
    UPDATE pets SET
      name = '#{ params[:name] }',
      species = '#{ params[:species] }',
      description = '#{ params[:description] }',
      roundness = #{ params[:roundness] },
      alive = #{ params[:alive] },
      age = #{ params[:age] },
      image_url = '#{ params[:image_url] }'
    WHERE id = #{ params[:id] };
  "

  db_query update_sql

  redirect "/pets/#{ params[:id] }"   # redirect to the show page

end  #  post /pets/:id

# Delete

get '/pets/:id/delete' do
  db_query "DELETE FROM pets WHERE id = #{ params[:id] };"

  redirect '/pets'   # back to index
end
