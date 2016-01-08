

var _body;
var _canvas;

$(function(){
	_body = $("body")
	_canvas = $("<canvas id='resumeCanvas'></canvas>")
	_canvas.appendTo(_body)
})
window.onload = function(){
	//alert(document.body)
	
	
	if(!cc.sys.isMobile){
		//--------------------
		$(function(){
			var MAX = 5
			var i = 0
			
			function gggo(){
				CreateBubble()
				
				if(++i < MAX){
					setTimeout(gggo, 1000);
				}
			}
			gggo()
			
		})	
	}
	
	//-----------------------
	
	
	
	//--------------------------
	
	// run cocos
	cc.game.onStart = function(){
		
		var w = 640
		var h = 940
		
		cc.view.enableRetina(!1);
		cc.view.adjustViewPort(!0);
      	cc.view.setDesignResolutionSize(w,h,cc.ResolutionPolicy.SHOW_ALL);
      	cc.view.resizeWithBrowserSize(!0);
      	
      	
      	
      	cc.LoaderScene.preload([],function(){
      		
      		var Scene = cc.Scene.extend({
      			onEnter:function(){
      				this._super()
      				
      				var offX = w>>1;
      				var offY = h>>1;
      				var curPage = 0;
      				var self = this;
      				
    				// bg
    				{
    					var bg = new cc.Sprite("img/rbg.jpg")
    					this.addChild(bg)
    					bg.setPosition(offX,offY)
    				}
    				
    				
    				var pages = []
    				var moveingPages = []
    				// pages
    				{
    					for(var i = 0; i < 12; i++){
    						var item = new cc.Sprite("img/page"+i+".png")
    						item.setPosition(offX,offY);
    						pages.push(item)
    					}
    					var item = pages[curPage]
    					this.addChild(item)
    					moveingPages.push(item)
    				}


					
      				
      				
      				
					function pageMove(ossetX){
						var item = pages[curPage]
						var next ;
						if(ossetX < 0){
							if(curPage==11){
								curPage = -1
							}
							next = pages[curPage+1]
							curPage++
							
						}else{
							if(curPage==0){
								curPage=12
							}
							next = pages[curPage-1]
							curPage--
						}
						next.x = item.x - ossetX
						self.addChild(next)
						moveingPages.push(next)
						for(var i = 0; i < moveingPages.length; i++){
							moveingPages[i].runAction(
								cc.moveBy(0.2,cc.p(ossetX,0))
							)
						}
						self.scheduleOnce(function(){
							var item = moveingPages.shift()
							item.removeFromParent()
						},0.2)
					}
					
					/**
					 * 滑动事件
					 */
					{
						var movePoins = [];
						cc.eventManager.addListener({
				            event: cc.EventListener.TOUCH_ONE_BY_ONE,
				            onTouchMoved:function (touche, event) {
				                var p = cc.p()
				                p.x = touche.getLocation().x;
				                p.y = touche.getLocation().y;
				                movePoins.push(p)
				                return true
				            },
				            onTouchBegan:function (touche, event) {
				                movePoins = []
				                return true
				            },
				            onTouchEnded:function(touche, event) {
				            	var p1 = movePoins[0]
				            	var p2 = movePoins.pop();
				            	if(!p1||!p2){
				            		return true
				            	}
				            	var space = p1.x - p2.x;
				            	// 暂时没有判断临界值
				            	if(space > 0 && space > 60 ){
				            		// 向左移动
				            		pageMove(-w)
				            	}
				            	else if(space < 0 && space < -60){
				            		// 向右移动
				            		pageMove(w)
				            	}
				            	
				            	return true
				            }
				        }, self);
					}
      				
      				
      				
      				
      				
//    				/**
//    				 * 首页
//    				 */
//    				{
//    						
//    					
//	    				
//	    				var rWarning = new cc.LabelTTF("点击头像或左右滑动查看详细 信息","",24)
//	    				mainPage.addChild(rWarning)
//	    				rWarning.setPosition(w>>1,(h>>1)+200)
//	    				rWarning.setOpacity(150)
//	    				
//	    				
//	    				// 开始精灵  
//	        			var rHead = new cc.MenuItemImage(
//	        				res.resumeHead,
//	        				res.resumeHead_down,
//	        				function(){
//	        					pageMove(-w)
//	        				},mainPage
//	        			)
//	    				var mu = new cc.Menu(rHead)  
//				        mainPage.addChild(mu); 
//				        
//						// name
//						var rName = new cc.LabelTTF("王晓维","",30)
//						mainPage.addChild(rName)
//						rName.setPosition(w>>1,(h>>1)-240)
//						
//						var rEmail = new cc.LabelTTF("297278806@qq.com")
//						mainPage.addChild(rEmail)
//						rEmail.setPosition(w>>1,(h>>1)-300)
//    				}
//
//					
//					/**
//					 * 关于我
//					 */
//					{
//						function addItem(param1,param2){
//							var l = new cc.LabelTTF(param1.c,"",24)
//							aboutPage.addChild(l)
//							l.setPosition(param1.x,param1.y)
//							l._setAnchorX(0)
//							
//							var c = new cc.LabelTTF(param2.c,"",24)
//							aboutPage.addChild(c)
//							c.setPosition(param2.x,param2.y)
//							c._setAnchorX(0)
//						}
//						/**
//						 * 姓名
//						 */
//						{
//							addItem(
//								{
//									c:"姓名",
//									x:100,
//									y:720
//								},
//								{
//									c:"王晓维",
//									x:200,
//									y:720
//								}
//							)
//							
//						}
//						
//						
//						/**
//						 * 性别
//						 */
//						{
//							addItem(
//								{
//									c:"性别",
//									x:420,
//									y:720
//								},
//								{
//									c:"男",
//									x:520,
//									y:720
//								}
//							)
//						}
//						
//						
//						/**
//						 * 籍贯
//						 */
//						{
//							addItem(
//								{
//									c:"籍贯",
//									x:100,
//									y:670
//								},
//								{
//									c:"河南",
//									x:200,
//									y:670
//								}
//							)
//						}
//						
//						
//						
//						/**
//						 * 民族
//						 */
//						{
//							addItem(
//								{
//									c:"民族",
//									x:420,
//									y:670
//								},
//								{
//									c:"汉",
//									x:520,
//									y:670
//								}
//							)
//						}
//						
//						
//						/**
//						 * 学历
//						 */
//						{
//							addItem(
//								{
//									c:"学历",
//									x:100,
//									y:620
//								},
//								{
//									c:"大专",
//									x:200,
//									y:620
//								}
//							)
//						}
//						
//						
//						/**
//						 * 专业
//						 */
//						{
//							addItem(
//								{
//									c:"专业",
//									x:420,
//									y:620
//								},
//								{
//									c:"动漫",
//									x:520,
//									y:620
//								}
//							)
//						}
//						
//						/**
//						 * 出生日期
//						 */
//						{
//							addItem(
//								{
//									c:"出生日期",
//									x:100,
//									y:570
//								},
//								{
//									c:"1990年2月",
//									x:200,
//									y:570
//								}
//							)
//						}
//						
//						/**
//						 * 地址
//						 */
//						{
//							addItem(
//								{
//									c:"地址",
//									x:420,
//									y:570
//								},
//								{
//									c:"北京海淀",
//									x:520,
//									y:570
//								}
//							)
//						}
//						
//						/**
//						 * 健康
//						 */
//						{
//							addItem(
//								{
//									c:"健康状况",
//									x:100,
//									y:520
//								},
//								{
//									c:"健康",
//									x:200,
//									y:520
//								}
//							)
//						}
//						
//						
//						// title
//						var rTitle = new cc.LabelTTF("联系方式","",38)
//						aboutPage.addChild(rTitle)
//						rTitle.setPosition(w>>1,400)
//						
//						/**
//						 * qq
//						 */
//						{
//							addItem(
//								{
//									c:"QQ",
//									x:100,
//									y:300
//								},
//								{
//									c:"297278806",
//									x:180,
//									y:300
//								}
//							)
//						}
//						/**
//						 * 微信
//						 */
//						{
//							addItem(
//								{
//									c:"微信",
//									x:380,
//									y:300
//								},
//								{
//									c:"LemonMind",
//									x:460,
//									y:300
//								}
//							)
//						}
//						
//						/**
//						 * 手机
//						 */
//						{
//							addItem(
//								{
//									c:"手机",
//									x:100,
//									y:240
//								},
//								{
//									c:"18643542002",
//									x:180,
//									y:240
//								}
//							)
//						}
//						
//						/**
//						 * 备用
//						 */
//						{
//							addItem(
//								{
//									c:"手机",
//									x:380,
//									y:240
//								},
//								{
//									c:"15011021101",
//									x:460,
//									y:240
//								}
//							)
//						}
//						
//						/**
//						 * 邮箱
//						 */
//						{
//							addItem(
//								{
//									c:"邮箱",
//									x:100,
//									y:180
//								},
//								{
//									c:"297278806@qq.com",
//									x:180,
//									y:180
//								}
//							)
//						}
//						
//						/**
//						 * github
//						 */
//						{
//							addItem(
//								{
//									c:"github",
//									x:100,
//									y:120
//								},
//								{
//									c:"https://github.com/LemonGG",
//									x:180,
//									y:120
//								}
//							)
//						}
//					}
//    				
//
//    				
//    				/**
//    				 * 自我评价
//    				 */
//					{
//						
//						selfAssessmentPage.init = function(){
//							function getItem(param){
//								var c = new cc.LabelTTF(param.c,"",22)
//								c.setAnchorPoint(0,0.5)
//								selfAssessmentPage.addChild(c)
//								c.setPosition(param.x,param.y)
//							}
//							
//							
//							
//							getItem(
//								{
//									c:"熟悉项目开发的一般理论和方法，有较丰富的项目经验",
//									x:20,
//									y:700
//								}
//							)
//							getItem(
//								{
//									c:"良好的独立分析， 错误排查和解决问题的能力， 并能关注细节",
//									x:20,
//									y:660
//								}
//							)
//							getItem(
//								{
//									c:"具有丰富的项目管理经验和把控能力",
//									x:20,
//									y:620
//								}
//							)
//							getItem(
//								{
//									c:"热爱新技术，具有很强的学习能力和钻研精神",
//									x:20,
//									y:580
//								}
//							)
//							getItem(
//								{
//									c:"具有深刻的面向对象思想",
//									x:20,
//									y:540
//								}
//							)
//							getItem(
//								{
//									c:"曾领十几人的团队开发上百款h5单机小游戏",
//									x:20,
//									y:500
//								}
//							)
//							getItem(
//								{
//									c:"做事态度认真，踏实，并且为人和善",
//									x:20,
//									y:460
//								}
//							)
//							getItem(
//								{
//									c:"敢于承担责任，有百折不挠的精神品质",
//									x:20,
//									y:420
//								}
//							)
//							getItem(
//								{
//									c:"座右铭：",
//									x:20,
//									y:340
//								}
//							)
//							getItem(
//								{
//									c:"这个世界上任何奇迹的产生都是经过千辛万苦的努力而得的，\n首先承认自己的平凡，然后用千百倍的努力来弥补平凡",
//									x:20,
//									y:300
//								}
//							)
//							
//						}
//						
//						selfAssessmentPage.init()
//					}
//					
//					
//					/**
//					 * 项目经验
//					 */
//					{
//						
//					
//						var menuItemList = []
//						cc.MenuItemFont.setFontSize(18);
//						
//						function addItem1(param){
//							var t = new cc.LabelTTF(param.title,"",28)
//							experiencePage.addChild(t)
//							t.setPosition(param.x,param.y)
//							
//							var _data
//							for(var i = 0; i < param.c.length; i++){
//								_data = param.c[i]
//								var item 
//								if(_data.cf){
//									item = new cc.MenuItemFont(_data.text,_data.cf,experiencePage)
//									menuItemList.push(item)
//									item.setPosition(_data.x,_data.y)
//								}else{
//									item = new cc.LabelTTF(_data.text,"",18)
//									experiencePage.addChild(item)
//									item.setPosition(_data.x,_data.y)
//								}
//								item._setAnchorX(0)
//							}
//						}
//						
//						addItem1(
//							{
//								title:"H5小游戏",
//								x:100,
//								y:700,
//								c:[
//									{
//										cf:function(){
//											window.open("http://www.59600.com")
//										},
//										text:"点击去网站看看",
//										x:120,
//										y:670
//									},
//									{
//										text:"工作重心：",
//										x:120,
//										y:640
//									},
//									{
//										text:"项目管理 | 技术指导 | 项目研发 | 性能优化",
//										x:140,
//										y:620
//									},
//									{
//										text:"项目流程：",
//										x:120,
//										y:600
//									},
//									{
//										text:"半敏捷式开发 | 策划-美术-程序-测试-运营 基本独立",
//										x:140,
//										y:580
//									},
//									{
//										text:"每天各部门负责人会有一个15-20分钟的小会，用来说明",
//										x:140,
//										y:560
//									},
//									{
//										text:"项目的执行情况和遇到的问题",
//										x:140,
//										y:540
//									},
//									{
//										text:"svn资源库连接项目组所有成员",
//										x:140,
//										y:520
//									},
//									{
//										text:"开发技术：",
//										x:120,
//										y:500
//									},
//									{
//										text:"cocos2d-js | egret | js | html | flash | flax | svn",
//										x:140,
//										y:480
//									},
//									{
//										text:"缓存池技术 | 切片技术 | 异步加载 | 代码规范",
//										x:140,
//										y:460
//									},
//									{
//										text:"基于flash的flax作为cocos的可视化编辑使开发效率明显提升",
//										x:140,
//										y:440
//									},
//									{
//										text:"svn团队协作工具使团队开发避免很多代码合并的问题",
//										x:140,
//										y:420
//									},
//									{
//										text:"cocos2d-js 一份代码可打包web/android/ios等平台",
//										x:140,
//										y:400
//									}
//								]
//							}
//						)
//						
//						addItem1(
//							{
//								title:"上古传说",
//								x:100,
//								y:400,
//								c:[
//									{
//										cf:function(){
//											window.open("http://bdtg.37.com/s/1/296/6552.html?uid=2267496")
//										},
//										text:"点击去网站看看",
//										x:120,
//										y:380
//									},
//									{
//										text:"工作重心：",
//										x:120,
//										y:360
//									},
//									{
//										text:"Bug修改 | 项目研发 | 性能优化 | 模块设计",
//										x:140,
//										y:340
//									},
//									{
//										text:"项目说明：",
//										x:120,
//										y:320
//									},
//									{
//										text:"网页游戏 | ARPG | 传奇类 ",
//										x:140,
//										y:300
//									},
//									{
//										text:"开发技术：",
//										x:120,
//										y:280
//									},
//									{
//										text:"Actionscript3.0 | flash | svn",
//										x:140,
//										y:260
//									},
//									{
//										text:"切除冗余——只对可能部分检测",
//										x:140,
//										y:240
//									},
//									{
//										text:"化繁为简——降解复杂简单叠加",
//										x:140,
//										y:220
//									},
//									{
//										text:"构造循环——同类代码巧妙合并",
//										x:140,
//										y:200
//									},
//									{
//										text:"变死为活——封装代码转为函数",
//										x:140,
//										y:180
//									}
//								]
//							}
//						)
//						
//						var  mn = new cc.Menu(menuItemList);
////				        mn.alignItemsVertically();    
//						mn.x = 0;
//						mn.y = 0;
//				        experiencePage.addChild(mn);  
//					}
//					
//			        /**
//					 * 项目经验1
//					 */
//					{
//						
//						var menuItemList = []
//						cc.MenuItemFont.setFontSize(18);
//						
//						function addItem2(param){
//							var t = new cc.LabelTTF(param.title,"",20)
//							experiencePage1.addChild(t)
//							t.setPosition(param.x,param.y)
//							
//							var _data
//							for(var i = 0; i < param.c.length; i++){
//								_data = param.c[i]
//								var item 
//								if(_data.cf){
//									item = new cc.MenuItemFont(_data.text,_data.cf,experiencePage1)
//									menuItemList.push(item)
//									item.setPosition(_data.x,_data.y)
//								}else{
//									item = new cc.LabelTTF(_data.text,"",18)
//									experiencePage1.addChild(item)
//									item.setPosition(_data.x,_data.y)
//								}
//								item._setAnchorX(0)
//							}
//						}
//						
//						addItem2(
//							{
//								title:"热血三国",
//								x:100,
//								y:700,
//								c:[
//									{
//										text:"游戏已下线",
//										x:120,
//										y:680
//									},
//									{
//										text:"工作重心：",
//										x:120,
//										y:660
//									},
//									{
//										text:"前端开发 | 背包 | 商城 | 主UI",
//										x:140,
//										y:640
//									},
//									{
//										text:"项目说明：",
//										x:120,
//										y:620
//									},
//									{
//										text:"网页游戏 | 横版rpg",
//										x:140,
//										y:600
//									},
//									{
//										text:"前端：as3 | 后端：java",
//										x:140,
//										y:580
//									},
//									{
//										text:"开发技术：",
//										x:120,
//										y:560
//									},
//									{
//										text:"Actionscript3.0 | flash | svn",
//										x:140,
//										y:540
//									},
//									{
//										text:"静态的不需互动的图形，使用Shape对象",
//										x:140,
//										y:520
//									},
//									{
//										text:"不需要时间轴的互动图形，使用Sprite对象",
//										x:140,
//										y:500
//									},
//									{
//										text:"需要使用时间轴的动画，使用MovieClip对象",
//										x:140,
//										y:480
//									},
//									{
//										text:"垃圾回收，不用的对象要置null",
//										x:140,
//										y:460
//									},
//									{
//										text:"位图的操作，使用matrix会节省大量内存与CPU的占用",
//										x:140,
//										y:440
//									}
//								]
//							}
//						)
//						
//						addItem2(
//							{
//								title:"轩辕神剑",
//								x:100,
//								y:400,
//								c:[
//									{
//										cf:function(){
//											window.open("http://www.manmankan.com/kaifu/yys/776/411/")
//										},
//										text:"点击去网站看看",
//										x:120,
//										y:380
//									},
//									{
//										text:"工作重心：",
//										x:120,
//										y:360
//									},
//									{
//										text:"前端开发 | 排行榜 | 提示组件 | 角色展示",
//										x:140,
//										y:340
//									},
//									{
//										text:"项目说明：",
//										x:120,
//										y:320
//									},
//									{
//										text:"网页游戏 | ARPG  ",
//										x:140,
//										y:300
//									},
//									{
//										text:"前端：as3 | 后端：c++",
//										x:140,
//										y:280
//									},
//									{
//										text:"开发技术：",
//										x:120,
//										y:260
//									},
//									{
//										text:"Actionscript3.0 | flash | svn",
//										x:140,
//										y:240
//									},
//									{
//										text:"在FOR循环内new对象要小心，每次new都会增大内存",
//										x:140,
//										y:220
//									},
//									{
//										text:"为了确保被垃圾回收，首先保证该对象没有其他引用",
//										x:140,
//										y:200
//									}
//								]
//							}
//						)
//						
//						var  mn = new cc.Menu(menuItemList);
////				        mn.alignItemsVertically();    
//						mn.x = 0;
//						mn.y = 0;
//				        experiencePage1.addChild(mn);  
//					}
//					
//					/**
//					 * 工作经历
//					 */
//					{
//						function addItem3(param){
//							var title = new cc.LabelTTF(param.time,"",16)
//							workExperiencePage.addChild(title)
//							title.setPosition(param.x,param.y)
//							//title.setColor(155,155,155,255)
//							title._setAnchorX(0)
//							
//							var _data
//							for(var i = 0; i < param.c.length; i++){
//								_data = param.c[i]
//								var item = new cc.LabelTTF(_data.text,"",20)
//								workExperiencePage.addChild(item)
//								item.setPosition(_data.x,_data.y)
//								item._setAnchorX(0)
//							}
//						}
//						
//						addItem3(
//							{
//								time:"2015-1-6",
//								x:100,
//								y:700,
//								c:[
//									{
//										text:"乐游(北京)科技有限公司",
//										x:120,
//										y:670
//									},
//									{
//										text:"以开发h5游戏为主",
//										x:120,
//										y:650
//									},
//									{
//										text:"公司人数在30人左右,技术部人数为12人",
//										x:120,
//										y:630
//									},
//									{
//										text:"本人在公司任项目经理一职",
//										x:120,
//										y:610
//									},
//									{
//										text:"主要负责 项目管理|游戏开发|技术指导等工作",
//										x:120,
//										y:590
//									},
//								]
//							}
//						)
//						
//						addItem3(
//							{
//								time:"2015-2-16",
//								x:100,
//								y:560,
//								c:[
//									{
//										text:"河南羲和网络科技有限公司",
//										x:120,
//										y:530
//									},
//									{
//										text:"以开发页游、音乐网站、app为主",
//										x:120,
//										y:510
//									},
//									{
//										text:"本人在公司任前端主程一职",
//										x:120,
//										y:490
//									},
//									{
//										text:"主要负责 前端开发|进度把握",
//										x:120,
//										y:470
//									},
//								]
//							}
//						)
//						
//						
//						addItem3(
//							{
//								time:"2013-5-18",
//								x:100,
//								y:440,
//								c:[
//									{
//										text:"北京三迹人科技有限公司",
//										x:120,
//										y:410
//									},
//									{
//										text:"以开发页游为主",
//										x:120,
//										y:390
//									},
//									{
//										text:"本人在公司任前端开发工程师一职",
//										x:120,
//										y:370
//									},
//									{
//										text:"主要负责 前端开发",
//										x:120,
//										y:350
//									},
//								]
//							}
//						)
//						
//						addItem3(
//							{
//								time:"2012-7-28",
//								x:100,
//								y:320,
//								c:[
//									{
//										text:"北京热酷",
//										x:120,
//										y:290
//									},
//									{
//										text:"以游戏开发为主",
//										x:120,
//										y:270
//									},
//									{
//										text:"本人在公司任前端开发工程师一职",
//										x:120,
//										y:250
//									},
//									{
//										text:"主要负责 前端开发",
//										x:120,
//										y:230
//									},
//								]
//							}
//						)
//						
//						addItem3(
//							{
//								time:"2012-2-23",
//								x:100,
//								y:200,
//								c:[]
//							}
//						)
//						
//					}
//    			
//    				
//    				
//    				
//    				// 专业技能
//    				{
//    					function addItem5(param){
//    						
//    						param.rx = param.rx-20;
//    						var bar = new cc.Sprite(res.rectGreen)
//    						skillsPage.addChild(bar)
//    						bar._setAnchorX(0)
//    						bar.setScaleX(param.rwidth*5/100)
//    						bar.setScaleY(param.rheight/200)
//    						bar.setPosition(param.rx,param.ry)
//    						
//      						var title = new cc.LabelTTF(param.name + " | 掌握程度 : " + param.rwidth + "%100","微软雅黑","20")
//      						skillsPage.addChild(title)
//      						title.setPosition(param.rx,param.ry+26)
//      						title._setAnchorX(0)
//    					}
//    					
////    					var line = new cc.Sprite(res.rectWhite)
////    					skillsPage.addChild(line)
////    					line.setScaleX(10)
////    					line.setScaleY(600)
////    					line.setPosition(100,400)
//    					
//    					
//    					addItem5(
//    						{
//    							name:"Cocos2d-js/cocos2d-html5",
//    							rwidth:100,
//    							rheight:24,
//    							rx:100,
//    							ry:600
//    						}
//    					)
//    					addItem5(
//    						{
//    							name:"Egret",
//    							rwidth:80,
//    							rheight:24,
//    							rx:100,
//    							ry:540
//    						}
//    					)
//    					addItem5(
//    						{
//    							name:"Actionscript",
//    							rwidth:100,
//    							rheight:24,
//    							rx:100,
//    							ry:480
//    						}
//    					)
//    					addItem5(
//    						{
//    							name:"Nodejs",
//    							rwidth:70,
//    							rheight:24,
//    							rx:100,
//    							ry:420
//    						}
//    					)
//    					addItem5(
//    						{
//    							name:"Flash",
//    							rwidth:100,
//    							rheight:24,
//    							rx:100,
//    							ry:360
//    						}
//    					)
//    					addItem5(
//    						{
//    							name:"Photoshop",
//    							rwidth:80,
//    							rheight:24,
//    							rx:100,
//    							ry:300
//    						}
//    					)
//    					addItem5(
//    						{
//    							name:"JQuery",
//    							rwidth:80,
//    							rheight:24,
//    							rx:100,
//    							ry:240
//    						}
//    					)
//    				}
//    				
//    				
//    				// 结束
//    				{
//    					var c = new cc.LabelTTF("很荣幸您能观看我的简历！","",48)
//    					endPage.addChild(c)
//    					c.setPosition(w>>1,h>>1)
//    					var sm = new cc.LabelTTF("本简历采用html5技术，cocos和jQuery框架实现","",24)
//    					endPage.addChild(sm)
//    					sm.setPosition(w>>1,(h>>1)-60)
//    					var author = new cc.LabelTTF("---王晓维")
//    					endPage.addChild(author)
//    					author.setPosition((w>>1)+200,(h>>1)-120)
//    				}
//    			
      			}
      		
      		})
      		
      		cc.director.runScene(new Scene())	
      	},this)
      	
      	
      	
	}
	cc.game.run("resumeCanvas")
	
	//--------------------------------
	



}

$(function(){
	
	
	
	
	
})



