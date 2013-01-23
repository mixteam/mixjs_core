define("mix/core/util/mvc/navigator/0.1.0/navigator",["mix/core/base/reset/1.0.0/reset","mix/core/base/class/1.0.0/class","mix/core/util/mvc/controller/0.1.0/controller","mix/core/base/message/1.0.0/message","mix/core/util/history/0.2.0/history","mix/core/util/router/0.2.0/router"],function(e,t,n){function c(e,t,n){var r="controller-js-"+e;return f[r]||(script=o.createElement("script"),script.id=r,script.type="text/javascript",script.async=!0,script.onload=script.onreadystatechange=function(){f[r]||(f[r]=script,n&&n())},script.src=t,u.appendChild(script)),r}function h(e,t){var n="controller-js-"+e,r=f[n];return r&&(u.removeChild(f[n]),delete f[n],t&&t()),n}function v(e){if(e)return function(){var t=this,n=arguments;p?e.apply(t,n):d.push(function(){e.apply(t,n)})}}function m(){if(!p){while(d.length)handler=d.shift(),handler();p=!0}}e("mix/core/base/reset/1.0.0/reset");var r=e("mix/core/base/class/1.0.0/class"),i=e("mix/core/util/mvc/controller/0.1.0/controller"),s=window,o=s.document,u=s.head,a=undefined,f={},l=i.extend({initialize:function(){var e=this,t={historyEvents:{"navigator:forward":v(e._forwardHandler),"navigator:backward":v(e._backwardHandler)}};l.superclass.initialize.call(e,"navigatorController",t),e._queue=[],e._limit=6,e._index=-1,e._controllers={},e._viewName=a},_forwardHandler:function(e,t){var n=this,r=n._controllers,i=n._queue,s=n._limit,o=n._index,u=i[o],a,f;o===s-1?(f=i.shift(),i.push(!1)):o++,a=i[o],a!==e&&(i[o]=e,i.splice(o+1)),f&&i.indexOf(f)<0&&n.removeController(f),n._index=o,n.trigger("forward",e),r[e]?n.activeController(e):n.addController(e,t),r[u]&&n.suspendController(u)},_backwardHandler:function(e,t){var n=this,r=n._controllers,i=n._queue,s=n._limit,o=n._index,u=i[o],a,f;o===0?(f=i.pop(),i.unshift(!1)):o--,a=i[o];if(a!==e){i[o]=e;for(var l=0;l<o;l++)i[l]=!1}f&&i.indexOf(f)<0&&n.removeController(f),n._index=o,n.trigger("backward",e),r[e]?n.activeController(e):n.addController(e,t),r[u]&&n.suspendController(u)},addController:function(e,t,n){var r=this,i=r._controllers,s=i[e];s||(r._controllers[e]="loading",c(e,t,n))},depositController:function(e,t,n){var r=this,s=r._controllers,o,n=Array.make(arguments).slice(2);return o=new i(e,{routes:t}),Object.each(n,function(e){o.addView(e)}),s[e]=o,o},activeController:function(e){var t=this,n=t._controllers,r=n[e];r&&r.trigger&&r.trigger("active")},suspendController:function(e){var t=this,n=t._controllers,r=n[e];r&&r.trigger&&r.trigger("suspend")},removeController:function(e){var t=this,n=t._controllers,r=Object.isTypeof(e,"string")?e:e.getName(),e=n[r];e&&(h(r),e.trigger&&e.trigger("destroy"),n[r]=null,delete n[r])},getController:function(e){var t=this;return t._controllers[e]},setView:function(e){var t=this;p=!1,t._viewName=l.superclass.addView.call(t,e),t.getView().once("ready",m)},getView:function(){var e=this;return l.superclass.getView.call(e,e._viewName)}}),p=!0,d=[];l.singleton=new l,n.exports=l});