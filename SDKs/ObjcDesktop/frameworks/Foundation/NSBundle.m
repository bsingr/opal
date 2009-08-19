// 
//  NSBundle.m
//  vienna
//  
//  Created by Adam Beynon on 2009-06-03.
//  Copyright 2009 Adam Beynon. All rights reserved.
// 

#import "NSBundle.h"

@implementation NSBundle

+ (NSBundle *)mainBundle
{
  return [[NSBundle alloc] init];
}

+ (NSBundle *)bundleWithPath:(NSString *)path
{
  
}

- (id)initWithPath:(NSString *)path
{
  
}

+ (NSBundle *)bundleForClass:(Class)aClass
{
  
}

+ (NSBundle *)bundleWithIdentifier:(NSString *)identifier
{
  
}

+ (NSArray *)allBundles
{
  
}

+ (NSArray *)allFrameworks
{
  
}

- (BOOL)load
{
  
}

- (BOOL)isLoaded
{
  
}

- (BOOL)unload
{
  
}

- (BOOL)preflightAndReturnError:(NSError **)error
{
  
}

- (BOOL)loadAndReturnError:(NSError **)error
{
  
}

- (NSString *)bundlePath
{
  
}

- (NSString *)resourcePath
{
  
}

- (NSString *)executablePath
{
  
}

- (NSString *)privateFrameworksPath
{
  
}

- (NSString *)sharedFrameworksPath
{
  
}

- (NSString *)sharedSupportPath
{
  
}

- (NSString *)builtInPlugInsPath
{
  
}

- (NSString *)bundleIdentifier
{
  
}

- (Class)classNamed:(NSString *)className
{
  
}

- (Class)principalClass
{
  return NSApplication;
}

+ (NSString *)pathForResource:(NSString *)name ofType:(NSString *)ext inDirectory:(NSString *)bundlePath
{
  
}

- (NSString *)pathForResource:(NSString *)name ofType:(NSString *)ext
{
  
}

- (NSString *)pathForResource:(NSString *)name ofType:(NSString *)ext inDirectory:(NSString *)subpath
{
  
}

- (NSString *)pathForResource:(NSString *)name ofType:(NSString *)ext inDirectory:(NSString *)subpath forLocalization:(NSString *)localizationName
{
  
}


+ (NSArray *)pathsForResourcesOfType:(NSString *)ext inDirectory:(NSString *)bundlePath
{
  
}

- (NSArray *)pathsForResourcesOfType:(NSString *)ext inDirectory:(NSString *)subpath
{
  
}

- (NSArray *)pathsForResourcesOfType:(NSString *)ext inDirectory:(NSString *)subpath forLocalization:(NSString *)localizationName
{
  
}

- (NSString *)localizedStringForKey:(NSString *)key value:(NSString *)value table:(NSString *)tableName
{
  
}

- (NSDictionary *)infoDictionary
{
  
}

- (NSDictionary *)localizedInfoDictionary
{
  
}

- (id)objectForInfoDictionaryKey:(NSString *)key
{
  
}

- (NSArray *)localizations
{
  
}

- (NSArray *)preferredLocalizations
{
  
}

- (NSString *)developmentLocalization
{
  
}

+ (NSArray *)preferredLocalizationsFromArray:(NSArray *)localizationsArray
{
  
}

+ (NSArray *)preferredLocalizationsFromArray:(NSArray *)localizationsArray forPreferences:(NSArray *)preferencesArray
{
  
}

@end
