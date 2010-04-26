YUI.add('yui2-logger', function(Y) {
    if (Y.YUI2) {
        var YAHOO    = Y.YUI2,
            window   = Y.config.win,
            document = Y.config.doc;
    }
    /*
Copyright (c) 2007, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.net/yui/license.txt
version: 2.4.1
*/
YAHOO.widget.LogMsg=function(A){if(A&&(A.constructor==Object)){for(var B in A){this[B]=A[B];}}};YAHOO.widget.LogMsg.prototype.msg=null;YAHOO.widget.LogMsg.prototype.time=null;YAHOO.widget.LogMsg.prototype.category=null;YAHOO.widget.LogMsg.prototype.source=null;YAHOO.widget.LogMsg.prototype.sourceDetail=null;YAHOO.widget.LogWriter=function(A){if(!A){YAHOO.log("Could not instantiate LogWriter due to invalid source.","error","LogWriter");return ;}this._source=A;};YAHOO.widget.LogWriter.prototype.toString=function(){return"LogWriter "+this._sSource;};YAHOO.widget.LogWriter.prototype.log=function(A,B){YAHOO.widget.Logger.log(A,B,this._source);};YAHOO.widget.LogWriter.prototype.getSource=function(){return this._sSource;};YAHOO.widget.LogWriter.prototype.setSource=function(A){if(!A){YAHOO.log("Could not set source due to invalid source.","error",this.toString());return ;}else{this._sSource=A;}};YAHOO.widget.LogWriter.prototype._source=null;YAHOO.widget.LogReader=function(B,A){this._sName=YAHOO.widget.LogReader._index;YAHOO.widget.LogReader._index++;this._buffer=[];this._filterCheckboxes={};this._lastTime=YAHOO.widget.Logger.getStartTime();if(A&&(A.constructor==Object)){for(var C in A){this[C]=A[C];}}this._initContainerEl(B);if(!this._elContainer){YAHOO.log("Could not instantiate LogReader due to an invalid container element "+B,"error",this.toString());return ;}this._initHeaderEl();this._initConsoleEl();this._initFooterEl();this._initDragDrop();this._initCategories();this._initSources();YAHOO.widget.Logger.newLogEvent.subscribe(this._onNewLog,this);YAHOO.widget.Logger.logResetEvent.subscribe(this._onReset,this);YAHOO.widget.Logger.categoryCreateEvent.subscribe(this._onCategoryCreate,this);YAHOO.widget.Logger.sourceCreateEvent.subscribe(this._onSourceCreate,this);this._filterLogs();YAHOO.log("LogReader initialized",null,this.toString());};YAHOO.widget.LogReader.prototype.logReaderEnabled=true;YAHOO.widget.LogReader.prototype.width=null;YAHOO.widget.LogReader.prototype.height=null;YAHOO.widget.LogReader.prototype.top=null;YAHOO.widget.LogReader.prototype.left=null;YAHOO.widget.LogReader.prototype.right=null;YAHOO.widget.LogReader.prototype.bottom=null;YAHOO.widget.LogReader.prototype.fontSize=null;YAHOO.widget.LogReader.prototype.footerEnabled=true;YAHOO.widget.LogReader.prototype.verboseOutput=true;YAHOO.widget.LogReader.prototype.newestOnTop=true;YAHOO.widget.LogReader.prototype.outputBuffer=100;YAHOO.widget.LogReader.prototype.thresholdMax=500;YAHOO.widget.LogReader.prototype.thresholdMin=100;YAHOO.widget.LogReader.prototype.isCollapsed=false;YAHOO.widget.LogReader.prototype.isPaused=false;YAHOO.widget.LogReader.prototype.draggable=true;YAHOO.widget.LogReader.prototype.toString=function(){return"LogReader instance"+this._sName;};YAHOO.widget.LogReader.prototype.pause=function(){this.isPaused=true;this._btnPause.value="Resume";this._timeout=null;this.logReaderEnabled=false;};YAHOO.widget.LogReader.prototype.resume=function(){this.isPaused=false;this._btnPause.value="Pause";this.logReaderEnabled=true;this._printBuffer();};YAHOO.widget.LogReader.prototype.hide=function(){this._elContainer.style.display="none";};YAHOO.widget.LogReader.prototype.show=function(){this._elContainer.style.display="block";};YAHOO.widget.LogReader.prototype.collapse=function(){this._elConsole.style.display="none";if(this._elFt){this._elFt.style.display="none";}this._btnCollapse.value="Expand";this.isCollapsed=true;};YAHOO.widget.LogReader.prototype.expand=function(){this._elConsole.style.display="block";if(this._elFt){this._elFt.style.display="block";}this._btnCollapse.value="Collapse";this.isCollapsed=false;};YAHOO.widget.LogReader.prototype.getCheckbox=function(A){return this._filterCheckboxes[A];};YAHOO.widget.LogReader.prototype.getCategories=function(){return this._categoryFilters;};YAHOO.widget.LogReader.prototype.showCategory=function(B){var D=this._categoryFilters;if(D.indexOf){if(D.indexOf(B)>-1){return ;}}else{for(var A=0;A<D.length;A++){if(D[A]===B){return ;}}}this._categoryFilters.push(B);this._filterLogs();var C=this.getCheckbox(B);if(C){C.checked=true;}};YAHOO.widget.LogReader.prototype.hideCategory=function(B){var D=this._categoryFilters;for(var A=0;A<D.length;A++){if(B==D[A]){D.splice(A,1);break;}}this._filterLogs();var C=this.getCheckbox(B);if(C){C.checked=false;}};YAHOO.widget.LogReader.prototype.getSources=function(){return this._sourceFilters;};YAHOO.widget.LogReader.prototype.showSource=function(A){var D=this._sourceFilters;if(D.indexOf){if(D.indexOf(A)>-1){return ;}}else{for(var B=0;B<D.length;B++){if(A==D[B]){return ;}}}D.push(A);this._filterLogs();var C=this.getCheckbox(A);if(C){C.checked=true;}};YAHOO.widget.LogReader.prototype.hideSource=function(A){var D=this._sourceFilters;for(var B=0;B<D.length;B++){if(A==D[B]){D.splice(B,1);break;}}this._filterLogs();var C=this.getCheckbox(A);if(C){C.checked=false;}};YAHOO.widget.LogReader.prototype.clearConsole=function(){this._timeout=null;this._buffer=[];this._consoleMsgCount=0;var A=this._elConsole;while(A.hasChildNodes()){A.removeChild(A.firstChild);}};YAHOO.widget.LogReader.prototype.setTitle=function(A){this._title.innerHTML=this.html2Text(A);};YAHOO.widget.LogReader.prototype.getLastTime=function(){return this._lastTime;};YAHOO.widget.LogReader.prototype.formatMsg=function(D){var E=D.category;var L=E.substring(0,4).toUpperCase();var I=D.time;var J;if(I.toLocaleTimeString){J=I.toLocaleTimeString();}else{J=I.toString();}var B=I.getTime();var F=YAHOO.widget.Logger.getStartTime();var C=B-F;var N=B-this.getLastTime();var A=D.source;var M=D.sourceDetail;var K=(M)?A+" "+M:A;var H=this.html2Text(YAHOO.lang.dump(D.msg));var G=(this.verboseOutput)?["<pre class=\"yui-log-verbose\"><p><span class='",E,"'>",L,"</span> ",C,"ms (+",N,") ",J,": ","</p><p>",K,": </p><p>",H,"</p></pre>"]:["<pre><p><span class='",E,"'>",L,"</span> ",C,"ms (+",N,") ",J,": ",K,": ",H,"</p></pre>"];return G.join("");};YAHOO.widget.LogReader.prototype.html2Text=function(A){if(A){A+="";return A.replace(/&/g,"&#38;").replace(/</g,"&#60;").replace(/>/g,"&#62;");
}return"";};YAHOO.widget.LogReader._index=0;YAHOO.widget.LogReader.prototype._sName=null;YAHOO.widget.LogReader.prototype._buffer=null;YAHOO.widget.LogReader.prototype._consoleMsgCount=0;YAHOO.widget.LogReader.prototype._lastTime=null;YAHOO.widget.LogReader.prototype._timeout=null;YAHOO.widget.LogReader.prototype._filterCheckboxes=null;YAHOO.widget.LogReader.prototype._categoryFilters=null;YAHOO.widget.LogReader.prototype._sourceFilters=null;YAHOO.widget.LogReader.prototype._elContainer=null;YAHOO.widget.LogReader.prototype._elHd=null;YAHOO.widget.LogReader.prototype._elCollapse=null;YAHOO.widget.LogReader.prototype._btnCollapse=null;YAHOO.widget.LogReader.prototype._title=null;YAHOO.widget.LogReader.prototype._elConsole=null;YAHOO.widget.LogReader.prototype._elFt=null;YAHOO.widget.LogReader.prototype._elBtns=null;YAHOO.widget.LogReader.prototype._elCategoryFilters=null;YAHOO.widget.LogReader.prototype._elSourceFilters=null;YAHOO.widget.LogReader.prototype._btnPause=null;YAHOO.widget.LogReader.prototype._btnClear=null;YAHOO.widget.LogReader.prototype._initContainerEl=function(B){B=YAHOO.util.Dom.get(B);if(B&&B.tagName&&(B.tagName.toLowerCase()=="div")){this._elContainer=B;YAHOO.util.Dom.addClass(this._elContainer,"yui-log");}else{this._elContainer=document.body.appendChild(document.createElement("div"));YAHOO.util.Dom.addClass(this._elContainer,"yui-log");YAHOO.util.Dom.addClass(this._elContainer,"yui-log-container");var A=this._elContainer.style;if(this.width){A.width=this.width;}if(this.right){A.right=this.right;}if(this.top){A.top=this.top;}if(this.left){A.left=this.left;A.right="auto";}if(this.bottom){A.bottom=this.bottom;A.top="auto";}if(this.fontSize){A.fontSize=this.fontSize;}if(navigator.userAgent.toLowerCase().indexOf("opera")!=-1){document.body.style+="";}}};YAHOO.widget.LogReader.prototype._initHeaderEl=function(){var A=this;if(this._elHd){YAHOO.util.Event.purgeElement(this._elHd,true);this._elHd.innerHTML="";}this._elHd=this._elContainer.appendChild(document.createElement("div"));this._elHd.id="yui-log-hd"+this._sName;this._elHd.className="yui-log-hd";this._elCollapse=this._elHd.appendChild(document.createElement("div"));this._elCollapse.className="yui-log-btns";this._btnCollapse=document.createElement("input");this._btnCollapse.type="button";this._btnCollapse.className="yui-log-button";this._btnCollapse.value="Collapse";this._btnCollapse=this._elCollapse.appendChild(this._btnCollapse);YAHOO.util.Event.addListener(A._btnCollapse,"click",A._onClickCollapseBtn,A);this._title=this._elHd.appendChild(document.createElement("h4"));this._title.innerHTML="Logger Console";};YAHOO.widget.LogReader.prototype._initConsoleEl=function(){if(this._elConsole){YAHOO.util.Event.purgeElement(this._elConsole,true);this._elConsole.innerHTML="";}this._elConsole=this._elContainer.appendChild(document.createElement("div"));this._elConsole.className="yui-log-bd";if(this.height){this._elConsole.style.height=this.height;}};YAHOO.widget.LogReader.prototype._initFooterEl=function(){var A=this;if(this.footerEnabled){if(this._elFt){YAHOO.util.Event.purgeElement(this._elFt,true);this._elFt.innerHTML="";}this._elFt=this._elContainer.appendChild(document.createElement("div"));this._elFt.className="yui-log-ft";this._elBtns=this._elFt.appendChild(document.createElement("div"));this._elBtns.className="yui-log-btns";this._btnPause=document.createElement("input");this._btnPause.type="button";this._btnPause.className="yui-log-button";this._btnPause.value="Pause";this._btnPause=this._elBtns.appendChild(this._btnPause);YAHOO.util.Event.addListener(A._btnPause,"click",A._onClickPauseBtn,A);this._btnClear=document.createElement("input");this._btnClear.type="button";this._btnClear.className="yui-log-button";this._btnClear.value="Clear";this._btnClear=this._elBtns.appendChild(this._btnClear);YAHOO.util.Event.addListener(A._btnClear,"click",A._onClickClearBtn,A);this._elCategoryFilters=this._elFt.appendChild(document.createElement("div"));this._elCategoryFilters.className="yui-log-categoryfilters";this._elSourceFilters=this._elFt.appendChild(document.createElement("div"));this._elSourceFilters.className="yui-log-sourcefilters";}};YAHOO.widget.LogReader.prototype._initDragDrop=function(){if(YAHOO.util.DD&&this.draggable&&this._elHd){var A=new YAHOO.util.DD(this._elContainer);A.setHandleElId(this._elHd.id);this._elHd.style.cursor="move";}};YAHOO.widget.LogReader.prototype._initCategories=function(){this._categoryFilters=[];var C=YAHOO.widget.Logger.categories;for(var A=0;A<C.length;A++){var B=C[A];this._categoryFilters.push(B);if(this._elCategoryFilters){this._createCategoryCheckbox(B);}}};YAHOO.widget.LogReader.prototype._initSources=function(){this._sourceFilters=[];var C=YAHOO.widget.Logger.sources;for(var B=0;B<C.length;B++){var A=C[B];this._sourceFilters.push(A);if(this._elSourceFilters){this._createSourceCheckbox(A);}}};YAHOO.widget.LogReader.prototype._createCategoryCheckbox=function(B){var A=this;if(this._elFt){var E=this._elCategoryFilters;var D=E.appendChild(document.createElement("span"));D.className="yui-log-filtergrp";var C=document.createElement("input");C.id="yui-log-filter-"+B+this._sName;C.className="yui-log-filter-"+B;C.type="checkbox";C.category=B;C=D.appendChild(C);C.checked=true;YAHOO.util.Event.addListener(C,"click",A._onCheckCategory,A);var F=D.appendChild(document.createElement("label"));F.htmlFor=C.id;F.className=B;F.innerHTML=B;this._filterCheckboxes[B]=C;}};YAHOO.widget.LogReader.prototype._createSourceCheckbox=function(A){var D=this;if(this._elFt){var F=this._elSourceFilters;var E=F.appendChild(document.createElement("span"));E.className="yui-log-filtergrp";var C=document.createElement("input");C.id="yui-log-filter"+A+this._sName;C.className="yui-log-filter"+A;C.type="checkbox";C.source=A;C=E.appendChild(C);C.checked=true;YAHOO.util.Event.addListener(C,"click",D._onCheckSource,D);var B=E.appendChild(document.createElement("label"));B.htmlFor=C.id;B.className=A;B.innerHTML=A;this._filterCheckboxes[A]=C;
}};YAHOO.widget.LogReader.prototype._filterLogs=function(){if(this._elConsole!==null){this.clearConsole();this._printToConsole(YAHOO.widget.Logger.getStack());}};YAHOO.widget.LogReader.prototype._printBuffer=function(){this._timeout=null;if(this._elConsole!==null){var B=this.thresholdMax;B=(B&&!isNaN(B))?B:500;if(this._consoleMsgCount<B){var A=[];for(var C=0;C<this._buffer.length;C++){A[C]=this._buffer[C];}this._buffer=[];this._printToConsole(A);}else{this._filterLogs();}if(!this.newestOnTop){this._elConsole.scrollTop=this._elConsole.scrollHeight;}}};YAHOO.widget.LogReader.prototype._printToConsole=function(J){var B=J.length;var O=this.thresholdMin;if(isNaN(O)||(O>this.thresholdMax)){O=0;}var L=(B>O)?(B-O):0;var C=this._sourceFilters.length;var M=this._categoryFilters.length;for(var I=L;I<B;I++){var F=false;var K=false;var N=J[I];var A=N.source;var D=N.category;for(var H=0;H<C;H++){if(A==this._sourceFilters[H]){K=true;break;}}if(K){for(var G=0;G<M;G++){if(D==this._categoryFilters[G]){F=true;break;}}}if(F){var E=this.formatMsg(N);if(this.newestOnTop){this._elConsole.innerHTML=E+this._elConsole.innerHTML;}else{this._elConsole.innerHTML+=E;}this._consoleMsgCount++;this._lastTime=N.time.getTime();}}};YAHOO.widget.LogReader.prototype._onCategoryCreate=function(D,C,A){var B=C[0];A._categoryFilters.push(B);if(A._elFt){A._createCategoryCheckbox(B);}};YAHOO.widget.LogReader.prototype._onSourceCreate=function(D,C,A){var B=C[0];A._sourceFilters.push(B);if(A._elFt){A._createSourceCheckbox(B);}};YAHOO.widget.LogReader.prototype._onCheckCategory=function(A,B){var C=this.category;if(!this.checked){B.hideCategory(C);}else{B.showCategory(C);}};YAHOO.widget.LogReader.prototype._onCheckSource=function(A,B){var C=this.source;if(!this.checked){B.hideSource(C);}else{B.showSource(C);}};YAHOO.widget.LogReader.prototype._onClickCollapseBtn=function(A,B){if(!B.isCollapsed){B.collapse();}else{B.expand();}};YAHOO.widget.LogReader.prototype._onClickPauseBtn=function(A,B){if(!B.isPaused){B.pause();}else{B.resume();}};YAHOO.widget.LogReader.prototype._onClickClearBtn=function(A,B){B.clearConsole();};YAHOO.widget.LogReader.prototype._onNewLog=function(D,C,A){var B=C[0];A._buffer.push(B);if(A.logReaderEnabled===true&&A._timeout===null){A._timeout=setTimeout(function(){A._printBuffer();},A.outputBuffer);}};YAHOO.widget.LogReader.prototype._onReset=function(C,B,A){A._filterLogs();};if(!YAHOO.widget.Logger){YAHOO.widget.Logger={loggerEnabled:true,_browserConsoleEnabled:false,categories:["info","warn","error","time","window"],sources:["global"],_stack:[],maxStackEntries:2500,_startTime:new Date().getTime(),_lastTime:null,_windowErrorsHandled:false,_origOnWindowError:null};YAHOO.widget.Logger.log=function(B,F,G){if(this.loggerEnabled){if(!F){F="info";}else{F=F.toLocaleLowerCase();if(this._isNewCategory(F)){this._createNewCategory(F);}}var C="global";var A=null;if(G){var D=G.indexOf(" ");if(D>0){C=G.substring(0,D);A=G.substring(D,G.length);}else{C=G;}if(this._isNewSource(C)){this._createNewSource(C);}}var H=new Date();var J=new YAHOO.widget.LogMsg({msg:B,time:H,category:F,source:C,sourceDetail:A});var I=this._stack;var E=this.maxStackEntries;if(E&&!isNaN(E)&&(I.length>=E)){I.shift();}I.push(J);this.newLogEvent.fire(J);if(this._browserConsoleEnabled){this._printToBrowserConsole(J);}return true;}else{return false;}};YAHOO.widget.Logger.reset=function(){this._stack=[];this._startTime=new Date().getTime();this.loggerEnabled=true;this.log("Logger reset");this.logResetEvent.fire();};YAHOO.widget.Logger.getStack=function(){return this._stack;};YAHOO.widget.Logger.getStartTime=function(){return this._startTime;};YAHOO.widget.Logger.disableBrowserConsole=function(){YAHOO.log("Logger output to the function console.log() has been disabled.");this._browserConsoleEnabled=false;};YAHOO.widget.Logger.enableBrowserConsole=function(){this._browserConsoleEnabled=true;YAHOO.log("Logger output to the function console.log() has been enabled.");};YAHOO.widget.Logger.handleWindowErrors=function(){if(!YAHOO.widget.Logger._windowErrorsHandled){if(window.error){YAHOO.widget.Logger._origOnWindowError=window.onerror;}window.onerror=YAHOO.widget.Logger._onWindowError;YAHOO.widget.Logger._windowErrorsHandled=true;YAHOO.log("Logger handling of window.onerror has been enabled.");}else{YAHOO.log("Logger handling of window.onerror had already been enabled.");}};YAHOO.widget.Logger.unhandleWindowErrors=function(){if(YAHOO.widget.Logger._windowErrorsHandled){if(YAHOO.widget.Logger._origOnWindowError){window.onerror=YAHOO.widget.Logger._origOnWindowError;YAHOO.widget.Logger._origOnWindowError=null;}else{window.onerror=null;}YAHOO.widget.Logger._windowErrorsHandled=false;YAHOO.log("Logger handling of window.onerror has been disabled.");}else{YAHOO.log("Logger handling of window.onerror had already been disabled.");}};YAHOO.widget.Logger.categoryCreateEvent=new YAHOO.util.CustomEvent("categoryCreate",this,true);YAHOO.widget.Logger.sourceCreateEvent=new YAHOO.util.CustomEvent("sourceCreate",this,true);YAHOO.widget.Logger.newLogEvent=new YAHOO.util.CustomEvent("newLog",this,true);YAHOO.widget.Logger.logResetEvent=new YAHOO.util.CustomEvent("logReset",this,true);YAHOO.widget.Logger._createNewCategory=function(A){this.categories.push(A);this.categoryCreateEvent.fire(A);};YAHOO.widget.Logger._isNewCategory=function(B){for(var A=0;A<this.categories.length;A++){if(B==this.categories[A]){return false;}}return true;};YAHOO.widget.Logger._createNewSource=function(A){this.sources.push(A);this.sourceCreateEvent.fire(A);};YAHOO.widget.Logger._isNewSource=function(A){if(A){for(var B=0;B<this.sources.length;B++){if(A==this.sources[B]){return false;}}return true;}};YAHOO.widget.Logger._printToBrowserConsole=function(C){if(window.console&&console.log){var E=C.category;var D=C.category.substring(0,4).toUpperCase();var G=C.time;var F;if(G.toLocaleTimeString){F=G.toLocaleTimeString();}else{F=G.toString();}var H=G.getTime();var B=(YAHOO.widget.Logger._lastTime)?(H-YAHOO.widget.Logger._lastTime):0;
YAHOO.widget.Logger._lastTime=H;var A=F+" ("+B+"ms): "+C.source+": "+C.msg;console.log(A);}};YAHOO.widget.Logger._onWindowError=function(A,C,B){try{YAHOO.widget.Logger.log(A+" ("+C+", line "+B+")","window");if(YAHOO.widget.Logger._origOnWindowError){YAHOO.widget.Logger._origOnWindowError();}}catch(D){return false;}};YAHOO.widget.Logger.log("Logger initialized");}YAHOO.register("logger",YAHOO.widget.Logger,{version:"2.4.1",build:"742"});
    if (!Y.YUI2) {
        Y.YUI2 = YAHOO;
    }
    if (!YAHOO._activ && YAHOO.util.Event) {
        YAHOO._activ = true;
        YAHOO.util.Event._load();
    }
}, '2.4.1' ,{"requires": ["yui2-yahoo", "yui2-dom", "yui2-event", "yui2-skin-sam-logger"], "optional": ["yui2-dragdrop"]});
