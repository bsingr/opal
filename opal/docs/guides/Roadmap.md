Opal (Vienna) Roadmap and Timeline
==================================

0.1.0
-----

(current)

Released on __12/3/2010__.

0.1.5
-----

This release will focus on much needed improvements to the Browser APIs of Opal.
Target release is __20/3/2010__.

* __Browser lib__
    
    * {Element}/{Document}.
        
        * {Element} class re-write to sit on top of native elements. __Done__
        
        * Incorporate [Sizzle](http://www.sizzlejs.com) library as the core 
        method of searching through DOM trees for {Element} and {Document}. 
        Sizzle will be incorporated into the Opal source so that it does not 
        need to be an external dependency.
        
        * Unify method of binding/unbinding event listeners for events on DOM
        elements. Incorporate changes into {Element#add_listener}.
        
    * Event class.
        
        * Introduce a new Event class to wrap native events. This class will
        handle cross browser differences between event models so that each event
        received will be wrapped to become accessible from methods in {Element}
        etc.
    
    * {Request}.
        
        * Depreciate {Net::HTTP} by replacing it with the new {Request} class.
        {Net::HTTP} can not be fully beneficiary in the browser, so rewriting
        {Request} for a cleaner API allows closer integration to {Element} and 
        Event classes.
    
    * {JSON}.
      
        * Finalise {JSON} API so that parsing raw JSON will create {Hash} 
        objects instead of raw Javascript objects as dictionaries. Doing this
        during parsing avoids duplication of concerns.
        
        * Create some utility methods for parsing and constructing JSON objects
        between Ruby environment and native Javascript environment.
        
        * Add JSONP helper methods to {JSON} module for raw loading of cross
        domain JSON requests.

* __Vienna__
    
    * Rails
        
        Begin rewrite of Rails plugin for Opal/Vienna

0.2.0
-----

* __Core Language/Core Runtime__
    
    * Really optimise runtime to make it fast. A few bits of the VM are too slow
    so they need a re-write to match features.

* __Browser Library/Additions__
    
    * LocalStorage
    
    * Cookies
    
    * Animations/Transforms
    
    * Element walking
    
* __Additional Libraries__
  
    * GitHub Module for accessing GitHub repository information (using JSONP).
      This will include only basic access for repository information. Additional 
      functionality will be included in 0.3.0
  
    * Twitter Module for accessing twitter feeds and user timelines. Again, only
      basic functionality will be included for this release, but 0.3.0 will 
      merge in additional tasks being developed separately.

0.3.0
-----