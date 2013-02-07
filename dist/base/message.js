define("#mix/core/0.3.0/base/message",["mix/core/0.3.0/base/reset","mix/core/0.3.0/base/class"],function(a,b,c){function i(a,b){var c,d,e;return(d=b.match(f))&&"*"===d[1]?(c=[],e=new RegExp("^(@[^\\:]+\\:)?"+b+"$"),Object.each(a,function(a,b){e.test(b)&&(c=c.concat(a))})):c=a[b],c}a("mix/core/0.3.0/base/reset");var d=a("mix/core/0.3.0/base/class"),e=/\s+/,f=/^\@([^:]+)\:/,g=":",h=0,j=d.create({initialize:function(a,b,c){var d=this;d.__msgObj={name:a||"anonymous",id:b||h++,cache:{},defaultContext:c||d}},on:function(a,b,c){var j,k,l,d=this,h=d.__msgObj.cache,i=d.__msgObj.defaultContext;if(!b)return d;for(a&&(j=a.match(f))?a=a.split(g)[1]:j=[""],a=a.split(e);k=a.shift();)k=j[0]+k,l=h[k]||(h[k]=[]),l.push(b,c||i);return d},off:function(a,b,c){var j,k,l,d=this,h=d.__msgObj.cache,i="";if(!(a||b||c))return delete d.__msgObj.events,d;for(a&&(i=a.match(f))?a=a.split(g)[1].split(e):(a=Object.keys(h),i=[""]);j=a.shift();)if(j=i[0]+a,k=h[j])if(b||c)for(l=k.length-2;l>=0;l-=2)b&&k[l]!==b||c&&k[l+1]!==c||k.splice(l,2);else delete h[j];return d},has:function(a,b,c){var g,d=this,e=d.__msgObj.cache,f=i(e,a);if(!f)return!1;if(!b&&!c)return!0;for(g=f.length-2;g>=0;g-=2)if(!(b&&f[g]!==b||c&&f[g+1]!==c))return!0;return!1},once:function(a,b,c){function e(){b.apply(this,arguments),d.off(a,e,c)}var d=this;d.on(a,e,c)},trigger:function(a){var f,g,h,j,k,m,b=this,c=b.__msgObj.cache,d=b.__msgObj.defaultContext,l=[];for(a=a.split(e),j=1,k=arguments.length;k>j;j++)l[j-1]=arguments[j];for(;f=a.shift();){if(b.log(f+":("+l.join(",")+")"),(g=c.all)&&(g=g.slice()),(h=i(c,f))&&(h=h.slice()),h)for(j=0,k=h.length;k>j;j+=2)h[j].apply(h[j+1]||d,l);if(g)for(m=[f].concat(l),j=0,k=g.length;k>j;j+=2)g[j].apply(g[j+1]||d,m)}return b},log:function(a){var b=this;console.log("[("+b.__msgObj.id+")"+b.__msgObj.name+"]"+a)}});j.SPLITER_REG=e,j.AT_REG=f,j.singleton=new j("global"),c.exports=j});