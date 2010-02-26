// 
//  document.js
//  vienna
//  
//  Created by Adam Beynon on 2010-02-18.
//  Copyright 2010 Adam Beynon. All rights reserved.
// 

var opal_oDocument;

/*
  Document.ready?(&block)
  
  If block given, then add it to array of blocks to run when window/doc loads.
  They are run in order in which they are given;
  
  If no block given, then simply returns true or false depending on whether the
  document das finished loading.
  
  Usage:
  
    Document.ready? do
      puts "I have now finished loading so I can safely do bits 'n bobs."
    end
    
    if Document.ready?
      puts "document is ready"
    end
*/
function opal_document_ready_q(doc, id, _) {
  // var _ = opal_block; opal_block = nil;
  
  if (_ !== nil) { // block_given?
    // if doc is ready, we just execute the code (ready blocks already done)
    if (doc.iv_tbl.is_ready) {
      _();
    }
    else {
      doc.iv_tbl.ready_blocks.push(_);
    }
    
  }
  return doc.iv_tbl.is_ready;
};

function Init_Browser_Document() {
  opal_oDocument = new RObject();
  opal_oDocument.klass = rb_cObject;
  FL_SET(opal_oDocument, T_OBJECT);
  // really need to inherit from Element.. in ready_q, set native to doc.body
  rb_const_set(rb_cObject, "Document", opal_oDocument);
  
  // Ivars
  opal_oDocument.iv_tbl.is_ready = false;
  opal_oDocument.iv_tbl.ready_blocks = [];
  
  rb_define_singleton_method(opal_oDocument, "ready?", opal_document_ready_q,0);
};
