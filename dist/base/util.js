define("#mix/core/0.3.0/base/util",["mix/core/0.3.0/base/reset","mix/core/0.3.0/base/class"],function(a,b,c){a("mix/core/0.3.0/base/reset");var d=a("mix/core/0.3.0/base/class"),e={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"},f=/^[-+]?\d\d*\.?\d\d*/,g=/[&<>"'\/]/g,h=d.create({initialize:function(){},escape:function(a){return(""+a).replace(g,function(a){return e[a]})},str2val:function(a){return null==a||void 0==a||0/0==a?a:(a+="","true"===a||"false"===a?"true"===a?!0:!1:f.test(a)?parseFloat(a):a)}});h.singleton=new h,c.exports=h});