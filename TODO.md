Rewrite if/else
===============

* Remove :compstmt, use :stmt instead
* Put inside closure function if not full stmt - a must for assigning result or returning result of if

Args
====
* Allow for hash args - sending and receiving - use for element constructor Element.new :div, :class => 'adam', :id => 'jon
* Fix $h hash creation. better way for large hashes?

Case statements
===============
Finish these off. Havent done situtation with no case value. Checking for true isnt the best way to go. just check result is true: !=nil && !=false
- add 'and' and 'or' statements/quirks.

Blocks
======
Add block params into local namespace - push then pop nametable for declared.


Next
====
Finish resources: copy images to images/, or rakefile specified address
- set images_dir in VN$ENV so VN::Image can access it