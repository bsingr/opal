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
    // usual applicaton intialize file
    '/foundation/bin/cherry_kit_app': function() {
      console.log("need to load cherry_kit application");
    },
    '/foundation/lib/foundation.rb': function() {
      console.log("wow, in foundation!");
    },
    '/foundation/lib/foundation/application.rb': function() { },
    '/foundation/lib/foundation/responder.rb': function() { }
  }
});

// sample_controls app
opal.register({
  name: "sample_controls",
  version: "0.0.1",
  files: {
    '/sample_controls/bin/sample_controls': function() {
      console.log("executing in bin file");
      this.$require(this.S('application.rb'));
      this.$require(this.S('application'));
      this.$require(this.S("foundation"));
      this.$require(this.S("foundation"));
    },
    '/sample_controls/lib/application.rb': function() {
      console.log("now in application, wooop!");
    }
  }
});

// ==========================================
// = Hard coded application launch sequence =
// ==========================================

opal.run('/foundation/bin/cherry_kit_app', '/sample_controls/');
