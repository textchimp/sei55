Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'  # set the 'Access-Control-Allow-Origin' header so the browser allows requests from the frontend
    resource '*', headers: :any, methods: [:get, :post, :patch, :put] # handle the 'OPTIONS' preflight check done by axios before it does an axios.post() request
  end
end
