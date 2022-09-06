
require 'httparty'

response = HTTParty.get 'http://www.numbersapi.com/42?json'
# THE PROGRAM PAUSES HERE ("blocks") UNTIL THE RESPONSE
# IS RECEIVED... and once it's received, the next line of code
# can run
# i.e. This is a synchronous/blocking request
puts response['type']
