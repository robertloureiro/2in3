YUI.add('yui2-get', function(Y) {
    if (Y.YUI2) {
        var YAHOO    = Y.YUI2,
            window   = Y.config.win,
            document = Y.config.doc;
    }
    /*
Copyright (c) 2008, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.5.2
*/
YAHOO.util.Get=function(){var M={},L=0,Q=0,E=false,N=YAHOO.env.ua,R=YAHOO.lang;var J=function(V,S,W){var T=W||window,X=T.document,Y=X.createElement(V);for(var U in S){if(S[U]&&YAHOO.lang.hasOwnProperty(S,U)){Y.setAttribute(U,S[U]);}}return Y;};var H=function(S,T,V){var U=V||"utf-8";return J("link",{"id":"yui__dyn_"+(Q++),"type":"text/css","charset":U,"rel":"stylesheet","href":S},T);};var O=function(S,T,V){var U=V||"utf-8";return J("script",{"id":"yui__dyn_"+(Q++),"type":"text/javascript","charset":U,"src":S},T);};var A=function(S,T){return{tId:S.tId,win:S.win,data:S.data,nodes:S.nodes,msg:T,purge:function(){D(this.tId);}};};var B=function(S,V){var T=M[V],U=(R.isString(S))?T.win.document.getElementById(S):S;if(!U){P(V,"target node not found: "+S);}return U;};var P=function(V,U){var S=M[V];if(S.onFailure){var T=S.scope||S.win;S.onFailure.call(T,A(S,U));}};var C=function(V){var S=M[V];S.finished=true;if(S.aborted){var U="transaction "+V+" was aborted";P(V,U);return ;}if(S.onSuccess){var T=S.scope||S.win;S.onSuccess.call(T,A(S));}};var G=function(U,Y){var T=M[U];if(T.aborted){var W="transaction "+U+" was aborted";P(U,W);return ;}if(Y){T.url.shift();if(T.varName){T.varName.shift();}}else{T.url=(R.isString(T.url))?[T.url]:T.url;if(T.varName){T.varName=(R.isString(T.varName))?[T.varName]:T.varName;}}var b=T.win,a=b.document,Z=a.getElementsByTagName("head")[0],V;if(T.url.length===0){if(T.type==="script"&&N.webkit&&N.webkit<420&&!T.finalpass&&!T.varName){var X=O(null,T.win,T.charset);X.innerHTML='YAHOO.util.Get._finalize("'+U+'");';T.nodes.push(X);Z.appendChild(X);}else{C(U);}return ;}var S=T.url[0];if(T.type==="script"){V=O(S,b,T.charset);}else{V=H(S,b,T.charset);}F(T.type,V,U,S,b,T.url.length);T.nodes.push(V);if(T.insertBefore){var c=B(T.insertBefore,U);if(c){c.parentNode.insertBefore(V,c);}}else{Z.appendChild(V);}if((N.webkit||N.gecko)&&T.type==="css"){G(U,S);}};var K=function(){if(E){return ;}E=true;for(var S in M){var T=M[S];if(T.autopurge&&T.finished){D(T.tId);delete M[S];}}E=false;};var D=function(Z){var W=M[Z];if(W){var Y=W.nodes,S=Y.length,X=W.win.document,V=X.getElementsByTagName("head")[0];if(W.insertBefore){var U=B(W.insertBefore,Z);if(U){V=U.parentNode;}}for(var T=0;T<S;T=T+1){V.removeChild(Y[T]);}}W.nodes=[];};var I=function(T,S,U){var W="q"+(L++);U=U||{};if(L%YAHOO.util.Get.PURGE_THRESH===0){K();}M[W]=R.merge(U,{tId:W,type:T,url:S,finished:false,nodes:[]});var V=M[W];V.win=V.win||window;V.scope=V.scope||V.win;V.autopurge=("autopurge" in V)?V.autopurge:(T==="script")?true:false;R.later(0,V,G,W);return{tId:W};};var F=function(b,W,V,T,X,Y,a){var Z=a||G;if(N.ie){W.onreadystatechange=function(){var c=this.readyState;if("loaded"===c||"complete"===c){Z(V,T);}};}else{if(N.webkit){if(b==="script"){if(N.webkit>=420){W.addEventListener("load",function(){Z(V,T);});}else{var S=M[V];if(S.varName){var U=YAHOO.util.Get.POLL_FREQ;S.maxattempts=YAHOO.util.Get.TIMEOUT/U;S.attempts=0;S._cache=S.varName[0].split(".");S.timer=R.later(U,S,function(h){var e=this._cache,d=e.length,c=this.win,f;for(f=0;f<d;f=f+1){c=c[e[f]];if(!c){this.attempts++;if(this.attempts++>this.maxattempts){var g="Over retry limit, giving up";S.timer.cancel();P(V,g);}else{}return ;}}S.timer.cancel();Z(V,T);},null,true);}else{R.later(YAHOO.util.Get.POLL_FREQ,null,Z,[V,T]);}}}}else{W.onload=function(){Z(V,T);};}}};return{POLL_FREQ:10,PURGE_THRESH:20,TIMEOUT:2000,_finalize:function(S){R.later(0,null,C,S);},abort:function(T){var U=(R.isString(T))?T:T.tId;var S=M[U];if(S){S.aborted=true;}},script:function(S,T){return I("script",S,T);},css:function(S,T){return I("css",S,T);}};}();YAHOO.register("get",YAHOO.util.Get,{version:"2.5.2",build:"1076"});
    if (!Y.YUI2) {
        Y.YUI2 = YAHOO;
    }
    if (!YAHOO._activ && YAHOO.util.Event) {
        YAHOO._activ = true;
        YAHOO.util.Event._load();
    }
}, '2.5.2' ,{"requires": ["yui2-yahoo"]});
