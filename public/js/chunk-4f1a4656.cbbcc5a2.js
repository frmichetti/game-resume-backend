(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4f1a4656"],{"428f":function(t,e,n){var r=n("da84");t.exports=r},"746f":function(t,e,n){var r=n("428f"),i=n("1a2d"),a=n("e538"),o=n("9bf2").f;t.exports=function(t){var e=r.Symbol||(r.Symbol={});i(e,t)||o(e,t,{value:a.f(t)})}},"74b5":function(t,e,n){"use strict";n.r(e);var r=n("7a23"),i={class:"container py-4",style:{"margin-top":"50px"}},a=Object(r["i"])("h1",null,"Games Resume",-1),o={class:"row"},c={class:"col"},s=Object(r["i"])("h6",null,"Total of Games",-1),l={class:"col"},u=Object(r["i"])("h6",null,"Total of Finished Games",-1);function b(t,e,n,b,f,d){var O=Object(r["G"])("TotalsTable"),h=Object(r["G"])("TotalsFinishedTable");return Object(r["y"])(),Object(r["h"])("div",i,[a,Object(r["i"])("div",o,[Object(r["i"])("div",c,[s,Object(r["k"])(O,{data:this.totals_data},null,8,["data"])]),Object(r["i"])("div",l,[u,Object(r["k"])(h,{data:this.finished_data},null,8,["data"])])])])}var f=n("8785"),d=(n("a4d3"),n("e01a"),{class:"table table-sm table-dark"}),O=Object(r["i"])("thead",null,[Object(r["i"])("tr",null,[Object(r["i"])("th",{scope:"col"},"#"),Object(r["i"])("th",{scope:"col"},"Description"),Object(r["i"])("th",{scope:"col"},"Total")])],-1),h={scope:"row"};function p(t,e,n,i,a,o){return Object(r["y"])(),Object(r["h"])("div",null,[Object(r["i"])("table",d,[O,Object(r["i"])("tbody",null,[(Object(r["y"])(!0),Object(r["h"])(r["a"],null,Object(r["E"])(n.data,(function(t,e){return Object(r["y"])(),Object(r["h"])("tr",{key:e},[Object(r["i"])("th",h,Object(r["J"])(e),1),Object(r["i"])("td",null,Object(r["J"])(t.description),1),Object(r["i"])("td",null,Object(r["J"])(t.total_games),1)])})),128))])])])}var j={name:"TotalsTable",props:{data:Array}},v=n("6b0d"),m=n.n(v);const y=m()(j,[["render",p]]);var g=y,S={class:"table table-sm table-dark"},w=Object(r["i"])("thead",null,[Object(r["i"])("tr",null,[Object(r["i"])("th",{scope:"col"},"#"),Object(r["i"])("th",{scope:"col"},"Description"),Object(r["i"])("th",{scope:"col"},"Total")])],-1),T={scope:"row"};function _(t,e,n,i,a,o){return Object(r["y"])(),Object(r["h"])("div",null,[Object(r["i"])("table",S,[w,Object(r["i"])("tbody",null,[(Object(r["y"])(!0),Object(r["h"])(r["a"],null,Object(r["E"])(n.data,(function(t,e){return Object(r["y"])(),Object(r["h"])("tr",{key:e},[Object(r["i"])("th",T,Object(r["J"])(e),1),Object(r["i"])("td",null,Object(r["J"])(t.description),1),Object(r["i"])("td",null,Object(r["J"])(t.total_games_finished),1)])})),128))])])])}var k={name:"TotalsFinishedTable",props:{data:Array}};const J=m()(k,[["render",_]]);var G,F=J,P=n("e852"),E=Object(P["gql"])(G||(G=Object(f["a"])(["\n  query {\n    total_games: getStatisticsOfTotalGames {\n      description\n      total_games: total\n    }\n\n    finished_games: getStatisticsOfTotalFinishedGames {\n      description\n      total_games_finished:total\n    }\n  }\n"]))),q={name:"GamesResume",components:{TotalsTable:g,TotalsFinishedTable:F},data:function(){return{totals_data:[],finished_data:[]}},created:function(){var t=this;Object(P["request"])("".concat("https://games-resume-backend.herokuapp.com","/graphql"),E).then((function(e){t.totals_data=e.total_games,t.finished_data=e.finished_games}))}};const x=m()(q,[["render",b]]);e["default"]=x},a4d3:function(t,e,n){"use strict";var r=n("23e7"),i=n("da84"),a=n("d066"),o=n("2ba4"),c=n("c65b"),s=n("e330"),l=n("c430"),u=n("83ab"),b=n("4930"),f=n("d039"),d=n("1a2d"),O=n("e8b5"),h=n("1626"),p=n("861d"),j=n("3a9b"),v=n("d9b5"),m=n("825a"),y=n("7b0b"),g=n("fc6a"),S=n("a04b"),w=n("577e"),T=n("5c6c"),_=n("7c73"),k=n("df75"),J=n("241c"),G=n("057f"),F=n("7418"),P=n("06cf"),E=n("9bf2"),q=n("d1e7"),x=n("f36a"),D=n("6eeb"),N=n("5692"),A=n("f772"),R=n("d012"),$=n("90e3"),C=n("b622"),I=n("e538"),Q=n("746f"),z=n("d44e"),B=n("69f3"),H=n("b727").forEach,K=A("hidden"),L="Symbol",M="prototype",U=C("toPrimitive"),V=B.set,W=B.getterFor(L),X=Object[M],Y=i.Symbol,Z=Y&&Y[M],tt=i.TypeError,et=i.QObject,nt=a("JSON","stringify"),rt=P.f,it=E.f,at=G.f,ot=q.f,ct=s([].push),st=N("symbols"),lt=N("op-symbols"),ut=N("string-to-symbol-registry"),bt=N("symbol-to-string-registry"),ft=N("wks"),dt=!et||!et[M]||!et[M].findChild,Ot=u&&f((function(){return 7!=_(it({},"a",{get:function(){return it(this,"a",{value:7}).a}})).a}))?function(t,e,n){var r=rt(X,e);r&&delete X[e],it(t,e,n),r&&t!==X&&it(X,e,r)}:it,ht=function(t,e){var n=st[t]=_(Z);return V(n,{type:L,tag:t,description:e}),u||(n.description=e),n},pt=function(t,e,n){t===X&&pt(lt,e,n),m(t);var r=S(e);return m(n),d(st,r)?(n.enumerable?(d(t,K)&&t[K][r]&&(t[K][r]=!1),n=_(n,{enumerable:T(0,!1)})):(d(t,K)||it(t,K,T(1,{})),t[K][r]=!0),Ot(t,r,n)):it(t,r,n)},jt=function(t,e){m(t);var n=g(e),r=k(n).concat(St(n));return H(r,(function(e){u&&!c(mt,n,e)||pt(t,e,n[e])})),t},vt=function(t,e){return void 0===e?_(t):jt(_(t),e)},mt=function(t){var e=S(t),n=c(ot,this,e);return!(this===X&&d(st,e)&&!d(lt,e))&&(!(n||!d(this,e)||!d(st,e)||d(this,K)&&this[K][e])||n)},yt=function(t,e){var n=g(t),r=S(e);if(n!==X||!d(st,r)||d(lt,r)){var i=rt(n,r);return!i||!d(st,r)||d(n,K)&&n[K][r]||(i.enumerable=!0),i}},gt=function(t){var e=at(g(t)),n=[];return H(e,(function(t){d(st,t)||d(R,t)||ct(n,t)})),n},St=function(t){var e=t===X,n=at(e?lt:g(t)),r=[];return H(n,(function(t){!d(st,t)||e&&!d(X,t)||ct(r,st[t])})),r};if(b||(Y=function(){if(j(Z,this))throw tt("Symbol is not a constructor");var t=arguments.length&&void 0!==arguments[0]?w(arguments[0]):void 0,e=$(t),n=function(t){this===X&&c(n,lt,t),d(this,K)&&d(this[K],e)&&(this[K][e]=!1),Ot(this,e,T(1,t))};return u&&dt&&Ot(X,e,{configurable:!0,set:n}),ht(e,t)},Z=Y[M],D(Z,"toString",(function(){return W(this).tag})),D(Y,"withoutSetter",(function(t){return ht($(t),t)})),q.f=mt,E.f=pt,P.f=yt,J.f=G.f=gt,F.f=St,I.f=function(t){return ht(C(t),t)},u&&(it(Z,"description",{configurable:!0,get:function(){return W(this).description}}),l||D(X,"propertyIsEnumerable",mt,{unsafe:!0}))),r({global:!0,wrap:!0,forced:!b,sham:!b},{Symbol:Y}),H(k(ft),(function(t){Q(t)})),r({target:L,stat:!0,forced:!b},{for:function(t){var e=w(t);if(d(ut,e))return ut[e];var n=Y(e);return ut[e]=n,bt[n]=e,n},keyFor:function(t){if(!v(t))throw tt(t+" is not a symbol");if(d(bt,t))return bt[t]},useSetter:function(){dt=!0},useSimple:function(){dt=!1}}),r({target:"Object",stat:!0,forced:!b,sham:!u},{create:vt,defineProperty:pt,defineProperties:jt,getOwnPropertyDescriptor:yt}),r({target:"Object",stat:!0,forced:!b},{getOwnPropertyNames:gt,getOwnPropertySymbols:St}),r({target:"Object",stat:!0,forced:f((function(){F.f(1)}))},{getOwnPropertySymbols:function(t){return F.f(y(t))}}),nt){var wt=!b||f((function(){var t=Y();return"[null]"!=nt([t])||"{}"!=nt({a:t})||"{}"!=nt(Object(t))}));r({target:"JSON",stat:!0,forced:wt},{stringify:function(t,e,n){var r=x(arguments),i=e;if((p(e)||void 0!==t)&&!v(t))return O(e)||(e=function(t,e){if(h(i)&&(e=c(i,this,t,e)),!v(e))return e}),r[1]=e,o(nt,null,r)}})}if(!Z[U]){var Tt=Z.valueOf;D(Z,U,(function(t){return c(Tt,this)}))}z(Y,L),R[K]=!0},e01a:function(t,e,n){"use strict";var r=n("23e7"),i=n("83ab"),a=n("da84"),o=n("e330"),c=n("1a2d"),s=n("1626"),l=n("3a9b"),u=n("577e"),b=n("9bf2").f,f=n("e893"),d=a.Symbol,O=d&&d.prototype;if(i&&s(d)&&(!("description"in O)||void 0!==d().description)){var h={},p=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:u(arguments[0]),e=l(O,this)?new d(t):void 0===t?d():d(t);return""===t&&(h[e]=!0),e};f(p,d),p.prototype=O,O.constructor=p;var j="Symbol(test)"==String(d("test")),v=o(O.toString),m=o(O.valueOf),y=/^Symbol\((.*)\)[^)]+$/,g=o("".replace),S=o("".slice);b(O,"description",{configurable:!0,get:function(){var t=m(this),e=v(t);if(c(h,t))return"";var n=j?S(e,7,-1):g(e,y,"$1");return""===n?void 0:n}}),r({global:!0,forced:!0},{Symbol:p})}},e538:function(t,e,n){var r=n("b622");e.f=r}}]);
//# sourceMappingURL=chunk-4f1a4656.cbbcc5a2.js.map