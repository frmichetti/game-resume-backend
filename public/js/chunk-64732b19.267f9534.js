(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-64732b19"],{"12ae":function(t,e,n){t.exports=n.p+"img/loading.10d38f2b.gif"},"3a5e":function(t,e,n){"use strict";var i=n("7a23"),c=n("12ae"),o=n.n(c),l={id:"loading"},a=Object(i["i"])("img",{class:"img",src:o.a,alt:"loading...",width:"200"},null,-1),d=[a];function s(t,e,n,c,o,a){return Object(i["y"])(),Object(i["h"])("div",l,d)}var u={name:"Loading"},b=(n("8698"),n("6b0d")),r=n.n(b);const p=r()(u,[["render",s]]);e["a"]=p},"5ae9":function(t,e,n){},"64e5":function(t,e,n){"use strict";n("f9f6")},"714b":function(t,e,n){"use strict";var i=n("7a23"),c=function(t){return Object(i["B"])("data-v-c247d7f2"),t=t(),Object(i["z"])(),t},o={class:"modal"},l={class:"modal-inner"},a={class:"modal",tabindex:"-1",role:"dialog"},d={class:"modal-dialog",role:"document"},s={class:"modal-content"},u={class:"modal-header"},b={class:"modal-title"},r=c((function(){return Object(i["i"])("span",{"aria-hidden":"true"},"×",-1)})),p=[r],j={class:"modal-body"},m={class:"modal-footer"};function O(t,e,n,c,r,O){return Object(i["y"])(),Object(i["f"])(i["b"],{name:"modal-animation"},{default:Object(i["R"])((function(){return[Object(i["S"])(Object(i["i"])("div",o,[Object(i["k"])(i["b"],{name:"modal-animation-inner"},{default:Object(i["R"])((function(){return[Object(i["S"])(Object(i["i"])("div",l,[Object(i["i"])("div",a,[Object(i["i"])("div",d,[Object(i["i"])("div",s,[Object(i["i"])("div",u,[Object(i["i"])("h5",b,[Object(i["F"])(t.$slots,"modal-header",{},void 0,!0)]),Object(i["i"])("button",{type:"button",onClick:e[0]||(e[0]=function(){return c.close&&c.close.apply(c,arguments)}),class:"close","data-dismiss":"modal","aria-label":"Close"},p)]),Object(i["i"])("div",j,[Object(i["F"])(t.$slots,"modal-content",{},void 0,!0)]),Object(i["i"])("div",m,[Object(i["F"])(t.$slots,"modal-footer",{},void 0,!0),Object(i["i"])("button",{onClick:e[1]||(e[1]=function(){return c.close&&c.close.apply(c,arguments)}),type:"button",class:"btn btn-danger","data-dismiss":"modal"},"Close")])])])])],512),[[i["P"],n.modalActive]])]})),_:3})],512),[[i["P"],n.modalActive]])]})),_:3})}var g={props:["modalActive"],setup:function(t,e){var n=e.emit,i=function(){n("close")};return{close:i}}},f=(n("64e5"),n("6b0d")),h=n.n(f);const v=h()(g,[["render",O],["__scopeId","data-v-c247d7f2"]]);e["a"]=v},8698:function(t,e,n){"use strict";n("5ae9")},f9f6:function(t,e,n){},fe7e:function(t,e,n){"use strict";n.r(e);var i=n("7a23"),c={class:"all-content"},o={key:1,class:"container py-4",style:{"margin-top":"50px"}},l={class:"row align-items-start"},a={class:"about"},d=Object(i["i"])("h1",null,"DLC's Games Table",-1),s={class:"table-responsive"},u=Object(i["j"])(" Add a New Game "),b={class:"input-group mb-3 input-group-md"},r=Object(i["i"])("div",{class:"input-group-prepend"},[Object(i["i"])("span",{class:"input-group-text",id:"basic-addon3"},"AppId")],-1),p={class:"input-group mb-3 input-group-md"},j=Object(i["i"])("div",{class:"input-group-prepend"},[Object(i["i"])("span",{class:"input-group-text",id:"basic-addon3"},"Title")],-1),m={class:"input-group mb-3"},O={class:"input-group-prepend"},g={class:"input-group-text"},f=Object(i["i"])("input",{type:"text",class:"form-control","aria-label":"Text input with checkbox",readonly:"",placeholder:"Finished?"},null,-1),h={class:"input-group mb-3"},v={class:"input-group-prepend"},y={class:"input-group-text"},x=Object(i["i"])("input",{type:"text",class:"form-control","aria-label":"Text input with checkbox",readonly:"",placeholder:"Collection?"},null,-1);function k(t,e,n,k,C,G){var w=Object(i["G"])("Loading"),I=Object(i["G"])("DLCsGamesTable"),S=Object(i["G"])("Modal");return Object(i["y"])(),Object(i["h"])("div",c,[C.isLoading?(Object(i["y"])(),Object(i["f"])(w,{key:0})):Object(i["g"])("",!0),C.isLoading?Object(i["g"])("",!0):(Object(i["y"])(),Object(i["h"])("div",o,[Object(i["i"])("div",l,[Object(i["i"])("button",{type:"button",class:"btn btn-primary btn-lg btn-block",onClick:e[0]||(e[0]=function(){return k.toggleModal&&k.toggleModal.apply(k,arguments)})},"Add a new Game")]),Object(i["i"])("div",a,[d,Object(i["i"])("div",s,[Object(i["k"])(I)]),Object(i["k"])(S,{onClose:k.toggleModal,modalActive:k.modalActive},{"modal-header":Object(i["R"])((function(){return[u]})),"modal-content":Object(i["R"])((function(){return[Object(i["i"])("div",b,[r,Object(i["S"])(Object(i["i"])("input",{type:"text",class:"form-control",id:"basic-url","aria-describedby":"basic-addon3","onUpdate:modelValue":e[1]||(e[1]=function(t){return C.newItem.app_id=t})},null,512),[[i["O"],C.newItem.app_id]])]),Object(i["i"])("div",p,[j,Object(i["S"])(Object(i["i"])("input",{type:"text",class:"form-control",id:"basic-url","aria-describedby":"basic-addon3","onUpdate:modelValue":e[2]||(e[2]=function(t){return C.newItem.title=t})},null,512),[[i["O"],C.newItem.title]])]),Object(i["i"])("div",m,[Object(i["i"])("div",O,[Object(i["i"])("div",g,[Object(i["S"])(Object(i["i"])("input",{type:"checkbox","aria-label":"Checkbox for following text input","onUpdate:modelValue":e[3]||(e[3]=function(t){return C.newItem.finished=t})},null,512),[[i["N"],C.newItem.finished]])])]),f]),Object(i["i"])("div",h,[Object(i["i"])("div",v,[Object(i["i"])("div",y,[Object(i["S"])(Object(i["i"])("input",{type:"checkbox","aria-label":"Checkbox for following text input","onUpdate:modelValue":e[4]||(e[4]=function(t){return C.newItem.collection=t})},null,512),[[i["N"],C.newItem.collection]])])]),x])]})),"modal-footer":Object(i["R"])((function(){return[Object(i["i"])("button",{type:"button",class:"btn btn-primary",onClick:e[5]||(e[5]=function(t){return G.saveGame(C.newItem)})},"Save changes")]})),_:1},8,["onClose","modalActive"])])]))])}var C={class:"table table-striped table-hover"},G=Object(i["i"])("thead",null,[Object(i["i"])("tr",null,[Object(i["i"])("th",null,"Id"),Object(i["i"])("th",null,"AppId"),Object(i["i"])("th",null,"System"),Object(i["i"])("th",null,"Title"),Object(i["i"])("th",null,"Finished ?"),Object(i["i"])("th",null,"Collection ?"),Object(i["i"])("th",null,"Actions")])],-1),w=["onUpdate:modelValue"],I=["onUpdate:modelValue"],S={class:"btn-group btn-group-sm",role:"group"},M=["onClick"],A=Object(i["i"])("i",{class:"fas fa-check"},null,-1),D=Object(i["j"])(" Mark as Finished"),T=[A,D],_=Object(i["j"])("   "),F=["onClick"],L=Object(i["i"])("i",{class:"fas fa-edit"},null,-1),R=Object(i["j"])(" Edit"),U=[L,R],V=Object(i["j"])("   "),E=["onClick"],N=Object(i["i"])("i",{class:"fas fa-trash-alt"},null,-1),J=Object(i["j"])(" Delete"),$=[N,J],P=Object(i["j"])(" Edit Game "),z={class:"input-group mb-3 input-group-md"},B=Object(i["i"])("div",{class:"input-group-prepend"},[Object(i["i"])("span",{class:"input-group-text",id:"basic-addon3"},"ID")],-1),q={class:"input-group mb-3 input-group-md"},H=Object(i["i"])("div",{class:"input-group-prepend"},[Object(i["i"])("span",{class:"input-group-text",id:"basic-addon3"},"AppId")],-1),K={class:"input-group mb-3 input-group-md"},Q=Object(i["i"])("div",{class:"input-group-prepend"},[Object(i["i"])("span",{class:"input-group-text",id:"basic-addon3"},"Title")],-1),W={class:"input-group mb-3"},X={class:"input-group-prepend"},Y={class:"input-group-text"},Z=Object(i["i"])("input",{type:"text",class:"form-control","aria-label":"Text input with checkbox",readonly:"",placeholder:"Finished?"},null,-1),tt={class:"input-group mb-3"},et={class:"input-group-prepend"},nt={class:"input-group-text"},it=Object(i["i"])("input",{type:"text",class:"form-control","aria-label":"Text input with checkbox",readonly:"",placeholder:"Collection?"},null,-1),ct=Object(i["j"])(" Delete a Game "),ot=Object(i["i"])("h2",null,"Are you sure you want to remove this game?",-1),lt=Object(i["j"])(" Mark Game as Finished "),at=Object(i["i"])("h2",null,"Are you sure you want to mark this game as finished?",-1);function dt(t,e,n,c,o,l){var a=Object(i["G"])("Modal");return Object(i["y"])(),Object(i["h"])(i["a"],null,[Object(i["i"])("table",C,[G,Object(i["i"])("tbody",null,[(Object(i["y"])(!0),Object(i["h"])(i["a"],null,Object(i["E"])(t.getGames,(function(t,e){return Object(i["y"])(),Object(i["h"])("tr",{key:e},[Object(i["i"])("td",null,Object(i["J"])(t.id),1),Object(i["i"])("td",null,Object(i["J"])(t.app_id),1),Object(i["i"])("td",null,Object(i["J"])(t.system),1),Object(i["i"])("td",null,Object(i["J"])(t.title),1),Object(i["i"])("td",null,[Object(i["S"])(Object(i["i"])("input",{type:"checkbox","onUpdate:modelValue":function(e){return t.finished=e},disabled:!0},null,8,w),[[i["N"],t.finished]])]),Object(i["i"])("td",null,[Object(i["S"])(Object(i["i"])("input",{type:"checkbox","onUpdate:modelValue":function(e){return t.collection=e},disabled:!0},null,8,I),[[i["N"],t.collection]])]),Object(i["i"])("td",null,[Object(i["i"])("div",S,[Object(i["i"])("button",{type:"button",class:"btn btn-success btn-sm",onClick:function(e){return c.toggleModalFinished(t.id)}},T,8,M),_,Object(i["i"])("button",{type:"button",class:"btn btn-primary btn-sm",onClick:function(e){return c.toggleModal(t.id)}},U,8,F),V,Object(i["i"])("button",{type:"button",class:"btn btn-secondary btn-sm",onClick:function(e){return c.toggleModalDelete(t.id)}},$,8,E)])])])})),128))])]),Object(i["k"])(a,{onClose:c.toggleModal,modalActive:c.modalActive},{"modal-header":Object(i["R"])((function(){return[P]})),"modal-content":Object(i["R"])((function(){return[Object(i["i"])("div",z,[B,Object(i["S"])(Object(i["i"])("input",{readonly:"",type:"text",class:"form-control",id:"basic-url","aria-describedby":"basic-addon3","onUpdate:modelValue":e[0]||(e[0]=function(e){return t.getSelectedGame.id=e})},null,512),[[i["O"],t.getSelectedGame.id]])]),Object(i["i"])("div",q,[H,Object(i["S"])(Object(i["i"])("input",{type:"text",class:"form-control",id:"basic-url","aria-describedby":"basic-addon3","onUpdate:modelValue":e[1]||(e[1]=function(e){return t.getSelectedGame.app_id=e})},null,512),[[i["O"],t.getSelectedGame.app_id]])]),Object(i["i"])("div",K,[Q,Object(i["S"])(Object(i["i"])("input",{type:"text",class:"form-control",id:"basic-url","aria-describedby":"basic-addon3","onUpdate:modelValue":e[2]||(e[2]=function(e){return t.getSelectedGame.title=e})},null,512),[[i["O"],t.getSelectedGame.title]])]),Object(i["i"])("div",W,[Object(i["i"])("div",X,[Object(i["i"])("div",Y,[Object(i["S"])(Object(i["i"])("input",{type:"checkbox","aria-label":"Checkbox for following text input","onUpdate:modelValue":e[3]||(e[3]=function(e){return t.getSelectedGame.finished=e})},null,512),[[i["N"],t.getSelectedGame.finished]])])]),Z]),Object(i["i"])("div",tt,[Object(i["i"])("div",et,[Object(i["i"])("div",nt,[Object(i["S"])(Object(i["i"])("input",{type:"checkbox","aria-label":"Checkbox for following text input","onUpdate:modelValue":e[4]||(e[4]=function(e){return t.getSelectedGame.collection=e})},null,512),[[i["N"],t.getSelectedGame.collection]])])]),it])]})),"modal-footer":Object(i["R"])((function(){return[Object(i["i"])("button",{type:"button",class:"btn btn-primary",onClick:e[5]||(e[5]=function(e){return l.editItem(t.getSelectedGame)})},"Save changes")]})),_:1},8,["onClose","modalActive"]),Object(i["k"])(a,{onClose:c.toggleModalDelete,modalActive:c.modalActiveDelete},{"modal-header":Object(i["R"])((function(){return[ct]})),"modal-content":Object(i["R"])((function(){return[ot]})),"modal-footer":Object(i["R"])((function(){return[Object(i["i"])("button",{type:"button",class:"btn btn-primary",onClick:e[6]||(e[6]=function(e){return l.deleteItem(t.getCurrentIdx,c.toggleModalDelete)})},"Delete Game")]})),_:1},8,["onClose","modalActive"]),Object(i["k"])(a,{onClose:c.toggleModalFinished,modalActive:c.modalActiveFinished},{"modal-header":Object(i["R"])((function(){return[lt]})),"modal-content":Object(i["R"])((function(){return[at]})),"modal-footer":Object(i["R"])((function(){return[Object(i["i"])("button",{type:"button",class:"btn btn-primary",onClick:e[7]||(e[7]=function(e){return l.finishItem(t.getCurrentIdx,c.toggleModalFinished)})},"Mark as Finished")]})),_:1},8,["onClose","modalActive"])],64)}var st=n("0180"),ut=n("714b"),bt=n("5502"),rt={name:"DLCsGamesTable",setup:function(){var t=Object(bt["c"])(),e=Object(i["D"])(!1),n=Object(i["D"])(!1),c=Object(i["D"])(!1),o=function(n){e.value=!e.value,e.value&&(console.log(n),t.commit("SELECT_ITEM",n))},l=function(e){n.value=!n.value,n.value&&(console.log("are you sure Delete ? ",e),t.commit("SELECT_ITEM",e))},a=function(e){c.value=!c.value,c.value&&(console.log("are you sure Finished ? ",e),t.commit("SELECT_ITEM",e))},d=Object(st["b"])();return{toast:d,modalActive:e,toggleModal:o,modalActiveDelete:n,modalActiveFinished:c,toggleModalDelete:l,toggleModalFinished:a,store:t}},data:function(){return{}},computed:Object(bt["b"])(["getGames","getSelectedGame","getCurrentIdx"]),created:function(){},mounted:function(){this.getItems()},methods:{getItems:function(){this.store.dispatch("getGames",{payload:{table:"dlcs"},toast:this.toast})},finishItem:function(t,e){this.store.dispatch("finishGame",{payload:{idx:t[0],table:"dlcs"},toast:this.toast}),e()},deleteItem:function(t,e){this.store.dispatch("deleteGame",{payload:{idx:t[0],table:"dlcs"},toast:this.toast}),e()},editItem:function(t){t.table="dlcs",this.store.dispatch("updateGame",{payload:t,toast:this.toast,toggleModal:this.toggleModal})}},components:{Modal:ut["a"]}},pt=n("6b0d"),jt=n.n(pt);const mt=jt()(rt,[["render",dt]]);var Ot=mt,gt=n("3a5e"),ft={name:"DLCsGames",components:{DLCsGamesTable:Ot,Modal:ut["a"],Loading:gt["a"]},setup:function(){var t=Object(bt["c"])(),e=Object(i["D"])(!1),n=function(){e.value=!e.value},c=Object(st["b"])();return{modalActive:e,toggleModal:n,toast:c,store:t}},mounted:function(){var t=this;setTimeout((function(){t.isLoading=!1}),2e3)},data:function(){return{isLoading:!0,newItem:{app_id:"",title:"",finished:null,collection:null,table:"dlcs"}}},methods:{saveGame:function(t){this.store.dispatch("saveGame",{payload:t,toast:this.toast,toggleModal:this.toggleModal}),this.newItem={app_id:"",title:"",finished:null,collection:null,table:"dlcs"}}}};const ht=jt()(ft,[["render",k]]);e["default"]=ht}}]);
//# sourceMappingURL=chunk-64732b19.267f9534.js.map