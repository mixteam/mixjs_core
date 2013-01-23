define("mix/core/util/dom/event/1.0.0/event",["mix/core/util/dom/selector/1.0.0/selector"],function(e,t,n){var r=e("mix/core/util/dom/selector/1.0.0/selector");(function(e){function o(e){return e._zid||(e._zid=i++)}function u(e,t,n,i){t=a(t);if(t.ns)var s=f(t.ns);return(r[o(e)]||[]).filter(function(e){return e&&(!t.e||e.e==t.e)&&(!t.ns||s.test(e.ns))&&(!n||o(e.fn)===o(n))&&(!i||e.sel==i)})}function a(e){var t=(""+e).split(".");return{e:t[0],ns:t.slice(1).sort().join(" ")}}function f(e){return new RegExp("(?:^| )"+e.replace(" "," .* ?")+"(?: |$)")}function l(t,n,r){e.isObject(t)?e.each(t,r):t.split(/\s/).forEach(function(e){r(e,n)})}function c(t,n,i,s,u,f){f=!!f;var c=o(t),h=r[c]||(r[c]=[]);l(n,i,function(n,r){var i=u&&u(r,n),o=i||r,l=function(e){var n=o.apply(t,[e].concat(e.data));return n===!1&&e.preventDefault(),n},c=e.extend(a(n),{fn:r,proxy:l,sel:s,del:i,i:h.length});h.push(c),t.addEventListener(c.e,l,f)})}function h(e,t,n,i){var s=o(e);l(t||"",n,function(t,n){u(e,t,n,i).forEach(function(t){delete r[s][t.i],e.removeEventListener(t.e,t.proxy,!1)})})}function m(t){var n=e.extend({originalEvent:t},t);return e.each(v,function(e,r){n[e]=function(){return this[r]=p,t[e].apply(t,arguments)},n[r]=d}),n}function g(e){if(!("defaultPrevented"in e)){e.defaultPrevented=!1;var t=e.preventDefault;e.preventDefault=function(){this.defaultPrevented=!0,t.call(this)}}}var t=e.zepto.qsa,r={},i=1,s={};s.click=s.mousedown=s.mouseup=s.mousemove="MouseEvents",e.event={add:c,remove:h},e.proxy=function(t,n){if(e.isFunction(t)){var r=function(){return t.apply(n,arguments)};return r._zid=o(t),r}if(typeof n=="string")return e.proxy(t[n],t);throw new TypeError("expected function")},e.fn.bind=function(e,t){return this.each(function(){c(this,e,t)})},e.fn.unbind=function(e,t){return this.each(function(){h(this,e,t)})},e.fn.one=function(e,t){return this.each(function(n,r){c(this,e,t,null,function(e,t){return function(){var n=e.apply(r,arguments);return h(r,t,e),n}})})};var p=function(){return!0},d=function(){return!1},v={preventDefault:"isDefaultPrevented",stopImmediatePropagation:"isImmediatePropagationStopped",stopPropagation:"isPropagationStopped"};e.fn.delegate=function(t,n,r){var i=!1;if(n=="blur"||n=="focus")e.iswebkit?n=n=="blur"?"focusout":n=="focus"?"focusin":n:i=!0;return this.each(function(s,o){c(o,n,r,t,function(n){return function(r){var i,s=e(r.target).closest(t,o).get(0);if(s)return i=e.extend(m(r),{currentTarget:s,liveFired:o}),n.apply(s,[i].concat([].slice.call(arguments,1)))}},i)})},e.fn.undelegate=function(e,t,n){return this.each(function(){h(this,t,n,e)})},e.fn.live=function(t,n){return e(document.body).delegate(this.selector,t,n),this},e.fn.die=function(t,n){return e(document.body).undelegate(this.selector,t,n),this},e.fn.on=function(t,n,r){return n==undefined||e.isFunction(n)?this.bind(t,n||r):this.delegate(n,t,r)},e.fn.off=function(t,n,r){return n==undefined||e.isFunction(n)?this.unbind(t,n||r):this.undelegate(n,t,r)},e.fn.trigger=function(t,n){return typeof t=="string"&&(t=e.Event(t)),g(t),t.data=n,this.each(function(){"dispatchEvent"in this&&this.dispatchEvent(t)})},e.fn.triggerHandler=function(t,n){var r,i;return this.each(function(s,o){r=m(typeof t=="string"?e.Event(t):t),r.data=n,r.target=o,e.each(u(o,t.type||t),function(e,t){i=t.proxy(r);if(r.isImmediatePropagationStopped())return!1})}),i},"focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout change select keydown keypress keyup error".split(" ").forEach(function(t){e.fn[t]=function(e){return this.bind(t,e)}}),["focus","blur"].forEach(function(t){e.fn[t]=function(e){if(e)this.bind(t,e);else if(this.length)try{this.get(0)[t]()}catch(n){}return this}}),e.Event=function(e,t){var n=document.createEvent(s[e]||"Events"),r=!0;if(t)for(var i in t)i=="bubbles"?r=!!t[i]:n[i]=t[i];return n.initEvent(e,r,!0,null,null,null,null,null,null,null,null,null,null,null,null),n},n.exports=e})(r)});