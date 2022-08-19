require 'pry'

# Class names are ALWAYS capitalized in Ruby
class Person

  # This will write the 'name' and 'name=' getter and
  # setter for us
  # i.e. we opt-in to making this data readable
  # and writeable to code outside this object
  attr_accessor :name, :location 
  # attr_accessor :location


  # If you define a method called 'initialize'
  # in your class, THAT is the method that is
  # called when you run Person.new, 
  # i.e. the constructor
  def initialize( first_name, location )
    puts "initialize() was called"
    puts "Birthing new person called #{ first_name }"
    @name = first_name  # instance variable! visible to every method in this class; i.e. this variable is visible throughout this object (instance)
    @location = location
  end

  # # "I want this particular internal instance variable
  # # to be visible outside the methods of this class"
  # # GETTER
  # def name
  #   # puts "@name was requested, save to logfile"
  #   @name
  # end

  # # SETTER
  # # '=' is actually a method in Ruby, like all operators
  # # But we can use it like:
  # #   p1.name = 'newname'
  # def name=( val )
  #   @name = val
  # end


  # def location
  #   @location
  # end


  def hello
    puts "Hello, I am person called #{ @name }."
    puts "I live in #{ @location }."
  end # hello()

  def goodbye
    puts "Bye, it was great to meet you!"
  end # goodbye()

  
end   # class Person

# Inheritance!
# Let's make a new, more specific type of Person
# called a Comedian
# They will inherit all the behaviour (methods)
# and data (instance variable names) of the parent
# class Person (aka superclass or base class),
# but they might also add some specific behaviour of 
# their own, i.e. a 'tell_joke' method
# ...AND they might REDEFINE the behaviour of the
# inherited methods like 'hello'
# 
# Parent is CLOSED for direct MODIFICATION,
# but OPEN for EXTENSION (subclassing)

# "Comedian inherits from Person"
# "Comedian subclasses Person"
class Comedian < Person

  # Create getter and setter for @netflix_special
  # NOTE that objects made from the base class Person will not get this
  attr_accessor :netflix_special   


  # This is called a "class method", in distinction to all our other
  # methods like 'hello' and 'goodbye' which are "instance methods"
  def self.describe_it 
    puts "This is a class for creating comedians"
  end

  # Only Comedians can tell jokes
  def tell_joke
    print "What's brown and sticky?"
    5.times do
      print '.'
      sleep 0.2
    end
    puts "......a stick! AHAHAHAHAHAHA"
  end # tell_joke()

  # We can REDEFINE or "override" the behaviour of a method
  # inherited from the parent
  def hello 

    # We sometimes want to KEEP *both* the original behaviour of an inherited
    # method like 'hello', but ALSO add our custom behaviour in the overrided
    # version.... how do we "have our cake and eat it too?"
    # We DON'T want to just copy paste the original method code here! Not DRY!
    # puts "Hello, I am a person called #{ @name }"
    # puts "I live in #{ @location }"
    
    # Run the version of the method we are in right now, but as defined
    # in the parent class, aka superclass
    super

    # Custom comedian style behaviour 
    puts "Please watch my NetFlix special, like and subscribe etc..."

    # if we are running 'stewart.hello', then self == stewart
    puts "The current object is: #{ self.class }"  

    # Like JS "this.withdraw(500)"
    
    # You can leave out 'self.' and Ruby will assume it, by default
    self.tell_joke   # the hello method can call other methods    

  end # hello()


end  # class Comedian


binding.pry # debugger 