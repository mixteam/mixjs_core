(function(e){DETECT=DETECT||{},DETECT.plugins=DETECT.plugins||{};var t=600,n=[{name:"http://img04.taobaocdn.com/tps/i4/T1t._HXjxXXXbGICsI-120-120.jpg",size:886,timeout:t},{name:"http://img01.taobaocdn.com/tps/i1/T1dD_GXhBgXXakeN3e-390-390.jpg",size:6530,timeout:t},{name:"http://img02.taobaocdn.com/tps/i2/T10MfHXidcXXauBRvZ-618-618.jpg",size:15870,timeout:t},{name:"http://img03.taobaocdn.com/tps/i3/T1fr2HXdBdXXbwcy7e-950-950.jpg",size:47613,timeout:t},{name:"http://img04.taobaocdn.com/tps/i4/T1gYrHXjNgXXc1iuUZ-1194-1194.jpg",size:64390,timeout:t}];n.end=n.length,n.start=0;var r={base_url:"",timeout:7e3,exptime:864e5,ignore_num:3,results:[],running:!1,aborted:!1,complete:!1,prefix:function(){var e=this.checktype();DETECT.INFO.network.type=e;var t=this.checkonline();DETECT.INFO.network.online=t;var n=this.getLocal("DETECT_INFO");if(n&&!this.exp()){var i=n.brandwidth,s=n.grade;DETECT.INFO.network.brandwidth=parseInt(i),DETECT.INFO.network.grade=s,DETECT.utils.print(),console.log("读取localstrage");return}if(t=="offline")return;setTimeout(DETECT.plugins.network.abort,this.timeout),r.defer(r.iterate)},exp:function(){var e=(new Date).getTime(),t=this.getLocal("DETECT_INFO").exptime;return e-t>=this.exptime},getLocal:function(e){var e=localStorage.getItem(e);return e===null||e==="undefined"?null:JSON.parse(e)},setLocal:function(e,t){return t=JSON.stringify(t),localStorage.setItem(e,t)},img_loaded:function(e,t,r){if(this.results[e])return;var i={start:t,end:(new Date).getTime(),t:null,state:r};r&&(i.t=i.end-i.start),this.results[e]=i;var s=this.ignore_num;if(e==s-1){var o=[],u={};for(var a=0;a<s;a++)o[a]=this.results[a].state==1?1:0,u[o[a]]=o[a]==1?!0:!1;var f=0;for(var l in u)f++;if(f==1&&u[0]&&u[0]==0)return console.log(o),console.log("连续"+s+"次失败，可能已经掉线"),!1}e>=n.end-1||typeof this.results[e+1]!="undefined"?this.finish():this.load_img(e+1,this.img_loaded)},finish:function(){var e=this.calculate(),t=this.grade(e),n=DETECT.INFO.network.type;DETECT.INFO.network.brandwidth=e,DETECT.INFO.network.grade=t,DETECT.utils.print();var r=(new Date).getTime();this.setLocal("DETECT_INFO",{type:n,brandwidth:e,grade:t,exptime:r}),this.complete=!0,this.running=!1},checkonline:function(){var e=navigator.onLine;return navigator.hasOwnProperty("onLine")?e?"online":"offline":!1},checktype:function(){var e=navigator.connection;if(e){var t="";switch(e.type){case e.UNKNOWN:t="UNKNOWN";break;case e.ETHERNET:t="ETHERNET";break;case e.WIFI:t="WIFI";break;case e.CELL_2G:t="2G";break;case e.CELL_3G:t="3G"}return t}return!1},calculate:function(){var e=-1,t=0,r,s=0,o=[],u=this.results;for(i=u.length-1;i>=0;i--){if(!u[i])break;if(u[i].t===null)continue;t++,r=n[i].size*1e3/u[i].t,o.push(r)}var a=o.length;for(j=0;j<a;j++)s+=o[j];return e=Math.round(s/a),console.log(t+"次平均网速："+e+"字节/秒，相当于"+e*8/1e3+"Kbps"),e},grade:function(e){var t=e*8;if(t>0&&t<76800)return"slow";if(t>=76800&&t<15e4)return"medium";if(t>=15e4)return"fast"},defer:function(e){var t=this;return setTimeout(function(){e.call(t),t=null},10)},load_img:function(e,t){var r=this.base_url+n[e].name+"?t="+(new Date).getTime()+Math.random(),i=0,s=0,o=new Image,u=this;o.onload=function(){o.onload=o.onerror=null,o=null,clearTimeout(i),t&&t.call(u,e,s,!0),u=t=null},o.onerror=function(){o.onload=o.onerror=null,o=null,clearTimeout(i),t&&t.call(u,e,s,!1),u=t=null},i=setTimeout(function(){t&&t.call(u,e,s,null)},n[e].timeout),s=(new Date).getTime(),o.src=r},iterate:function(e){if(this.aborted)return!1;e?this.finish():this.load_img(n.start,this.img_loaded)}};DETECT.plugins.network={init:function(e){return DETECT.utils.pluginConfig(r,e,"network"),this.run(),this},run:function(){return r.running=!0,r.prefix(),this},abort:function(){return r.aborted=!0,r.running&&r.finish(),console.log("超过预设时间："+r.timeout),this}}})(window);