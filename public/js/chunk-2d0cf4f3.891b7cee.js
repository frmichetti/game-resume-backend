(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cf4f3"],{"62bc":function(e,t,n){"use strict";n.r(t);var c=n("7a23"),a={class:"container py-4",style:{"margin-top":"50px"}},r=Object(c["i"])("h1",null,"Games by Genres",-1),l={class:"row"},s={class:"col"},b=Object(c["i"])("h6",null,"All Games Genres",-1);function o(e,t,n,o,i,j){var O=Object(c["G"])("TotalGenresTableLink");return Object(c["y"])(),Object(c["h"])("div",a,[r,Object(c["i"])("div",l,[Object(c["i"])("div",s,[b,Object(c["k"])(O,{data:this.genres},null,8,["data"])])])])}var i=n("8785"),j={class:"table table-sm table-dark"},O=Object(c["i"])("thead",null,[Object(c["i"])("tr",null,[Object(c["i"])("th",{scope:"col"},"#"),Object(c["i"])("th",{scope:"col"},"Genre"),Object(c["i"])("th",{scope:"col"},"Total")])],-1),u={scope:"row"},d=["href"];function h(e,t,n,a,r,l){return Object(c["y"])(),Object(c["h"])("div",null,[Object(c["i"])("table",j,[O,Object(c["i"])("tbody",null,[(Object(c["y"])(!0),Object(c["h"])(c["a"],null,Object(c["E"])(n.data,(function(e,t){return Object(c["y"])(),Object(c["h"])("tr",{key:t},[Object(c["i"])("th",u,Object(c["J"])(t),1),Object(c["i"])("td",null,[Object(c["i"])("a",{href:"./genre/".concat(e.genre),class:"link-secondary"},Object(c["J"])(e.genre),9,d)]),Object(c["i"])("td",null,Object(c["J"])(e.total),1)])})),128))])])])}var p={name:"TotalGenresTableLink",props:{data:Array}},g=n("6b0d"),f=n.n(g);const k=f()(p,[["render",h]]);var m,G=k,y=n("e852"),v=Object(y["gql"])(m||(m=Object(i["a"])(["\n{\n  genres: allGamesGenresAggregate {\n    genre\n    total\n  }\n}\n"]))),w={name:"GenresResume",components:{TotalGenresTableLink:G},data:function(){return{genres:[]}},created:function(){var e=this;Object(y["request"])("".concat("https://games-resume-backend.herokuapp.com","/graphql"),v).then((function(t){e.genres=t.genres}))}};const T=f()(w,[["render",o]]);t["default"]=T}}]);
//# sourceMappingURL=chunk-2d0cf4f3.891b7cee.js.map