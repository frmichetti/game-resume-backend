(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-30d9b84a"],{"107c":function(e,t,n){var r=n("d039"),i=n("da84"),a=i.RegExp;e.exports=r((function(){var e=a("(?<a>b)","g");return"b"!==e.exec("b").groups.a||"bc"!=="b".replace(e,"$<a>c")}))},1276:function(e,t,n){"use strict";var r=n("2ba4"),i=n("c65b"),a=n("e330"),c=n("d784"),u=n("44e7"),l=n("825a"),o=n("1d80"),s=n("4840"),d=n("8aa5"),f=n("50c4"),p=n("577e"),b=n("dc4a"),h=n("f36a"),g=n("14c3"),v=n("9263"),x=n("9f7f"),O=n("d039"),m=x.UNSUPPORTED_Y,y=4294967295,j=Math.min,E=[].push,I=a(/./.exec),R=a(E),w=a("".slice),T=!O((function(){var e=/(?:)/,t=e.exec;e.exec=function(){return t.apply(this,arguments)};var n="ab".split(e);return 2!==n.length||"a"!==n[0]||"b"!==n[1]}));c("split",(function(e,t,n){var a;return a="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(e,n){var a=p(o(this)),c=void 0===n?y:n>>>0;if(0===c)return[];if(void 0===e)return[a];if(!u(e))return i(t,a,e,c);var l,s,d,f=[],b=(e.ignoreCase?"i":"")+(e.multiline?"m":"")+(e.unicode?"u":"")+(e.sticky?"y":""),g=0,x=new RegExp(e.source,b+"g");while(l=i(v,x,a)){if(s=x.lastIndex,s>g&&(R(f,w(a,g,l.index)),l.length>1&&l.index<a.length&&r(E,f,h(l,1)),d=l[0].length,g=s,f.length>=c))break;x.lastIndex===l.index&&x.lastIndex++}return g===a.length?!d&&I(x,"")||R(f,""):R(f,w(a,g)),f.length>c?h(f,0,c):f}:"0".split(void 0,0).length?function(e,n){return void 0===e&&0===n?[]:i(t,this,e,n)}:t,[function(t,n){var r=o(this),c=void 0==t?void 0:b(t,e);return c?i(c,t,r,n):i(a,p(r),t,n)},function(e,r){var i=l(this),c=p(e),u=n(a,i,c,r,a!==t);if(u.done)return u.value;var o=s(i,RegExp),b=i.unicode,h=(i.ignoreCase?"i":"")+(i.multiline?"m":"")+(i.unicode?"u":"")+(m?"g":"y"),v=new o(m?"^(?:"+i.source+")":i,h),x=void 0===r?y:r>>>0;if(0===x)return[];if(0===c.length)return null===g(v,c)?[c]:[];var O=0,E=0,I=[];while(E<c.length){v.lastIndex=m?0:E;var T,k=g(v,m?w(c,E):c);if(null===k||(T=j(f(v.lastIndex+(m?E:0)),c.length))===O)E=d(c,E,b);else{if(R(I,w(c,O,E)),I.length===x)return I;for(var C=1;C<=k.length-1;C++)if(R(I,k[C]),I.length===x)return I;E=O=T}}return R(I,w(c,O)),I}]}),!T,m)},"14c3":function(e,t,n){var r=n("da84"),i=n("c65b"),a=n("825a"),c=n("1626"),u=n("c6b6"),l=n("9263"),o=r.TypeError;e.exports=function(e,t){var n=e.exec;if(c(n)){var r=i(n,e,t);return null!==r&&a(r),r}if("RegExp"===u(e))return i(l,e,t);throw o("RegExp#exec called on incompatible receiver")}},2532:function(e,t,n){"use strict";var r=n("23e7"),i=n("e330"),a=n("5a34"),c=n("1d80"),u=n("577e"),l=n("ab13"),o=i("".indexOf);r({target:"String",proto:!0,forced:!l("includes")},{includes:function(e){return!!~o(u(c(this)),u(a(e)),arguments.length>1?arguments[1]:void 0)}})},"44e7":function(e,t,n){var r=n("861d"),i=n("c6b6"),a=n("b622"),c=a("match");e.exports=function(e){var t;return r(e)&&(void 0!==(t=e[c])?!!t:"RegExp"==i(e))}},"46a2":function(e,t,n){"use strict";n.r(t);var r=n("7a23"),i={class:"container py-4",style:{"margin-top":"50px"}},a={class:"about"},c=Object(r["i"])("h1",null,"PC Games Table",-1);function u(e,t,n,u,l,o){var s=Object(r["G"])("PCGamesTable");return Object(r["y"])(),Object(r["h"])("div",i,[Object(r["i"])("div",a,[c,Object(r["k"])(s)])])}var l=Object(r["i"])("br",null,null,-1),o=Object(r["i"])("br",null,null,-1),s=Object(r["i"])("br",null,null,-1),d={class:"input-group mb-3"},f=Object(r["i"])("div",{class:"input-group-prepend"},[Object(r["i"])("span",{class:"input-group-text",id:"basic-addon1"},"Search")],-1),p={class:"table table-striped table-hover"},b=Object(r["i"])("thead",null,[Object(r["i"])("tr",null,[Object(r["i"])("th",null,"AppId"),Object(r["i"])("th",null,"System"),Object(r["i"])("th",null,"Title"),Object(r["i"])("th",null,"Finished ?")])],-1),h=["onUpdate:modelValue"];function g(e,t,n,i,a,c){return Object(r["y"])(),Object(r["h"])(r["a"],null,[l,o,s,Object(r["i"])("div",d,[f,Object(r["S"])(Object(r["i"])("input",{type:"text",class:"form-control",placeholder:"Input Game Name","aria-label":"Search","aria-describedby":"basic-addon1","onUpdate:modelValue":t[0]||(t[0]=function(e){return a.searchQuery=e})},null,512),[[r["O"],a.searchQuery]])]),Object(r["i"])("table",p,[b,Object(r["i"])("tbody",null,[(Object(r["y"])(!0),Object(r["h"])(r["a"],null,Object(r["E"])(c.resultQuery,(function(e,t){return Object(r["y"])(),Object(r["h"])("tr",{key:t},[Object(r["i"])("td",null,Object(r["J"])(e.app_id),1),Object(r["i"])("td",null,Object(r["J"])(e.system),1),Object(r["i"])("td",null,Object(r["J"])(e.title),1),Object(r["i"])("td",null,[Object(r["S"])(Object(r["i"])("input",{type:"checkbox","onUpdate:modelValue":function(t){return e.finished=t},disabled:!0},null,8,h),[[r["N"],e.finished]])])])})),128))])])],64)}n("4de4"),n("d3b7"),n("ac1f"),n("1276"),n("caad"),n("2532");var v=n("bc3a"),x=n.n(v),O={name:"PCGamesTable",data:function(){return{searchQuery:null,games:[]}},created:function(){var e=this;x.a.get("".concat("https://games-resume-backend.herokuapp.com","/pc")).then((function(t){e.games=t.data.games}))},computed:{resultQuery:function(){var e=this;return this.searchQuery?this.games.filter((function(t){return e.searchQuery.toLowerCase().split(" ").every((function(e){return t.title.toLowerCase().includes(e)}))})):this.games}}},m=n("6b0d"),y=n.n(m);const j=y()(O,[["render",g]]);var E=j,I={name:"PCGames",components:{PCGamesTable:E}};const R=y()(I,[["render",u]]);t["default"]=R},"4de4":function(e,t,n){"use strict";var r=n("23e7"),i=n("b727").filter,a=n("1dde"),c=a("filter");r({target:"Array",proto:!0,forced:!c},{filter:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}})},"5a34":function(e,t,n){var r=n("da84"),i=n("44e7"),a=r.TypeError;e.exports=function(e){if(i(e))throw a("The method doesn't accept regular expressions");return e}},"8aa5":function(e,t,n){"use strict";var r=n("6547").charAt;e.exports=function(e,t,n){return t+(n?r(e,t).length:1)}},9263:function(e,t,n){"use strict";var r=n("c65b"),i=n("e330"),a=n("577e"),c=n("ad6d"),u=n("9f7f"),l=n("5692"),o=n("7c73"),s=n("69f3").get,d=n("fce3"),f=n("107c"),p=l("native-string-replace",String.prototype.replace),b=RegExp.prototype.exec,h=b,g=i("".charAt),v=i("".indexOf),x=i("".replace),O=i("".slice),m=function(){var e=/a/,t=/b*/g;return r(b,e,"a"),r(b,t,"a"),0!==e.lastIndex||0!==t.lastIndex}(),y=u.UNSUPPORTED_Y||u.BROKEN_CARET,j=void 0!==/()??/.exec("")[1],E=m||j||y||d||f;E&&(h=function(e){var t,n,i,u,l,d,f,E=this,I=s(E),R=a(e),w=I.raw;if(w)return w.lastIndex=E.lastIndex,t=r(h,w,R),E.lastIndex=w.lastIndex,t;var T=I.groups,k=y&&E.sticky,C=r(c,E),P=E.source,S=0,A=R;if(k&&(C=x(C,"y",""),-1===v(C,"g")&&(C+="g"),A=O(R,E.lastIndex),E.lastIndex>0&&(!E.multiline||E.multiline&&"\n"!==g(R,E.lastIndex-1))&&(P="(?: "+P+")",A=" "+A,S++),n=new RegExp("^(?:"+P+")",C)),j&&(n=new RegExp("^"+P+"$(?!\\s)",C)),m&&(i=E.lastIndex),u=r(b,k?n:E,A),k?u?(u.input=O(u.input,S),u[0]=O(u[0],S),u.index=E.lastIndex,E.lastIndex+=u[0].length):E.lastIndex=0:m&&u&&(E.lastIndex=E.global?u.index+u[0].length:i),j&&u&&u.length>1&&r(p,u[0],n,(function(){for(l=1;l<arguments.length-2;l++)void 0===arguments[l]&&(u[l]=void 0)})),u&&T)for(u.groups=d=o(null),l=0;l<T.length;l++)f=T[l],d[f[0]]=u[f[1]];return u}),e.exports=h},"9f7f":function(e,t,n){var r=n("d039"),i=n("da84"),a=i.RegExp;t.UNSUPPORTED_Y=r((function(){var e=a("a","y");return e.lastIndex=2,null!=e.exec("abcd")})),t.BROKEN_CARET=r((function(){var e=a("^r","gy");return e.lastIndex=2,null!=e.exec("str")}))},ab13:function(e,t,n){var r=n("b622"),i=r("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(n){try{return t[i]=!1,"/./"[e](t)}catch(r){}}return!1}},ac1f:function(e,t,n){"use strict";var r=n("23e7"),i=n("9263");r({target:"RegExp",proto:!0,forced:/./.exec!==i},{exec:i})},ad6d:function(e,t,n){"use strict";var r=n("825a");e.exports=function(){var e=r(this),t="";return e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.sticky&&(t+="y"),t}},caad:function(e,t,n){"use strict";var r=n("23e7"),i=n("4d64").includes,a=n("44d2");r({target:"Array",proto:!0},{includes:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),a("includes")},d784:function(e,t,n){"use strict";n("ac1f");var r=n("e330"),i=n("6eeb"),a=n("9263"),c=n("d039"),u=n("b622"),l=n("9112"),o=u("species"),s=RegExp.prototype;e.exports=function(e,t,n,d){var f=u(e),p=!c((function(){var t={};return t[f]=function(){return 7},7!=""[e](t)})),b=p&&!c((function(){var t=!1,n=/a/;return"split"===e&&(n={},n.constructor={},n.constructor[o]=function(){return n},n.flags="",n[f]=/./[f]),n.exec=function(){return t=!0,null},n[f](""),!t}));if(!p||!b||n){var h=r(/./[f]),g=t(f,""[e],(function(e,t,n,i,c){var u=r(e),l=t.exec;return l===a||l===s.exec?p&&!c?{done:!0,value:h(t,n,i)}:{done:!0,value:u(n,t,i)}:{done:!1}}));i(String.prototype,e,g[0]),i(s,f,g[1])}d&&l(s[f],"sham",!0)}},fce3:function(e,t,n){var r=n("d039"),i=n("da84"),a=i.RegExp;e.exports=r((function(){var e=a(".","s");return!(e.dotAll&&e.exec("\n")&&"s"===e.flags)}))}}]);
//# sourceMappingURL=chunk-30d9b84a.224dc3ff.js.map