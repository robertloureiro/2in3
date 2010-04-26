YUI.add('yui2-selector', function(Y) {
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
(function(){var A=YAHOO.util;A.Selector={_foundCache:[],_regexCache:{},_re:{nth:/^(?:([-]?\d*)(n){1}|(odd|even)$)*([-+]?\d*)$/,attr:/(\[.*\])/g,urls:/^(?:href|src)/},document:window.document,attrAliases:{},shorthand:{"\\#(-?[_a-z]+[-\\w]*)":"[id=$1]","\\.(-?[_a-z]+[-\\w]*)":"[class~=$1]"},operators:{"=":function(B,C){return B===C;},"!=":function(B,C){return B!==C;},"~=":function(B,D){var C=" ";return(C+B+C).indexOf((C+D+C))>-1;},"|=":function(B,C){return B===C||B.slice(0,C.length+1)===C+"-";},"^=":function(B,C){return B.indexOf(C)===0;},"$=":function(B,C){return B.slice(-C.length)===C;},"*=":function(B,C){return B.indexOf(C)>-1;},"":function(B,C){return B;}},pseudos:{"root":function(B){return B===B.ownerDocument.documentElement;},"nth-child":function(B,C){return A.Selector._getNth(B,C);},"nth-last-child":function(B,C){return A.Selector._getNth(B,C,null,true);},"nth-of-type":function(B,C){return A.Selector._getNth(B,C,B.tagName);},"nth-last-of-type":function(B,C){return A.Selector._getNth(B,C,B.tagName,true);},"first-child":function(B){return A.Selector._getChildren(B.parentNode)[0]===B;},"last-child":function(C){var B=A.Selector._getChildren(C.parentNode);return B[B.length-1]===C;},"first-of-type":function(B,C){return A.Selector._getChildren(B.parentNode,B.tagName)[0];},"last-of-type":function(C,D){var B=A.Selector._getChildren(C.parentNode,C.tagName);return B[B.length-1];},"only-child":function(C){var B=A.Selector._getChildren(C.parentNode);return B.length===1&&B[0]===C;},"only-of-type":function(B){return A.Selector._getChildren(B.parentNode,B.tagName).length===1;},"empty":function(B){return B.childNodes.length===0;},"not":function(B,C){return !A.Selector.test(B,C);},"contains":function(B,D){var C=B.innerText||B.textContent||"";return C.indexOf(D)>-1;},"checked":function(B){return B.checked===true;}},test:function(F,D){F=A.Selector.document.getElementById(F)||F;if(!F){return false;}var C=D?D.split(","):[];if(C.length){for(var E=0,B=C.length;E<B;++E){if(A.Selector._test(F,C[E])){return true;}}return false;}return A.Selector._test(F,D);},_test:function(D,G,F,E){F=F||A.Selector._tokenize(G).pop()||{};if(!D.tagName||(F.tag!=="*"&&D.tagName!==F.tag)||(E&&D._found)){return false;}if(F.attributes.length){var B,H,C=A.Selector._re.urls;if(!D.attributes||!D.attributes.length){return false;}for(var I=0,K;K=F.attributes[I++];){H=(C.test(K[0]))?2:0;B=D.getAttribute(K[0],H);if(B===null||B===undefined){return false;}if(A.Selector.operators[K[1]]&&!A.Selector.operators[K[1]](B,K[2])){return false;}}}if(F.pseudos.length){for(var I=0,J=F.pseudos.length;I<J;++I){if(A.Selector.pseudos[F.pseudos[I][0]]&&!A.Selector.pseudos[F.pseudos[I][0]](D,F.pseudos[I][1])){return false;}}}return(F.previous&&F.previous.combinator!==",")?A.Selector._combinators[F.previous.combinator](D,F):true;},filter:function(E,D){E=E||[];var G,C=[],H=A.Selector._tokenize(D);if(!E.item){for(var F=0,B=E.length;F<B;++F){if(!E[F].tagName){G=A.Selector.document.getElementById(E[F]);if(G){E[F]=G;}else{}}}}C=A.Selector._filter(E,A.Selector._tokenize(D)[0]);return C;},_filter:function(E,G,H,D){var C=H?null:[],I=A.Selector._foundCache;for(var F=0,B=E.length;F<B;F++){if(!A.Selector._test(E[F],"",G,D)){continue;}if(H){return E[F];}if(D){if(E[F]._found){continue;}E[F]._found=true;I[I.length]=E[F];}C[C.length]=E[F];}return C;},query:function(C,D,E){var B=A.Selector._query(C,D,E);return B;},_query:function(H,M,N,F){var P=(N)?null:[],E;if(!H){return P;}var D=H.split(",");if(D.length>1){var O;for(var I=0,J=D.length;I<J;++I){O=A.Selector._query(D[I],M,N,true);P=N?O:P.concat(O);}A.Selector._clearFoundCache();return P;}if(M&&!M.nodeName){M=A.Selector.document.getElementById(M);if(!M){return P;}}M=M||A.Selector.document;if(M.nodeName!=="#document"){A.Dom.generateId(M);H=M.tagName+"#"+M.id+" "+H;E=M;M=M.ownerDocument;}var L=A.Selector._tokenize(H);var K=L[A.Selector._getIdTokenIndex(L)],B=[],C,G=L.pop()||{};if(K){C=A.Selector._getId(K.attributes);}if(C){E=E||A.Selector.document.getElementById(C);if(E&&(M.nodeName==="#document"||A.Dom.isAncestor(M,E))){if(A.Selector._test(E,null,K)){if(K===G){B=[E];}else{if(K.combinator===" "||K.combinator===">"){M=E;}}}}else{return P;}}if(M&&!B.length){B=M.getElementsByTagName(G.tag);}if(B.length){P=A.Selector._filter(B,G,N,F);}return P;},_clearFoundCache:function(){var E=A.Selector._foundCache;for(var C=0,B=E.length;C<B;++C){try{delete E[C]._found;}catch(D){E[C].removeAttribute("_found");}}E=[];},_getRegExp:function(D,B){var C=A.Selector._regexCache;B=B||"";if(!C[D+B]){C[D+B]=new RegExp(D,B);}return C[D+B];},_getChildren:function(){if(document.documentElement.children&&document.documentElement.children.tags){return function(C,B){return(B)?C.children.tags(B):C.children||[];};}else{return function(F,C){var E=[],G=F.childNodes;for(var D=0,B=G.length;D<B;++D){if(G[D].tagName){if(!C||G[D].tagName===C){E.push(G[D]);}}}return E;};}}(),_combinators:{" ":function(C,B){while((C=C.parentNode)){if(A.Selector._test(C,"",B.previous)){return true;}}return false;},">":function(C,B){return A.Selector._test(C.parentNode,null,B.previous);},"+":function(D,C){var B=D.previousSibling;while(B&&B.nodeType!==1){B=B.previousSibling;}if(B&&A.Selector._test(B,null,C.previous)){return true;}return false;},"~":function(D,C){var B=D.previousSibling;while(B){if(B.nodeType===1&&A.Selector._test(B,null,C.previous)){return true;}B=B.previousSibling;}return false;}},_getNth:function(C,L,N,G){A.Selector._re.nth.test(L);var K=parseInt(RegExp.$1,10),B=RegExp.$2,H=RegExp.$3,I=parseInt(RegExp.$4,10)||0,M=[],E;var J=A.Selector._getChildren(C.parentNode,N);if(H){K=2;E="+";B="n";I=(H==="odd")?1:0;}else{if(isNaN(K)){K=(B)?1:0;}}if(K===0){if(G){I=J.length-I+1;}if(J[I-1]===C){return true;}else{return false;}}else{if(K<0){G=!!G;K=Math.abs(K);}}if(!G){for(var D=I-1,F=J.length;D<F;D+=K){if(D>=0&&J[D]===C){return true;}}}else{for(var D=J.length-I,F=J.length;D>=0;D-=K){if(D<F&&J[D]===C){return true;}}}return false;},_getId:function(C){for(var D=0,B=C.length;D<B;++D){if(C[D][0]=="id"&&C[D][1]==="="){return C[D][2];
}}},_getIdTokenIndex:function(D){for(var C=0,B=D.length;C<B;++C){if(A.Selector._getId(D[C].attributes)){return C;}}return -1;},_patterns:{tag:/^((?:-?[_a-z]+[\w-]*)|\*)/i,attributes:/^\[([a-z]+\w*)+([~\|\^\$\*!=]=?)?['"]?([^\]]*?)['"]?\]/i,pseudos:/^:([-\w]+)(?:\(['"]?(.+)['"]?\))*/i,combinator:/^\s*([>+~]|\s)\s*/},_tokenize:function(B){var D={},H=[],I,G=false,F=A.Selector._patterns,C;B=A.Selector._replaceShorthand(B);do{G=false;for(var E in F){if(YAHOO.lang.hasOwnProperty(F,E)){if(E!="tag"&&E!="combinator"){D[E]=D[E]||[];}if((C=F[E].exec(B))){G=true;if(E!="tag"&&E!="combinator"){if(E==="attributes"&&C[1]==="id"){D.id=C[3];}D[E].push(C.slice(1));}else{D[E]=C[1];}B=B.replace(C[0],"");if(E==="combinator"||!B.length){D.attributes=A.Selector._fixAttributes(D.attributes);D.pseudos=D.pseudos||[];D.tag=D.tag?D.tag.toUpperCase():"*";H.push(D);D={previous:D};}}}}}while(G);return H;},_fixAttributes:function(C){var D=A.Selector.attrAliases;C=C||[];for(var E=0,B=C.length;E<B;++E){if(D[C[E][0]]){C[E][0]=D[C[E][0]];}if(!C[E][1]){C[E][1]="";}}return C;},_replaceShorthand:function(C){var D=A.Selector.shorthand;var E=C.match(A.Selector._re.attr);if(E){C=C.replace(A.Selector._re.attr,"REPLACED_ATTRIBUTE");}for(var G in D){if(YAHOO.lang.hasOwnProperty(D,G)){C=C.replace(A.Selector._getRegExp(G,"gi"),D[G]);}}if(E){for(var F=0,B=E.length;F<B;++F){C=C.replace("REPLACED_ATTRIBUTE",E[F]);}}return C;}};if(YAHOO.env.ua.ie&&YAHOO.env.ua.ie<8){A.Selector.attrAliases["class"]="className";A.Selector.attrAliases["for"]="htmlFor";}})();YAHOO.register("selector",YAHOO.util.Selector,{version:"2.8.0r4",build:"2446"});
    if (!Y.YUI2) {
        Y.YUI2 = YAHOO;
    }
    if (!YAHOO._activ && YAHOO.util.Event) {
        YAHOO._activ = true;
        YAHOO.util.Event._load();
    }
}, '2.8.0' ,{"requires": ["yui2-yahoo", "yui2-dom"]});
