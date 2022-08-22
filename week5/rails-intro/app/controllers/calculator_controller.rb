
class CalculatorController  <  ApplicationController

  def do_calculation
    
    @first = params[:first].to_i
    @op = params[:op]
    @second = params[:second].to_f

    # @result = case @op
    # when '+'    then @first + @second
    # when '-'    then @first - @second
    # when '*'    then @first * @second
    # when 'div'  then @first / @second
    # else 
    #   "BAD CALCULATION"
    # end # case

    @result = @first.send @op, @second

  end # do_calculation


  def home
    
  end # home


end  # class CalculatorController