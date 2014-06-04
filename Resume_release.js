function canvasSupport(){return!!document.createElement("testcanvas").getContext}function eventWindowLoaded(){resume.startMessageLoop()}var resume=function(){function v(){switch(u){case t.initial:B();break;case t.loading:C();break;case t.reset:gameLogic.reset(),u=t.game;break;case t.game:gameLogic.draw(),E()}}function w(a){(37==a.keyCode||39==a.keyCode)&&a.preventDefault(),gameLogic.eventKeyUp(a)}function x(a){(37==a.keyCode||39==a.keyCode||38==a.keyCode)&&a.preventDefault(),gameLogic.eventKeyDown(a)}function y(){f=window.innerWidth,g=window.innerHeight,a.width=f,a.height=g,c.width=f,c.height=g,u==t.game&&gameLogic.resize(f,g)}function B(){h.src="image/AvatarP.png",h.onload=D,i.src="image/AvatarN.png",i.onload=D,j.src="image/BrickP.png",j.onload=D,k.src="image/BrickN.png",k.onload=D,l.src="image/HTML5_Logo.png",l.onload=D,m.src="image/Instructions.png",m.onload=D,n.src="image/MountPL.png",n.onload=D,o.src="image/MountPS.png",o.onload=D,p.src="image/MountNL.png",p.onload=D,q.src="image/MountNS.png",q.onload=D,r.src="image/FlagP.png",r.onload=D,s.src="image/FlagN.png",s.onload=D,a=document.getElementById("canvas"),b=a.getContext("2d"),c=document.createElement("canvas"),d=c.getContext("2d"),y(),document.addEventListener("keyup",w,!0),document.addEventListener("keydown",x,!0),window.addEventListener("resize",y,!1),e={mainStates:t,screenWidth:f,screenHeight:g},u=t.loading}function C(){var a=Math.round(100*(A/z));b.fillStyle="#FFFFFF",b.fillRect(0,0,f,g),b.textBaseline="bottom",b.fillStyle="#000000",b.font="14px monospace",b.textAlign="center",b.fillText(a+"%",f/2,g/2)}function D(){A++,A==z&&(gameLogic.init(e,{avatarP:h,avatarN:i,brickP:j,brickN:k,logo:l,ins:m,mountPL:n,mountPS:o,mountNL:p,mountNS:q,flagP:r,flagN:s},d),u=t.reset)}function E(){b.drawImage(c,0,0)}function F(){var a=30,b=1e3/a;setInterval(v,b)}if(!canvasSupport)return document.location.href="Unsupported.html",void 0;var a,b,c,d,e,f,g,h=new Image,i=new Image,j=new Image,k=new Image,l=new Image,m=new Image,n=new Image,o=new Image,p=new Image,q=new Image,r=new Image,s=new Image,t={unknown:-1,initial:0,loading:1,reset:2,game:3},u=t.initial,z=12,A=0;return{startMessageLoop:F}}();window.addEventListener("load",eventWindowLoaded,!1);var gameLogic=function(){function o(d,e,f){c=d,b=e,a=f,level.init(d,e,f)}function p(){j=-2300,d=3110,e=0,f=3110,g=0,h=0,i=0,k=!1,l=!1,m=!1,n=0,level.updateTextBlocks(j,d,f),$(".timeEvent").show(),$("#jump").show(),$("#contact").show()}function q(a){37==a.keyCode&&(k=!1),39==a.keyCode&&(l=!1),38==a.keyCode&&(m=!1)}function r(a){if(37==a.keyCode&&(k=!0,n=1),39==a.keyCode&&(l=!0,n=2),38==a.keyCode&&0==m){var b;b=level.collideTest(d,e,!0,3,t),t>b&&(h=50),b=level.collideTest(f,g,!1,1,t),t>b&&(i=-50),m=!0}}function s(a,b){c.screenWidth=a,c.screenHeight=b,level.resize(a,b)}function y(){var a;k&&(a=level.collideTest(d,e,!0,0,t),a>0&&(d-=a),a=level.collideTest(f,g-64,!1,0,t),a>0&&(f-=a)),l&&(a=level.collideTest(d,e,!0,2,t),a>0&&(d+=a),a=level.collideTest(f,g-64,!1,2,t),a>0&&(f+=a));var b,m,o=z(d,f);0>o?(b=f,m=d):(b=d,m=f),d>x-100&&(d==m?(d=2400,j=c.screenWidth-400-d,f=Math.abs(o)<c.screenWidth-400?d+o:d-c.screenWidth):d=2400),f>x-100&&(f==m?(f=2400,j=c.screenWidth-400-f,d=Math.abs(o)<c.screenWidth-400?f-o:f-c.screenWidth):f=2400),h+=v,h>0?(a=level.collideTest(d,e,!0,1,h),a>0&&(e+=a),h>a&&(h=0)):0>h&&(a=level.collideTest(d,e,!0,3,-1*h),a>0&&(e-=a),-1*h>a&&(h=0)),i+=w,0>i?(a=level.collideTest(f,g-64,!1,3,-1*i),a>0&&(g-=a),-1*i>a&&(i=0)):i>0&&(a=level.collideTest(f,g-64,!1,1,i),a>0&&(g+=a),i>a&&(i=0)),o=z(d,f),0>o?(b=f,m=d):(b=d,m=f);var p,q;1==n&&400>b+j?(p=400-b,q=z(j,p),q>u&&(q=u),j+=q):2==n&&m+j>c.screenWidth-400&&(p=c.screenWidth-400-m,q=z(j,p),-1*q>u&&(q=-1*u),j+=q)}function z(a,b){return Math.abs(b-a)<x/2?b-a:a>b?b-a+x:b-a-x}function A(){y(),level.updateTextBlocks(j,d,f),a.fillStyle="#FFFFFF",a.fillRect(0,0,c.screenWidth,c.screenHeight),a.drawImage(b.brickP,0,0,8,8,0,c.screenHeight/2,c.screenWidth,c.screenHeight/2),level.updateBgObjects(j),level.drawBricks(j),a.drawImage(b.avatarP,d-32+j,c.screenHeight/2-e-64),a.drawImage(b.avatarN,f-32+j,c.screenHeight/2-g)}var a,b,c,d,e,f,g,h,i,j,k,l,m,n,t=12,u=50,v=-5,w=5,x=11e3;return{init:o,reset:p,draw:A,eventKeyUp:q,eventKeyDown:r,resize:s}}(),level=function(){function d(d,e,f){c=d,b=e,a=f}function g(a,b,c){for(var d=0;d<e.length;d++)$(e[d][0]).css("marginLeft",e[d][1]+a+"px"),e[d][1]-50<b&&b<=e[d][1]+500?e[d][2]||($(e[d][0]).find(".description").slideToggle(),e[d][2]=!0):e[d][2]&&($(e[d][0]).find(".description").slideToggle(),e[d][2]=!1);for(var d=0;d<f.length;d++)$(f[d][0]).css("marginLeft",f[d][1]+a+"px"),f[d][1]-50<c&&c<=f[d][1]+500?f[d][2]||($(f[d][0]).removeClass("restrict"),$(f[d][0]).find(".description").slideToggle(),f[d][2]=!0):f[d][2]&&($(f[d][0]).addClass("restrict"),$(f[d][0]).find(".description").slideToggle(),f[d][2]=!1)}function i(a){switch(a){case"logo":return b.logo;case"ins":return b.ins;case"mountPL":return b.mountPL;case"mountPS":return b.mountPS;case"mountNL":return b.mountNL;case"mountNS":return b.mountNS;case"flagP":return b.flagP;case"flagN":return b.flagN}return 0}function j(b){for(var d,e=0;e<h.length;e++)d=i(h[e][0]),a.drawImage(d,0,0,d.width,d.height,h[e][1]+b,c.screenHeight/2-h[e][2],h[e][3],h[e][4])}function k(a,b){c.screenWidth=a,c.screenHeight=b}function m(a,b,c,d,e){var f;switch(d){case 0:for(f=0;f<l.length;f++)if(c==l[f][0]&&n(a-e,b,l[f][2],l[f][3],l[f][4],l[f][5]))return a-32-(l[f][2]+l[f][4]);break;case 1:for(f=0;f<l.length;f++)if(c==l[f][0]&&n(a,b+e,l[f][2],l[f][3],l[f][4],l[f][5]))return l[f][3]-l[f][5]-(b+64);break;case 2:for(f=0;f<l.length;f++)if(c==l[f][0]&&n(a+e,b,l[f][2],l[f][3],l[f][4],l[f][5]))return l[f][2]-(a+32);break;case 3:for(f=0;f<l.length;f++)if(c==l[f][0]&&n(a,b-e,l[f][2],l[f][3],l[f][4],l[f][5]))return b-l[f][3]}return e}function n(a,b,c,d,e,f){return c+e>a-32&&a+32>c&&d>b&&b+64>d-f?!0:!1}function o(d){var e;for(e=0;e<l.length;e++)l[e][0]?l[e][1]&&a.drawImage(b.brickP,0,0,8,8,l[e][2]+d,c.screenHeight/2-l[e][3],l[e][4],l[e][5]):l[e][1]&&a.drawImage(b.brickN,0,0,8,8,l[e][2]+d,c.screenHeight/2-l[e][3],l[e][4],l[e][5])}var a,b,c,e=[["#contact",3300,!1],["#jump",3610,!1],["#work0",4300,!1],["#work1",5730,!1],["#school0",7500,!1],["#school1",8e3,!1]],f=[["#game0",3880,!1],["#game1",4400,!1],["#game2",5230,!1],["#game3",5730,!1],["#game4",6240,!1],["#game5",7300,!1],["#game6",7880,!1]],h=[["mountPL",-160,1024,1024,1024],["mountNL",-160,0,1024,1024],["mountPS",-60,256,256,256],["mountNS",-60,0,256,256],["flagP",940,420,70,400],["flagN",940,-20,70,400],["logo",2980,-90,256,297],["ins",2950,360,320,320],["mountPL",3500,1024,1024,1024],["mountNL",3500,0,1024,1024],["mountPS",3430,256,256,256],["mountNS",3430,0,256,256],["mountPL",5e3,1024,1024,1024],["mountNL",5e3,0,1024,1024],["mountPL",5300,1024,1024,1024],["mountNL",5300,0,1024,1024],["mountPS",5200,256,256,256],["mountNS",5200,0,256,256],["mountPS",6190,256,256,256],["mountNS",6190,0,256,256],["mountPS",7250,256,256,256],["mountNS",7250,0,256,256],["mountPS",7750,256,256,256],["mountNS",7750,0,256,256],["mountPL",7900,1024,1024,1024],["mountNL",7900,0,1024,1024],["mountPL",8700,1024,1024,1024],["mountNL",8700,0,1024,1024],["mountPS",8600,256,256,256],["mountNS",8600,0,256,256],["mountPS",8800,256,256,256],["mountNS",8800,0,256,256],["flagP",9800,420,70,400],["flagN",9800,-20,70,400]],l=[[!0,!1,-500,0,12e3,100],[!0,!0,320,400,80,400],[!0,!0,100,350,80,100],[!0,!0,950,70,50,70],[!0,!0,3600,100,420,100],[!0,!0,3930,200,90,100],[!0,!0,4900,130,50,130],[!0,!0,5130,130,50,130],[!0,!0,6400,130,840,30],[!0,!0,6750,100,130,100],[!0,!0,6750,230,230,30],[!0,!0,6750,1230,30,1e3],[!0,!0,7080,330,30,200],[!0,!0,6880,360,230,30],[!0,!0,7110,200,130,70],[!0,!0,8250,100,80,100],[!0,!0,8490,250,80,100],[!0,!0,8740,300,80,100],[!0,!0,8960,350,80,100],[!0,!0,9180,400,80,400],[!0,!0,9810,70,50,70],[!1,!1,-500,100,12e3,100],[!1,!0,320,0,80,400],[!1,!0,100,-250,80,100],[!1,!0,950,0,50,70],[!1,!0,3680,0,80,110],[!1,!0,4950,-70,192,30],[!1,!0,5078,-100,64,1024],[!1,!0,6750,0,100,100],[!1,!0,6850,-210,260,30],[!1,!0,6850,0,30,210],[!1,!0,6990,-75,250,30],[!1,!0,7210,-105,30,1e3],[!1,!0,8350,0,80,100],[!1,!0,8550,-150,80,100],[!1,!0,8740,-200,80,100],[!1,!0,8960,-250,80,100],[!1,!0,9180,0,80,400],[!1,!0,9810,0,50,70]];return{init:d,resize:k,updateTextBlocks:g,updateBgObjects:j,collideTest:m,drawBricks:o}}();