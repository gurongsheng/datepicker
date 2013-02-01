var Datepicker=function(y){function N(a){if(a.getBoundingClientRect()){if("BODY"===a.tagName)return[0,0];a=a.getBoundingClientRect();return[a.left+(document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft),a.top+(document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop)]}for(var d=0,h=0;a.offsetParent;)d+=a.offsetLeft,h+=a.offsetTop,a=a.offsetParent;d+=a.offsetLeft;h+=a.offsetTop;return[d,h]}var a={container:document.body,
min:null,max:null,weekStart:0,dateFormat:"Y-M-D",weekLabel:"\u5468\u65e5 \u5468\u4e00 \u5468\u4e8c \u5468\u4e09 \u5468\u56db \u5468\u4e94 \u5468\u516d".split(" "),monthLabel:"\u4e00\u6708 \u4e8c\u6708 \u4e09\u6708 \u56db\u6708 \u4e94\u6708 \u516d\u6708 \u4e03\u6708 \u516b\u6708 \u4e5d\u6708 \u5341\u6708 \u5341\u4e00\u6708 \u5341\u4e8c\u6708".split(" "),yearMonthTpl:"%Y\u5e74%M",nextMonthLabel:">",prevMonthLabel:"<",nextYearLabel:">>",prevYearLabel:"<<",todayFontColor:"#666",todayBgColor:"#F1CA7E",
selectedFontColor:"#fff",selectedBgColor:"#3399FF",weeksFontColor:"#2200CC",weeksBgColor:"#E3E9FF",weeksBorderColor:"#D0D4F0",currentMonthDayFontColor:"#333",otherMonthDayFontColor:"#666",linkTo:null,onSelect:null,onShow:null,onHide:null,beforeShow:null},d=this,j=[],q=new Date,J=q.getFullYear(),K=q.getMonth(),O=q.getDate(),n=J,m=K,E=null,f,F=function(c,f,h){if("function"===typeof a[c])return h=h||d,a[c].apply(h,f)},C=function(a){return String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,
"&gt;").replace(/"/g,"&quot;")};this.setSelectedDate=function(a){E=a};this.setOptions=function(c){for(var d in c)d in a&&(a[d]=c[d])};this.buildByDate=function(c,f){var h=new Date(c-0,f-0,1);n=h.getFullYear();m=h.getMonth();if(null!==a.min){var h=a.min instanceof Date?a.min:I(a.min),u=h.getFullYear(),l=h.getMonth(),g=h.getDate();n<u&&(n=u,m=l);n===u&&m<l&&(m=l)}else g=l=u=h=null;if(null!==a.max){var z=a.max instanceof Date?a.max:I(a.max),s=z.getFullYear(),B=z.getMonth(),q=z.getDate();n>s&&(n=s,m=
B);n===s&&m>B&&(m=B)}else q=B=s=z=null;if(E)var y=E.getFullYear(),L=E.getMonth(),M=E.getDate();else M=L=y=null;j=[];for(var e=new Date(n,m,0),b=new Date(n,m+1,0),p=(new Date(n,m,1)).getDay(),A=b.getDay(),p=p<a.weekStart?p+7-a.weekStart:p-a.weekStart,A=A<a.weekStart?7-(A+7-a.weekStart+1):7-(A-a.weekStart+1),v=[],w=e.getDate(),k=b.getDate(),b=1;b<=k;b++){if(1==b&&0<p)for(e=w-p+1;e<=w;e++)v.push(e);v.push(b);if(b==k&&0<A)for(e=1;e<=A;e++)v.push(e);7===v.length&&(j.push(v),v=[])}e=[];for(b=0;!(p=a.weekStart+
b,6<p&&(p-=7),e.push(a.weekLabel[p]),b++,7<=b););for(var p=d.document.getElementsByTagName("table")[0],A=p.rows[0].cells[1],v=[],t,r,b=-6;6>=b;b++)t=new Date(n,m+b,1),w=0==b?" selected":"",k=t.getFullYear(),r=t.getMonth(),k=h&&(u>k||u===k&&l>r)||z&&(s<k||s===k&&B<r)?" disabled":"",v.push('<option value="'+t.getFullYear()+"-"+t.getMonth()+'"'+w+k+">"+C(a.yearMonthTpl.replace(/%Y/g,t.getFullYear()).replace(/%M/g,a.monthLabel[t.getMonth()]))+"</option>");A.innerHTML='<select style="font-size:12px;">'+
v.join("")+"</select>";v=p.rows[1].cells[0];w=['<table style="border-collapse:collapse;border:solid 1px #000" width=100%>'];w.push("<tr>");k="";for(b=0;b<e.length;b++)0<b&&(k=";border-left:solid 1px "+a.weeksBorderColor),w.push('<td style="white-space:nowrap;padding:3px 4px;font-size:12px;border-bottom:solid 1px '+a.weeksBorderColor+";background:"+a.weeksBgColor+";color:"+a.weeksFontColor+k+'" align=center>'+C(e[b])+"</td>");w.push("</tr>");for(var x,D,G,b=0;b<j.length;b++){w.push("<tr>");for(e=0;e<
j[b].length;e++)t=0==b&&7<j[b][e]?new Date(n,m-1,j[b][e]):b==j.length-1&&7>j[b][e]?new Date(n,m+1,j[b][e]):new Date(n,m,j[b][e]),k=t.getFullYear(),r=t.getMonth(),D=t.getDate(),x=k===J&&r===K&&D===O?!0:!1,G=k===y&&r===L&&D===M?!0:!1,t=0==b&&7<j[b][e]||b==j.length-1&&7>j[b][e]?G?";color:"+a.selectedFontColor+";background-color:"+a.selectedBgColor:x?";color:"+a.todayFontColor+";background-color:"+a.todayBgColor:";color:"+a.otherMonthDayFontColor:G?";font-weight:bold;color:"+a.selectedFontColor+";background-color:"+
a.selectedBgColor:x?";font-weight:bold;color:"+a.todayFontColor+";background-color:"+a.todayBgColor:";font-weight:bold;color:"+a.currentMonthDayFontColor,h&&k<u||(k===u&&r<l||k===u&&r===l&&D<g)||z&&(k>s||k===s&&r>B||k===s&&r===B&&D>q)?(x=k="",r=";opacity:0.3;filter:alpha(opacity=30)"):(k=' data="'+[k,r,D].join("-")+'"',G?x="":x?x=" onmouseover=\"this.style.color='"+a.selectedFontColor+"';this.style.backgroundColor='"+a.selectedBgColor+"'\" onmouseout=\"this.style.color='"+a.todayFontColor+"';this.style.backgroundColor='"+
a.todayBgColor+"'\"":(x=" onmouseover=\"this.style.color='"+a.selectedFontColor+"';this.style.backgroundColor='"+a.selectedBgColor+"'\"",x=0==b&&7<j[b][e]||b==j.length-1&&7>j[b][e]?x+(" onmouseout=\"this.style.color='"+a.otherMonthDayFontColor+"';this.style.backgroundColor=''\""):x+(" onmouseout=\"this.style.color='"+a.currentMonthDayFontColor+"';this.style.backgroundColor=''\"")),r=""),w.push("<td "+k+x+' align="center" style="cursor:default;padding:3px 4px;font-size:14px;'+t+r+'">'+j[b][e]+"</td>");
w.push("</tr>")}v.innerHTML=w.join("");var H=A.getElementsByTagName("select")[0];H.onchange=function(){var a=H.options[H.selectedIndex].value.split("-");d.showDate(a[0],a[1])};H.onclick=function(){clearTimeout(0)};h=p.rows[0].getElementsByTagName("a");h[0].onclick=d.prevYear;h[1].onclick=d.prevMonth;h[2].onclick=d.nextMonth;h[3].onclick=d.nextYear;v.childNodes[0].onclick=function(b){b=b||d.window.event;if((b=b.target||b.srcElement)&&"TD"===b.tagName)if(b=b.getAttribute("data")){b=b.split("-");var c;
c=b[0]-0;for(var h=b[1]-0+1,f=b[2]-0,g=a.dateFormat+"",e="",k,l=0;l<g.length;l++)switch(k=g.substr(l,1),k){case "Y":e+=""+c;break;case "y":e+=""+(c-1900);break;case "M":e+=10>h?"0"+h:""+h;break;case "m":e+=""+h;break;case "D":e+=10>f?"0"+f:""+f;break;case "d":e+=""+f;break;default:e+=k}c=e;a.linkTo&&(a.linkTo.value=c);b=F("onSelect",[c,b[0]-0,b[1]-0+1,b[2]-0]);if((b||c)!==c&&a.linkTo)a.linkTo.value=c;d.hide()}}};this.prevYear=function(){d.showDate(n-1,m)};this.nextYear=function(){d.showDate(n+1,m)};
this.prevMonth=function(){d.showDate(n,m-1)};this.nextMonth=function(){d.showDate(n,m+1)};this.hide=function(){f&&(F("onHide",[]),f.style.width=0,f.style.height=0,f.style.left="-10px",f.style.top="-10px")};this.showDate=function(c,j){c=isNaN(c)?n:c;j=isNaN(j)?m:j;var h=F("beforeShow");h&&d.setOptions(h);d.buildByDate(c,j);if(a.linkTo&&f){F("onShow",[a.linkTo.value||""]);f.style.width="1px";f.style.height="1px";var h=d.document.body.scrollWidth,u=d.document.body.scrollHeight;f.style.width=h+"px";f.style.height=
u+"px";var l=N(a.linkTo),g=l[0],l=l[1]+a.linkTo.offsetHeight,z=document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft,s=document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop,q=document.body.clientHeight+s,y=z+document.body.clientWidth;g<z?g=z:g+f.offsetWidth>y&&(g=y-h);l<s?l=s:l+f.offsetHeight>q&&(l=q-u);f.style.left=g+"px";f.style.top=l+"px";d.window.focus()}};var I=function(c){for(var d=a.dateFormat+"",f,j,l,g=0,n,
m=0;m<d.length;m++)switch(n=d.substr(m,1),n){case "Y":f=c.substr(g,4);g+=4;break;case "y":g+=2;break;case "M":j=c.substr(g,2);g+=2;break;case "m":j=c.substr(g,1);g++;2>j-0&&(void 0!==c.substr(g,1)&&c.substr(g,1).match(/\d/))&&(j+=c.substr(g,1),g++);break;case "D":l=c.substr(g,2);g+=2;break;case "d":l=c.substr(g,1);g++;4>l-0&&(void 0!==c.substr(g,1)&&c.substr(g,1).match(/\d/))&&(l+=c.substr(g,1),g++);break;default:g++}return new Date(f,j-1,l)};this.setOptions(y);f=document.createElement("IFRAME");
f.src="javascript:void(0);";f.frameBorder="0";f.scrolling="no";f.width=f.height=0;f.style.zIndex=999999999;f.style.left="-1px";f.style.top="-1px";f.style.boxShadow="0 1px 3px rgba(0,0,0,.3)";f.style.border="solid 1px #ccc";y="";-1<navigator.userAgent.toLowerCase().indexOf(" applewebkit/")&&(y='<base href="'+window.document.location+'">');a.container.appendChild(f);d.window=f.contentWindow;d.document=d.window.document;q=d.document;q.open();q.write("<html><head>"+y+'</head><body style="margin:0px;padding:0px;background-color:#fff"><table><tbody><tr><td align=left><a href="javascript:void(0);" hidefocus=true style="margin:3px;padding:0 4px;font-family:Arial;text-decoration:none;color:#000;background:#E7E7E7;border:solid 1px #ACACAC">'+
C(a.prevYearLabel)+'</a><a href="javascript:void(0);" hidefocus=true style="margin:3px;padding:0 4px;font-family:Arial;text-decoration:none;color:#000;background:#E7E7E7;border:solid 1px #ACACAC">'+C(a.prevMonthLabel)+'</a></td><td align=center></td><td align="right"><a href="javascript:void(0);" hidefocus=true style="margin:3px;padding:0 4px;font-family:Arial;text-decoration:none;color:#000;background:#E7E7E7;border:solid 1px #ACACAC">'+C(a.nextMonthLabel)+'</a><a href="javascript:void(0);" hidefocus=true style="margin:3px;padding:0 4px;font-family:Arial;text-decoration:none;color:#000;background:#E7E7E7;border:solid 1px #ACACAC">'+
C(a.nextYearLabel)+"</a></td></tr><tr><td colspan=3></td></tr></tbody></table></body></html>");q.close();document.all?(f.attachEvent("onblur",function(){d.hide()}),d.document.attachEvent("oncontextmenu",function(){return!1})):(q.addEventListener("contextmenu",function(a){a&&a.preventDefault()},!1),d.window.addEventListener("blur",function(){d.hide()},!1));a.linkTo&&(f.style.position="absolute",a.linkTo.onclick=function(){var c=a.linkTo.value||"";if(c&&(c=I(c),!c||!isNaN(c.getFullYear()))){d.setSelectedDate(c);
d.showDate(c.getFullYear(),c.getMonth());return}c=new Date;d.showDate(c.getFullYear(),c.getMonth())})};
