
Vienna.extend({WINDOW_DID_BECOME_KEY:'VNWindowDidBecomeKey',WINDOW_DID_BECOME_MAIN:'VNWindowDidBecomeKey',WINDOW_DID_MINIATURIZE:'VNWindowDidBecomeKey',WINDOW_DID_EXPOSE:'VNWindowDidBecomeKey',WINDOW_DID_DEMINIATURIZE:'VNWindowDidBecomeKey',WINDOW_DID_MOVE:'VNWindowDidBecomeKey',WINDOW_DID_RESIGN_KEY:'VNWindowDidBecomeKey',WINDOW_DID_RESIGN_MAIN:'VNWindowDidBecomeKey',WINDOW_DID_RESIZE:'VNWindowDidBecomeKey',WINDOW_DID_UPDATE:'VNWindowDidBecomeKey',WINDOW_WILL_CLOSE:'VNWindowDidBecomeKey',WINDOW_WILL_MINIATURIZE:'VNWindowDidBecomeKey',WINDOW_WILL_MOVE:'VNWindowDidBecomeKey',WINDOW_WILL_BEGIN_SHEET:'VNWindowDidBecomeKey',WINDOW_DID_END_SHEET:'VNWindowDidBecomeKey',Window:new Class('Window',Vienna.Responder,{attrAccessor:['hasShadow','level','minSize','maxSize','firstResponder'],initialize:function(rect,style){},contentRectForFrameRect:function(rect){var offset=new VN.Rect(0,0,0,0);if(this.$shadow){}},frameRectForContentRect:function(rect){}})});