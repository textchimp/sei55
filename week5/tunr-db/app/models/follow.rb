class Follow < ApplicationRecord

  # We need to use 'class_name' here because the name of 
  # the association itself does not tell AR what the other
  # table name is called

  belongs_to :follower, class_name: 'User' 
  belongs_to :followed, class_name: 'User'

  # The column 'status' MUST BE AN INTEGER to be used as an enum
  enum status: [ :pending, :approved ]

  after_initialize :init

  def init
    self.status ||= :pending   # default value for status
  end

end
