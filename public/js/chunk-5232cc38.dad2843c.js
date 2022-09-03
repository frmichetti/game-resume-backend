(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5232cc38"],{"0013":function(t,e,n){"use strict";n.r(e);var i=n("7a23"),a={class:"all-content"},c={key:1,class:"container py-4",style:{"margin-top":"50px"}},o={class:"row align-items-start"},l={class:"about"},s=Object(i["i"])("h1",null,"Virtual Console Games Table",-1),u={class:"row align-items-end",style:{"margin-top":"20px"}},d=Object(i["i"])("div",{class:"col"},null,-1),b=Object(i["i"])("div",{class:"col"},null,-1),r={class:"col"},p=["href"],m=Object(i["j"])("   "),j=["href"],O=Object(i["j"])("   "),g=["href"],f={class:"table-responsive"},h=Object(i["j"])(" Add a New Game "),v={class:"input-group mb-3 input-group-md"},y=Object(i["i"])("div",{class:"input-group-prepend"},[Object(i["i"])("span",{class:"input-group-text",id:"basic-addon3"},"AppId")],-1),x={class:"input-group mb-3 input-group-md"},k=Object(i["i"])("div",{class:"input-group-prepend"},[Object(i["i"])("span",{class:"input-group-text",id:"basic-addon3"},"SystemId")],-1),C={class:"input-group mb-3 input-group-md"},G=Object(i["i"])("div",{class:"input-group-prepend"},[Object(i["i"])("span",{class:"input-group-text",id:"basic-addon3"},"Title")],-1),S={class:"input-group mb-3"},I={class:"input-group-prepend"},w={class:"input-group-text"},A=Object(i["i"])("input",{type:"text",class:"form-control","aria-label":"Text input with checkbox",readonly:"",placeholder:"Finished?"},null,-1),M={class:"input-group mb-3"},_={class:"input-group-prepend"},V={class:"input-group-text"},T=Object(i["i"])("input",{type:"text",class:"form-control","aria-label":"Text input with checkbox",readonly:"",placeholder:"Genuine?"},null,-1);function F(t,e,n,F,D,U){var R=Object(i["G"])("Loading"),E=Object(i["G"])("VirtualConsoleGamesTable"),L=Object(i["G"])("Modal");return Object(i["y"])(),Object(i["h"])("div",a,[D.isLoading?(Object(i["y"])(),Object(i["f"])(R,{key:0})):Object(i["g"])("",!0),D.isLoading?Object(i["g"])("",!0):(Object(i["y"])(),Object(i["h"])("div",c,[Object(i["i"])("div",o,[Object(i["i"])("button",{type:"button",class:"btn btn-primary btn-lg btn-block",onClick:e[0]||(e[0]=function(){return F.toggleModal&&F.toggleModal.apply(F,arguments)})},"Add a new Game")]),Object(i["i"])("div",l,[s,Object(i["i"])("div",u,[d,b,Object(i["i"])("div",r,[Object(i["i"])("a",{type:"button",class:"btn btn-outline-primary",href:"".concat(D.env,"/csv?table=VirtualConsole")},"to CSV",8,p),m,Object(i["i"])("a",{type:"button",class:"btn btn-outline-secondary",href:"".concat(D.env,"/pdf?from=virtualconsole"),target:"_blank"},"to PDF",8,j),O,Object(i["i"])("a",{type:"button",class:"btn btn-outline-success",href:"".concat(D.env,"/xls?from=virtualconsole")},"to XLS",8,g)])]),Object(i["i"])("div",f,[Object(i["k"])(E)]),Object(i["k"])(L,{onClose:F.toggleModal,modalActive:F.modalActive},{"modal-header":Object(i["R"])((function(){return[h]})),"modal-content":Object(i["R"])((function(){return[Object(i["i"])("div",v,[y,Object(i["S"])(Object(i["i"])("input",{type:"text",class:"form-control",id:"basic-url","aria-describedby":"basic-addon3","onUpdate:modelValue":e[1]||(e[1]=function(t){return D.newItem.app_id=t})},null,512),[[i["O"],D.newItem.app_id]])]),Object(i["i"])("div",x,[k,Object(i["S"])(Object(i["i"])("input",{type:"text",class:"form-control",id:"basic-url","aria-describedby":"basic-addon3","onUpdate:modelValue":e[2]||(e[2]=function(t){return D.newItem.system_id=t})},null,512),[[i["O"],D.newItem.system_id]])]),Object(i["i"])("div",C,[G,Object(i["S"])(Object(i["i"])("input",{type:"text",class:"form-control",id:"basic-url","aria-describedby":"basic-addon3","onUpdate:modelValue":e[3]||(e[3]=function(t){return D.newItem.title=t})},null,512),[[i["O"],D.newItem.title]])]),Object(i["i"])("div",S,[Object(i["i"])("div",I,[Object(i["i"])("div",w,[Object(i["S"])(Object(i["i"])("input",{type:"checkbox","aria-label":"Checkbox for following text input","onUpdate:modelValue":e[4]||(e[4]=function(t){return D.newItem.finished=t})},null,512),[[i["N"],D.newItem.finished]])])]),A]),Object(i["i"])("div",M,[Object(i["i"])("div",_,[Object(i["i"])("div",V,[Object(i["S"])(Object(i["i"])("input",{type:"checkbox","aria-label":"Checkbox for following text input","onUpdate:modelValue":e[5]||(e[5]=function(t){return D.newItem.genuine=t})},null,512),[[i["N"],D.newItem.genuine]])])]),T])]})),"modal-footer":Object(i["R"])((function(){return[Object(i["i"])("button",{type:"button",class:"btn btn-primary",onClick:e[6]||(e[6]=function(t){return U.saveGame(D.newItem)})},"Save changes")]})),_:1},8,["onClose","modalActive"])])]))])}var D={class:"table table-striped table-hover"},U=Object(i["i"])("thead",null,[Object(i["i"])("tr",null,[Object(i["i"])("th",null,"Id"),Object(i["i"])("th",null,"AppId"),Object(i["i"])("th",null,"Title"),Object(i["i"])("th",null,"Finished ?"),Object(i["i"])("th",null,"Genuine ?"),Object(i["i"])("th",null,"Platform"),Object(i["i"])("th",null,"System"),Object(i["i"])("th",null,"Actions")])],-1),R=["onUpdate:modelValue"],E=["onUpdate:modelValue"],L={class:"btn-group btn-group-sm",role:"group"},P=["onClick"],J=Object(i["i"])("i",{class:"fas fa-play"},null,-1),N=Object(i["j"])(" Mark as Playing"),$=[J,N],z=Object(i["j"])("   "),B=["onClick"],X=Object(i["i"])("i",{class:"fas fa-check"},null,-1),q=Object(i["j"])(" Mark as Finished"),H=[X,q],K=Object(i["j"])("   "),Q=["onClick"],W=Object(i["i"])("i",{class:"fas fa-edit"},null,-1),Y=Object(i["j"])(" Edit"),Z=[W,Y],tt=Object(i["j"])("   "),et=["onClick"],nt=Object(i["i"])("i",{class:"fas fa-trash-alt"},null,-1),it=Object(i["j"])(" Delete"),at=[nt,it],ct=Object(i["j"])(" Edit Game "),ot={class:"input-group mb-3 input-group-md"},lt=Object(i["i"])("div",{class:"input-group-prepend"},[Object(i["i"])("span",{class:"input-group-text",id:"basic-addon3"},"ID")],-1),st={class:"input-group mb-3 input-group-md"},ut=Object(i["i"])("div",{class:"input-group-prepend"},[Object(i["i"])("span",{class:"input-group-text",id:"basic-addon3"},"AppId")],-1),dt={class:"input-group mb-3 input-group-md"},bt=Object(i["i"])("div",{class:"input-group-prepend"},[Object(i["i"])("span",{class:"input-group-text",id:"basic-addon3"},"SystemId")],-1),rt={class:"input-group mb-3 input-group-md"},pt=Object(i["i"])("div",{class:"input-group-prepend"},[Object(i["i"])("span",{class:"input-group-text",id:"basic-addon3"},"Title")],-1),mt={class:"input-group mb-3"},jt={class:"input-group-prepend"},Ot={class:"input-group-text"},gt=Object(i["i"])("input",{type:"text",class:"form-control","aria-label":"Text input with checkbox",readonly:"",placeholder:"Finished?"},null,-1),ft={class:"input-group mb-3"},ht={class:"input-group-prepend"},vt={class:"input-group-text"},yt=Object(i["i"])("input",{type:"text",class:"form-control","aria-label":"Text input with checkbox",readonly:"",placeholder:"Genuine?"},null,-1),xt=Object(i["j"])(" Delete a Game "),kt=Object(i["i"])("h2",null,"Are you sure you want to remove this game?",-1),Ct=Object(i["j"])(" Mark Game as Finished "),Gt=Object(i["i"])("h2",null,"Are you sure you want to mark this game as finished?",-1);function St(t,e,n,a,c,o){var l=Object(i["G"])("Modal");return Object(i["y"])(),Object(i["h"])(i["a"],null,[Object(i["i"])("table",D,[U,Object(i["i"])("tbody",null,[(Object(i["y"])(!0),Object(i["h"])(i["a"],null,Object(i["E"])(t.getGames,(function(e,n){return Object(i["y"])(),Object(i["h"])("tr",{key:n},[Object(i["i"])("td",null,Object(i["J"])(e.id),1),Object(i["i"])("td",null,Object(i["J"])(e.app_id),1),Object(i["i"])("td",null,Object(i["J"])(e.title),1),Object(i["i"])("td",null,[Object(i["S"])(Object(i["i"])("input",{type:"checkbox","onUpdate:modelValue":function(t){return e.finished=t},disabled:!0},null,8,R),[[i["N"],e.finished]])]),Object(i["i"])("td",null,[Object(i["S"])(Object(i["i"])("input",{type:"checkbox","onUpdate:modelValue":function(t){return e.genuine=t},disabled:!0},null,8,E),[[i["N"],e.genuine]])]),Object(i["i"])("td",null,Object(i["J"])(e.platform),1),Object(i["i"])("td",null,Object(i["J"])(e.system),1),Object(i["i"])("td",null,[Object(i["i"])("div",L,[Object(i["i"])("button",{type:"button",class:"btn btn-danger btn-sm",onClick:function(n){return o.markAsPlaying(e.app_id||e.id,t.getSelectedGame)}},$,8,P),z,Object(i["i"])("button",{type:"button",class:"btn btn-success btn-sm",onClick:function(t){return a.toggleModalFinished(e.app_id||e.id)}},H,8,B),K,Object(i["i"])("button",{type:"button",class:"btn btn-primary btn-sm",onClick:function(t){return a.toggleModal(e.app_id||e.id)}},Z,8,Q),tt,Object(i["i"])("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:function(t){return a.toggleModalDelete(e.app_id||e.id)}},at,8,et)])])])})),128))])]),Object(i["k"])(l,{onClose:a.toggleModal,modalActive:a.modalActive},{"modal-header":Object(i["R"])((function(){return[ct]})),"modal-content":Object(i["R"])((function(){return[Object(i["i"])("div",ot,[lt,Object(i["S"])(Object(i["i"])("input",{readonly:"",type:"text",class:"form-control",id:"basic-url","aria-describedby":"basic-addon3","onUpdate:modelValue":e[0]||(e[0]=function(e){return t.getSelectedGame.id=e})},null,512),[[i["O"],t.getSelectedGame.id]])]),Object(i["i"])("div",st,[ut,Object(i["S"])(Object(i["i"])("input",{type:"text",class:"form-control",id:"basic-url","aria-describedby":"basic-addon3","onUpdate:modelValue":e[1]||(e[1]=function(e){return t.getSelectedGame.app_id=e})},null,512),[[i["O"],t.getSelectedGame.app_id]])]),Object(i["i"])("div",dt,[bt,Object(i["S"])(Object(i["i"])("input",{type:"text",class:"form-control",id:"basic-url","aria-describedby":"basic-addon3","onUpdate:modelValue":e[2]||(e[2]=function(e){return t.getSelectedGame.system_id=e})},null,512),[[i["O"],t.getSelectedGame.system_id]])]),Object(i["i"])("div",rt,[pt,Object(i["S"])(Object(i["i"])("input",{type:"text",class:"form-control",id:"basic-url","aria-describedby":"basic-addon3","onUpdate:modelValue":e[3]||(e[3]=function(e){return t.getSelectedGame.title=e})},null,512),[[i["O"],t.getSelectedGame.title]])]),Object(i["i"])("div",mt,[Object(i["i"])("div",jt,[Object(i["i"])("div",Ot,[Object(i["S"])(Object(i["i"])("input",{type:"checkbox","aria-label":"Checkbox for following text input","onUpdate:modelValue":e[4]||(e[4]=function(e){return t.getSelectedGame.finished=e})},null,512),[[i["N"],t.getSelectedGame.finished]])])]),gt]),Object(i["i"])("div",ft,[Object(i["i"])("div",ht,[Object(i["i"])("div",vt,[Object(i["S"])(Object(i["i"])("input",{type:"checkbox","aria-label":"Checkbox for following text input","onUpdate:modelValue":e[5]||(e[5]=function(e){return t.getSelectedGame.genuine=e})},null,512),[[i["N"],t.getSelectedGame.genuine]])])]),yt])]})),"modal-footer":Object(i["R"])((function(){return[Object(i["i"])("button",{type:"button",class:"btn btn-primary",onClick:e[6]||(e[6]=function(e){return o.editItem(t.getSelectedGame)})},"Save changes")]})),_:1},8,["onClose","modalActive"]),Object(i["k"])(l,{onClose:a.toggleModalDelete,modalActive:a.modalActiveDelete},{"modal-header":Object(i["R"])((function(){return[xt]})),"modal-content":Object(i["R"])((function(){return[kt]})),"modal-footer":Object(i["R"])((function(){return[Object(i["i"])("button",{type:"button",class:"btn btn-primary",onClick:e[7]||(e[7]=function(e){return o.deleteItem(t.getCurrentIdx,a.toggleModalDelete)})},"Delete Game")]})),_:1},8,["onClose","modalActive"]),Object(i["k"])(l,{onClose:a.toggleModalFinished,modalActive:a.modalActiveFinished},{"modal-header":Object(i["R"])((function(){return[Ct]})),"modal-content":Object(i["R"])((function(){return[Gt]})),"modal-footer":Object(i["R"])((function(){return[Object(i["i"])("button",{type:"button",class:"btn btn-primary",onClick:e[8]||(e[8]=function(e){return o.finishItem(t.getCurrentIdx,a.toggleModalFinished)})},"Mark as Finished")]})),_:1},8,["onClose","modalActive"])],64)}var It=n("0180"),wt=n("714b"),At=n("5502"),Mt={name:"VirtualConsoleGamesTable",setup:function(){var t=Object(At["c"])(),e=Object(i["D"])(!1),n=Object(i["D"])(!1),a=Object(i["D"])(!1),c=function(n){e.value=!e.value,e.value&&(console.log(n),t.commit("SELECT_ITEM",n))},o=function(e){n.value=!n.value,n.value&&(console.log("are you sure Delete ? ",e),t.commit("SELECT_ITEM",e))},l=function(e){a.value=!a.value,a.value&&(console.log("are you sure Finished ? ",e),t.commit("SELECT_ITEM",e))},s=Object(It["b"])();return{toast:s,modalActive:e,toggleModal:c,modalActiveDelete:n,modalActiveFinished:a,toggleModalDelete:o,toggleModalFinished:l,store:t}},data:function(){return{}},computed:Object(At["b"])(["getGames","getSelectedGame","getCurrentIdx"]),created:function(){},mounted:function(){this.getItems()},methods:{getItems:function(){this.store.dispatch("getGames",{payload:{table:"virtualconsole"},toast:this.toast})},finishItem:function(t,e){this.store.dispatch("finishGame",{payload:{idx:t[0],table:"virtualconsole"},toast:this.toast}),e()},deleteItem:function(t,e){this.store.dispatch("deleteGame",{payload:{idx:t[0],table:"virtualconsole"},toast:this.toast}),e()},editItem:function(t){t.table="virtualconsole",this.store.dispatch("updateGame",{payload:t,toast:this.toast,toggleModal:this.toggleModal})},markAsPlaying:function(t,e){e.table="playing",e.idx=t,this.store.dispatch("markAsPlaying",{payload:e,toast:this.toast})}},components:{Modal:wt["a"]}},_t=n("6b0d"),Vt=n.n(_t);const Tt=Vt()(Mt,[["render",St]]);var Ft=Tt,Dt=n("3a5e"),Ut={name:"VirtualConsoleGames",components:{VirtualConsoleGamesTable:Ft,Modal:wt["a"],Loading:Dt["a"]},setup:function(){var t=Object(At["c"])(),e=Object(i["D"])(!1),n=function(){e.value=!e.value},a=Object(It["b"])();return{modalActive:e,toggleModal:n,toast:a,store:t}},mounted:function(){var t=this;setTimeout((function(){t.isLoading=!1}),2e3)},data:function(){return{env:"https://games-resume-backend.herokuapp.com",isLoading:!0,newItem:{app_id:"",system_id:null,title:"",finished:null,genuine:null,table:"virtualconsole"}}},methods:{saveGame:function(t){this.store.dispatch("saveGame",{payload:t,toast:this.toast,toggleModal:this.toggleModal}),this.newItem={app_id:"",system_id:null,title:"",finished:null,genuine:null,table:"virtualconsole"}}}};const Rt=Vt()(Ut,[["render",F]]);e["default"]=Rt},"12ae":function(t,e,n){t.exports=n.p+"img/loading.10d38f2b.gif"},"3a5e":function(t,e,n){"use strict";var i=n("7a23"),a=n("12ae"),c=n.n(a),o={id:"loading"},l=Object(i["i"])("img",{class:"img",src:c.a,alt:"loading...",width:"200"},null,-1),s=[l];function u(t,e,n,a,c,l){return Object(i["y"])(),Object(i["h"])("div",o,s)}var d={name:"Loading"},b=(n("8698"),n("6b0d")),r=n.n(b);const p=r()(d,[["render",u]]);e["a"]=p},"5ae9":function(t,e,n){},"64e5":function(t,e,n){"use strict";n("f9f6")},"714b":function(t,e,n){"use strict";var i=n("7a23"),a=function(t){return Object(i["B"])("data-v-c247d7f2"),t=t(),Object(i["z"])(),t},c={class:"modal"},o={class:"modal-inner"},l={class:"modal",tabindex:"-1",role:"dialog"},s={class:"modal-dialog",role:"document"},u={class:"modal-content"},d={class:"modal-header"},b={class:"modal-title"},r=a((function(){return Object(i["i"])("span",{"aria-hidden":"true"},"×",-1)})),p=[r],m={class:"modal-body"},j={class:"modal-footer"};function O(t,e,n,a,r,O){return Object(i["y"])(),Object(i["f"])(i["b"],{name:"modal-animation"},{default:Object(i["R"])((function(){return[Object(i["S"])(Object(i["i"])("div",c,[Object(i["k"])(i["b"],{name:"modal-animation-inner"},{default:Object(i["R"])((function(){return[Object(i["S"])(Object(i["i"])("div",o,[Object(i["i"])("div",l,[Object(i["i"])("div",s,[Object(i["i"])("div",u,[Object(i["i"])("div",d,[Object(i["i"])("h5",b,[Object(i["F"])(t.$slots,"modal-header",{},void 0,!0)]),Object(i["i"])("button",{type:"button",onClick:e[0]||(e[0]=function(){return a.close&&a.close.apply(a,arguments)}),class:"close","data-dismiss":"modal","aria-label":"Close"},p)]),Object(i["i"])("div",m,[Object(i["F"])(t.$slots,"modal-content",{},void 0,!0)]),Object(i["i"])("div",j,[Object(i["F"])(t.$slots,"modal-footer",{},void 0,!0),Object(i["i"])("button",{onClick:e[1]||(e[1]=function(){return a.close&&a.close.apply(a,arguments)}),type:"button",class:"btn btn-danger","data-dismiss":"modal"},"Close")])])])])],512),[[i["P"],n.modalActive]])]})),_:3})],512),[[i["P"],n.modalActive]])]})),_:3})}var g={props:["modalActive"],setup:function(t,e){var n=e.emit,i=function(){n("close")};return{close:i}}},f=(n("64e5"),n("6b0d")),h=n.n(f);const v=h()(g,[["render",O],["__scopeId","data-v-c247d7f2"]]);e["a"]=v},8698:function(t,e,n){"use strict";n("5ae9")},f9f6:function(t,e,n){}}]);
//# sourceMappingURL=chunk-5232cc38.dad2843c.js.map