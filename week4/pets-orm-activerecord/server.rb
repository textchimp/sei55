
require 'sinatra'
require 'sinatra/reloader'
require 'sqlite3'
require 'pry'

require 'active_record'

# Set up the connection to the DB
ActiveRecord::Base.establish_connection(
  adapter: 'sqlite3',  # What kind of DB is this?
  database: 'database.db'
)

# Show us all the SQL you're saving us from writing
ActiveRecord::Base.logger = Logger.new STDOUT

# Close the connection after every request
after do
  ActiveRecord::Base.connection.close
end

# Tell AR how to talk to our 'pets' table
# By inheriting from the AR base class, we
# enable all the AR querying features within
# our own class, and we also tell AR what the
# database table is called
# This is referred to as a 'model', i.e. a way 
# of representing our DB table 'pets'
class Pet < ActiveRecord::Base
  belongs_to :owner  # belongs_to uses a SINGULAR form of the other table name
                     # AR will expect an 'owner_id' integer field on this table
end

class Owner < ActiveRecord::Base
  has_many :pets     # has_many uses a PLURAL form of the other table name
                     # AR will go to the pets table and look for an owner_id field
                     # to find the pets belonging to a specific owner
end

# binding.pry  # debugger



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

# CRUD ROUTES for Pets

# Create

# 1. Blank form (new)

get '/pets/new' do
  erb :new
end  # get /pets/new  (form)

# 2. Form action submits here (create)

post '/pets' do

  # insert_sql = "
  #   INSERT INTO pets ( name, species, description, roundness, alive, age, image_url )
  #   VALUES (
  #     '#{ params[:name] }',
  #     '#{ params[:species] }',
  #     '#{ params[:description] }',
  #     #{ params[:roundness] },
  #     #{ params[:alive] },
  #     #{ params[:age] },
  #     '#{ params[:image_url] }'
  #   );
  # "
  #   db_query insert_sql

  Pet.create(
    name:        params[:name],
    species:     params[:species],
    description: params[:description],
    roundness:   params[:roundness],
    alive:       params[:alive],
    age:         params[:age],
    image_url:   params[:image_url]
  )


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
  # @results = db_query 'SELECT * FROM pets;'
  @results = Pet.all
  erb :index
end  # get /pets   (index)

# 2. Show/Details (one row by ID)

#    /pets/3
get '/pets/:id' do
  # @pet = db_query "SELECT * FROM pets WHERE id = #{ params[:id] };"
  # @pet = @pet.first

  @pet = Pet.find params[:id]

  erb :show
end  # get /pets/:id   (show)


# Update

# 1. Pre-filled form using the item ID
get '/pets/:id/edit' do
  # @pet = db_query "SELECT * FROM pets WHERE id = #{ params[:id] };"
  # @pet = @pet.first
  @pet = Pet.find params[:id]
  erb :edit
end  # get /pets/:id/edit


# 2. Form submit, perform DB update, redirect
post '/pets/:id' do
  
  # update_sql = "
  #   UPDATE pets SET
  #     name = '#{ params[:name] }',
  #     species = '#{ params[:species] }',
  #     description = '#{ params[:description] }',
  #     roundness = #{ params[:roundness] },
  #     alive = #{ params[:alive] },
  #     age = #{ params[:age] },
  #     image_url = '#{ params[:image_url] }'
  #   WHERE id = #{ params[:id] };
  # "
  # db_query update_sql

  pet = Pet.find params[:id]
  pet.update(
    name:        params[:name],
    species:     params[:species],
    description: params[:description],
    roundness:   params[:roundness],
    alive:       params[:alive],
    age:         params[:age],
    image_url:   params[:image_url],
    owner_id:   params[:owner_id]
  )

  redirect "/pets/#{ params[:id] }"   # redirect to the show page

end  #  post /pets/:id

# Delete

get '/pets/:id/delete' do
  # db_query "DELETE FROM pets WHERE id = #{ params[:id] };"
  Pet.destroy params[:id]

  redirect '/pets'   # back to index
end


# CRUD ROUTES for Owners

# Create

# 1. Blank form
get '/owners/new' do
  erb :owners_new
end

# 2. Form submit
post '/owners' do

  Owner.create(
    name: params[:name],
    email: params[:email]
  )

  redirect '/owners'

end

# Read

# 1. Index of all owners
get '/owners' do
  @owners = Owner.all
  erb :owners_index
end

# 2. Show/details page for one owner by ID
get '/owners/:id' do
  @owner = Owner.find params[:id]
  erb :owners_show
end


# Update



# Delete