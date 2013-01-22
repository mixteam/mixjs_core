define("#mix/core/0.3.0/dom/event/event",["mix/core/0.3.0/dom/selector"],function(a){var b=a("mix/core/0.3.0/dom/selector");(function(a){function b(a){return a._zid||(a._zid=l++)}function c(a,c,f,g){if(c=d(c),c.ns)var h=e(c.ns);return(k[b(a)]||[]).filter(function(a){return!(!a||c.e&&a.e!=c.e||c.ns&&!h.test(a.ns)||f&&b(a.fn)!==b(f)||g&&a.sel!=g)})}function d(a){var b=(""+a).split(".");return{e:b[0],ns:b.slice(1).sort().join(" ")}}function e(a){return new RegExp("(?:^| )"+a.replace(" "," .* ?")+"(?: |$)")}function f(b,c,d){a.isObject(b)?a.each(b,d):b.split(/\s/).forEach(function(a){d(a,c)})}function g(c,e,g,h,i,j){j=!!j;var l=b(c),m=k[l]||(k[l]=[]);f(e,g,function(b,e){var f=i&&i(e,b),g=f||e,k=function(a){var b=g.apply(c,[a].concat(a.data));return b===!1&&a.preventDefault(),b},l=a.extend(d(b),{fn:e,proxy:k,sel:h,del:f,i:m.length});m.push(l),c.addEventListener(l.e,k,j)})}function h(a,d,e,g){var h=b(a);f(d||"",e,function(b,d){c(a,b,d,g).forEach(function(b){delete k[h][b.i],a.removeEventListener(b.e,b.proxy,!1)})})}function i(b){var c=a.extend({originalEvent:b},b);return a.each(p,function(a,d){c[a]=function(){return this[d]=n,b[a].apply(b,arguments)},c[d]=o}),c}function j(a){if(!("defaultPrevented"in a)){a.defaultPrevented=!1;var b=a.preventDefault;a.preventDefault=function(){this.defaultPrevented=!0,b.call(this)}}}var k=(a.zepto.qsa,{}),l=1,m={};m.click=m.mousedown=m.mouseup=m.mousemove="MouseEvents",a.event={add:g,remove:h},a.proxy=function(c,d){if(a.isFunction(c)){var e=function(){return c.apply(d,arguments)};return e._zid=b(c),e}if("string"==typeof d)return a.proxy(c[d],c);throw new TypeError("expected function")},a.fn.bind=function(a,b){return this.each(function(){g(this,a,b)})},a.fn.unbind=function(a,b){return this.each(function(){h(this,a,b)})},a.fn.one=function(a,b){return this.each(function(c,d){g(this,a,b,null,function(a,b){return function(){var c=a.apply(d,arguments);return h(d,b,a),c}})})};var n=function(){return!0},o=function(){return!1},p={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};a.fn.delegate=function(b,c,d){var e=!1;return("blur"==c||"focus"==c)&&(a.iswebkit?c="blur"==c?"focusout":"focus"==c?"focusin":c:e=!0),this.each(function(f,h){g(h,c,d,b,function(c){return function(d){var e,f=a(d.target).closest(b,h).get(0);return f?(e=a.extend(i(d),{currentTarget:f,liveFired:h}),c.apply(f,[e].concat([].slice.call(arguments,1)))):void 0}},e)})},a.fn.undelegate=function(a,b,c){return this.each(function(){h(this,b,c,a)})},a.fn.live=function(b,c){return a(document.body).delegate(this.selector,b,c),this},a.fn.die=function(b,c){return a(document.body).undelegate(this.selector,b,c),this},a.fn.on=function(b,c,d){return void 0==c||a.isFunction(c)?this.bind(b,c||d):this.delegate(c,b,d)},a.fn.off=function(b,c,d){return void 0==c||a.isFunction(c)?this.unbind(b,c||d):this.undelegate(c,b,d)},a.fn.trigger=function(b,c){return"string"==typeof b&&(b=a.Event(b)),j(b),b.data=c,this.each(function(){"dispatchEvent"in this&&this.dispatchEvent(b)})},a.fn.triggerHandler=function(b,d){var e,f;return this.each(function(g,h){e=i("string"==typeof b?a.Event(b):b),e.data=d,e.target=h,a.each(c(h,b.type||b),function(a,b){return f=b.proxy(e),e.isImmediatePropagationStopped()?!1:void 0})}),f},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout change select keydown keypress keyup error".split(" ").forEach(function(b){a.fn[b]=function(a){return this.bind(b,a)}}),["focus","blur"].forEach(function(b){a.fn[b]=function(a){if(a)this.bind(b,a);else if(this.length)try{this.get(0)[b]()}catch(c){}return this}}),a.Event=function(a,b){var c=document.createEvent(m[a]||"Events"),d=!0;if(b)for(var e in b)"bubbles"==e?d=!!b[e]:c[e]=b[e];return c.initEvent(a,d,!0,null,null,null,null,null,null,null,null,null,null,null,null),c}})(b)});