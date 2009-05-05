#import <CoreFoundation/CFBase.h>

typedef double CFTimeInterval;
typedef CFTimeInterval CFAbsoluteTime;

extern CFAbsoluteTime CFAbsoluteTimeGetCurrent(void);

typedef struct {
    
} CFDataRef;

extern CFDateRef CFDateCreate(CFAbsoluteTime at);
extern CFAbsoluteTime CFDateGetAbsoluteTime(CFDateRef theDate);

extern CFTimeInterval CFDateGetTimeIntervalSinceDate(CFDateRef theDate, CFDateRef otherDate);
extern CFComparisonResult CFDateCompare(CFDateRef theDate, CFDateRef otherDate, void *context);

typedef struct {
    int     year;
    int     month;
    int     day;
    int     hour;
    int     minute;
    double  second;
} CFGregorianDate;

typedef struct {
    int     years;
    int     months;
    int     days;
    int     minutes;
    double  seconds;
} CFGregorianUnits;

enum {
    kCFGregorianUnitsYears      = (1 << 0),
    kCFGregorianUnitsMonths     = (1 << 1),
    kCFGregorianUnitsDays       = (1 << 2),
    kCFGregorianUnitsHours      = (1 << 3),
    kCFGregorianUnitsMinutes    = (1 << 4),
    kCFGregorianUnitsSeconds    = (1 << 5),
    kCFGregorianAllUnits        = 0x00FFFFFF
};
typedef CFOptionFlags CFGregorianUnitFlags;

extern bool CFGregorianDateIsValid(CFGregorianDate gdate, CFOptionFlags unitFlags);
extern CFAbsoluteTime CFGregorianDateGetAbsoluteTime(CFGregorianDate gdate, CFTimeZoneRef tz);

extern CFGregorianDate CFAbsoluteTimeGetGregorianDate(CFAbsoluteTime at, CFTimeZoneRef tz);
extern CFAbsoluteTime CFAbsoluteTimeAddGregorianUnits(CFAbsoluteTime at, CFTimeZoneRef tz, CFGregorianUnits units);
extern CFGregorianUnits CFAbsoluteTimeGetDifferenceAsGregorianUnits(CFAbsoluteTime at1, CFAbsoluteTime at2, CFTimeZoneRef tz, CFOptionFlags unitFlags);

extern int CFAbsoluteTimeGetDayOfWeek(CFAbsoluteTime at, CFTimeZoneRef tz);
extern int CFAbsoluteTimeGetDayOfYear(CFAbsoluteTime at, CFTimeZoneRef tz);
extern int CFAbsoluteTimeGetWeekOfYear(CFAbsoluteTime at, CFTimeZoneRef tz);
