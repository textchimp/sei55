
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  
  allow do
    origins '*'  # set CORS header
    resource '*', headers: :any, methods: [:get, :post, :patch, :put] # handle OPTIONS requests from axios.post() "pre-flight" check
  end

end