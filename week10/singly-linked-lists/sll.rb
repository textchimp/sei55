# ...use a Ruby 'mixin' to give 'map', 'reduce' etc for free
# as long as we define an 'each' method
include Enumerable
# 'interface abstraction' / 'interface inheritance'



# THOUGHT EXPERIMENT:
#
# ! What if you didn't have arrays in a
# ! language?
#
# OR 
#
# ! What if you couldn't change the number of
# ! items in an array? 
# (no dynamic memory allocation)
#
# JS & Ruby are 'high-level' interpreted
# languages; they provide a relatively
# abstracted/managed access to computer
# memory
#
# C is a low-level, compiled language which
# requires the programmer to manage memory
# allocation manually
#    int ages[10];

# quick alias for reloading this file
# # when in pry - just for debugging
# def r
#   puts "Reloading..."
#   load './sll.rb'
#   puts list
# end



class SLL

  # Keep track of the first node in the list; from
  # this we can advance via '.next' to visit all
  # the following nodes, one at a time
  
  attr_accessor :head

  # Note: val argument now optional
  # (need to be able to create an empty list
  # when reverse()-ing)
  def initialize( val=nil )
    # Create an instance of the Node class,
    # and give it the 'val' argument as its
    # data; then store this new first node
    # in the @head attribute
    @head = Node.new val unless val.nil?
  end

  # This method will create a new Node, assign 'val'
  # as its data, and....
  def prepend( val )
    new_node = Node.new val
    
    # ... since we are prepending, the original
    # start of the list is now the 'next' item
    # for this new first item
    new_node.next = @head
    @head = new_node
    # WHOOPS:
    # @head = new_node      # reassigning @head first...
    # new_node.next = ????? # ...lost access to original @head
  end


  # Create a new node with the specified value as it data
  # and add it to the END of the list, i.e. make it .next
  # of the current last node in the list
  # But... we don't HAVE the end of the list,
  # we only have the @head (the start)
  # TODO: add a '@tail' or '@end' instance variable that
  # keeps track of the last node in the last, saving us
  # from having to iterate throught the whole list at O(N)
  # just to add something to the end;
  # don't forget to keep this new pointer variable up to date
  # when you append, insert, delete etc from the end
  def append( val )

    new_node = Node.new val


    # loop through all the nodes in the list
    # until we find the end, i.e. the node whose
    # .next value is 'nil'

    # start looping at the start of the list, using a 
    # variable to keep track of where we are in the list
    current_node = @head   

    # as long as we haven't reached the last node....
    while current_node.next != nil
      # ...advance the loop pointer to the next node in the list
      current_node = current_node.next   # i++
    end 

    # current_node is now the last node in the list,
    # i.e. its .next is nil
    current_node.next = new_node   # new_node is the new end!

  end # append

  # def print
  # if we define to_s, it will be used by methods like
  # puts to generate the string representation of this list
  # .... also by string interpolation!
  def to_s 

    output = ''

    current_node = @head

    while current_node != nil
      output += current_node.data + ', '
      # output += ', ' if current.next != nil
      current_node = current_node.next  # advance to next node
    end

    output  # implicit return of the final string 

  end #print


  # Find (and return) the entire node whose 'data' is the
  # specified needle argument
  def find( needle )

    current_node = @head

    while current_node != nil
      if current_node.data == needle
        return current_node  # return the whole node
      end
      current_node = current_node.next # advance to next node
    end

  end # find

  # Create a new node, set the 'val' arg as its data,
  # and 'splice' it into the list after the given 'node',
  # and don't forget to add the rest of the list onto 
  # the end of the new node
  def insert_after( node, val )

    new_node =  Node.new val

    # Our new node points to the insert-after node's
    # next node
    new_node.next = node.next

    # The insert-after node's next now becomes 
    # our new node
    node.next = new_node

  end # insert_after



  # Homework: implement these methods:

  # Return the length of the list
  # - this will initially involve iteration
  # - BONUS: make a new instance variable @length
  #   whose job is to know the current length,
  #   and don't forget to update it after any
  #   change to the length of the list
  def length

    count = 0

    # # PRE-each
    #
    # node = @head
    # while node != nil
    #   count += 1
    #   node = node.next
    # end
    # @length = count   # would be nice as shortcut

    # using each
    self.each { |n| count += 1 }

    count
  end # length


  # Array-like access to the node at position n,
  # starting at zero; return whole node
  # def []( n )
  def []( index )     #  list[ n

    return nil unless index < self.length
    # raise IndexError.new('out of range') unless index < self.length

    node = @head
    index.times { node = node.next }
    node
  end # [] method

  # use 'at_index' as an alias for '[]'
  alias_method :at_index, :[]

  # Returns a reversed version of the list;
  # NON-DESTRUCTIVE - do not modify the original
  # list to which this method is applied
  def reverse
    reversed = SLL.new  # leave off argument to avoid creating a head node

    node = @head
    while node != nil
      reversed.prepend node.data
      node = node.next
    end

    reversed # return the new reversed list
  end # reverse()

  # Destructive version of reverse, DOES change
  # the list to which it's applied, i.e. changes 'self'
  def reverse!
    # self = self.reverse   # NOPE! 'the self is immutable'

    # Use the immutable reserve first, then save 
    # the resulting head back to self
    @head = self.reverse.head
  end


  # Remove the first node from the list (destructively)
  # and return the node
  def shift

    # if we don't do this first, it's too late after the next line
    first_node = @head
    @head = @head.next

    first_node.next = nil # don't include the rest of the list

    first_node
  end

  # Remove the specified node from the list;
  # make sure you don't break the chain!
  # This will involve some iteration in order to
  # find the node BEFORE the one we're deleting
  # (this wouldn't be necessary in a Doubly-Linked List)
  def delete( node_to_delete )

    node = @head
    prev_node = nil

    while node != node_to_delete && node != nil
      prev_node = node  # keep track for when we find the node to delete
      node = node.next
    end # while

    if node == node_to_delete
      # special case where the node to delete is the first node
      if node == @head
        @head = node.next
        return true
      end

      prev_node.next = node.next # standard case
    end


    false # this should only happen if the specified node to delete is not actually in this list

  end # delete()



  # Remove the node at the specified position
  # (i.e. you don't already have a node from the list)
  # - make sure you don't break the chain
  # - this one can use at_index() to get the node
  def delete_at( n )
    
    node = self[n]  
    return nil if node.nil?

    if n == 0 
      # special case
      @head = node.next      
    else 
      # get the previous node and link the chain
      # over the current node; i.e. 
      # "the next node of the previous node is now
      # the next node of the current node"
      self[n - 1].next = node.next
    end

    node.next = nil  # don't return whole list
    node
  end

  # Implement the each method: your version of .each
  # must accept a block, and run that block for every item
  # in the list, giving the current item to the block 
  # as a block variable
  # - look into 'yield' and 'block_given?'
  #
  # If you get that working, look into the 'Enumerable' mixin
  # ...which will give you iteration methods like .map,
  # .filter/select, .find for free!
  def each

    return nil unless block_given?

    node = @head
    while node != nil
      yield( node )
      node = node.next
    end

    self
  end # each()


  # as above, expects a block and runs the block for each
  # node in the list, but returns an array of those values
  # as transformed by the block
  #
  # ...simplest case will be like .to_a
  #
  #
  # ### Now provided by 'Enumerable' mixin!
  #
  # def map
  #   output = []
  
  #   self.each do |n|
  #     # "append to the output array whatever the
  #     # result of running the block is (when the 
  #     # block is given the current node)"
  #     output << yield(n)
  #   end
  
  #   output
  # end # map



  # "Data container" class: 
  # really just a box for storing a few pieces
  # of data in, doesn't have much behaviour
  # (methods) of its own
  class Node 

    # TODO: research 'Struct' that lets
    # you create a data container class
    # in a single line:
    #   Node = Struct.new( :data, :next )

    attr_accessor :data, :next

    # # getter
    # def data
    #   @data
    # end

    # # setter 
    # def data=( new_val )
    #   @data = new_val
    # end

    def initialize( val )
      # Set an initial value for the @data
      # attribute
      #    node = Node.new 'my data'
      @data = val
    end

  end # class Node


end # class SLL


# Make a test list to play with when debugging
list = SLL.new 'Morty'
list.prepend 'Rick'
list.prepend 'Summer'
list.append 'Jerry'

# Summer -> Rick -> Morty -> Jerry

require 'pry'
binding.pry  # pause here in pry
