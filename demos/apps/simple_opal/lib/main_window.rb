# 
# main_window.rb
# vienna
# 
# Created by Adam Beynon.
# Copyright 2010 Adam Beynon.
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
# 
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
# 
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
# THE SOFTWARE.
#
class AppController
  
  def main_window
    return @main_window if @main_window
    @main_window = window({})
    
    @main_window.show
    
    test_button = button(:layout => {
        :left => 200,
        :top  => 20,
        :right  => 250,
        :bottom => 100,
        :height => 24
      },
      :enabled  => true
    )
    
    @main_window << test_button
    
    @main_window << text_field(:layout => {
      :left   => 30,
      :top    => 20,
      :width  => 150,
      :height => 24
    })
    
    @main_window << text_field(:layout => {
      :left   => 30,
      :top    => 100,
      :width  => 150,
      :height => 24
    },
    :bezel => :rounded)
    
    # @main_window << button(:layout => {
    #    :left   => 30,
    #    :top    => 300,
    #    :width  => 250,
    #    :bottom => 100,
    #    :height => 24
    #  }, 
    #  :enabled => false)
    #  
    #      
    #        
    #        slider2 = slider(:layout => {
    #            :left   => 30,
    #            :top    => 220,
    #            :width  => 250,
    #            :bottom => 100,
    #            :height => 14
    #          },
    #          :control_size   => :small,
    #          :value_binding  => {
    #            :to   => self,
    #            :path  => :test_value
    #          }
    #        )
    #        
    #        @main_window << slider2
    #        
    #                @main_window << slider(:layout => {
    #                    :left   => 30,
    #                    :top    => 120,
    #                    :width  => 250,
    #                    :bottom => 100,
    #                    :height => 16
    #                  },
    #                  :value_binding => {
    #                    :to => slider2,
    #                    :path => :value
    #                  })
    
    # scroll_view = scroll_view(:layout => {
    #    :left   => 320,
    #    :top    => 120,
    #    :width  => 500,
    #    :height => 300
    #  })
    #  
    #  @main_window << scroll_view
    #  scroll_view.document_view = TableView.build({
    #    :table_columns => [
    #      TableColumn.build({
    #        :identifier => :first_name,
    #        :data_view => Slider.build({})
    #      }),
    #      TableColumn.build({
    #        :identifier => :second_name,
    #        :data_view  => Label.build({})
    #      })
    #    ],
    #    :data_source  => self
    #  })
    #  
    # 
    # # 
    # # Outline view
    # # 
    # 
    # scroll_view2 = scroll_view(:layout => {
    #   :left   => 20,
    #   :top    => 120,
    #   :width  => 250,
    #   :height => 300
    # })
    # 
    # @main_window << scroll_view2
    # scroll_view2.document_view = OutlineView.build({
    #   :outline_table_column => TableColumn.build({
    #     :identifier => :first_name,
    #     :data_view => Label.build({})
    #    }),
    #   :data_source  => self
    # })
   
    @main_window
  end
  
end
