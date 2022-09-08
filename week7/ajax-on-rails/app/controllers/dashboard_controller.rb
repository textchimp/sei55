class DashboardController < ApplicationController

  def app
  end

  def uptime

    @uptime_output = `uptime`

    # The value of this json: key
    # will become res.data in our JS
    # axios.get .then() callback
    data = {
      command: 'uptime',
      output: @uptime_output,
      random_numbers: [1234, 5, 6]
    } 

    # The same controller action can respond in different ways -
    # either HTML or JSON, depending on the request format.
    # The browser specifies this format as a requests header:
    #  Accept: application/json    - JSON for AJAX requests
    #  Accept: text/html           - regular HTML page (template)
    
    # sleep 2

    respond_to do |format|
      format.html  # do nothing, i.e. render the default template
      format.json {  render json: data  }
    end # respond_to

  end # uptime


  def hog
    @hog = `ps xr`.split("\n").second

    render json: {
      hog: @hog
    }

  end # hog


end # class DashboardController
