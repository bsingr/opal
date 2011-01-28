
describe "Document#[]" do

  before :all do
    # add some test elements
    elem = Element.new :div, :id => "document_aref_test"
    
    puts "down c"
    
    elem.html = [
      # id selectors
      "<div id='a'></div>",
      "<div id='b'></div>",
      # non id selectors
      "<div class='document_selector_a'></div>",
      "<div class='document_selector_a'></div>",
      # tag names
      "<article></article>",
      "<article></article>",
      "<article></article>",
      "<article></article>",
      # multipart on single element
      "<div class='partial'></div>",
      "<div class='partial'></div>",
      # multipart on nested elements
      "<div>",
        "<span class='something'>",
          "<div></div>",
        "</span>",
      "</div>",
      
      "<div id='foo_bar_baz'>",
        "<span class='something'>",
          "<p></p>",
        "</span>",
      "</div>"
    ].join("")
    
    puts "down d"
    
    Document.body << elem
    
    puts "down e"
  end
  
  it "should return single elements when the selector is a symbol" do
    a = Document[:a]
    a.class.should == Element
    a.id.should == "a"
    a.tag.should == :div
  end
  
  it "should return nil when the selector is a symbol for an unknown id" do
    Document[:some_id_that_will_not_exist].should == nil
  end
  
  it "should return a single element for a simple id string selector" do
    b = Document['#b']
    b.class.should == Element
    b.id.should == "b"
    b.tag.should == :div
  end
  
  it "should return nil for a simple id string selector for an unknown id" do
    Document['#some_id_that_is_nowhere_to_be_found'].should == nil
  end
  
  it "should return an array of elements for non id selectors" do
    res = Document['.document_selector_a']
    
    res.class.should == Array
    res.length.should == 2
    
    res.each do |item|
      item.class_name.should == "document_selector_a"
      item.tag.should == :div
    end
  end
  
  it "should return an empty array when no matching classes were found" do
    Document['.some_class_that_is_nowhere_to_be_seen'].should == []
  end
  
  it "should be able to match tag names" do
    articles = Document['article']
    articles.class.should == Array
    articles.length.should == 4
    articles.each do |article|
      article.class_name.should == ""
      article.id.should == nil
      article.tag.should == :article
    end
    
    Document['section'].should == []
  end
  
  it "should find multipart on single elements" do
    res = Document['div.partial']
    res.length.should == 2
    res.each do |item|
      item.tag.should == :div
      item.class_name.should == 'partial'
    end
  end
  
  it "should find multipart on nested elements" do
    a = Document['div span.something div']
    a.length.should == 1
    a[0].tag.should == :div
    
    b = Document['div#foo_bar_baz span.something p']
    b.length.should == 1
    b[0].tag.should == :p
  end
  
end
