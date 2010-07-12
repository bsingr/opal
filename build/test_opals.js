// browser
opal.register({
  name: "browser",
  version: "0.1.0",
  files: {
    "/browser/bin/browser": function() { },
    "/browser/lib/browser.rb": function() { },
    "/browser/lib/browser/element.rb": function() { }
  }
});

// foundation - common for cherrykit and cherrytouch
opal.register({
  name: "foundation",
  version: "0.2.0",
  files: {
    '/foundation/lib/foundation.rb': function() { },
    '/foundation/lib/foundation/application.rb': function() { },
    '/foundation/lib/foundation/responder.rb': function() { }
  }
});

// sample_controls app
opal.register_application({
  name: "sample_controls",
  version: "0.0.1",
  files: {
    '/sample_controls/bin/sample_controls': function() {
      console.log("executing in bin file");
      this.$require(this.S('application'));
    },
    '/sample_controls/lib/application.rb': function() {
      
    }
  }
});

// ==========================================
// = Hard coded application launch sequence =
// ==========================================

opal.run();
