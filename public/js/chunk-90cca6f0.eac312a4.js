(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-90cca6f0"],{4938:function(e,t,n){"use strict";n.r(t);var i=n("7a23"),c={class:"all-content"},l={key:1,class:"container py-4",style:{"margin-top":"50px"}},o={class:"row align-items-start"},a={class:"about"},u=Object(i["i"])("h1",null,"WiiU Games Table",-1),s={class:"row align-items-end",style:{"margin-top":"20px"}},d=Object(i["i"])("div",{class:"col"},null,-1),r=Object(i["i"])("div",{class:"col"},null,-1),b={class:"col"},p=["href"],j=Object(i["j"])("   "),O=["href"],m=Object(i["j"])("   "),f=["href"],g={class:"table-responsive"},h=Object(i["j"])(" Add a New Game "),y={class:"input-group mb-3 input-group-md"},v=Object(i["i"])("div",{class:"input-group-prepend"},[Object(i["i"])("span",{class:"input-group-text",id:"basic-addon3"},"AppId")],-1),x={class:"input-group mb-3 input-group-md"},k=Object(i["i"])("div",{class:"input-group-prepend"},[Object(i["i"])("span",{class:"input-group-text",id:"basic-addon3"},"SystemId")],-1),w={class:"input-group mb-3 input-group-md"},C=Object(i["i"])("div",{class:"input-group-prepend"},[Object(i["i"])("span",{class:"input-group-text",id:"basic-addon3"},"Title")],-1),S={class:"input-group mb-3"},G={class:"input-group-prepend"},_={class:"input-group-text"},I=Object(i["i"])("input",{type:"text",class:"form-control","aria-label":"Text input with checkbox",readonly:"",placeholder:"Finished?"},null,-1),A={class:"input-group mb-3"},M={class:"input-group-prepend"},D={class:"input-group-text"},U=Object(i["i"])("input",{type:"text",class:"form-control","aria-label":"Text input with checkbox",readonly:"",placeholder:"Collection?"},null,-1),V={class:"input-group mb-3"},T={class:"input-group-prepend"},F={class:"input-group-text"},L=Object(i["i"])("input",{type:"text",class:"form-control","aria-label":"Text input with checkbox",readonly:"",placeholder:"Genuine?"},null,-1),N={class:"input-group mb-3"},R={class:"input-group-prepend"},E={class:"input-group-text"},J=Object(i["i"])("input",{type:"text",class:"form-control","aria-label":"Text input with checkbox",readonly:"",placeholder:"Fisical Disc?"},null,-1);function Q(e,t,n,Q,P,W){var q=Object(i["G"])("Loading"),z=Object(i["G"])("WiiUGamesTable"),B=Object(i["G"])("Modal");return Object(i["y"])(),Object(i["h"])("div",c,[P.isLoading?(Object(i["y"])(),Object(i["f"])(q,{key:0})):Object(i["g"])("",!0),P.isLoading?Object(i["g"])("",!0):(Object(i["y"])(),Object(i["h"])("div",l,[Object(i["i"])("div",o,[Object(i["i"])("button",{type:"button",class:"btn btn-primary btn-lg btn-block",onClick:t[0]||(t[0]=function(){return Q.toggleModal&&Q.toggleModal.apply(Q,arguments)})},"Add a new Game")]),Object(i["i"])("div",a,[u,Object(i["i"])("div",s,[d,r,Object(i["i"])("div",b,[Object(i["i"])("a",{type:"button",class:"btn btn-outline-primary",href:"".concat(P.env,"/csv?table=WiiU")},"to CSV",8,p),j,Object(i["i"])("a",{type:"button",class:"btn btn-outline-secondary",href:"".concat(P.env,"/pdf?from=wiiu"),target:"_blank"},"to PDF",8,O),m,Object(i["i"])("a",{type:"button",class:"btn btn-outline-success",href:"".concat(P.env,"/xls?from=wiiu")},"to XLS",8,f)])]),Object(i["i"])("div",g,[Object(i["k"])(z)]),Object(i["k"])(B,{onClose:Q.toggleModal,modalActive:Q.modalActive},{"modal-header":Object(i["R"])((function(){return[h]})),"modal-content":Object(i["R"])((function(){return[Object(i["i"])("div",y,[v,Object(i["S"])(Object(i["i"])("input",{type:"text",class:"form-control",id:"basic-url","aria-describedby":"basic-addon3","onUpdate:modelValue":t[1]||(t[1]=function(e){return P.newItem.app_id=e})},null,512),[[i["O"],P.newItem.app_id]])]),Object(i["i"])("div",x,[k,Object(i["S"])(Object(i["i"])("input",{type:"text",readonly:"",class:"form-control",id:"basic-url","aria-describedby":"basic-addon3","onUpdate:modelValue":t[2]||(t[2]=function(e){return P.newItem.system_id=e})},null,512),[[i["O"],P.newItem.system_id]])]),Object(i["i"])("div",w,[C,Object(i["S"])(Object(i["i"])("input",{type:"text",class:"form-control",id:"basic-url","aria-describedby":"basic-addon3","onUpdate:modelValue":t[3]||(t[3]=function(e){return P.newItem.title=e})},null,512),[[i["O"],P.newItem.title]])]),Object(i["i"])("div",S,[Object(i["i"])("div",G,[Object(i["i"])("div",_,[Object(i["S"])(Object(i["i"])("input",{type:"checkbox","aria-label":"Checkbox for following text input","onUpdate:modelValue":t[4]||(t[4]=function(e){return P.newItem.finished=e})},null,512),[[i["N"],P.newItem.finished]])])]),I]),Object(i["i"])("div",A,[Object(i["i"])("div",M,[Object(i["i"])("div",D,[Object(i["S"])(Object(i["i"])("input",{type:"checkbox","aria-label":"Checkbox for following text input","onUpdate:modelValue":t[5]||(t[5]=function(e){return P.newItem.collection=e})},null,512),[[i["N"],P.newItem.collection]])])]),U]),Object(i["i"])("div",V,[Object(i["i"])("div",T,[Object(i["i"])("div",F,[Object(i["S"])(Object(i["i"])("input",{type:"checkbox","aria-label":"Checkbox for following text input","onUpdate:modelValue":t[6]||(t[6]=function(e){return P.newItem.genuine=e})},null,512),[[i["N"],P.newItem.genuine]])])]),L]),Object(i["i"])("div",N,[Object(i["i"])("div",R,[Object(i["i"])("div",E,[Object(i["S"])(Object(i["i"])("input",{type:"checkbox","aria-label":"Checkbox for following text input","onUpdate:modelValue":t[7]||(t[7]=function(e){return P.newItem.fisical_disc=e})},null,512),[[i["N"],P.newItem.fisical_disc]])])]),J])]})),"modal-footer":Object(i["R"])((function(){return[Object(i["i"])("button",{type:"button",class:"btn btn-primary",onClick:t[8]||(t[8]=function(e){return W.saveGame(P.newItem)})},"Save changes")]})),_:1},8,["onClose","modalActive"])])]))])}n("99af");var P=function(e){return Object(i["B"])("data-v-ceb9de68"),e=e(),Object(i["z"])(),e},W=P((function(){return Object(i["i"])("br",null,null,-1)})),q=P((function(){return Object(i["i"])("br",null,null,-1)})),z=P((function(){return Object(i["i"])("br",null,null,-1)})),B={class:"input-group mb-3"},X=P((function(){return Object(i["i"])("div",{class:"input-group-prepend"},[Object(i["i"])("span",{class:"input-group-text",id:"basic-addon1"},"Search")],-1)})),H={class:"table table-striped table-hover"},K=P((function(){return Object(i["i"])("thead",null,[Object(i["i"])("tr",null,[Object(i["i"])("th",null,"Id"),Object(i["i"])("th",null,"Image"),Object(i["i"])("th",null,"AppId"),Object(i["i"])("th",null,"Title"),Object(i["i"])("th",null,"Finished ?"),Object(i["i"])("th",null,"Genuine ?"),Object(i["i"])("th",null,"Collection ?"),Object(i["i"])("th",null,"Fisical Disc ?"),Object(i["i"])("th",null,"Actions")])],-1)})),Y=["src"],Z=["onUpdate:modelValue"],$=["onUpdate:modelValue"],ee=["onUpdate:modelValue"],te=["onUpdate:modelValue"],ne={class:"btn-group btn-group-sm",role:"group"},ie=["onClick"],ce=P((function(){return Object(i["i"])("i",{class:"fas fa-play"},null,-1)})),le=Object(i["j"])(" Mark as Playing"),oe=[ce,le],ae=Object(i["j"])("   "),ue=["onClick"],se=P((function(){return Object(i["i"])("i",{class:"fas fa-check"},null,-1)})),de=Object(i["j"])(" Mark as Finished"),re=[se,de],be=Object(i["j"])("   "),pe=["disabled","onClick"],je=P((function(){return Object(i["i"])("i",{class:"fa fa-puzzle-piece"},null,-1)})),Oe=Object(i["j"])(" DLC"),me=[je,Oe],fe=Object(i["j"])("   "),ge=["onClick"],he=P((function(){return Object(i["i"])("i",{class:"fas fa-edit"},null,-1)})),ye=Object(i["j"])(" Edit"),ve=[he,ye],xe=Object(i["j"])("   "),ke=["onClick"],we=P((function(){return Object(i["i"])("i",{class:"fas fa-trash-alt"},null,-1)})),Ce=Object(i["j"])(" Delete"),Se=[we,Ce],Ge=Object(i["j"])(" Edit Game "),_e={class:"input-group mb-3 input-group-md"},Ie=P((function(){return Object(i["i"])("div",{class:"input-group-prepend"},[Object(i["i"])("span",{class:"input-group-text",id:"basic-addon3"},"ID")],-1)})),Ae={class:"input-group mb-3 input-group-md"},Me=P((function(){return Object(i["i"])("div",{class:"input-group-prepend"},[Object(i["i"])("span",{class:"input-group-text",id:"basic-addon3"},"AppId")],-1)})),De={class:"input-group mb-3 input-group-md"},Ue=P((function(){return Object(i["i"])("div",{class:"input-group-prepend"},[Object(i["i"])("span",{class:"input-group-text",id:"basic-addon3"},"SystemId")],-1)})),Ve={class:"input-group mb-3 input-group-md"},Te=P((function(){return Object(i["i"])("div",{class:"input-group-prepend"},[Object(i["i"])("span",{class:"input-group-text",id:"basic-addon3"},"Title")],-1)})),Fe={class:"input-group mb-3"},Le={class:"input-group-prepend"},Ne={class:"input-group-text"},Re=P((function(){return Object(i["i"])("input",{type:"text",class:"form-control","aria-label":"Text input with checkbox",readonly:"",placeholder:"Finished?"},null,-1)})),Ee={class:"input-group mb-3"},Je={class:"input-group-prepend"},Qe={class:"input-group-text"},Pe=P((function(){return Object(i["i"])("input",{type:"text",class:"form-control","aria-label":"Text input with checkbox",readonly:"",placeholder:"Collection?"},null,-1)})),We={class:"input-group mb-3"},qe={class:"input-group-prepend"},ze={class:"input-group-text"},Be=P((function(){return Object(i["i"])("input",{type:"text",class:"form-control","aria-label":"Text input with checkbox",readonly:"",placeholder:"Genuine?"},null,-1)})),Xe={class:"input-group mb-3"},He={class:"input-group-prepend"},Ke={class:"input-group-text"},Ye=P((function(){return Object(i["i"])("input",{type:"text",class:"form-control","aria-label":"Text input with checkbox",readonly:"",placeholder:"Fisical Disc?"},null,-1)})),Ze=Object(i["j"])(" Delete a Game "),$e=P((function(){return Object(i["i"])("h2",null,"Are you sure you want to remove this game?",-1)})),et=Object(i["j"])(" Mark Game as Finished "),tt=P((function(){return Object(i["i"])("h2",null,"Are you sure you want to mark this game as finished?",-1)})),nt=Object(i["j"])(" DLC "),it={class:"table table-hover"},ct=P((function(){return Object(i["i"])("thead",null,[Object(i["i"])("tr",null,[Object(i["i"])("th",{scope:"col"},"Id"),Object(i["i"])("th",{scope:"col"},"AppId"),Object(i["i"])("th",{scope:"col"},"Title"),Object(i["i"])("th",{scope:"col"},"Finished"),Object(i["i"])("th",{scope:"col"},"Actions")])],-1)})),lt={scope:"row"},ot=["onUpdate:modelValue"],at=["onClick"],ut=P((function(){return Object(i["i"])("i",{class:"fas fa-check"},null,-1)})),st=Object(i["j"])(" Mark as Finished "),dt=[ut,st];function rt(e,t,n,c,l,o){var a=this,u=Object(i["G"])("Modal");return Object(i["y"])(),Object(i["h"])(i["a"],null,[W,q,z,Object(i["i"])("div",B,[X,Object(i["S"])(Object(i["i"])("input",{type:"text",class:"form-control",placeholder:"Input Game Name","aria-label":"Search","aria-describedby":"basic-addon1","onUpdate:modelValue":t[0]||(t[0]=function(e){return l.searchQuery=e})},null,512),[[i["O"],l.searchQuery]])]),Object(i["i"])("table",H,[K,Object(i["i"])("tbody",null,[(Object(i["y"])(!0),Object(i["h"])(i["a"],null,Object(i["E"])(o.resultQuery,(function(t,n){return Object(i["y"])(),Object(i["h"])("tr",{key:n},[Object(i["i"])("td",null,Object(i["J"])(t.id),1),Object(i["i"])("td",null,[Object(i["i"])("img",{src:"".concat(l.env,"/").concat(t.app_id,".jpg"),class:"img-fluid img-thumbnail"},null,8,Y)]),Object(i["i"])("td",null,Object(i["J"])(t.app_id),1),Object(i["i"])("td",null,Object(i["J"])(t.title),1),Object(i["i"])("td",null,[Object(i["S"])(Object(i["i"])("input",{type:"checkbox","onUpdate:modelValue":function(e){return t.finished=e},disabled:!0},null,8,Z),[[i["N"],t.finished]])]),Object(i["i"])("td",null,[Object(i["S"])(Object(i["i"])("input",{type:"checkbox","onUpdate:modelValue":function(e){return t.genuine=e},disabled:!0},null,8,$),[[i["N"],t.genuine]])]),Object(i["i"])("td",null,[Object(i["S"])(Object(i["i"])("input",{type:"checkbox","onUpdate:modelValue":function(e){return t.collection=e},disabled:!0},null,8,ee),[[i["N"],t.collection]])]),Object(i["i"])("td",null,[Object(i["S"])(Object(i["i"])("input",{type:"checkbox","onUpdate:modelValue":function(e){return t.fisical_disc=e},disabled:!0},null,8,te),[[i["N"],t.fisical_disc]])]),Object(i["i"])("td",null,[Object(i["i"])("div",ne,[Object(i["i"])("button",{type:"button",class:"btn btn-danger btn-sm",onClick:function(n){return o.markAsPlaying(t.app_id||t.id,e.getSelectedGame)}},oe,8,ie),ae,Object(i["i"])("button",{type:"button",class:"btn btn-success btn-sm",onClick:function(e){return c.toggleModalFinished(t.app_id||t.id)}},re,8,ue),be,Object(i["i"])("button",{disabled:!t.has_dlc,type:"button",class:"btn btn-info btn-sm",style:{color:"white"},onClick:function(e){return c.toggleModalDLC(t.app_id,a)}},me,8,pe),fe,Object(i["i"])("button",{type:"button",class:"btn btn-primary btn-sm",onClick:function(e){return c.toggleModal(t.app_id||t.id)}},ve,8,ge),xe,Object(i["i"])("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:function(e){return c.toggleModalDelete(t.app_id||t.id)}},Se,8,ke)])])])})),128))])]),Object(i["k"])(u,{onClose:c.toggleModal,modalActive:c.modalActive},{"modal-header":Object(i["R"])((function(){return[Ge]})),"modal-content":Object(i["R"])((function(){return[Object(i["i"])("div",_e,[Ie,Object(i["S"])(Object(i["i"])("input",{readonly:"",type:"text",class:"form-control",id:"basic-url","aria-describedby":"basic-addon3","onUpdate:modelValue":t[1]||(t[1]=function(t){return e.getSelectedGame.id=t})},null,512),[[i["O"],e.getSelectedGame.id]])]),Object(i["i"])("div",Ae,[Me,Object(i["S"])(Object(i["i"])("input",{type:"text",class:"form-control",id:"basic-url","aria-describedby":"basic-addon3","onUpdate:modelValue":t[2]||(t[2]=function(t){return e.getSelectedGame.app_id=t})},null,512),[[i["O"],e.getSelectedGame.app_id]])]),Object(i["i"])("div",De,[Ue,Object(i["S"])(Object(i["i"])("input",{type:"text",readonly:"",class:"form-control",id:"basic-url","aria-describedby":"basic-addon3","onUpdate:modelValue":t[3]||(t[3]=function(t){return e.getSelectedGame.system_id=t})},null,512),[[i["O"],e.getSelectedGame.system_id]])]),Object(i["i"])("div",Ve,[Te,Object(i["S"])(Object(i["i"])("input",{type:"text",class:"form-control",id:"basic-url","aria-describedby":"basic-addon3","onUpdate:modelValue":t[4]||(t[4]=function(t){return e.getSelectedGame.title=t})},null,512),[[i["O"],e.getSelectedGame.title]])]),Object(i["i"])("div",Fe,[Object(i["i"])("div",Le,[Object(i["i"])("div",Ne,[Object(i["S"])(Object(i["i"])("input",{type:"checkbox","aria-label":"Checkbox for following text input","onUpdate:modelValue":t[5]||(t[5]=function(t){return e.getSelectedGame.finished=t})},null,512),[[i["N"],e.getSelectedGame.finished]])])]),Re]),Object(i["i"])("div",Ee,[Object(i["i"])("div",Je,[Object(i["i"])("div",Qe,[Object(i["S"])(Object(i["i"])("input",{type:"checkbox","aria-label":"Checkbox for following text input","onUpdate:modelValue":t[6]||(t[6]=function(t){return e.getSelectedGame.collection=t})},null,512),[[i["N"],e.getSelectedGame.collection]])])]),Pe]),Object(i["i"])("div",We,[Object(i["i"])("div",qe,[Object(i["i"])("div",ze,[Object(i["S"])(Object(i["i"])("input",{type:"checkbox","aria-label":"Checkbox for following text input","onUpdate:modelValue":t[7]||(t[7]=function(t){return e.getSelectedGame.genuine=t})},null,512),[[i["N"],e.getSelectedGame.genuine]])])]),Be]),Object(i["i"])("div",Xe,[Object(i["i"])("div",He,[Object(i["i"])("div",Ke,[Object(i["S"])(Object(i["i"])("input",{type:"checkbox","aria-label":"Checkbox for following text input","onUpdate:modelValue":t[8]||(t[8]=function(t){return e.getSelectedGame.fisical_disc=t})},null,512),[[i["N"],e.getSelectedGame.fisical_disc]])])]),Ye])]})),"modal-footer":Object(i["R"])((function(){return[Object(i["i"])("button",{type:"button",class:"btn btn-primary",onClick:t[9]||(t[9]=function(t){return o.editItem(e.getSelectedGame)})}," Save changes ")]})),_:1},8,["onClose","modalActive"]),Object(i["k"])(u,{onClose:c.toggleModalDelete,modalActive:c.modalActiveDelete},{"modal-header":Object(i["R"])((function(){return[Ze]})),"modal-content":Object(i["R"])((function(){return[$e]})),"modal-footer":Object(i["R"])((function(){return[Object(i["i"])("button",{type:"button",class:"btn btn-primary",onClick:t[10]||(t[10]=function(t){return o.deleteItem(e.getCurrentIdx,c.toggleModalDelete)})}," Delete Game ")]})),_:1},8,["onClose","modalActive"]),Object(i["k"])(u,{onClose:c.toggleModalFinished,modalActive:c.modalActiveFinished},{"modal-header":Object(i["R"])((function(){return[et]})),"modal-content":Object(i["R"])((function(){return[tt]})),"modal-footer":Object(i["R"])((function(){return[Object(i["i"])("button",{type:"button",class:"btn btn-primary",onClick:t[11]||(t[11]=function(t){return o.finishItem(e.getCurrentIdx,c.toggleModalFinished)})}," Mark as Finished ")]})),_:1},8,["onClose","modalActive"]),Object(i["k"])(u,{onClose:t[12]||(t[12]=function(e){return c.toggleModalDLC("",a)}),modalActive:c.modalActiveDLC},{"modal-header":Object(i["R"])((function(){return[nt]})),"modal-content":Object(i["R"])((function(){return[Object(i["i"])("table",it,[ct,Object(i["i"])("tbody",null,[(Object(i["y"])(!0),Object(i["h"])(i["a"],null,Object(i["E"])(l.dlcs,(function(e,t){return Object(i["y"])(),Object(i["h"])("tr",{key:t},[Object(i["i"])("th",lt,Object(i["J"])(e.id),1),Object(i["i"])("td",null,Object(i["J"])(e.app_id),1),Object(i["i"])("td",null,Object(i["J"])(e.title),1),Object(i["i"])("td",null,[Object(i["S"])(Object(i["i"])("input",{type:"checkbox","onUpdate:modelValue":function(t){return e.finished=t},disabled:!0},null,8,ot),[[i["N"],e.finished]])]),Object(i["i"])("td",null,[Object(i["i"])("button",{type:"button",class:"btn btn-success btn-sm",onClick:function(t){return c.markDlcAsFinished(e.id,e.app_id,!e.finished,a)}},dt,8,at)])])})),128))])])]})),"modal-footer":Object(i["R"])((function(){return[]})),_:1},8,["modalActive"])],64)}var bt,pt=n("5530"),jt=n("8785"),Ot=(n("4de4"),n("d3b7"),n("ac1f"),n("1276"),n("caad"),n("2532"),n("0180")),mt=n("714b"),ft=n("5502"),gt=n("e852"),ht=n("bc3a"),yt=n.n(ht),vt={name:"WiiUGamesTable",setup:function(){var e=Object(ft["c"])(),t=Object(Ot["b"])(),n=Object(i["D"])(!1),c=Object(i["D"])(!1),l=Object(i["D"])(!1),o=Object(i["D"])(!1),a=function(t){n.value=!n.value,n.value&&(console.log(t),e.commit("SELECT_ITEM",t))},u=function(t){c.value=!c.value,c.value&&(console.log("are you sure Delete ? ",t),e.commit("SELECT_ITEM",t))},s=function(t){l.value=!l.value,l.value&&(console.log("are you sure Finished ? ",t),e.commit("SELECT_ITEM",t))},d=function(e,t){if(o.value=!o.value,o.value){console.log("show DLCs for ? ",e);var n=Object(gt["gql"])(bt||(bt=Object(jt["a"])(['\n          {\n            dlcs: getDLC(app_id: "','") {\n              id\n              app_id\n              title\n              finished\n            }\n          }\n        '])),e);Object(gt["request"])("".concat("https://games-resume-backend.herokuapp.com","/graphql"),n).then((function(e){t.dlcs=e.dlcs}))}else t.dlcs=[]},r=function(e,n,i,c){console.log("Mark dlc as finished idx: ",e),console.log("id:",e),console.log("appid:",n),console.log("finished: ",i);var l={app_id:n,id:e,finished:i};yt.a.post("".concat("https://games-resume-backend.herokuapp.com","/dlc_finished"),l).then((function(e){c.dlcs=e.data.dlcs,t.success("Success on Mark as Finished from Database")})).catch((function(e){console.error(e),t.error("Error on Save Changes on API")}))};return{toast:t,modalActive:n,modalActiveDelete:c,modalActiveFinished:l,modalActiveDLC:o,toggleModal:a,toggleModalDelete:u,toggleModalDLC:d,toggleModalFinished:s,markDlcAsFinished:r,store:e}},data:function(){return{env:"https://games-resume-backend.herokuapp.com",searchQuery:null,dlcs:[]}},computed:Object(pt["a"])({resultQuery:function(){var e=this;return this.searchQuery?this.getGames.filter((function(t){return e.searchQuery.toLowerCase().split(" ").every((function(e){return t.title.toLowerCase().includes(e)}))})):this.getGames}},Object(ft["b"])(["getGames","getSelectedGame","getCurrentIdx"])),created:function(){},mounted:function(){this.getItems()},methods:{getItems:function(){this.store.dispatch("getGames",{payload:{table:"wiiu"},toast:this.toast})},finishItem:function(e,t){this.store.dispatch("finishGame",{payload:{idx:e[0],table:"wiiu"},toast:this.toast}),t()},deleteItem:function(e,t){this.store.dispatch("deleteGame",{payload:{idx:e[0],table:"wiiu"},toast:this.toast}),t()},editItem:function(e){e.table="wiiu",this.store.dispatch("updateGame",{payload:e,toast:this.toast,toggleModal:this.toggleModal})},markAsPlaying:function(e,t){t.table="playing",t.idx=e,this.store.dispatch("markAsPlaying",{payload:t,toast:this.toast})}},components:{Modal:mt["a"]}},xt=(n("74bf"),n("6b0d")),kt=n.n(xt);const wt=kt()(vt,[["render",rt],["__scopeId","data-v-ceb9de68"]]);var Ct=wt,St=n("3a5e"),Gt={name:"WiiUGames",components:{WiiUGamesTable:Ct,Modal:mt["a"],Loading:St["a"]},setup:function(){var e=Object(ft["c"])(),t=Object(i["D"])(!1),n=function(){t.value=!t.value},c=Object(Ot["b"])();return{modalActive:t,toggleModal:n,toast:c,store:e}},data:function(){return{env:"https://games-resume-backend.herokuapp.com",isLoading:!0,newItem:{app_id:"",system_id:6,title:"",finished:null,collection:null,genuine:null,fisical_disc:null,table:"wiiu"}}},mounted:function(){var e=this;setTimeout((function(){e.isLoading=!1}),2e3)},methods:{saveGame:function(e){this.store.dispatch("saveGame",{payload:e,toast:this.toast,toggleModal:this.toggleModal}),this.newItem={app_id:"",system_id:6,title:"",finished:null,collection:null,genuine:null,fisical_disc:null,table:"wiiu"}}}};const _t=kt()(Gt,[["render",Q]]);t["default"]=_t},"74bf":function(e,t,n){"use strict";n("c878")},c878:function(e,t,n){}}]);
//# sourceMappingURL=chunk-90cca6f0.eac312a4.js.map