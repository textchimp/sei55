
# HOMEWORK CHALLENGE: "memoize" the fib_rec calls -
# - Create a global hash whose keys are the arguments
#   the function is seeing, i.e. each "n", and the value
#   of each key is the return value, i.e. the fibonacci
#   number at position n.
# - Whenever the function runs, first check the hash to see
#   if the argument "n" is already defined as a key of the hash;
#      - if it is already a key, then immediately return 
#        from the function using the value of that key
#        (in other words, skip the recursive steps)
#      - if it's not already a key, then you have to do
#        the recursive calls, but STORE THE RESULT in the hash
#        before you return it from the function... so it can
#        be used next time the function sees that value of "n"
#        to calculate

def fib_rec( n )

  # Define our base case:
  if n < 2
    return 1  # the first two numbers in the sequence are 1
  else 
    return fib_rec(n - 1) + fib_rec(n - 2) # add the previous two numbers
  end

end # fib_rec


puts fib_rec( ARGV.first.to_i )3