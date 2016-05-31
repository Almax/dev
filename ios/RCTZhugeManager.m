//
//  RCTZhuge.m
//  MarryGuard_v2
//
//  Created by Mot on 16/5/30.
//  Copyright © 2016年 Facebook. All rights reserved.
//

#import "RCTZhugeManager.h"
#import <Zhugeio/Zhuge.h>

@implementation RCTZhugeManager
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(getEvent:(NSString *)eventName
                                      parameters:(NSDictionary *)parameters
                                      callback:(RCTResponseSenderBlock)callback
                 )
{
  [[Zhuge sharedInstance] track:eventName properties:parameters];
  NSString *log = [NSString stringWithFormat:@"callback %@ success", eventName];
  NSLog(@"%@", log);
}

RCT_EXPORT_METHOD(activeUser:(NSDictionary*)user) {
  
  NSMutableDictionary *userData = [user mutableCopy];
  [[Zhuge sharedInstance] identify:userData[@"id"] properties:userData];
  NSLog(@"%@", userData);
}

RCT_EXPORT_METHOD(sample) {
		NSMutableDictionary *user = [NSMutableDictionary dictionary];
		user[@"name"] = @"mot";
		user[@"gender"] = @"男";
		user[@"birthday"] = @"1992/1/11";
		user[@"avatar"] = @"http://tp2.sinaimg.cn/2885710157/180/5637236139/1";
		user[@"email"] = @"446146366@qq.com";
		user[@"mobile"] = @"18901010101";
		user[@"qq"] = @"91919";
		user[@"weixin"] = @"mt_623";
		user[@"weibo"] = @"mot_99";
		user[@"location"] = @"北京朝阳区";
		user[@"公司"] = @"37degree";
		[[Zhuge sharedInstance] identify:@"1234" properties:user];
}

@end
