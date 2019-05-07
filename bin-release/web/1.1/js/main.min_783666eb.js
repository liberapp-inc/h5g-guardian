function rand(){return globalRandom.v()}function randF(t,e){return globalRandom.f(t,e)}function randI(t,e){return globalRandom.i(t,e)}function randBool(){return globalRandom.bool()}var __reflect=this&&this.__reflect||function(t,e,i){t.__class__=e,i?i.push(e):i=[e],t.__types__=t.__types__?i.concat(t.__types__):i},__extends=this&&this.__extends||function(t,e){function i(){this.constructor=t}for(var s in e)e.hasOwnProperty(s)&&(t[s]=e[s]);i.prototype=e.prototype,t.prototype=new i},GameObject=function(){function t(){this.display=null,t.objects.push(this)}return t.prototype.destroy=function(){this.deleteFlag=!0},t.prototype.onDestroy=function(){},t.initial=function(e){t.display=e},t.process=function(){t.objects.forEach(function(t){return t.update()}),t.objects=t.objects.filter(function(t){return t.deleteFlag&&t._delete(),!t.deleteFlag}),t.transit&&(t.dispose(),t.transit(),t.transit=null)},t.dispose=function(){t.objects=t.objects.filter(function(t){return t.destroy(),t._delete(),!1})},t.prototype._delete=function(){this.onDestroy(),this.display&&(t.display.removeChild(this.display),this.display=null)},t.objects=[],t}();__reflect(GameObject.prototype,"GameObject");var PhysicsObject=function(t){function e(){return t.call(this)||this}return __extends(e,t),e.prototype.update=function(){if(this.display){var t=this.body,e=this.display;e.x=this.px,e.y=this.py,e.rotation=180*t.angle/Math.PI}this.fixedUpdate()},e.prepare=function(t){e.pixelPerMeter=t,e.meterPerPixel=1/t,e.width=e.pixelToMeter(Util.width),e.height=e.pixelToMeter(Util.height),e.world=new p2.World,e.world.gravity=[0,e.height*PHYSICS_GRAVITY_PER_H],e.lastTime=Date.now(),e.deltaScale=1},e.progress=function(){var t=Date.now(),i=(t-this.lastTime)*this.deltaScale;this.lastTime=t,i>0&&e.world.step(1/60*this.deltaScale,i,4)},e.prototype._delete=function(){this.onDestroy(),this.body&&(e.world.removeBody(this.body),this.body.displays=[],this.body=null),this.display&&(GameObject.display.removeChild(this.display),this.display=null)},e.pixelToMeter=function(t){return t*e.meterPerPixel},e.meterToPixel=function(t){return t*e.pixelPerMeter},e.prototype.m2p=function(t){return e.meterToPixel(t)},e.prototype.p2m=function(t){return e.pixelToMeter(t)},Object.defineProperty(e.prototype,"px",{get:function(){return e.meterToPixel(this.mx)},set:function(t){this.mx=e.pixelToMeter(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"py",{get:function(){return e.meterToPixel(this.my)},set:function(t){this.my=e.pixelToMeter(t)},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"mx",{get:function(){return this.body.position[0]},set:function(t){this.body.position[0]=t},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"my",{get:function(){return this.body.position[1]},set:function(t){this.body.position[1]=t},enumerable:!0,configurable:!0}),e.deltaScale=1,e}(GameObject);__reflect(PhysicsObject.prototype,"PhysicsObject");var Button=function(t){function e(e,i,s,a,o,r,n,h,l,p){var c=t.call(this)||this;c.text=null,c.onTap=null,c.press=!1,c.touch=!1,c.x=0,c.y=0;var d=new egret.Shape;GameObject.display.addChild(d),d.graphics.beginFill(h,l);var y=r*Util.width,u=n*Util.height;return d.graphics.drawRoundRect(-.5*y,-.5*u,y,u,.2*y),d.graphics.endFill(),d.touchEnabled=!0,d.x=a*Util.width,d.y=o*Util.height,c.display=d,e&&(c.text=Util.newTextField(e,i,s,a,o,!0,!1),GameObject.display.addChild(c.text)),c.onTap=p,c.onTap&&c.display.addEventListener(egret.TouchEvent.TOUCH_TAP,c.onTap,c),c.display.addEventListener(egret.TouchEvent.TOUCH_BEGIN,c.touchBegin,c),c.display.addEventListener(egret.TouchEvent.TOUCH_MOVE,c.touchMove,c),c.display.addEventListener(egret.TouchEvent.TOUCH_END,c.touchEnd,c),c}return __extends(e,t),e.prototype.onDestroy=function(){this.onTap&&this.display.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onTap,this),GameObject.display.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.touchBegin,this),GameObject.display.removeEventListener(egret.TouchEvent.TOUCH_MOVE,this.touchMove,this),GameObject.display.removeEventListener(egret.TouchEvent.TOUCH_END,this.touchEnd,this),this.text&&GameObject.display.removeChild(this.text)},e.prototype.update=function(){var t=this.touch?1.1:1;this.display.scaleX=this.display.scaleY=this.display.scaleX+.25*(t-this.display.scaleX),this.press=!1},e.prototype.touchBegin=function(t){this.x=t.stageX,this.y=t.stageY,this.press=!0,this.touch=!0},e.prototype.touchMove=function(t){this.x=t.stageX,this.y=t.stageY,this.touch=!0},e.prototype.touchEnd=function(t){this.touch=!1},e}(GameObject);__reflect(Button.prototype,"Button");var Dia=function(t){function e(e,i){var s=t.call(this)||this;return s.hit=!1,s.radius=DIA_RADIUS_PER_W*Util.width,s.tx=e,s.setDisplay(e,i),s.setBody(e,i),s.body.angle=.25*Math.PI,s.display.rotation=180*s.body.angle/Math.PI,Camera2D.transform(s.display),s}return __extends(e,t),e.prototype.setDisplay=function(t,e){this.display&&GameObject.display.removeChild(this.display);var i=new egret.Shape;this.display=i,GameObject.display.addChild(this.display),i.x=t,i.y=e,i.graphics.lineStyle(5,DIA_COLOR),i.graphics.drawRect(-this.radius,-this.radius,2*this.radius,2*this.radius)},e.prototype.setBody=function(t,e){this.body=new p2.Body({gravityScale:0,mass:1,position:[this.p2m(t),this.p2m(e)]});var i=this.p2m(2*this.radius);this.body.addShape(new p2.Box({width:i,height:i,collisionGroup:PHYSICS_GROUP_PLAYER,collisionMask:PHYSICS_GROUP_OBSTACLE}),[0,0],0),this.body.displays=[this.display],PhysicsObject.world.addBody(this.body)},e.prototype.fixedUpdate=function(){var t=Util.w(1/4096),e=Util.clamp(this.tx-this.px,-t,+t);this.px+=e,Math.pow(e,2)<Math.pow(t,2)&&(this.tx=Util.w(randF(.4,.6))),Camera2D.transform(this.display),Math.pow(this.body.velocity[0],2)+Math.pow(this.body.velocity[1],2)>0&&this.conflict(null)},e.prototype.conflict=function(t){if(0==this.hit){this.hit=!0,new GameOver,Player.I.setStateNone();var e=2*this.radius*Camera2D.scale;EffectLine.create(this.display.x,this.display.y,e,DIA_COLOR),new EffectCircle(this.display.x,this.display.y,e,DIA_COLOR)}},e}(PhysicsObject);__reflect(Dia.prototype,"Dia");var PIXEL_PER_METER=1,PLAYER_RADIUS_PER_W=1/18,DIA_RADIUS_PER_W=1/28,BLOCK_IN_W=6,BLOCK_IN_H=10,BLOCK_SIZE_PER_W=1/BLOCK_IN_W,PHYSICS_GRAVITY_PER_H=.015,PHYSICS_GROUP_PLAYER=2,PHYSICS_GROUP_OBSTACLE=4,SAVE_KEY_BESTSCORE="guardian-bestScore",BACK_COLOR=61584,FONT_COLOR=16777215,PLAYER_COLOR=16777215,DIA_COLOR=16777215,BLOCK_COLOR=16480,Game=function(){function t(){}return t.loadSceneGamePlay=function(){PhysicsObject.deltaScale=1,new Score,new Player(.5*Util.width,.55*Util.height),new Dia(.5*Util.width,.85*Util.height),new Wave,new StartMessage},t}();__reflect(Game.prototype,"Game");var ObstacleType;!function(t){t[t.Box=0]="Box",t[t.Ball=1]="Ball",t[t.Cross=2]="Cross"}(ObstacleType||(ObstacleType={}));var Obstacle=function(t){function e(i,s,a,o,r,n,h,l){var p=t.call(this)||this;return e.blocks.push(p),p.type=i,p.sizeW=Math.max(o-Util.w(.1*BLOCK_SIZE_PER_W),0),p.sizeH=Math.max(r-Util.w(.1*BLOCK_SIZE_PER_W),0),p.color=BLOCK_COLOR,p.setDisplay(s,a),p.setBody(s,a),p.body.angle=n,p.display.rotation=180*p.body.angle/Math.PI,p.body.velocity[0]=h,p.body.velocity[1]=l+15*Wave.I.speedY,Camera2D.transform(p.display),p}return __extends(e,t),e.newBox=function(t,i,s,a,o,r){return new e(ObstacleType.Box,t,i,Util.w(BLOCK_SIZE_PER_W*s),Util.w(BLOCK_SIZE_PER_W*s),a,o,r)},e.newBar=function(t,i,s,a,o,r){return new e(ObstacleType.Box,t,i,Util.w(2*BLOCK_SIZE_PER_W*s),Util.w(BLOCK_SIZE_PER_W*s),a,o,r)},e.newLong=function(t,i,s,a,o,r){return new e(ObstacleType.Box,t,i,Util.w(3*BLOCK_SIZE_PER_W*s),Util.w(.5*BLOCK_SIZE_PER_W*s),a,o,r)},e.newBall=function(t,i,s,a,o){return new e(ObstacleType.Ball,t,i,Util.w(.5*BLOCK_SIZE_PER_W*s),0,0,a,o)},e.newCross=function(t,i,s,a,o,r){return s*=1/3,new e(ObstacleType.Cross,t,i,Util.w(BLOCK_SIZE_PER_W*s),Util.w(BLOCK_SIZE_PER_W*s),a,o,r)},e.prototype.onDestroy=function(){var t=this;e.blocks=e.blocks.filter(function(e){return e!=t})},e.prototype.setDisplay=function(t,e){this.display&&GameObject.display.removeChild(this.display);var i=new egret.Shape;switch(this.display=i,GameObject.display.addChildAt(this.display,1),i.x=t,i.y=e,i.graphics.beginFill(this.color),i.graphics.drawRect(-.5*this.sizeW,-.5*this.sizeH,this.sizeW,this.sizeH),i.graphics.endFill(),i.graphics.beginFill(this.color),this.type){case ObstacleType.Box:i.graphics.drawRect(-.5*this.sizeW,-.5*this.sizeH,this.sizeW,this.sizeH);break;case ObstacleType.Ball:i.graphics.drawCircle(0,0,this.sizeW);break;case ObstacleType.Cross:i.graphics.drawRect(-1.5*this.sizeW,-.5*this.sizeH,3*this.sizeW,this.sizeH),i.graphics.drawRect(-.5*this.sizeW,-1.5*this.sizeH,this.sizeW,3*this.sizeH)}i.graphics.endFill()},e.prototype.setBody=function(t,e){switch(this.type){case ObstacleType.Box:this.body=new p2.Body({gravityScale:1,mass:1,position:[this.p2m(t),this.p2m(e)]}),this.body.addShape(new p2.Box({width:this.p2m(this.sizeW),height:this.p2m(this.sizeH),collisionGroup:PHYSICS_GROUP_OBSTACLE,collisionMask:PHYSICS_GROUP_PLAYER|PHYSICS_GROUP_OBSTACLE}),[0,0],0);break;case ObstacleType.Ball:this.body=new p2.Body({gravityScale:1,mass:1,position:[this.p2m(t),this.p2m(e)]}),this.body.addShape(new p2.Circle({radius:this.p2m(this.sizeW),collisionGroup:PHYSICS_GROUP_OBSTACLE,collisionMask:PHYSICS_GROUP_PLAYER|PHYSICS_GROUP_OBSTACLE}));break;case ObstacleType.Cross:this.body=new p2.Body({gravityScale:1,mass:1,position:[this.p2m(t),this.p2m(e)]}),this.body.addShape(new p2.Box({width:this.p2m(3*this.sizeW),height:this.p2m(this.sizeH),collisionGroup:PHYSICS_GROUP_OBSTACLE,collisionMask:PHYSICS_GROUP_PLAYER|PHYSICS_GROUP_OBSTACLE}),[0,0],0),this.body.addShape(new p2.Box({width:this.p2m(this.sizeW),height:this.p2m(3*this.sizeH),collisionGroup:PHYSICS_GROUP_OBSTACLE,collisionMask:PHYSICS_GROUP_PLAYER|PHYSICS_GROUP_OBSTACLE}),[0,0],0)}this.body.displays=[this.display],PhysicsObject.world.addBody(this.body)},e.prototype.fixedUpdate=function(){Camera2D.transform(this.display);var t=this.body.boundingRadius;(Math.pow(this.display.x-.5*Util.width,2)>Math.pow(.5*Util.width+t,2)||this.display.y>Util.height+t)&&this.destroy()},e.blocks=[],e}(PhysicsObject);__reflect(Obstacle.prototype,"Obstacle");var Player=function(t){function e(i,s){var a=t.call(this)||this;return a.buttonOffsetX=0,a.buttonOffsetY=0,a.state=a.stateNone,a.step=0,a.scale=1,e.I=a,a.radius=PLAYER_RADIUS_PER_W*Util.width,a.scrollSpeed=Util.height/120,a.setDisplay(i,s),a.setBody(i,s),Camera2D.transform(a.display),a.button=new Button(null,0,0,.5,.5,1,1,0,0,null),a}return __extends(e,t),e.prototype.onDestroy=function(){this.button.destroy(),e.I=null},e.prototype.setDisplay=function(t,e){this.display&&GameObject.display.removeChild(this.display);var i=new egret.Shape;this.display=i,GameObject.display.addChild(this.display),i.x=t,i.y=e,i.graphics.beginFill(PLAYER_COLOR),i.graphics.drawCircle(0,0,this.radius),i.graphics.endFill()},e.prototype.setBody=function(t,e){this.body=new p2.Body({gravityScale:0,mass:1,position:[this.p2m(t),this.p2m(e)],type:p2.Body.STATIC}),this.body.addShape(new p2.Circle({radius:this.p2m(this.radius),collisionGroup:PHYSICS_GROUP_PLAYER,collisionMask:PHYSICS_GROUP_OBSTACLE})),this.body.displays=[this.display],PhysicsObject.world.addBody(this.body)},e.prototype.fixedUpdate=function(){this.state(),this.scale+=.2*(1-this.scale),Camera2D.transform(this.display,this.scale)},e.prototype.setStateNone=function(){this.state=this.stateNone},e.prototype.stateNone=function(){},e.prototype.setStateMove=function(){this.state=this.stateMove,this.step=0},e.prototype.stateMove=function(){var t=this.mx,e=this.my;this.button.press?(this.buttonOffsetX=this.px-this.button.x,this.buttonOffsetY=this.py-this.button.y):(this.px=Util.clamp(this.button.x+this.buttonOffsetX,this.radius,Util.width-this.radius),this.py=Util.clamp(this.button.y+this.buttonOffsetY,this.radius,Util.height-this.radius),this.buttonOffsetX=this.px-this.button.x,this.buttonOffsetY=this.py-this.button.y),this.body.velocity[0]=this.mx-t,this.body.velocity[1]=this.my-e},e.I=null,e}(PhysicsObject);__reflect(Player.prototype,"Player");var Wave=function(t){function e(){var i=t.call(this)||this;return i.scroll=0,i.period=0,i.wave=0,i.map=null,i.mapIndex=0,i.map0=[0,0,0,0,0,0,0,0,1,1,0,0,0,1,0,0,1,0,1,0,0,0,0,1],i.map1=[1,0,1,1,0,1,0,2,0,0,2,0,1,0,1,1,0,1,0,2,0,0,2,0],i.map2=[0,1,1,1,1,0,0,3,0,0,3,0,0,2,0,0,2,0,0,0,1,1,0,0],i.map3=[0,3,0,0,3,0],i.map4=[0,4,4,4,4,0,0,4,4,4,4,0,0,4,4,4,4,0,0,4,4,4,4,0],i.map5=[180228,311300,0,0,278532,147460,122884,0,0,0,0,73732,0,0,0,0,0,0],i.map6=[0,0,0,0,0,0,0,259,0,0,3843,0,0,3,0,0,3,0,0,3843,0,0,259,0,0,0,0,0,0,0],i.map7=[0,524289,0,0,524289,0,786433,0,0,0,0,786433,0,0,0,0,0,0,0,0,0,0,0,0],i.map8=[0,0,0,0,0,0,1027,0,0,0,0,1027,0,0,1025,1025,0,0,0,1027,0,0,1027,0,1027,0,0,0,0,1027,0,0,0,0,0,0],i.map9=[0,513,0,513,0,513,513,0,513,0,513,0,0,513,0,513,0,513,513,0,513,0,513,0],i.mapA=[0,5,0,0,5,0,5,5,5,5,5,5,0,5,0,0,5,0],i.mapB=[0,0,0,0,0,0,0,3653,0,0,581,0,0,0,0,0,0,0],i.mapC=[1,0,0,0,0,0,1,1,0,0,0,0,1,1,1,0,0,0,1,1,1,1,0,0,1,1,1,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0],i.mapD=[2,0,0,0,0,0,0,2,0,0,0,0,0,0,2,0,0,0,0,0,0,2,0,0,0,0,0,0,2,0,0,0,0,0,0,2],i.mapE=[0,0,3,0,0,0,0,0,0,3,0,0,0,0,3,0,0,0,0,0,0,3,0,0],i.mapF=[311301,0,0,0,0,0,0,0,0,0,0,278533,311301,0,0,0,0,0,0,0,0,0,0,278533,311301,0,0,0,0,0,0,0,0,0,0,278533],i.mapG=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,196,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],i.maps=[i.map0,i.map1,i.map2,i.map3,i.map4,i.map5,i.map6,i.map7,i.map8,i.map9,i.mapA,i.mapB,i.mapC,i.mapD,i.mapE,i.mapF,i.mapG],e.I=i,i.random=new Random,i.speedY=Util.height*e.speedMin,i.map=i.maps[i.random.i(0,i.maps.length)],i.mapIndex=i.map.length/BLOCK_IN_W-1,i}return __extends(e,t),e.prototype.update=function(){if(Player.I.state!=Player.I.stateNone){var t=Util.clamp(this.scroll/(10*Util.height),0,1);this.speedY=Util.height*Util.lerp(e.speedMin,e.speedMax,t),this.scroll+=this.speedY,this.period+=this.speedY;var i=Util.height/BLOCK_IN_H;if(this.wave=Math.floor(this.scroll/i),this.period>=i){this.period-=i;for(var s=BLOCK_SIZE_PER_W*Util.width,a=s,o=0;BLOCK_IN_W>o;o++){var r=this.map[this.mapIndex*BLOCK_IN_W+o],n=15&r;if(0!=n){var h=(.5+o)*s,l=-2*a,p=.5*(r>>4&15)+1,c=(r>>8&15)*(2*Math.PI/16),d=(r>>12&15)*(2*Math.PI/16),y=(r>>16&15)*(2*s/15),u=Math.sin(d)*-y,m=Math.cos(d)*y;switch(n){case 1:Obstacle.newBox(h,l,p,c,u,m);break;case 2:Obstacle.newBar(h,l,p,c,u,m);break;case 3:Obstacle.newLong(h,l,p,c,u,m);break;case 4:Obstacle.newBall(h,l,p,u,m);break;case 5:Obstacle.newCross(h,l,p,c,u,m)}}}--this.mapIndex<0&&(this.map=this.maps[this.random.i(0,this.maps.length)],this.mapIndex=this.map.length/BLOCK_IN_W-1,this.period-=i*Util.lerp(8,1,t))}}},e.I=null,e.speedMin=1/600,e.speedMax=1/120,e}(GameObject);__reflect(Wave.prototype,"Wave");var EffectCircle=function(t){function e(i,s,a,o){void 0===o&&(o=16760832);var r=t.call(this)||this;return r.frame=e.maxFrame,r.radius=a,r.color=o,r.setShape(i,s,r.radius),r}return __extends(e,t),e.prototype.setShape=function(t,i,s){var a=new egret.Shape;this.display&&GameObject.display.removeChild(this.display),this.display=a,GameObject.display.addChild(this.display),a.x=t,a.y=i,a.graphics.lineStyle(3+10*(this.frame/e.maxFrame),this.color),a.graphics.drawCircle(0,0,s)},e.prototype.update=function(){return--this.frame<=0?void this.destroy():(this.radius*=1.03,void this.setShape(this.display.x,this.display.y,this.radius))},e.maxFrame=30,e}(GameObject);__reflect(EffectCircle.prototype,"EffectCircle");var Camera2D=function(){function t(){}return t.initial=function(){t.x=0,t.y=0,t.scale=1},t.transform=function(e,i){void 0===i&&(i=1),e.x=t.transX(e.x),e.y=t.transY(e.y),e.scaleX=e.scaleY=t.scale*i},t.transX=function(e){return(e-t.x)*t.scale},t.transY=function(e){return(e-t.y)*t.scale},t.x=0,t.y=0,t.scale=1,t}();__reflect(Camera2D.prototype,"Camera2D");var Main=function(t){function e(){var e=t.call(this)||this;return e.once(egret.Event.ADDED_TO_STAGE,e.addToStage,e),e}return __extends(e,t),e.prototype.addToStage=function(){Util.init(this),GameObject.initial(this.stage),PhysicsObject.prepare(PIXEL_PER_METER),Camera2D.initial(),Game.loadSceneGamePlay(),egret.startTick(this.tickLoop,this)},e.prototype.tickLoop=function(t){return PhysicsObject.progress(),GameObject.process(),!1},e}(eui.UILayer);__reflect(Main.prototype,"Main");var EffectLine=function(t){function e(e,i,s,a,o){void 0===o&&(o=16760832);var r=t.call(this)||this;return r.frame=0,r.x=e,r.y=i,r.vx=s,r.vy=a,r.color=o,r.setShape(.01),r}return __extends(e,t),e.create=function(t,i,s,a,o){void 0===o&&(o=4);for(var r=0;o>r;r++){var n=rand()*Math.PI*2,h=Math.cos(n),l=-Math.sin(n),p=s*(2+r);new e(t+h*s,i+l*s,h*p,l*p,a)}},e.prototype.setShape=function(t){var e=new egret.Shape;this.display&&GameObject.display.removeChild(this.display),this.display=e,GameObject.display.addChild(this.display),t=t*Math.PI*.5;var i=Math.sin(t),s=1-Math.cos(t);e.graphics.lineStyle(6,this.color),e.graphics.moveTo(this.x+this.vx*i,this.y+this.vy*i),e.graphics.lineTo(this.x+this.vx*s,this.y+this.vy*s)},e.prototype.update=function(){if(++this.frame>=e.maxFrame)return void this.destroy();var t=this.frame/e.maxFrame;this.setShape(t)},e.maxFrame=30,e}(GameObject);__reflect(EffectLine.prototype,"EffectLine");var Random=function(){function t(e){void 0===e&&(e=Math.floor(Math.random()*t.max)),this.x=123456789,this.y=362436069,this.z=521288629,this.w=e}return t.prototype.v=function(){return(this.next()&t.max)/(t.max+1)},t.prototype.f=function(t,e){return t+this.v()*(e-t)},t.prototype.i=function(t,e){return Math.floor(this.f(t,e))},t.prototype.bool=function(){return 0!=(1&this.next())},t.prototype.next=function(){var t;return t=this.x^this.x<<11,this.x=this.y,this.y=this.z,this.z=this.w,this.w=this.w^this.w>>>19^(t^t>>>8)},t.max=268435455,t}();__reflect(Random.prototype,"Random");var globalRandom=new Random,Util=function(){function t(){}return t.w=function(e){return e*t.width},t.h=function(e){return e*t.height},t.init=function(t){this.width=t.stage.stageWidth,this.height=t.stage.stageHeight},t.clamp=function(t,e,i){return e>t&&(t=e),t>i&&(t=i),t},t.lerp=function(t,e,i){return t+(e-t)*i},t.color=function(t,e,i){return 65536*Math.floor(255*t)+256*Math.floor(255*e)+Math.floor(255*i)},t.colorLerp=function(t,e,i){var s=1-i,a=((16711680&t)*s+(16711680&e)*i&16711680)+((65280&t)*s+(65280&e)*i&65280)+((255&t)*s+(255&e)*i&255);return a},t.newTextField=function(e,i,s,a,o,r,n){var h=new egret.TextField;return h.text=e,h.bold=r,h.size=i,h.textColor=s,n?(h.x=(t.width-h.width)*a,h.y=(t.height-h.height)*o):(h.x=t.width*a-.5*h.width,h.y=t.height*o-.5*h.height),h},t}();__reflect(Util.prototype,"Util");var GameOver=function(t){function e(){var e=t.call(this)||this;return e.textGameOver=null,e.textScore=null,e.retryButton=null,e.step=0,e.fadeInFrame=60,e.textGameOver=Util.newTextField("GAME OVER",Util.width/10,FONT_COLOR,.5,.4,!0,!1),GameObject.display.addChild(e.textGameOver),Score.I&&(Score.I.point>=Score.I.bestScore&&egret.localStorage.setItem(SAVE_KEY_BESTSCORE,Score.I.point.toFixed()),e.textScore=Util.newTextField("SCORE : "+Score.I.point.toFixed(),Util.width/14,FONT_COLOR,.5,.5,!0,!1),GameObject.display.addChild(e.textScore)),e}return __extends(e,t),e.prototype.onDestroy=function(){GameObject.display.removeChild(this.textGameOver),this.textGameOver=null,this.textScore&&(GameObject.display.removeChild(this.textScore),this.textScore=null)},e.prototype.update=function(){if(this.step<this.fadeInFrame){this.step++;var t=this.step/this.fadeInFrame;this.textGameOver.alpha=t,this.textScore.alpha=t,this.step==this.fadeInFrame&&(this.retryButton=new Button("リトライ",Util.width/16,BACK_COLOR,.5,.65,.4,.1,FONT_COLOR,1,this.onTapRetry))}},e.prototype.onTapRetry=function(){GameObject.transit=Game.loadSceneGamePlay,this.destroy()},e}(GameObject);__reflect(GameOver.prototype,"GameOver");var Score=function(t){function e(){var i=t.call(this)||this;i.point=0,i.bestScore=0,i.text=null,i.textBest=null,e.I=i,i.point=0,i.text=Util.newTextField("0",Util.width/22,FONT_COLOR,.5,0,!0,!0),GameObject.display.addChild(i.text);var s=egret.localStorage.getItem(SAVE_KEY_BESTSCORE);return null==s&&(s="15",egret.localStorage.setItem(SAVE_KEY_BESTSCORE,s)),i.bestScore=parseInt(s),i.textBest=Util.newTextField("BEST:"+s,Util.width/22,FONT_COLOR,0,0,!0,!0),GameObject.display.addChild(i.textBest),i}return __extends(e,t),e.prototype.onDestroy=function(){GameObject.display.removeChild(this.text),this.text=null,GameObject.display.removeChild(this.textBest),this.textBest=null,e.I=null},e.prototype.update=function(){if(Player.I.state!=Player.I.stateNone){var t=Wave.I.wave;this.point<t&&(this.point=t,this.text.text=""+this.point.toFixed(),this.bestScore<this.point&&(this.bestScore=this.point,this.textBest.text="BEST:"+this.point.toFixed()))}},e.I=null,e}(GameObject);__reflect(Score.prototype,"Score");var StartMessage=function(t){function e(){var e=t.call(this)||this;return e.texts=[],e.texts[0]=Util.newTextField("ガードマン",Util.width/12,FONT_COLOR,.5,.3,!0,!1),e.texts[1]=Util.newTextField("ボールを動かして◇を守れ！",Util.width/18,FONT_COLOR,.5,.4,!0,!1),e.texts.forEach(function(t){GameObject.display.addChild(t)}),GameObject.display.once(egret.TouchEvent.TOUCH_BEGIN,e.tap,e),e}return __extends(e,t),e.prototype.onDestroy=function(){this.texts.forEach(function(t){GameObject.display.removeChild(t)}),this.texts=null},e.prototype.update=function(){},e.prototype.tap=function(t){Player.I.setStateMove(),this.destroy()},e}(GameObject);__reflect(StartMessage.prototype,"StartMessage");