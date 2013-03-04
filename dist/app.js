define("#mix/sln/0.2.0/modules/gesture",["mix/core/0.3.0/base/reset","mix/core/0.3.0/base/class"],function(a){function h(a,b,c,d,e,f,g,h){var i=Math.atan2(h-f,g-e)-Math.atan2(d-b,c-a),j=Math.sqrt((Math.pow(h-f,2)+Math.pow(g-e,2))/(Math.pow(d-b,2)+Math.pow(c-a,2))),k=[e-j*a*Math.cos(i)+j*b*Math.sin(i),f-j*b*Math.cos(i)-j*a*Math.sin(i)];return{rotate:i,scale:j,translate:k,matrix:[[j*Math.cos(i),-j*Math.sin(i),k[0]],[j*Math.sin(i),j*Math.cos(i),k[1]],[0,0,1]]}}function i(a,b,c){var d=document.createEvent("HTMLEvents");return d.initEvent(a,!0,!0),b&&(c?Object.each(c,function(a){d[a]=b[a]}):Object.extend(d,b)),d}a("mix/core/0.3.0/base/reset");var d=window,e=d.document,f=["screenX","screenY","clientX","clientY","pageX","pageY"],g=a("mix/core/0.3.0/base/class"),j=g.create({initialize:function(a){var b=this;b._el=a,b._myGestures={},b._lastTapTime=0/0,b._onStart=b._onStart.bind(b),b._onDoing=b._onDoing.bind(b),b._onEnd=b._onEnd.bind(b),b._onTap=b._onTap.bind(b)},getElement:function(){return that._el},enable:function(){var a=this,b=a._el;b.addEventListener("touchstart",a._onStart,!1),b.addEventListener("tap",a._onTap,!1)},disable:function(){var a=this,b=a._el;b.removeEventListener("touchstart",a._onStart,!1),b.removeEventListener("tap",a._onTap,!1)},_onStart:function(a){var b=this,c=b._el,d=b._myGestures;if(0===Object.keys(d).length&&(e.body.addEventListener("touchmove",b._onDoing,!1),e.body.addEventListener("touchend",b._onEnd,!1)),Object.each(a.changedTouches,function(a){var b={};for(var e in a)b[e]=a[e];var f={startTouch:b,startTime:Date.now(),status:"tapping",pressingHandler:setTimeout(function(){if("tapping"===f.status){f.status="pressing";var a=i("press",b);c.dispatchEvent(a)}clearTimeout(f.pressingHandler),f.pressingHandler=null},500)};d[a.identifier]=f}),2==Object.keys(d).length){var f=i("dualtouchstart");f.touches=JSON.parse(JSON.stringify(a.touches)),c.dispatchEvent(f)}},_onDoing:function(a){var b=this,c=b._el,d=b._myGestures;if(Object.each(a.changedTouches,function(a){var e,g,h,j,b=d[a.identifier];b&&(e=a.clientX-b.startTouch.clientX,g=a.clientY-b.startTouch.clientY,h=Math.sqrt(Math.pow(e,2)+Math.pow(g,2)),"tapping"==b.status&&h>10&&(b.status="panning",j=i("panstart",a,f),c.dispatchEvent(j)),"panning"==b.status&&(j=i("pan",a,f),j.displacementX=e,j.displacementY=g,c.dispatchEvent(j)))}),2==Object.keys(d).length){var j,k,e=[],g=[];Object.each(a.touchs,function(a){var b;(b=d[a.identifier])&&(e.push([b.startTouch.clientX,b.startTouch.clientY]),g.push([a.clientX,a.clientY]))}),j=h(e[0][0],e[0][1],e[1][0],e[1][1],g[0][0],g[0][1],g[1][0],g[1][1]),k=i("dualtouch",j),k.touches=JSON.parse(JSON.stringify(a.touches)),c.dispatchEvent(k)}},_onEnd:function(a){var g,b=this,c=b._el,d=b._myGestures;2==Object.keys(d).length&&(g=i("dualtouchend"),g.touches=JSON.parse(JSON.stringify(a.touches)),c.dispatchEvent(g));for(var h=0;a.changedTouches.length>h;h++){var j=a.changedTouches[h],k=j.identifier,l=d[k];if(l){if(l.pressingHandler&&(clearTimeout(l.pressingHandler),l.pressingHandler=null),"tapping"===l.status&&(g=i("tap",j,f),c.dispatchEvent(g)),"panning"===l.status){g=i("panend",j,f),c.dispatchEvent(g);var m=Date.now()-l.startTime;300>m&&(g=i("flick",j,f),g.duration=m,g.valocityX=(j.clientX-l.startTouch.clientX)/m,g.valocityY=(j.clientY-l.startTouch.clientY)/m,g.displacementX=j.clientX-l.startTouch.clientX,g.displacementY=j.clientY-l.startTouch.clientY,c.dispatchEvent(g))}"pressing"===l.status&&(g=i("pressend",j,f),c.dispatchEvent(g)),delete d[k]}}0==Object.keys(d).length&&(e.body.removeEventListener("touchend",b._onEnd),e.body.removeEventListener("touchmove",b._onDoing))},_onTap:function(a){var b=this,c=b._el,d=b._lastTapTime;if(500>Date.now()-d){var e=document.createEvent("HTMLEvents");e.initEvent("doubletap",!0,!0),Object.each(f,function(b){e[b]=a[b]}),c.dispatchEvent(e)}b._lastTapTime=Date.now()}});return j}),define("#mix/sln/0.2.0/modules/transform",[],function(a,b){function k(a,b){return[[(a/3+(a+b)/3-a)/(b-a),(a*a/3+2*a*b/3-a*a)/(b*b-a*a)],[(b/3+(a+b)/3-a)/(b-a),(b*b/3+2*a*b/3-a*a)/(b*b-a*a)]]}function l(a){var b,c;if(b=getComputedStyle(a).webkitTransform,"none"!==b){if(c=b.match(d))return parseInt(c[1])||0;if(c=b.match(e))return parseInt(c[1])||0}return 0}function m(a){var b,c;if(b=getComputedStyle(a).webkitTransform,"none"!==b){if(c=b.match(d))return parseInt(c[2])||0;if(c=b.match(e))return parseInt(c[2])||0}return 0}function n(a,b){return a+="",b+="",0>a.indexOf("%")&&"0"!==a&&(a+="px"),0>b.indexOf("%")&&"0"!==b&&(b+="px"),i&&j?"translate3d("+a+", "+b+", 0)":"translate("+a+", "+b+")"}function o(a,b,c){function e(b){d||b&&(b.srcElement!==a||b.propertyName!==f)||(d=!0,a.style.webkitTransition="none",a.removeEventListener("webkitTransitionEnd",e,!1),c&&setTimeout(c,50))}var d=!1;a.addEventListener("webkitTransitionEnd",e,!1),setTimeout(e,1e3*parseFloat(b))}function p(a,b,c,d,e,g,h){o(a,b,h),a.style.webkitTransition=[f,b,c,d].join(" "),a.style.webkitTransform=n(e,g)}var d=/^matrix3d\(\d+, \d+, \d+, \d+, \d+, \d+, \d+, \d+, \d+, \d+, \d+, \d+, ([\d-]+), ([-\d]+), [\d-]+, \d+\)/,e=/^matrix\(\d+, \d+, \d+, \d+, ([-\d]+), ([-\d]+)\)$/,f="-webkit-transform",g=navigator.appVersion,i=(/android/gi.test(g),/iphone|ipad/gi.test(g)),j="WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix;b.getY=m,b.getX=l,b.getTranslate=n,b.getBezier=k,b.start=p}),define("#mix/sln/0.2.0/modules/scroll",["./gesture","./transform","mix/core/0.3.0/base/reset","mix/core/0.3.0/base/class"],function(a){function k(a){var b=a.parentNode,c=getComputedStyle(b),d=0-a.scrollHeight+b.offsetHeight-parseInt(c.paddingTop)-parseInt(c.paddingBottom);return d>0&&(d=0),d}a("mix/core/0.3.0/base/reset");var d=window,e=d.document,g=(d.navigator,a("mix/core/0.3.0/base/class")),h=a("./gesture"),i=a("./transform"),j=!1,l=g.create({initialize:function(a){var b=this;b._wrap=a,b._scroller=a.children[0],b._gesture=new h(b._scroller),b._originalY=null,b._scrollTop=null,b._scrollHeight=null,b._refreshed=!1,b._preventBodyTouch=b._preventBodyTouch.bind(b),b._onTouchStart=b._onTouchStart.bind(b),b._onPanStart=b._onPanStart.bind(b),b._onPan=b._onPan.bind(b),b._onPanEnd=b._onPanEnd.bind(b),b._onFlick=b._onFlick.bind(b)},enable:function(){var a=this,b=a._scroller;a._gesture.enable(),b.addEventListener("touchstart",a._onTouchStart,!1),b.addEventListener("panstart",a._onPanStart,!1),b.addEventListener("pan",a._onPan,!1),b.addEventListener("panend",a._onPanEnd,!1),b.addEventListener("flick",a._onFlick,!1),j||(j=!0,e.body.addEventListener("touchmove",a._preventBodyTouch,!1))},disable:function(){var a=this,b=a._scroller;a._gesture.disable(),b.removeEventListener("touchstart",a._onTouchStart,!1),b.removeEventListener("panstart",a._onPanStart,!1),b.removeEventListener("pan",a._onPan,!1),b.removeEventListener("panend",a._onPanEnd,!1),b.removeEventListener("flick",a._onFlick,!1),j&&(j=!1,e.body.removeEventListener("touchmove",a._preventBodyTouch,!1))},refresh:function(){this._refreshed=!0},_preventBodyTouch:function(a){return a.preventDefault(),!1},_onTouchStart:function(){var b=this,c=b._scroller;c.style.webkitTransition="none",c.style.webkitTransform=getComputedStyle(c).webkitTransform,b._refreshed&&(b._refreshed=!1,c.style.height="auto",c.style.height=b._scrollHeight=c.offsetHeight+"px")},_onPanStart:function(){var b=this,c=b._scroller;b._originalY=i.getY(c)},_onPan:function(a){var b=this,c=b._scroller,d=k(c),e=b._originalY,f=b._scrollTop=e+a.displacementY;c.style.webkitTransform=f>0?i.getTranslate(0,f/2):d>f?i.getTranslate(0,(d-f)/2+f):i.getTranslate(0,f)},_onPanEnd:function(){var b=this,c=b._scroller,d=b._scrollTop,e=k(c),f=null;d>0&&(d=f=0),e>d&&(d=f=e),null!=f&&i.start(c,"0.4s","ease-out","0s",0,f)},_onFlick:function(a){var b=this,c=b._scroller,d=b._scrollTop,e=k(c);if(!(e>d||d>0)){var f=i.getY(c),g=a.valocityY;g>1.5&&(g=1.5),-1.5>g&&(g=-1.5);var h=.0015*(g/Math.abs(g)),j=g/h,l=f+j*g/2;if(l>0||e>l){var m=l>0?1:-1,n=l>0?0:e;l=(l-n)/2+n,j=(m*Math.sqrt(2*h*(l-f)+g*g)-g)/h,v=g-h*j,i.start(c,j.toFixed(0)+"ms","cubic-bezier("+i.getBezier(-g/h,-g/h+j)+")","0s",0,l.toFixed(0),function(){g=v,f=l,h=.0045*(g/Math.abs(g)),j=-g/h,l=n,i.start(c,(0-j).toFixed(0)+"ms","cubic-bezier("+i.getBezier(-j,0)+")","0s",0,l.toFixed(0))})}else i.start(c,j.toFixed(0)+"ms","cubic-bezier("+i.getBezier(-j,0)+")","0s",0,l.toFixed(0))}}});return l}),define("#mix/sln/0.2.0/modules/page",["mix/core/0.3.0/base/reset","mix/core/0.3.0/base/class","mix/core/0.3.0/base/message","mix/core/0.3.0/url/navigate"],function(a){a("mix/core/0.3.0/base/reset");var d=window,f=(d.document,a("mix/core/0.3.0/base/class")),g=a("mix/core/0.3.0/base/message"),i=(a("mix/core/0.3.0/url/navigate").singleton,{UNKOWN:0,UNLOADED:0,READY:1,COMPILED:2}),j=f.create({Implements:g,initialize:function(a){var b=this,c=b.name;g.prototype.initialize.call(b,"app."+c),b._options=a,b.status=i.UNKOWN,b.ready=b.ready.bind(b),b.unload=b.unload.bind(b),b.on("ready",b.ready),b.on("unloaded",b.unload)},getTitle:function(){return this.title},loadTemplate:function(a,b){var c=this;1===arguments.length&&(b=arguments[0],a=c.template),a&&app.loadFile(a,b)},compileTemplate:function(a,b){var e,c=this;(e=d.Mustache)&&(c.compiledTemplate=e.compile(a),b(c.compiledTemplate))},renderTemplate:function(a,b){var c=this,d=c.compiledTemplate,e=d(a);b(e)},ready:function(){},unload:function(){}});return j.STATUS=i,j}),define("#mix/sln/0.2.0/components/xBase",["mix/core/0.3.0/base/reset","mix/core/0.3.0/base/class"],function(a){function i(a,b,c){var d,i,j,k,l,m,n;return 2===arguments.length&&(c=b,b=a),c.hasOwnProperty("Implements")&&(i=c.Implements,delete c.Implments),c.hasOwnProperty("init")&&(d=c.init,delete c.init),c.hasOwnProperty("enable")&&(j=c.enable,delete c.enable),c.hasOwnProperty("disable")&&(k=c.disable,delete c.disable),l=Object.extend({Extends:h,Implements:i,initialize:function(b){var c=this;m.superclass.initialize.call(c,a,b),d&&d.call(c)}},c),j&&(l.enable=function(){var a;return m.superclass.enable.call(this)&&(a=j.call(this),null==a||(a=!0)),a}),k&&(l.disable=function(){var a;return m.superclass.disable.call(this)&&(a=k.call(this),null==a||(a=!0)),a}),m=f.create(l),n=g[a]={name:a,klass:m,count:0,instances:[],map:{}},m.create=function(c){var g,d=a+"-"+Date.now()+"-"+(n.count+1),e=n.instances,f=n.map;return c.setAttribute("cid",d),c.className+=(c.className?" ":"")+b,g=new m(c),e.push(g),f[d]=e.length-1,g},m}function j(a){var b,c,d;return(d=a.match(/^(x-[^-]+)/))&&(b=d[1]),c=g[b],a===b?c.instances:c.instances[c.map[a]]}function k(){Object.each(g,function(a,b){var c=e.querySelectorAll('*[is="'+b+'"]');Object.each(c,function(b){b.getAttribute("cid")||a.klass.create(b).enable()})})}a("mix/core/0.3.0/base/reset");var d=window,e=d.document,f=a("mix/core/0.3.0/base/class"),g={},h=f.create({initialize:function(a,b){var c=this;c._name=a,c._module=b,c._isEnable=!1},getModule:function(){return this._module},enable:function(){var a=this,b=a._module;return b&&!a._isEnabled?(a._isEnabled=!0,!0):void 0},disable:function(){var a=this,b=a._module;return b&&a._isEnabled?(a._isEnabled=!1,!0):void 0}});return h.create=i,h.get=j,h.parse=k,h}),define("#mix/sln/0.2.0/components/xBack",["./xBase","mix/core/0.3.0/base/reset","mix/core/0.3.0/base/class","mix/core/0.3.0/base/util","mix/core/0.3.0/url/navigate"],function(a){a("mix/core/0.3.0/base/reset");var e=(a("mix/core/0.3.0/base/class"),a("mix/core/0.3.0/base/util").singleton),f=a("mix/core/0.3.0/url/navigate").singleton,g=a("./xBase"),h="x-back",i="x-button "+h,j=g.create(h,i,{init:function(){var a=this;a._isAutoHide=!1,a._changeVisibility=a._changeVisibility.bind(a),a._clickHandler=a._clickHandler.bind(a)},enable:function(){var a=this,b=a._module,c=e.str2val(b.getAttribute("autoHide"));b.addEventListener("click",a._clickHandler,!1),a.autoHide(c)},disable:function(){var a=this,b=a._module;b.removeEventListener("click",a._clickHandler,!1),a.autoHide(!1)},autoHide:function(a){var b=this,c=b._module;c&&b._isAutoHide!==a&&(a?f.on("forward backward",b._changeVisibility):f.off("forward backward",b._changeVisibility),b._isAutoHide=a,b._changeVisibility())},setText:function(a){var b=this,c=b._module;c.innerText=a},_clickHandler:function(a){return f.backward(),a.preventDefault(),!1},_changeVisibility:function(){var a=this,b=a._module,c=a._isEnabled,d=1>f.getStateIndex()&&c?"hidden":"";b.style.visibility!==d&&(b.style.visibility=d)}});return j}),define("#mix/sln/0.2.0/components/xScroll",["../modules/scroll","../modules/gesture","../modules/transform","./xBase","mix/core/0.3.0/base/reset","mix/core/0.3.0/base/class","mix/core/0.3.0/url/navigate"],function(a){a("mix/core/0.3.0/base/reset");var d=window,e=d.document,h=(a("mix/core/0.3.0/base/class"),a("mix/core/0.3.0/url/navigate").singleton,a("../modules/scroll")),i=a("./xBase"),j="x-scroll",k=j,l=i.create(j,k,{init:function(){var a=this,b=a._module,c=b.children[0];c||(c=e.createElement("div"),b.appendChild(c)),a._scroller=new h(b)},enable:function(){var a=this,b=a._scroller;b.enable()},disable:function(){var a=this,b=a._scroller;b.disable()},refresh:function(){var a=this,b=a._scroller;b.refresh()},getViewport:function(){return this._module.children[0]},getScrollHeight:function(){var a=this,b=a._scroller;return b._scrollHeight},getScrollTop:function(){var a=this,b=a._scroller;return b._scrollTop},scrollTo:function(){var b=this,c=b._module;c.children[0]},scrollToElement:function(){var b=this,c=b._module;c.children[0]}});return l}),define("#mix/sln/0.2.0/components/xTransition",["../modules/transform","./xBase","mix/core/0.3.0/base/reset","mix/core/0.3.0/base/class","mix/core/0.3.0/base/message","mix/core/0.3.0/url/navigate"],function(a){a("mix/core/0.3.0/base/reset");var d=window,e=d.document,g=(a("mix/core/0.3.0/base/class"),a("mix/core/0.3.0/base/message")),i=(a("mix/core/0.3.0/url/navigate").singleton,a("../modules/transform"));return xBase=a("./xBase"),xName="x-transition",className=xName,xTransition=xBase.create(xName,className,{Implements:g,init:function(){var f,h,a=this,b=a._module,c=b.innerHTML,d=b.children[0];g.prototype.initialize.call(a,"transition"),d||(d=e.createElement("div"),b.appendChild(d)),f=a._activePort=e.createElement("div"),h=a._inactivePort=e.createElement("div"),f.className="active",h.className="inactive",f.innerHTML=c,d.innerHTML="",d.appendChild(f),d.appendChild(h)},getViewport:function(){var a=this;return a._activePort},action:function(a){var h,j,b=this,c=b._isEnabled,d=b._module,e=d.children[0],f=b._activePort,g=b._inactivePort;b._activePort=g,b._inactivePort=f,g.innerHTML="",c?(j=i.getY(e),h=("forward"===a?"-":"")+"33.33%",i.start(e,"0.4s","ease",0,h,j,function(){e.style.webkitTransform=i.getTranslate(0,0),g.className="active",f.className="inactive",b.trigger(a+"TransitionEnd")})):(g.className="active",f.className="inactive")},forward:function(){this.action("forward")},backward:function(){this.action("backward")}}),xTransition}),define("#mix/sln/0.2.0/components/xTitlebar",["./xBase","./xBack","mix/core/0.3.0/base/reset","mix/core/0.3.0/base/class","mix/core/0.3.0/base/util","mix/core/0.3.0/url/navigate"],function(a){function l(a,b){if(null!=b){var c=Object.isTypeof(b);"string"===c?a.innerHTML=b:("array"!==c&&(b=[b]),a.innerHTML="",Object.each(b,function(b){a.appendChild(b)}))}}a("mix/core/0.3.0/base/reset");var d=window,e=d.document,g=(a("mix/core/0.3.0/base/class"),a("./xBase")),h=a("./xBack"),i="x-titlebar",j=i,k=g.create(i,j,{init:function(){var c,d,f,g,h,a=this,b=a._module;c=e.createElement("div"),d=e.createElement("section"),f=e.createElement("section"),g=e.createElement("section"),h=e.createElement("button"),f.appendChild(h),c.appendChild(d),c.appendChild(f),c.appendChild(g),b.appendChild(c)},enable:function(){var a=this,b=a._module,c=b.querySelector("div > section:nth-child(2) button");a.xback=h.create(c),a.xback.enable()},disable:function(){var a=this;a.xback.disable()},change:function(a,b){function g(){f.className="",f.removeEventListener("webkitTransitionEnd",g)}var c=this,d=c._isEnabled,e=c._module,f=e.querySelector("div");d&&(f.className=b,c.set(a),setTimeout(function(){f.className+=" transition",f.addEventListener("webkitTransitionEnd",g,!1)},1))},set:function(a){var b=this,c=b._isEnabled,d=b._module,e=d.querySelector("div > section:first-child"),f=d.querySelector("div > section:nth-child(2)"),g=d.querySelector("div > section:last-child");c&&(l(e,a.center),l(f,a.left),l(g,a.right))}});return k}),define("#mix/sln/0.2.0/components/xViewport",["./xBase","./xTitlebar","./xBack","./xScroll","../modules/scroll","../modules/gesture","../modules/transform","./xTransition","mix/core/0.3.0/base/reset","mix/core/0.3.0/base/class","mix/core/0.3.0/url/navigate","mix/core/0.3.0/base/util","mix/core/0.3.0/base/message"],function(a,b,c){a("mix/core/0.3.0/base/reset");var d=window,e=d.document,h=(a("mix/core/0.3.0/base/class"),a("mix/core/0.3.0/url/navigate").singleton,a("mix/core/0.3.0/base/util").singleton),i=a("./xBase"),j=a("./xTitlebar"),k=a("./xScroll"),l=a("./xTransition"),m="x-viewport",n=m,o=i.create(m,n,{init:function(){var c,d,f,g,a=this,b=a._module;a._isEnableTitlebar=!1,a._isEnableScroll=!1,a._isEnableTransition=!1,c=e.createElement("header"),d=e.createElement("section"),f=e.createElement("footer"),g=e.createElement("div"),d.appendChild(g),b.appendChild(c),b.appendChild(d),b.appendChild(f),a.xtitlebar=j.create(c),a.xscroll=k.create(d),a.xtransition=l.create(d)},enable:function(){var a=this,b=a._module;a._isEnableTitlebar=h.str2val(b.getAttribute("enableTitlebar")),a._isEnableScroll=h.str2val(b.getAttribute("enableScroll")),a._isEnableTransition=h.str2val(b.getAttribute("enableTransition")),a._isEnableTitlebar&&(b.className+=" enableTitlebar",a.xtitlebar.enable()),a._isEnableScroll&&(b.className+=" enableScroll",a.xscroll.enable()),a._isEnableTransition&&(b.className+=" enableTransition",a.xtransition.enable())},disable:function(){var a=this,f=(a.xtitlebar,a.xscroll,a.xtransition,a._isEnableTitlebar);isEnableScroll=a._isEnableScroll,isEnableTransition=a._isEnableTransition,f&&(c.className=c.className.replace("enableTitlebar",""),a.xtitlebar.disable()),isEnableScroll&&(c.className=c.className.replace("enableScroll",""),a.xscroll.disable()),isEnableTransition&&(c.className=c.className.replace("enableTransition",""),a.xtransition.disable()),c.className=c.className.replace(/\s{2,}/,"")},getViewport:function(){var a=this;return a._module,a.xtransition.getViewport()}});return o}),define("#mix/sln/0.2.0/controllers/cNavigation",["../modules/page","mix/core/0.3.0/base/reset","mix/core/0.3.0/base/class","mix/core/0.3.0/url/navigate","mix/core/0.3.0/base/message"],function(a){a("mix/core/0.3.0/base/reset");var d=window,f=(d.document,a("mix/core/0.3.0/base/class")),g=a("mix/core/0.3.0/url/navigate").singleton,h=a("../modules/page"),i={},j=h.STATUS,k=f.create({initialize:function(a){var b=this,c=a.name.split(".");b.appName=c[0],b.routeName=c[1],b.state=a},getParameter:function(a){return this.state.params[a]},getArgument:function(a){return this.state.args[a]},getData:function(a){return this.state.datas[a]},push:function(a,b){g.forward(a,b)},pull:function(){g.backward()},fill:function(a,b){function e(){c.renderTemplate(a,function(a){app.fillViewport(a),d.xscroll&&d.xscroll.refresh(),b&&b()})}var c=i[this.appName],d=app.queryComponent('*[is="x-viewport"]');c.compiledTemplate?e():c.once("compiled",e)},ready:function(){var a=i[this.appName];a.status<j.READY&&(a.status=j.READY,a.trigger("ready",this))},compile:function(){function b(){a.status<j.COMPILED&&(a.status=j.COMPILED,a.trigger("compiled"))}var a=i[this.appName];a.compiledTemplate?b():a.loadTemplate(function(c){a.compileTemplate(c,function(){b()})})},unload:function(){var a=this,b=i[a.appName];b.status>j.UNLOADED&&(b.status=j.UNLOADED,b.trigger("unloaded"))}});return k.addPage=function(a){var b=a.name,c=a.route;Object.isTypeof(c,"string")&&(c={name:"anonymous",text:c}),g.addRoute(b+"."+c.name,c.text,c),i[b]=a},k.getPage=function(a){return i[a]},k.listen=function(a){g.on("forward backward",a)},k}),define("#mix/sln/0.2.0/app",["./modules/page","./controllers/cNavigation","./components/xBase","./components/xBack","./components/xScroll","./modules/scroll","./modules/gesture","./modules/transform","./components/xTransition","./components/xTitlebar","./components/xViewport","mix/core/0.3.0/base/reset","mix/core/0.3.0/base/class","mix/core/0.3.0/url/router","mix/core/0.3.0/base/message","mix/core/0.3.0/url/navigate","mix/core/0.3.0/base/util","mix/sln/0.2.0/app"],function(a){function q(){function e(a){var b=[];return Object.each(a,function(a){var d,c=a.type;switch(c){case"backStack":xback.setText(a.text),xback.autoHide(a.autoHide);break;case"rightExtra":d=document.createElement("button"),d.className="x-button",d.innerText=a.text,d.addEventListener("click",a.handler,!1),b.push(d);break;default:}}),b}function f(a){var b=a.appName,d=a.state.transition,f=p.getPage(b),g=f.getTitle(),h=e(f.buttons);c.change({center:g,right:h},d)}function g(a){var b=a.state.transition;d[b]()}function h(b){a&&a.unload(),a=b,b.ready(),b.compile()}function j(a){var b=new i(a);g(b),h(b),f(b)}var a,b=p.queryComponent('*[is="x-viewport"]'),c=b.xtitlebar,d=b.xtransition;xback=c.xback,i.listen(j)}a("mix/core/0.3.0/base/reset");var d=window,e=d.document,g=(a("mix/core/0.3.0/base/class"),a("mix/core/0.3.0/url/router").singleton),h=a("./modules/page"),i=a("./controllers/cNavigation"),j=a("./components/xBase"),p=(a("./components/xBack"),a("./components/xScroll"),a("./components/xTransition"),a("./components/xTitlebar"),a("./components/xViewport"),{theme:"ios",routePrefix:0,routePrefixSep:"/"});Object.extend(p,{init:function(a){var b=h.extend(a),c=new b({routePrefix:p.routePrefix,routePrefixSep:p.routePrefixSep});return i.addPage(c),c},getPage:function(a){return i.getPage(a)},getViewport:function(){return this.queryComponent('*[is="x-viewport"]').getViewport()},fillViewport:function(a){var b=this,c=b.getViewport();c.innerHTML=a},getComponent:function(a){return arguments[0]instanceof HTMLElement&&(a=arguments[0].getAttribute("cid")),j.get(a)},queryComponent:function(a){var b=e.querySelector(a);return this.getComponent(b)},loadFile:function(a,b){var c=new d.XMLHttpRequest;c.onreadystatechange=function(){4===c.readyState&&(c.status>=200&&300>c.status||304===c.status)&&b(c.responseText)},c.open("GET",a,!0),c.send()},start:function(){j.parse(),q(),g.start()}}),d.app=p}),require("mix/sln/0.2.0/app");