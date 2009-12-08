# Generated by jeweler
# DO NOT EDIT THIS FILE DIRECTLY
# Instead, edit Jeweler::Tasks in Rakefile, and run the gemspec command
# -*- encoding: utf-8 -*-

Gem::Specification.new do |s|
  s.name = %q{vienna}
  s.version = "0.0.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0") if s.respond_to? :required_rubygems_version=
  s.authors = ["Adam Beynon"]
  s.date = %q{2009-12-08}
  s.description = %q{Ruby compiler and runtime for the browser}
  s.email = %q{adam@adambeynon.com}
  s.executables = ["vienna", "vn-gen"]
  s.extra_rdoc_files = [
    "README.markdown"
  ]
  s.files = [
    ".gitignore",
     "History.txt",
     "Rakefile",
     "VERSION",
     "apps/cappuccino_demo_app/Info.plist",
     "apps/cappuccino_demo_app/Rakefile",
     "apps/cappuccino_demo_app/Resources/spinner.gif",
     "apps/cappuccino_demo_app/build/AppController.j",
     "apps/cappuccino_demo_app/build/debug/AdamsView.j",
     "apps/cappuccino_demo_app/build/debug/AppController.j",
     "apps/cappuccino_demo_app/build/debug/Info.plist",
     "apps/cappuccino_demo_app/build/debug/Resources/spinner.gif",
     "apps/cappuccino_demo_app/build/debug/Vn/AppKit/Button.j",
     "apps/cappuccino_demo_app/build/debug/Vn/AppKit/Control.j",
     "apps/cappuccino_demo_app/build/debug/Vn/AppKit/Geometry.j",
     "apps/cappuccino_demo_app/build/debug/Vn/AppKit/View.j",
     "apps/cappuccino_demo_app/build/debug/Vn/AppKit/Window.j",
     "apps/cappuccino_demo_app/build/debug/Vn/Bridge/JsonObject.j",
     "apps/cappuccino_demo_app/build/debug/Vn/Builder/Builder.j",
     "apps/cappuccino_demo_app/build/debug/Vn/Builder/Button.j",
     "apps/cappuccino_demo_app/build/debug/Vn/Foundation/Array.j",
     "apps/cappuccino_demo_app/build/debug/Vn/Mappings.j",
     "apps/cappuccino_demo_app/build/debug/Vn/Mappings/Button.j",
     "apps/cappuccino_demo_app/build/debug/Vn/Mappings/Column.j",
     "apps/cappuccino_demo_app/build/debug/Vn/Mappings/Control.j",
     "apps/cappuccino_demo_app/build/debug/Vn/Mappings/ScrollView.j",
     "apps/cappuccino_demo_app/build/debug/Vn/Mappings/TableView.j",
     "apps/cappuccino_demo_app/build/debug/Vn/Mappings/View.j",
     "apps/cappuccino_demo_app/build/debug/Vn/Mappings/Window.j",
     "apps/cappuccino_demo_app/build/debug/Vn/Vienna.j",
     "apps/cappuccino_demo_app/build/debug/index.html",
     "apps/cappuccino_demo_app/build/debug/main.j",
     "apps/cappuccino_demo_app/build/main.j",
     "apps/cappuccino_demo_app/index.html",
     "apps/cappuccino_demo_app/lib/adams_view.rb",
     "apps/cappuccino_demo_app/lib/app_controller.rb",
     "apps/cappuccino_demo_app/lib/main.rb",
     "apps/cappuccino_demo_app/lib/vn/app_kit/geometry.rb",
     "apps/cappuccino_demo_app/lib/vn/bridge/json_object.rb",
     "apps/cappuccino_demo_app/lib/vn/graphics.rb",
     "apps/cappuccino_demo_app/lib/vn/graphics/graphics_context.rb",
     "apps/cappuccino_demo_app/lib/vn/graphics/render_context.rb",
     "apps/cappuccino_demo_app/lib/vn/mappings.rb",
     "apps/cappuccino_demo_app/lib/vn/mappings/button.rb",
     "apps/cappuccino_demo_app/lib/vn/mappings/column.rb",
     "apps/cappuccino_demo_app/lib/vn/mappings/control.rb",
     "apps/cappuccino_demo_app/lib/vn/mappings/scroll_view.rb",
     "apps/cappuccino_demo_app/lib/vn/mappings/table_view.rb",
     "apps/cappuccino_demo_app/lib/vn/mappings/view.rb",
     "apps/cappuccino_demo_app/lib/vn/mappings/window.rb",
     "apps/cappuccino_demo_app/lib/vn/vienna.rb",
     "apps/document_application/build/debug/document_application.js",
     "apps/document_application/build/debug/document_application_html5.js",
     "apps/document_application/build/debug/index.html",
     "apps/document_application/build/tmp/debug/app_kit/build/app_kit.js",
     "apps/document_application/build/tmp/debug/app_kit/build/app_kit_html5.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/app_kit.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/base/application.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/base/attributed_string.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/base/event.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/base/key_value_binding.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/base/paragraph_style.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/base/responder.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/base/tracking_area.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/builder/builder.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/document/document.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/document/document_controller.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/graphics/color.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/graphics/core_graphics/canvas.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/graphics/core_graphics_canvas.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/graphics/core_graphics_vml.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/graphics/font.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/graphics/geometry.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/graphics/graphics.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/graphics/graphics_context.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/graphics/image.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/graphics/render_context.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/graphics/string_drawing.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/table_view/clip_view.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/table_view/scroll_view.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/table_view/scroller.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/table_view/table_column.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/table_view/table_corner_view.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/table_view/table_header_cell.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/table_view/table_header_view.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/table_view/table_view.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/vib/vib.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/vib/window_template.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/views/controls/button.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/views/controls/button_cell.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/views/controls/button_cell_images.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/views/controls/cell.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/views/controls/check_box.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/views/controls/control.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/views/controls/slider.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/views/controls/slider_cell.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/views/controls/text_field.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/views/controls/text_field_cell.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/views/view.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/window/borderless_window_view.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/window/hud_window_view.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/window/normal_window_view.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/window/panel.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/window/window.js",
     "apps/document_application/build/tmp/debug/app_kit/lib/window/window_view.js",
     "apps/document_application/build/tmp/debug/base/build/base.js",
     "apps/document_application/build/tmp/debug/base/lib/base.js",
     "apps/document_application/build/tmp/debug/base/lib/core/array.js",
     "apps/document_application/build/tmp/debug/base/lib/core/boolean.js",
     "apps/document_application/build/tmp/debug/base/lib/core/bundle.js",
     "apps/document_application/build/tmp/debug/base/lib/core/class.js",
     "apps/document_application/build/tmp/debug/base/lib/core/comparable.js",
     "apps/document_application/build/tmp/debug/base/lib/core/enumerable.js",
     "apps/document_application/build/tmp/debug/base/lib/core/env.js",
     "apps/document_application/build/tmp/debug/base/lib/core/hash.js",
     "apps/document_application/build/tmp/debug/base/lib/core/json.js",
     "apps/document_application/build/tmp/debug/base/lib/core/lib.js",
     "apps/document_application/build/tmp/debug/base/lib/core/math.js",
     "apps/document_application/build/tmp/debug/base/lib/core/module.js",
     "apps/document_application/build/tmp/debug/base/lib/core/nil_class.js",
     "apps/document_application/build/tmp/debug/base/lib/core/number.js",
     "apps/document_application/build/tmp/debug/base/lib/core/object.js",
     "apps/document_application/build/tmp/debug/base/lib/core/plist.js",
     "apps/document_application/build/tmp/debug/base/lib/core/proc.js",
     "apps/document_application/build/tmp/debug/base/lib/core/range.js",
     "apps/document_application/build/tmp/debug/base/lib/core/resources.js",
     "apps/document_application/build/tmp/debug/base/lib/core/string.js",
     "apps/document_application/build/tmp/debug/base/lib/core/symbol.js",
     "apps/document_application/build/tmp/debug/base/lib/core/top_self.js",
     "apps/document_application/build/tmp/debug/base/lib/core/yaml.js",
     "apps/document_application/build/tmp/debug/base/lib/runtime/class.js",
     "apps/document_application/build/tmp/debug/base/lib/runtime/module.js",
     "apps/document_application/build/tmp/debug/base/lib/runtime/object.js",
     "apps/document_application/build/tmp/debug/base/lib/runtime/system.js",
     "apps/document_application/build/tmp/debug/browser/build/browser.js",
     "apps/document_application/build/tmp/debug/browser/build/browser_html5.js",
     "apps/document_application/build/tmp/debug/browser/lib/browser.js",
     "apps/document_application/build/tmp/debug/browser/lib/document.js",
     "apps/document_application/build/tmp/debug/browser/lib/element.js",
     "apps/document_application/build/tmp/debug/browser/lib/json.js",
     "apps/document_application/build/tmp/debug/document_application/build/document_application.js",
     "apps/document_application/build/tmp/debug/document_application/build/document_application_html5.js",
     "apps/document_application/build/tmp/debug/document_application/lib/document_application.js",
     "apps/document_application/build/tmp/debug/foundation/build/foundation.js",
     "apps/document_application/build/tmp/debug/foundation/build/foundation_html5.js",
     "apps/document_application/build/tmp/debug/foundation/lib/attributed_string.js",
     "apps/document_application/build/tmp/debug/foundation/lib/bundle.js",
     "apps/document_application/build/tmp/debug/foundation/lib/foundation.js",
     "apps/document_application/build/tmp/debug/foundation/lib/index_set.js",
     "apps/document_application/build/tmp/debug/foundation/lib/key_value_coding.js",
     "apps/document_application/build/tmp/debug/foundation/lib/key_value_observing.js",
     "apps/document_application/build/tmp/debug/foundation/lib/keyed_unarchiver.js",
     "apps/document_application/build/tmp/debug/foundation/lib/notification.js",
     "apps/document_application/build/tmp/debug/foundation/lib/property_list.js",
     "apps/document_application/build/tmp/debug/vienna/build/vienna.js",
     "apps/document_application/build/tmp/debug/vienna/build/vienna_html5.js",
     "apps/document_application/build/tmp/debug/vienna/lib/vienna.js",
     "apps/document_application/build/tmp/debug/vienna/lib/views/gauge_view.js",
     "apps/document_application/info.yml",
     "apps/document_application/lib/document_application.rb",
     "apps/document_application/resources/first_document.yib",
     "apps/document_application/resources/main_menu.yib",
     "apps/normal_application/build/debug/index.html",
     "apps/normal_application/build/debug/normal_application.js",
     "apps/normal_application/build/debug/normal_application_html5.js",
     "apps/normal_application/build/debug/normal_application_lib.js",
     "apps/normal_application/build/normal_application.js",
     "apps/normal_application/build/tmp/debug/app_kit/build/app_kit.js",
     "apps/normal_application/build/tmp/debug/app_kit/build/app_kit_html5.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/app_kit.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/base/application.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/base/attributed_string.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/base/event.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/base/key_value_binding.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/base/paragraph_style.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/base/responder.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/base/tracking_area.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/builder/builder.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/graphics/color.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/graphics/core_graphics/canvas.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/graphics/core_graphics_canvas.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/graphics/core_graphics_vml.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/graphics/font.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/graphics/geometry.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/graphics/graphics.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/graphics/graphics_context.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/graphics/image.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/graphics/render_context.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/graphics/string_drawing.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/table_view/clip_view.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/table_view/scroll_view.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/table_view/scroller.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/table_view/table_column.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/table_view/table_corner_view.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/table_view/table_header_cell.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/table_view/table_header_view.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/table_view/table_view.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/vib/vib.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/vib/window_template.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/views/controls/button.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/views/controls/button_cell.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/views/controls/button_cell_images.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/views/controls/cell.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/views/controls/check_box.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/views/controls/control.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/views/controls/slider.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/views/controls/slider_cell.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/views/controls/text_field.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/views/controls/text_field_cell.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/views/view.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/window/borderless_window_view.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/window/hud_window_view.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/window/normal_window_view.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/window/panel.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/window/window.js",
     "apps/normal_application/build/tmp/debug/app_kit/lib/window/window_view.js",
     "apps/normal_application/build/tmp/debug/base/build/base.js",
     "apps/normal_application/build/tmp/debug/base/lib/base.js",
     "apps/normal_application/build/tmp/debug/base/lib/core/array.js",
     "apps/normal_application/build/tmp/debug/base/lib/core/boolean.js",
     "apps/normal_application/build/tmp/debug/base/lib/core/bundle.js",
     "apps/normal_application/build/tmp/debug/base/lib/core/class.js",
     "apps/normal_application/build/tmp/debug/base/lib/core/comparable.js",
     "apps/normal_application/build/tmp/debug/base/lib/core/enumerable.js",
     "apps/normal_application/build/tmp/debug/base/lib/core/env.js",
     "apps/normal_application/build/tmp/debug/base/lib/core/hash.js",
     "apps/normal_application/build/tmp/debug/base/lib/core/json.js",
     "apps/normal_application/build/tmp/debug/base/lib/core/lib.js",
     "apps/normal_application/build/tmp/debug/base/lib/core/math.js",
     "apps/normal_application/build/tmp/debug/base/lib/core/module.js",
     "apps/normal_application/build/tmp/debug/base/lib/core/nil_class.js",
     "apps/normal_application/build/tmp/debug/base/lib/core/number.js",
     "apps/normal_application/build/tmp/debug/base/lib/core/object.js",
     "apps/normal_application/build/tmp/debug/base/lib/core/plist.js",
     "apps/normal_application/build/tmp/debug/base/lib/core/proc.js",
     "apps/normal_application/build/tmp/debug/base/lib/core/range.js",
     "apps/normal_application/build/tmp/debug/base/lib/core/resources.js",
     "apps/normal_application/build/tmp/debug/base/lib/core/string.js",
     "apps/normal_application/build/tmp/debug/base/lib/core/symbol.js",
     "apps/normal_application/build/tmp/debug/base/lib/core/top_self.js",
     "apps/normal_application/build/tmp/debug/base/lib/core/yaml.js",
     "apps/normal_application/build/tmp/debug/base/lib/runtime/class.js",
     "apps/normal_application/build/tmp/debug/base/lib/runtime/module.js",
     "apps/normal_application/build/tmp/debug/base/lib/runtime/object.js",
     "apps/normal_application/build/tmp/debug/base/lib/runtime/system.js",
     "apps/normal_application/build/tmp/debug/browser/build/browser.js",
     "apps/normal_application/build/tmp/debug/browser/build/browser_html5.js",
     "apps/normal_application/build/tmp/debug/browser/lib/browser.js",
     "apps/normal_application/build/tmp/debug/browser/lib/document.js",
     "apps/normal_application/build/tmp/debug/browser/lib/element.js",
     "apps/normal_application/build/tmp/debug/browser/lib/json.js",
     "apps/normal_application/build/tmp/debug/foundation/build/foundation.js",
     "apps/normal_application/build/tmp/debug/foundation/build/foundation_html5.js",
     "apps/normal_application/build/tmp/debug/foundation/lib/attributed_string.js",
     "apps/normal_application/build/tmp/debug/foundation/lib/bundle.js",
     "apps/normal_application/build/tmp/debug/foundation/lib/foundation.js",
     "apps/normal_application/build/tmp/debug/foundation/lib/index_set.js",
     "apps/normal_application/build/tmp/debug/foundation/lib/key_value_coding.js",
     "apps/normal_application/build/tmp/debug/foundation/lib/key_value_observing.js",
     "apps/normal_application/build/tmp/debug/foundation/lib/keyed_unarchiver.js",
     "apps/normal_application/build/tmp/debug/foundation/lib/notification.js",
     "apps/normal_application/build/tmp/debug/foundation/lib/property_list.js",
     "apps/normal_application/build/tmp/debug/normal_application/build/normal_application.js",
     "apps/normal_application/build/tmp/debug/normal_application/build/normal_application_html5.js",
     "apps/normal_application/build/tmp/debug/normal_application/lib/normal_application.js",
     "apps/normal_application/build/tmp/debug/vienna/build/vienna.js",
     "apps/normal_application/build/tmp/debug/vienna/build/vienna_html5.js",
     "apps/normal_application/build/tmp/debug/vienna/lib/vienna.js",
     "apps/normal_application/build/tmp/debug/vienna/lib/views/gauge_view.js",
     "apps/normal_application/info.yml",
     "apps/normal_application/lib/normal_application.rb",
     "apps/normal_application/resources/main_menu.yib",
     "bin/.DS_Store",
     "bin/vienna",
     "capp_frameworks/Vienna/Info.plist",
     "capp_frameworks/Vienna/Vienna.j",
     "capp_frameworks/Vienna/core/array.j",
     "capp_frameworks/Vienna/core/enum.j",
     "capp_frameworks/Vienna/core/hash.j",
     "capp_frameworks/Vienna/core/module.j",
     "capp_frameworks/Vienna/core/number.j",
     "capp_frameworks/Vienna/core/object.j",
     "capp_frameworks/Vienna/core/proc.j",
     "capp_frameworks/Vienna/core/symbol.j",
     "capp_frameworks/Vienna/core/top_self.j",
     "capp_frameworks/Vienna/objective_j/runtime.j",
     "capp_frameworks/Vienna/runtime/class.j",
     "capp_frameworks/Vienna/runtime/module.j",
     "capp_frameworks/Vienna/runtime/object.j",
     "capp_frameworks/Vienna/runtime/runtime.j",
     "capp_frameworks/Vienna/runtime/system.j",
     "capp_frameworks/Vienna/runtime/variable.j",
     "frameworks/app_kit/design/controls/README.txt",
     "frameworks/app_kit/design/controls/controls-sprite-y.psd",
     "frameworks/app_kit/design/controls/controls-sprite.psd",
     "frameworks/app_kit/design/controls/controls.psd",
     "frameworks/app_kit/info.json",
     "frameworks/app_kit/lib/app_kit.rb",
     "frameworks/app_kit/lib/base/application.rb",
     "frameworks/app_kit/lib/base/array_controller.rb",
     "frameworks/app_kit/lib/base/attributed_string.rb",
     "frameworks/app_kit/lib/base/controller.rb",
     "frameworks/app_kit/lib/base/event.rb",
     "frameworks/app_kit/lib/base/key_value_binding.rb",
     "frameworks/app_kit/lib/base/object_controller.rb",
     "frameworks/app_kit/lib/base/paragraph_style.rb",
     "frameworks/app_kit/lib/base/responder.rb",
     "frameworks/app_kit/lib/base/tracking_area.rb",
     "frameworks/app_kit/lib/builder/builder.rb",
     "frameworks/app_kit/lib/controllers/user_defaults_controller.rb",
     "frameworks/app_kit/lib/controllers/window_controller.rb",
     "frameworks/app_kit/lib/document/document.rb",
     "frameworks/app_kit/lib/document/document_controller.rb",
     "frameworks/app_kit/lib/graphics/array_geometry_additions.rb",
     "frameworks/app_kit/lib/graphics/bezier_path.rb",
     "frameworks/app_kit/lib/graphics/color.rb",
     "frameworks/app_kit/lib/graphics/core_graphics.rb",
     "frameworks/app_kit/lib/graphics/core_graphics/canvas.rb",
     "frameworks/app_kit/lib/graphics/core_graphics_canvas.rb",
     "frameworks/app_kit/lib/graphics/core_graphics_vml.rb",
     "frameworks/app_kit/lib/graphics/font.rb",
     "frameworks/app_kit/lib/graphics/geometry.rb",
     "frameworks/app_kit/lib/graphics/graphics.rb",
     "frameworks/app_kit/lib/graphics/graphics_context.rb",
     "frameworks/app_kit/lib/graphics/image.rb",
     "frameworks/app_kit/lib/graphics/render_context.rb",
     "frameworks/app_kit/lib/graphics/shadow.rb",
     "frameworks/app_kit/lib/graphics/string_drawing.rb",
     "frameworks/app_kit/lib/menu/menu.rb",
     "frameworks/app_kit/lib/menu/menu_item.rb",
     "frameworks/app_kit/lib/table_view/clip_view.rb",
     "frameworks/app_kit/lib/table_view/outline_view.rb",
     "frameworks/app_kit/lib/table_view/scroll_view.rb",
     "frameworks/app_kit/lib/table_view/scroller.rb",
     "frameworks/app_kit/lib/table_view/table_column.rb",
     "frameworks/app_kit/lib/table_view/table_corner_view.rb",
     "frameworks/app_kit/lib/table_view/table_header_cell.rb",
     "frameworks/app_kit/lib/table_view/table_header_view.rb",
     "frameworks/app_kit/lib/table_view/table_view.rb",
     "frameworks/app_kit/lib/toolbar/toolbar.rb",
     "frameworks/app_kit/lib/toolbar/toolbar_item.rb",
     "frameworks/app_kit/lib/vib/vib.rb",
     "frameworks/app_kit/lib/vib/vib_loading.js",
     "frameworks/app_kit/lib/vib/window_template.rb",
     "frameworks/app_kit/lib/views/controls/button.rb",
     "frameworks/app_kit/lib/views/controls/button_cell.rb",
     "frameworks/app_kit/lib/views/controls/button_cell_images.rb",
     "frameworks/app_kit/lib/views/controls/cell.rb",
     "frameworks/app_kit/lib/views/controls/check_box.rb",
     "frameworks/app_kit/lib/views/controls/control.rb",
     "frameworks/app_kit/lib/views/controls/label.rb",
     "frameworks/app_kit/lib/views/controls/slider.rb",
     "frameworks/app_kit/lib/views/controls/slider_cell.rb",
     "frameworks/app_kit/lib/views/controls/text_field.rb",
     "frameworks/app_kit/lib/views/controls/text_field_cell.rb",
     "frameworks/app_kit/lib/views/view.rb",
     "frameworks/app_kit/lib/window/borderless_window_view.rb",
     "frameworks/app_kit/lib/window/hud_window_view.rb",
     "frameworks/app_kit/lib/window/normal_window_view.rb",
     "frameworks/app_kit/lib/window/panel.rb",
     "frameworks/app_kit/lib/window/window.rb",
     "frameworks/app_kit/lib/window/window_view.rb",
     "frameworks/app_kit/resources/button/rounded/regular/highlighted_left.png",
     "frameworks/app_kit/resources/button/rounded/regular/highlighted_middle.png",
     "frameworks/app_kit/resources/button/rounded/regular/highlighted_right.png",
     "frameworks/app_kit/resources/button/rounded/regular/normal_left.png",
     "frameworks/app_kit/resources/button/rounded/regular/normal_middle.png",
     "frameworks/app_kit/resources/button/rounded/regular/normal_right.png",
     "frameworks/app_kit/resources/button/textured_rounded/regular/disabled_left.png",
     "frameworks/app_kit/resources/button/textured_rounded/regular/disabled_middle.png",
     "frameworks/app_kit/resources/button/textured_rounded/regular/disabled_right.png",
     "frameworks/app_kit/resources/button/textured_rounded/regular/highlighted_left.png",
     "frameworks/app_kit/resources/button/textured_rounded/regular/highlighted_middle.png",
     "frameworks/app_kit/resources/button/textured_rounded/regular/highlighted_right.png",
     "frameworks/app_kit/resources/button/textured_rounded/regular/normal_left.png",
     "frameworks/app_kit/resources/button/textured_rounded/regular/normal_middle.png",
     "frameworks/app_kit/resources/button/textured_rounded/regular/normal_right.png",
     "frameworks/app_kit/resources/css/app_kit.css",
     "frameworks/app_kit/resources/hud_window_background.png",
     "frameworks/app_kit/resources/scrollers/horizontal/scroller_horizontal_knob_left.png",
     "frameworks/app_kit/resources/scrollers/horizontal/scroller_horizontal_knob_middle.png",
     "frameworks/app_kit/resources/scrollers/horizontal/scroller_horizontal_knob_right.png",
     "frameworks/app_kit/resources/scrollers/horizontal/scroller_horizontal_track.png",
     "frameworks/app_kit/resources/scrollers/horizontal/scroller_left_arrow.png",
     "frameworks/app_kit/resources/scrollers/horizontal/scroller_right_arrow.png",
     "frameworks/app_kit/resources/scrollers/vertical/scroller_bottom_arrow.png",
     "frameworks/app_kit/resources/scrollers/vertical/scroller_top_arrow.png",
     "frameworks/app_kit/resources/scrollers/vertical/scroller_vertical_knob_bottom.png",
     "frameworks/app_kit/resources/scrollers/vertical/scroller_vertical_knob_middle.png",
     "frameworks/app_kit/resources/scrollers/vertical/scroller_vertical_knob_top.png",
     "frameworks/app_kit/resources/scrollers/vertical/scroller_vertical_track.png",
     "frameworks/app_kit/resources/slider/normal_knob.png",
     "frameworks/app_kit/resources/slider/track_left_normal.png",
     "frameworks/app_kit/resources/slider/track_middle_normal.png",
     "frameworks/app_kit/resources/slider/track_right_normal.png",
     "frameworks/app_kit/resources/switch/switch_blue_regular_alternate.png",
     "frameworks/app_kit/resources/switch/switch_blue_regular_normal.png",
     "frameworks/app_kit/resources/table_view/header_view_background.png",
     "frameworks/app_kit/resources/text_field/square/part_0.png",
     "frameworks/app_kit/resources/text_field/square/part_1.png",
     "frameworks/app_kit/resources/text_field/square/part_2.png",
     "frameworks/app_kit/resources/text_field/square/part_3.png",
     "frameworks/app_kit/resources/text_field/square/part_4.png",
     "frameworks/app_kit/resources/text_field/square/part_5.png",
     "frameworks/app_kit/resources/text_field/square/part_6.png",
     "frameworks/app_kit/resources/text_field/square/part_7.png",
     "frameworks/app_kit/resources/text_field/square/part_8.png",
     "frameworks/app_kit/resources/window/normal/close_button.png",
     "frameworks/app_kit/resources/window/normal/resize_indicator.png",
     "frameworks/app_kit/resources/window/normal/splitter.png",
     "frameworks/app_kit/resources/window/normal/titlebar_left.png",
     "frameworks/app_kit/resources/window/normal/titlebar_middle.png",
     "frameworks/app_kit/resources/window/normal/titlebar_right.png",
     "frameworks/base/History.txt",
     "frameworks/base/README.txt",
     "frameworks/base/lib/base.js",
     "frameworks/base/lib/core/_ruby_eval.js",
     "frameworks/base/lib/core/array.js",
     "frameworks/base/lib/core/boolean.js",
     "frameworks/base/lib/core/bundle.js",
     "frameworks/base/lib/core/class.js",
     "frameworks/base/lib/core/comparable.js",
     "frameworks/base/lib/core/enumerable.js",
     "frameworks/base/lib/core/env.js",
     "frameworks/base/lib/core/hash.js",
     "frameworks/base/lib/core/json.js",
     "frameworks/base/lib/core/kernel.js",
     "frameworks/base/lib/core/lib.js",
     "frameworks/base/lib/core/math.js",
     "frameworks/base/lib/core/module.js",
     "frameworks/base/lib/core/nil_class.js",
     "frameworks/base/lib/core/number.js",
     "frameworks/base/lib/core/object.js",
     "frameworks/base/lib/core/plist.js",
     "frameworks/base/lib/core/proc.js",
     "frameworks/base/lib/core/range.js",
     "frameworks/base/lib/core/resources.js",
     "frameworks/base/lib/core/ruby_eval.html",
     "frameworks/base/lib/core/ruby_eval.js",
     "frameworks/base/lib/core/string.js",
     "frameworks/base/lib/core/symbol.js",
     "frameworks/base/lib/core/top_self.js",
     "frameworks/base/lib/core/yaml.js",
     "frameworks/base/lib/runtime/class.js",
     "frameworks/base/lib/runtime/module.js",
     "frameworks/base/lib/runtime/object.js",
     "frameworks/base/lib/runtime/system.js",
     "frameworks/browser/lib/ajax.rb",
     "frameworks/browser/lib/browser.rb",
     "frameworks/browser/lib/canvas.rb",
     "frameworks/browser/lib/document.rb",
     "frameworks/browser/lib/element.rb",
     "frameworks/browser/lib/history.rb",
     "frameworks/browser/lib/json.rb",
     "frameworks/browser/lib/json/parse.js",
     "frameworks/browser/lib/json/reformatter.js",
     "frameworks/browser/lib/video.rb",
     "frameworks/foundation/lib/attributed_string.rb",
     "frameworks/foundation/lib/bundle.rb",
     "frameworks/foundation/lib/foundation.rb",
     "frameworks/foundation/lib/index_set.rb",
     "frameworks/foundation/lib/key_value_coding.rb",
     "frameworks/foundation/lib/key_value_observing.rb",
     "frameworks/foundation/lib/keyed_unarchiver.rb",
     "frameworks/foundation/lib/notification.rb",
     "frameworks/foundation/lib/property_list.rb",
     "frameworks/interface_builder/lib/document.rb",
     "frameworks/interface_builder/lib/geometry.rb",
     "frameworks/interface_builder/lib/inspector.rb",
     "frameworks/interface_builder/lib/interface_builder.rb",
     "frameworks/interface_builder/lib/object_integration.rb",
     "frameworks/interface_builder/lib/plugin.rb",
     "frameworks/interface_builder/lib/view_integration.rb",
     "frameworks/objective_j/base.js",
     "frameworks/objective_j/core/Number.j",
     "frameworks/objective_j/core/Proc.j",
     "frameworks/objective_j/runtime/class.js",
     "frameworks/vienna/lib/additions/twitter.rb",
     "frameworks/vienna/lib/vienna.rb",
     "frameworks/vienna/lib/views/gauge_view.rb",
     "lib/vienna.rb",
     "lib/vienna/additions/hash.rb",
     "lib/vienna/additions/plist.rb",
     "lib/vienna/builders/base.rb",
     "lib/vienna/builders/combine.rb",
     "lib/vienna/builders/css.rb",
     "lib/vienna/builders/html.rb",
     "lib/vienna/builders/javascript.rb",
     "lib/vienna/builders/objective_c.rb",
     "lib/vienna/builders/objective_c/file.rb",
     "lib/vienna/builders/objective_c/implementation.rb",
     "lib/vienna/builders/objective_c/interface.rb",
     "lib/vienna/builders/objective_c/method.rb",
     "lib/vienna/builders/objective_c/models.rb",
     "lib/vienna/builders/objective_c/objective_c.rb.y",
     "lib/vienna/builders/objective_c/objective_c.tab.rb",
     "lib/vienna/builders/objective_c/output.rb",
     "lib/vienna/builders/objective_c/protocol.rb",
     "lib/vienna/builders/objective_c/struct.rb",
     "lib/vienna/builders/objective_c/symbol_table.rb",
     "lib/vienna/builders/plist.rb",
     "lib/vienna/builders/ruby.rb",
     "lib/vienna/builders/ruby/file.rb",
     "lib/vienna/builders/ruby/generate.rb",
     "lib/vienna/builders/ruby/nodes.rb",
     "lib/vienna/builders/ruby/objective_j/objj_ruby.rb",
     "lib/vienna/builders/ruby/ruby_parser.rb",
     "lib/vienna/builders/ruby/ruby_parser.rb.y",
     "lib/vienna/builders/vib.rb",
     "lib/vienna/builders/xib.rb",
     "lib/vienna/models/bundle.rb",
     "lib/vienna/models/cappuccino_project.rb",
     "lib/vienna/models/framework.rb",
     "lib/vienna/models/language.rb",
     "lib/vienna/models/new_project.rb",
     "lib/vienna/models/project.rb",
     "lib/vienna/models/ruby_bundle.rb",
     "lib/vienna/rakefile/Rakefile",
     "lib/vienna/rakefile/rakefile.rb",
     "lib/vienna/tools.rb",
     "lib/vienna/tools/build.rb",
     "lib/vienna/tools/cappbuild.rb",
     "lib/vienna/tools/clean.rb",
     "lib/vienna/tools/generate.rb",
     "lib/vienna/tools/init.rb",
     "lib/vienna/tools/server.rb",
     "spec/spec_helper.rb",
     "spec/vienna_spec.rb",
     "test/test_vienna.rb",
     "vienna.gemspec"
  ]
  s.homepage = %q{http://github.com/adambeynon/vienna}
  s.rdoc_options = ["--charset=UTF-8"]
  s.require_paths = ["lib"]
  s.rubygems_version = %q{1.3.5}
  s.summary = %q{Ruby compiler and runtime for the browser}
  s.test_files = [
    "spec/spec_helper.rb",
     "spec/vienna_spec.rb",
     "test/test_vienna.rb"
  ]

  if s.respond_to? :specification_version then
    current_version = Gem::Specification::CURRENT_SPECIFICATION_VERSION
    s.specification_version = 3

    if Gem::Version.new(Gem::RubyGemsVersion) >= Gem::Version.new('1.2.0') then
    else
    end
  else
  end
end

