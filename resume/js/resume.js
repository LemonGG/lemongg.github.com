

var _body;
var _canvas;

$(function(){
	_body = $("body")
	_canvas = $("<canvas id='resumeCanvas'></canvas>")
	_canvas.appendTo(_body)
})
window.onload = function(){
	//alert(document.body)
	
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
      	
      	
      	// resource list
      	var res = {
      		bg:"img/rbg.jpg",
      		resumeHead:"img/1442854190954.png",
      		resumeHead_down:"img/1442854190955.png",
      		rectWhite : "img/c0.png",
      		rectGreen : "img/c1.png",
      	}
      	var resList = [
      		res.resumeHead,
      		res.resumeHead_down
      	]
      	cc.LoaderScene.preload(resList,function(){
      		
      		var Scene = cc.Scene.extend({
      			onEnter:function(){
      				this._super()
      				
      				// add background color
      				var bgColor = new cc.LayerColor(cc.color(0,0,0,255))
      				this.addChild(bgColor)
    				var bg = new cc.Sprite(res.bg);
    				bgColor.addChild(bg)
    				bg.setPosition(w>>1,h>>1);
    				bg.setOpacity(50)


					var self = this;
      				var curPage = 0
      				
      				var layerList = []
					function getLayer(index,name){
      					var item = new cc.Layer()
      					item.x = index * w
      					layerList.push(item)
      					
      					var rTitle = new cc.LabelTTF(name,"",38)
						item.addChild(rTitle)
						rTitle.setPosition(w>>1,800)
						self.addChild(item)
      					return item
      				}
      				
      				var mainPage = getLayer(0,"个人简历")
      				var aboutPage = getLayer(1,"关于我")
      				var selfAssessmentPage = getLayer(2,"自我评价")
      				var experiencePage = getLayer(3,"项目经验")
      				var experiencePage1 = getLayer(4,"项目经验")
      				var workExperiencePage = getLayer(5,"工作经历")
      				var skillsPage = getLayer(6,"专业技能")
      				var endPage = getLayer(7,"")
      				
					function pageMove(ossetX){
						if(curPage==0 && ossetX > 0){
							return
						}
						if(curPage==-7 && ossetX < 0){
							return
						}
						if(ossetX > 0){
							curPage++
						}else{
							curPage--
						}
						for(var i = 0; i < layerList.length; i++){
							layerList[i].runAction(cc.moveBy(1,cc.p(ossetX,0)))
						}
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
      				
      				
      				
      				
      				
      				/**
      				 * 首页
      				 */
      				{
      						
      					
	    				
	    				var rWarning = new cc.LabelTTF("点击头像或左右滑动查看详细 信息","",24)
	    				mainPage.addChild(rWarning)
	    				rWarning.setPosition(w>>1,(h>>1)+200)
	    				rWarning.setOpacity(180)
	    				
	    				
	    				// 开始精灵  
	        			var rHead = new cc.MenuItemImage(
	        				res.resumeHead,
	        				res.resumeHead_down,
	        				function(){
	        					pageMove(-w)
	        				},mainPage
	        			)
	    				var mu = new cc.Menu(rHead)  
				        mainPage.addChild(mu); 
				        
						// name
						var rName = new cc.LabelTTF("王晓维","",30)
						mainPage.addChild(rName)
						rName.setPosition(w>>1,(h>>1)-240)
						
						var rEmail = new cc.LabelTTF("297278806@qq.com")
						mainPage.addChild(rEmail)
						rEmail.setPosition(w>>1,(h>>1)-300)
      				}

					
					/**
					 * 关于我
					 */
					{
						function addItem(param1,param2){
							var l = new cc.LabelTTF(param1.c,"",30)
							aboutPage.addChild(l)
							l.setPosition(param1.x,param1.y)
							
							var c = new cc.LabelTTF(param2.c,"",24)
							aboutPage.addChild(c)
							c.setPosition(param2.x,param2.y)
						}
						/**
						 * 姓名
						 */
						{
							addItem(
								{
									c:"姓名",
									x:100,
									y:720
								},
								{
									c:"王晓维",
									x:200,
									y:720
								}
							)
							
						}
						
						
						/**
						 * 性别
						 */
						{
							addItem(
								{
									c:"性别",
									x:440,
									y:720
								},
								{
									c:"男",
									x:540,
									y:720
								}
							)
						}
						
						
						/**
						 * 籍贯
						 */
						{
							addItem(
								{
									c:"籍贯",
									x:100,
									y:620
								},
								{
									c:"河南",
									x:200,
									y:620
								}
							)
						}
						
						
						
						/**
						 * 民族
						 */
						{
							addItem(
								{
									c:"民族",
									x:440,
									y:620
								},
								{
									c:"汉",
									x:540,
									y:620
								}
							)
						}
						
						
						/**
						 * 学历
						 */
						{
							addItem(
								{
									c:"学历",
									x:100,
									y:520
								},
								{
									c:"大专",
									x:200,
									y:520
								}
							)
						}
						
						
						/**
						 * 专业
						 */
						{
							addItem(
								{
									c:"专业",
									x:440,
									y:520
								},
								{
									c:"动漫",
									x:540,
									y:520
								}
							)
						}
						
						
						// title
						var rTitle = new cc.LabelTTF("联系方式","",48)
						aboutPage.addChild(rTitle)
						rTitle.setPosition(w>>1,400)
						
						/**
						 * qq
						 */
						{
							addItem(
								{
									c:"QQ",
									x:100,
									y:300
								},
								{
									c:"297278806",
									x:200,
									y:300
								}
							)
						}
						/**
						 * 微信
						 */
						{
							addItem(
								{
									c:"微信",
									x:430,
									y:300
								},
								{
									c:"LemonMind",
									x:540,
									y:300
								}
							)
						}
						
						/**
						 * 手机
						 */
						{
							addItem(
								{
									c:"手机",
									x:100,
									y:240
								},
								{
									c:"15011021101",
									x:210,
									y:240
								}
							)
						}
						
						/**
						 * 备用
						 */
						{
							addItem(
								{
									c:"手机",
									x:430,
									y:240
								},
								{
									c:"18643542002",
									x:540,
									y:240
								}
							)
						}
						
						/**
						 * 邮箱
						 */
						{
							addItem(
								{
									c:"邮箱",
									x:100,
									y:180
								},
								{
									c:"297278806@qq.com",
									x:260,
									y:180
								}
							)
						}
						
						/**
						 * github
						 */
						{
							addItem(
								{
									c:"github",
									x:110,
									y:120
								},
								{
									c:"https://github.com/LemonGG",
									x:310,
									y:120
								}
							)
						}
					}
      				

      				
      				/**
      				 * 自我评价
      				 */
					{
						
						selfAssessmentPage.init = function(){
							function getItem(param){
								var c = new cc.LabelTTF(param.c,"",18)
								c.setAnchorPoint(0,0.5)
								selfAssessmentPage.addChild(c)
								c.setPosition(param.x,param.y)
							}
							
							
							
							getItem(
								{
									c:"熟悉项目开发的一般理论和方法，有较丰富的项目经验",
									x:20,
									y:700
								}
							)
							getItem(
								{
									c:"良好的独立分析， 错误排查和解决问题的能力， 并能关注细节",
									x:20,
									y:660
								}
							)
							getItem(
								{
									c:"具有丰富的项目管理经验和把控能力",
									x:20,
									y:620
								}
							)
							getItem(
								{
									c:"热爱新技术，具有很强的学习能力和钻研精神",
									x:20,
									y:580
								}
							)
							getItem(
								{
									c:"具有深刻的面向对象思想",
									x:20,
									y:540
								}
							)
							getItem(
								{
									c:"曾领十几人的团队开发上百款h5单机小游戏",
									x:20,
									y:500
								}
							)
							getItem(
								{
									c:"做事态度认真，踏实，并且为人和善",
									x:20,
									y:460
								}
							)
							getItem(
								{
									c:"敢于承担责任，有百折不挠的精神品质",
									x:20,
									y:420
								}
							)
							getItem(
								{
									c:"座右铭：",
									x:20,
									y:340
								}
							)
							getItem(
								{
									c:"这个世界上任何奇迹的产生都是经过千辛万苦的努力而得的，首先承认\n自己的平凡，然后用千百倍的努力来弥补平凡",
									x:20,
									y:300
								}
							)
							
						}
						
						selfAssessmentPage.init()
					}
					
					
					/**
					 * 项目经验
					 */
					{
						
					
						var menuItemList = []
						cc.MenuItemFont.setFontSize(18);
						
						function addItem1(param){
							var t = new cc.LabelTTF(param.title,"",20)
							experiencePage.addChild(t)
							t.setPosition(param.x,param.y)
							
							var _data
							for(var i = 0; i < param.c.length; i++){
								_data = param.c[i]
								var item 
								if(_data.cf){
									item = new cc.MenuItemFont(_data.text,_data.cf,experiencePage)
									menuItemList.push(item)
									item.setPosition(_data.x,_data.y)
								}else{
									item = new cc.LabelTTF(_data.text,"",18)
									experiencePage.addChild(item)
									item.setPosition(_data.x,_data.y)
								}
								item._setAnchorX(0)
							}
						}
						
						addItem1(
							{
								title:"H5小游戏",
								x:100,
								y:700,
								c:[
									{
										cf:function(){
											window.open("http://www.59600.com")
										},
										text:"点击去网站看看",
										x:120,
										y:680
									},
									{
										text:"工作重心：",
										x:120,
										y:660
									},
									{
										text:"项目管理 | 技术指导 | 项目研发 | 性能优化",
										x:140,
										y:640
									},
									{
										text:"项目流程：",
										x:120,
										y:620
									},
									{
										text:"半敏捷式开发 | 策划-美术-程序-测试-运营 基本独立",
										x:140,
										y:600
									},
									{
										text:"每天各部门负责人会有一个15-20分钟的小会，用来说明",
										x:140,
										y:580
									},
									{
										text:"项目的执行情况和遇到的问题",
										x:140,
										y:560
									},
									{
										text:"svn资源库连接项目组所有成员",
										x:140,
										y:540
									},
									{
										text:"开发技术：",
										x:120,
										y:520
									},
									{
										text:"cocos2d-js | egret | js | html | flash | flax | svn",
										x:140,
										y:500
									},
								]
							}
						)
						
						addItem1(
							{
								title:"上古传说",
								x:100,
								y:400,
								c:[
									{
										cf:function(){
											window.open("http://bdtg.37.com/s/1/296/6552.html?uid=2267496")
										},
										text:"点击去网站看看",
										x:120,
										y:380
									},
									{
										text:"工作重心：",
										x:120,
										y:360
									},
									{
										text:"Bug修改 | 项目研发 | 性能优化 | 模块设计",
										x:140,
										y:340
									},
									{
										text:"项目说明：",
										x:120,
										y:320
									},
									{
										text:"网页游戏 | ARPG | 传奇类 ",
										x:140,
										y:300
									},
									{
										text:"开发技术：",
										x:120,
										y:280
									},
									{
										text:"Actionscript3.0 | flash | svn",
										x:140,
										y:260
									},
								]
							}
						)
						
						var  mn = new cc.Menu(menuItemList);
//				        mn.alignItemsVertically();    
						mn.x = 0;
						mn.y = 0;
				        experiencePage.addChild(mn);  
					}
					
			        /**
					 * 项目经验1
					 */
					{
						
						var menuItemList = []
						cc.MenuItemFont.setFontSize(18);
						
						function addItem2(param){
							var t = new cc.LabelTTF(param.title,"",20)
							experiencePage1.addChild(t)
							t.setPosition(param.x,param.y)
							
							var _data
							for(var i = 0; i < param.c.length; i++){
								_data = param.c[i]
								var item 
								if(_data.cf){
									item = new cc.MenuItemFont(_data.text,_data.cf,experiencePage1)
									menuItemList.push(item)
									item.setPosition(_data.x,_data.y)
								}else{
									item = new cc.LabelTTF(_data.text,"",18)
									experiencePage1.addChild(item)
									item.setPosition(_data.x,_data.y)
								}
								item._setAnchorX(0)
							}
						}
						
						addItem2(
							{
								title:"热血三国",
								x:100,
								y:700,
								c:[
									{
										text:"游戏已下线",
										x:120,
										y:680
									},
									{
										text:"工作重心：",
										x:120,
										y:660
									},
									{
										text:"前端开发 | 背包 | 商城 | 主UI",
										x:140,
										y:640
									},
									{
										text:"项目说明：",
										x:120,
										y:620
									},
									{
										text:"网页游戏 | 横版rpg",
										x:140,
										y:600
									},
									{
										text:"前端：as3 | 后端：java",
										x:140,
										y:580
									},
									{
										text:"开发技术：",
										x:120,
										y:560
									},
									{
										text:"Actionscript3.0 | flash | svn",
										x:140,
										y:540
									},
								]
							}
						)
						
						addItem2(
							{
								title:"轩辕神剑",
								x:100,
								y:400,
								c:[
									{
										cf:function(){
											window.open("http://www.manmankan.com/kaifu/yys/776/411/")
										},
										text:"点击去网站看看",
										x:120,
										y:380
									},
									{
										text:"工作重心：",
										x:120,
										y:360
									},
									{
										text:"前端开发 | 排行榜 | 提示组件 | 角色展示",
										x:140,
										y:340
									},
									{
										text:"项目说明：",
										x:120,
										y:320
									},
									{
										text:"网页游戏 | ARPG  ",
										x:140,
										y:300
									},
									{
										text:"前端：as3 | 后端：c++",
										x:140,
										y:280
									},
									{
										text:"开发技术：",
										x:120,
										y:260
									},
									{
										text:"Actionscript3.0 | flash | svn",
										x:140,
										y:240
									},
								]
							}
						)
						
						var  mn = new cc.Menu(menuItemList);
//				        mn.alignItemsVertically();    
						mn.x = 0;
						mn.y = 0;
				        experiencePage1.addChild(mn);  
					}
					
					/**
					 * 工作经历
					 */
					{
						function addItem3(param){
							var title = new cc.LabelTTF(param.time,"",16)
							workExperiencePage.addChild(title)
							title.setPosition(param.x,param.y)
							//title.setColor(155,155,155,255)
							title._setAnchorX(0)
							
							var _data
							for(var i = 0; i < param.c.length; i++){
								_data = param.c[i]
								var item = new cc.LabelTTF(_data.text,"",20)
								workExperiencePage.addChild(item)
								item.setPosition(_data.x,_data.y)
								item._setAnchorX(0)
							}
						}
						
						addItem3(
							{
								time:"2015-1-6",
								x:100,
								y:700,
								c:[
									{
										text:"乐游(北京)科技有限公司",
										x:120,
										y:670
									},
									{
										text:"以开发h5游戏为主",
										x:120,
										y:650
									},
									{
										text:"公司人数在30人左右,技术部人数为12人",
										x:120,
										y:630
									},
									{
										text:"本人在公司任项目经理一职",
										x:120,
										y:610
									},
									{
										text:"主要负责 项目管理|游戏开发|技术指导等工作",
										x:120,
										y:590
									},
								]
							}
						)
						
						addItem3(
							{
								time:"2015-2-16",
								x:100,
								y:560,
								c:[
									{
										text:"河南羲和网络科技有限公司",
										x:120,
										y:530
									},
									{
										text:"以开发页游、音乐网站、app为主",
										x:120,
										y:510
									},
									{
										text:"本人在公司任前端主程一职",
										x:120,
										y:490
									},
									{
										text:"主要负责 前端开发|进度把握",
										x:120,
										y:470
									},
								]
							}
						)
						
						
						addItem3(
							{
								time:"2013-5-18",
								x:100,
								y:440,
								c:[
									{
										text:"北京三迹人科技有限公司",
										x:120,
										y:410
									},
									{
										text:"以开发页游为主",
										x:120,
										y:390
									},
									{
										text:"本人在公司任前端开发工程师一职",
										x:120,
										y:370
									},
									{
										text:"主要负责 前端开发",
										x:120,
										y:350
									},
								]
							}
						)
						
						addItem3(
							{
								time:"2012-7-28",
								x:100,
								y:320,
								c:[
									{
										text:"北京热酷",
										x:120,
										y:290
									},
									{
										text:"以游戏开发为主",
										x:120,
										y:270
									},
									{
										text:"本人在公司任前端开发工程师一职",
										x:120,
										y:250
									},
									{
										text:"主要负责 前端开发",
										x:120,
										y:230
									},
								]
							}
						)
						
						addItem3(
							{
								time:"2012-2-23",
								x:100,
								y:200,
								c:[]
							}
						)
						
					}
      			
      				
      				
      				
      				// 专业技能
      				{
      					function addItem5(param){
      						
      						param.rx = param.rx+5;
      						var bar = new cc.Sprite(res.rectGreen)
      						skillsPage.addChild(bar)
      						bar._setAnchorX(0)
      						bar.setScaleX(param.rwidth*5)
      						bar.setScaleY(param.rheight)
      						bar.setPosition(param.rx,param.ry)
      						
        						var title = new cc.LabelTTF(param.name + " | 掌握程度 : " + param.rwidth + "%100","","24")
        						skillsPage.addChild(title)
        						title.setPosition(param.rx,param.ry+26)
        						title._setAnchorX(0)
      					}
      					
      					var line = new cc.Sprite(res.rectWhite)
      					skillsPage.addChild(line)
      					line.setScaleX(10)
      					line.setScaleY(600)
      					line.setPosition(100,400)
      					
      					
      					addItem5(
      						{
      							name:"Cocos2d-js/cocos2d-html5",
      							rwidth:100,
      							rheight:24,
      							rx:100,
      							ry:600
      						}
      					)
      					addItem5(
      						{
      							name:"Egret",
      							rwidth:80,
      							rheight:24,
      							rx:100,
      							ry:540
      						}
      					)
      					addItem5(
      						{
      							name:"Actionscript",
      							rwidth:100,
      							rheight:24,
      							rx:100,
      							ry:480
      						}
      					)
      					addItem5(
      						{
      							name:"Nodejs",
      							rwidth:70,
      							rheight:24,
      							rx:100,
      							ry:420
      						}
      					)
      					addItem5(
      						{
      							name:"Flash",
      							rwidth:100,
      							rheight:24,
      							rx:100,
      							ry:360
      						}
      					)
      					addItem5(
      						{
      							name:"Photoshop",
      							rwidth:80,
      							rheight:24,
      							rx:100,
      							ry:300
      						}
      					)
      					addItem5(
      						{
      							name:"JQuery",
      							rwidth:80,
      							rheight:24,
      							rx:100,
      							ry:240
      						}
      					)
      				}
      				
      				
      				// 结束
      				{
      					var c = new cc.LabelTTF("很荣幸您能观看我的简历！","",48)
      					endPage.addChild(c)
      					c.setPosition(w>>1,h>>1)
      					var sm = new cc.LabelTTF("本简历采用html5技术，cocos和jQuery框架实现","",24)
      					endPage.addChild(sm)
      					sm.setPosition(w>>1,(h>>1)-60)
      					var author = new cc.LabelTTF("---王晓维")
      					endPage.addChild(author)
      					author.setPosition((w>>1)+200,(h>>1)-120)
      				}
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



