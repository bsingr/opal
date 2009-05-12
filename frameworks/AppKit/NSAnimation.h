// 
//  NSAnimation.h
//  vienna
//  
//  Created by Adam Beynon on 2009-05-12.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import <Foundation/Foundation.h>

@class NSGraphicsContext;

enum {
    NSAnimationEaseInOut,
    NSAnimationEaseIn,
    NSAnimationEaseOut,
    NSAnimationLinear
};
typedef NSUInteger NSAnimationCurve;

enum {
    NSAnimationBlocking,
    NSAnimationNonblocking,
    NSAnimationNonBlockingThreaded
};
typedef NSUInteger NSAnimationBlockingMode;

typedef float NSAnimationProgress;

extern NSString *NSAnimationProgressMarkNotification;
extern NSString *NSAnimationProgressMark;

@interface NSAnimation : NSObject <NSCopying, NSCoding>
{
}

- (id)initWithDuration:(NSTimeInterval)duration animationCurve:(NSAnimationCurve)animationCurve;

- (void)startAnimation;
- (void)stopAnimation;
- (BOOL)isAnimating;

- (NSAnimationProgress)currentProgress;
- (void)setCurrentProgress:(NSAnimationProgress)progress;

- (void)setDuration:(NSTimeInterval)duration;
- (NSTimeInterval)duration;

- (NSAnimationBlockingMode)animationBlockingMode;
- (void)setAnimationBlockingMode:(NSAnimationBlockingMode)animationBlockingMode;

- (void)setFrameRate:(float)framesPerSecond;
- (float)frameRate;

- (void)setAnimationCurve:(NSAnimationCurve)curve;
- (NSAnimationCurve)animationCurve;

- (float)currentValue;

- (void)setDelegate:(id)delegate;
- (id)delegate;

- (NSArray *)progressMarks;
- (void)setProgressMarks:(NSArray *)progressMarks;



@end


