// 
//  CFDate.js
//  vienna
//  
//  Created by Adam Beynon on 2009-05-02.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

// extern CFAbsoluteTime CFAbsoluteTimeGetCurrent(void);
// 
function CFAbsoluteTimeGetCurrent()
{
  return new Date().valueOf();
}

// typedef struct {
//   
// } CFDataRef;
function CFDateRef()
{
  return new Date();
}


// extern CFDateRef CFDateCreate(CFAbsoluteTime at);
// 
function CFDateCreate(at)
{
  return new Date(at);
}

// extern CFAbsoluteTime CFDateGetAbsoluteTime(CFDateRef theDate);
// 
function CFDateGetAbsoluteTime(theDate)
{
  return theDate.valueOf();
}

// extern CFTimeInterval CFDateGetTimeIntervalSinceDate(CFDateRef theDate, CFDateRef otherDate);
// 
function CFDateGetTimeIntervalSinceDate(theDate, otherDate)
{
  
}

// extern CFComparisonResult CFDateCompare(CFDateRef theDate, CFDateRef otherDate, void *context);
// 
function CFDateCompare(theDate, otherDate, context)
{
  
}

// typedef struct {
//   int   year;
//   int   month;
//   int   day;
//   int   hour;
//   int   minute;
//   double  second;
// } CFGregorianDate;
// 
// typedef struct {
//   int   years;
//   int   months;
//   int   days;
//   int   minutes;
//   double  seconds;
// } CFGregorianUnits;
// 
// enum {
//   kCFGregorianUnitsYears    = (1 << 0),
//   kCFGregorianUnitsMonths   = (1 << 1),
//   kCFGregorianUnitsDays     = (1 << 2),
//   kCFGregorianUnitsHours    = (1 << 3),
//   kCFGregorianUnitsMinutes  = (1 << 4),
//   kCFGregorianUnitsSeconds  = (1 << 5),
//   kCFGregorianAllUnits    = 0x00FFFFFF
// };
// typedef CFOptionFlags CFGregorianUnitFlags;

// extern bool CFGregorianDateIsValid(CFGregorianDate gdate, CFOptionFlags unitFlags);
// 
function CFGregorianDateIsValid(gdate, unitFlags)
{
  
}

// extern CFAbsoluteTime CFGregorianDateGetAbsoluteTime(CFGregorianDate gdate, CFTimeZoneRef tz);
// 
function CFGregorianDateGetAbsoluteTime(gdate, tz)
{
  
}

// extern CFGregorianDate CFAbsoluteTimeGetGregorianDate(CFAbsoluteTime at, CFTimeZoneRef tz);
// 
function CFAbsoluteTimeGetGregorianDate(at, tz)
{
  
}

// extern CFAbsoluteTime CFAbsoluteTimeAddGregorianUnits(CFAbsoluteTime at, CFTimeZoneRef tz, CFGregorianUnits units);
// 
function CFAbsoluteTimeAddGregorianUnits(at, tz, units)
{
  
}

// extern CFGregorianUnits CFAbsoluteTimeGetDifferenceAsGregorianUnits(CFAbsoluteTime at1, CFAbsoluteTime at2, CFTimeZoneRef tz, CFOptionFlags unitFlags);
// 
function CFAbsoluteTimeGetDifferenceAsGregorianUnits(at1, at2, tz, unitFlags)
{
  
}

// extern int CFAbsoluteTimeGetDayOfWeek(CFAbsoluteTime at, CFTimeZoneRef tz);
// 
function CFAbsoluteTimeGetDayOfWeek(at, tz)
{
  
}


// extern int CFAbsoluteTimeGetDayOfYear(CFAbsoluteTime at, CFTimeZoneRef tz);
// 
function CFAbsoluteTimeGetDayOfYear(at, tz)
{
  
}

// extern int CFAbsoluteTimeGetWeekOfYear(CFAbsoluteTime at, CFTimeZoneRef tz);
// 
function CFAbsoluteTimeGetWeekOfYear(at, tz)
{
  
}
