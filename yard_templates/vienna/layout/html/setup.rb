def init
  @breadcrumb = []
  
  if @file
    puts "it is a file #{@file}"
  elsif object
    case object
    when "_index.html"
    when CodeObjects::Base
      unless object.root?
        cur = object.namespace
        while !cur.root?
          @breadcrumb.unshift(cur)
          cur = cur.namespace
        end
      end
      
      @page_title = format_object_title(object)
      type = object.root? ? :module : object.type
      sections :layout, [T(type)]
    end
  else
    puts "it is an else|"
  end
end
