YUI.add('yui2-swfdetect', function() {}, '3.1.0' ,{"requires": ["yui2-yahoo"]});
YUI.add('yui2-swf', function(Y) {
    if (Y.YUI2) {
        var YAHOO    = Y.YUI2,
            window   = Y.config.win,
            document = Y.config.doc;
    }
    /*
Copyright (c) 2009, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.8.0r4
*/
YAHOO.namespace("widget");(function(){var M=0;var L=YAHOO.env.ua;var P="ShockwaveFlash";if(L.gecko||L.webkit||L.opera){if((mF=navigator.mimeTypes["application/x-shockwave-flash"])){if((eP=mF.enabledPlugin)){var F=[];F=eP.description.replace(/\s[rd]/g,".").replace(/[A-Za-z\s]+/g,"").split(".");M=F[0]+".";switch((F[2].toString()).length){case 1:M+="00";break;case 2:M+="0";break;}M+=F[2];M=parseFloat(M);}}}else{if(L.ie){try{var Q=new ActiveXObject(P+"."+P+".6");Q.AllowScriptAccess="always";}catch(K){if(Q!=null){M=6;}}if(M==0){try{var B=new ActiveXObject(P+"."+P);var F=[];F=B.GetVariable("$version").replace(/[A-Za-z\s]+/g,"").split(",");M=F[0]+".";switch((F[2].toString()).length){case 1:M+="00";break;case 2:M+="0";break;}M+=F[2];M=parseFloat(M);}catch(K){}}}}L.flash=M;YAHOO.util.SWFDetect={getFlashVersion:function(){return M;},isFlashVersionAtLeast:function(R){return M>=R;}};var H=YAHOO.util.Dom,O=YAHOO.util.Event,I=YAHOO.util.SWFDetect,J=YAHOO.lang,G="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000",E="application/x-shockwave-flash",D="10.22",A="http://fpdownload.macromedia.com/pub/flashplayer/update/current/swf/autoUpdater.swf?"+Math.random(),C="YAHOO.widget.SWF.eventHandler",N={align:"",allowNetworking:"",allowScriptAccess:"",base:"",bgcolor:"",menu:"",name:"",quality:"",salign:"",scale:"",tabindex:"",wmode:""};YAHOO.widget.SWF=function(R,i,c){this._queue=this._queue||[];this._events=this._events||{};this._configs=this._configs||{};this._id=H.generateId(null,"yuiswf");if(c.host){this._host=c.host;}var e=this._id;var U=H.get(R);var S=(c["version"]||D);var b=I.isFlashVersionAtLeast(S);var a=(L.flash>=8);var V=a&&!b&&c["useExpressInstall"];var Z=(V)?A:i;var Y="<object ";var f,X;var g="YUISwfId="+e+"&YUIBridgeCallback="+C;YAHOO.widget.SWF._instances[e]=this;if(U&&(b||V)&&Z){Y+='id="'+e+'" ';if(L.ie){Y+='classid="'+G+'" ';}else{Y+='type="'+E+'" data="'+Z+'" ';}f="100%";X="100%";Y+='width="'+f+'" height="'+X+'">';if(L.ie){Y+='<param name="movie" value="'+Z+'"/>';}for(var T in c.fixedAttributes){if(N.hasOwnProperty(T)){Y+='<param name="'+T+'" value="'+c.fixedAttributes[T]+'"/>';}}for(var d in c.flashVars){var W=c.flashVars[d];if(J.isString(W)){g+="&"+d+"="+encodeURIComponent(W);}}if(g){Y+='<param name="flashVars" value="'+g+'"/>';}Y+="</object>";U.innerHTML=Y;}YAHOO.widget.SWF.superclass.constructor.call(this,H.get(e));this._swf=H.get(e);};YAHOO.widget.SWF._instances=YAHOO.widget.SWF._instances||{};YAHOO.widget.SWF.eventHandler=function(R,S){YAHOO.widget.SWF._instances[R]._eventHandler(S);};YAHOO.extend(YAHOO.widget.SWF,YAHOO.util.Element,{_eventHandler:function(R){if(R.type=="swfReady"){this.createEvent("swfReady",{fireOnce:true});this.fireEvent("swfReady",R);}else{if(R.type=="log"){}else{if(this._host&&this._host.fireEvent){this._host.fireEvent(R.type,R);}else{this.fireEvent(R.type,R);}}}},callSWF:function(S,R){if(!R){R=[];}if(this._swf[S]){return(this._swf[S].apply(this._swf,R));}else{return null;}},toString:function(){return"SWF "+this._id;}});})();YAHOO.register("swf",YAHOO.widget.SWF,{version:"2.8.0r4",build:"2446"});
    if (!Y.YUI2) {
        Y.YUI2 = YAHOO;
    }
    if (!YAHOO._activ && YAHOO.util.Event) {
        YAHOO._activ = true;
        YAHOO.util.Event._load();
    }
}, '2.8.0' ,{"requires": ["yui2-yahoo", "yui2-dom", "yui2-event", "yui2-element"], "supersedes": ["yui2-swfdetect"]});
