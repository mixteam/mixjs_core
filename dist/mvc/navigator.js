define("#mix/core/0.3.0/mvc/navigator",["mix/core/0.3.0/base/reset","mix/core/0.3.0/base/class","controller"],function(a,b,c){function l(a,b,c){var d="controller-js-"+a;return j[d]||(script=g.createElement("script"),script.id=d,script.type="text/javascript",script.async=!0,script.onload=script.onreadystatechange=function(){j[d]||(j[d]=script,c&&c())},script.src=b,h.appendChild(script)),d}function m(a,b){var c="controller-js-"+a,d=j[c];return d&&(h.removeChild(j[c]),delete j[c],b&&b()),c}function p(a){return a?function(){var b=this,c=arguments;n?a.apply(b,c):o.push(function(){a.apply(b,c)})}:void 0}function q(){if(!n){for(;o.length;)handler=o.shift(),handler();n=!0}}a("mix/core/0.3.0/base/reset");var e=(a("mix/core/0.3.0/base/class"),a("controller")),f=window,g=f.document,h=g.head,i=void 0,j={},k=e.extend({initialize:function(){var a=this,b={historyEvents:{"navigator:forward":p(a._forwardHandler),"navigator:backward":p(a._backwardHandler)}};k.superclass.initialize.call(a,"navigatorController",b),a._queue=[],a._limit=6,a._index=-1,a._controllers={},a._viewName=i},_forwardHandler:function(a,b){var i,j,c=this,d=c._controllers,e=c._queue,f=c._limit,g=c._index,h=e[g];g===f-1?(j=e.shift(),e.push(!!0)):g++,i=e[g],i!==a&&(e[g]=a,e.splice(g+1)),j&&0>e.indexOf(j)&&c.removeController(j),c._index=g,c.trigger("forward",a),d[a]?c.activeController(a):c.addController(a,b),d[h]&&c.suspendController(h)},_backwardHandler:function(a,b){var i,j,c=this,d=c._controllers,e=c._queue,g=(c._limit,c._index),h=e[g];if(0===g?(j=e.pop(),e.unshift(!!0)):g--,i=e[g],i!==a){e[g]=a;for(var k=0;g>k;k++)e[k]=!!0}j&&0>e.indexOf(j)&&c.removeController(j),c._index=g,c.trigger("backward",a),d[a]?c.activeController(a):c.addController(a,b),d[h]&&c.suspendController(h)},addController:function(a,b,c){var d=this,e=d._controllers,f=e[a];f||(d._controllers[a]="loading",l(a,b,c))},depositController:function(a,b,c){var g,d=this,f=d._controllers,c=Array.make(arguments).slice(2);return g=new e(a,{routes:b}),Object.each(c,function(a){g.addView(a)}),f[a]=g,g},activeController:function(a){var b=this,c=b._controllers,d=c[a];d&&d.trigger&&d.trigger("active")},suspendController:function(a){var b=this,c=b._controllers,d=c[a];d&&d.trigger&&d.trigger("suspend")},removeController:function(a){var b=this,c=b._controllers,d=Object.isTypeof(a,"string")?a:a.getName(),a=c[d];a&&(m(d),a.trigger&&a.trigger("destroy"),c[d]=null,delete c[d])},getController:function(a){var b=this;return b._controllers[a]},setView:function(a){var b=this;n=!1,b._viewName=k.superclass.addView.call(b,a),b.getView().once("ready",q)},getView:function(){var a=this;return k.superclass.getView.call(a,a._viewName)}}),n=!0,o=[];k.singleton=new k,c.exports=k});