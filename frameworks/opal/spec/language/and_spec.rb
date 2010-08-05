# describe "The '&&' statement" do |adam|
#   
#   it "short-circuits evaluation at the first condition to be false" do
#     x = nil
#     true && false && x = 1
#     x.should == nil
#   end
#   
#   it "evaluates to the first condition not to be true" do
#     ("yes" && 1 && nil && true).should == nil
#     ("yes" && 1 && false && true).should == false
#   end
#   
#   it "evaluates to the last condition if all are true" do
#     ("yes" && 1).should == 1
#     (1 && "yes").should == "yes"
#   end
#   
#   it "evaluates the full set of chained conditions during assignment" do
#     x = nil
#     y = nil
#     x = 1 && y = 2
#     x.should == 2
#   end
#   
#   it "treats empty expressions as nil"
# end
# 
# describe "The 'and' statement" do
#   
#   it "short-circuits evaluation at the first condition to be false" do
#     x = nil
#     true and false and x = 1
#     x.should == nil
#   end
#   
#   it "evaluates to the first condition not to be true" do
#     ("yes" && 1 && nil && true).should == nil
#     ("yes" && 1 && false && true).should == false
#   end
#   
#   it "evaluates to the last condition if all are true" do
#     ("yes" && 1).should == 1
#     (1 && "yes").should == "yes"
#   end
#   
#   it "when used in assignment, evaluates and assigns expressions individually" do
#     x = nil
#     y = nil
#     x = 1 and y = 2
#     # evaluates (x = 1) and (y = 2)
#     x.should == 1
#   end
#   
#   it "treats empty expressions as nil"
# end
