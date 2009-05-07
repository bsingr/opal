// 
//  CFJSONParser.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-05.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

typedef struct {
    CFDataRef jsonData;
} CFJSONParserRef;

extern CFJSONParserRef CFJSONParserCreate(CFDataRef jsonData);
extern bool CFJSONParserParse(CFJSONParserRef parser);