// 
//  CFHTTPRequest.js
//  vienna
//  
//  Created by Adam Beynon on 2009-06-06.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

function CFHTTPRequestCreate(method, address, async, callback)
{
    var req =  new XMLHttpRequest();
    req.open(method, address, async);
    req.onreadystatechange = callback;
    return req;
}

function CFHTTPRequestSetMimeType(request, mime)
{
    request.overrideMimeType(mime);
}

function CFHTTPRequestSend(request, data)
{
    request.send(data);
}
