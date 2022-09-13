
Secret.destroy_all

Secret.create! content: 'First secret'
Secret.create! content: 'I eat glue'
Secret.create! content: 'I am an alien'

puts "Created #{ Secret.count } secrets."