(function(e){function t(t){for(var a,r,i=t[0],c=t[1],l=t[2],u=0,d=[];u<i.length;u++)r=i[u],s[r]&&d.push(s[r][0]),s[r]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(e[a]=c[a]);f&&f(t);while(d.length)d.shift()();return o.push.apply(o,l||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],a=!0,r=1;r<n.length;r++){var i=n[r];0!==s[i]&&(a=!1)}a&&(o.splice(t--,1),e=c(c.s=n[0]))}return e}var a={},r={app:0},s={app:0},o=[];function i(e){return c.p+"js/"+({about:"about"}[e]||e)+"."+{about:"2e2e14d8","chunk-2d0e1d93":"8b3e4f3f","chunk-44ab29d6":"1236086f","chunk-46f15231":"57910459","chunk-5b120bcb":"f94da350","chunk-5f6d44de":"c25da986","chunk-a86eb644":"b7ed30b1","chunk-d57f0dc4":"1ec8eabd"}[e]+".js"}function c(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(e){var t=[],n={"chunk-44ab29d6":1,"chunk-46f15231":1,"chunk-5b120bcb":1,"chunk-5f6d44de":1,"chunk-a86eb644":1,"chunk-d57f0dc4":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise(function(t,n){for(var a="css/"+({about:"about"}[e]||e)+"."+{about:"31d6cfe0","chunk-2d0e1d93":"31d6cfe0","chunk-44ab29d6":"80835f94","chunk-46f15231":"f1fb49f5","chunk-5b120bcb":"9f056f85","chunk-5f6d44de":"a1545b58","chunk-a86eb644":"6867cd4f","chunk-d57f0dc4":"547165b9"}[e]+".css",s=c.p+a,o=document.getElementsByTagName("link"),i=0;i<o.length;i++){var l=o[i],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===a||u===s))return t()}var d=document.getElementsByTagName("style");for(i=0;i<d.length;i++){l=d[i],u=l.getAttribute("data-href");if(u===a||u===s)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var a=t&&t.target&&t.target.src||s,o=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=a,delete r[e],f.parentNode.removeChild(f),n(o)},f.href=s;var m=document.getElementsByTagName("head")[0];m.appendChild(f)}).then(function(){r[e]=0}));var a=s[e];if(0!==a)if(a)t.push(a[2]);else{var o=new Promise(function(t,n){a=s[e]=[t,n]});t.push(a[2]=o);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,c.nc&&u.setAttribute("nonce",c.nc),u.src=i(e),l=function(t){u.onerror=u.onload=null,clearTimeout(d);var n=s[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src,o=new Error("Loading chunk "+e+" failed.\n("+a+": "+r+")");o.type=a,o.request=r,n[1](o)}s[e]=void 0}};var d=setTimeout(function(){l({type:"timeout",target:u})},12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(t)},c.m=e,c.c=a,c.d=function(e,t,n){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)c.d(n,a,function(t){return e[t]}.bind(null,a));return n},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var f=u;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"0e74":function(e,t,n){"use strict";var a=n("41cb"),r=n("ba6a");t["a"]={namespaced:!0,state:{registerEmail:null,registerUsername:null,registerPassword:null,registerConfirmedPassword:null,registerFirstname:null,registerLastname:null,registerAvatar:null,registerUniversity:null,registerRole:null,registerErrors:null,loginEmail:null,loginPassword:null,loginError:null,user:null,isLoggedIn:!1,isConnected:!1},mutations:{setUser:function(e,t){e.user=t},setRegisterErrors:function(e,t){e.registerErrors=t},setRegisterEmail:function(e,t){e.registerEmail=t},setRegisterPassword:function(e,t){e.registerPassword=t},setRegisterConfirmedPassword:function(e,t){e.registerConfirmedPassword=t},setRegisterUsername:function(e,t){e.registerUsername=t},setRegisterFirstname:function(e,t){e.registerFirstname=t},SetRegisterLastname:function(e,t){e.registerLastname=t},setRegisterAvatar:function(e,t){e.registerAvatar=t},setRegisterUniversity:function(e,t){e.registerUniversity=t},setRegisterRole:function(e,t){e.registerRole=t},setLoginError:function(e,t){e.loginError=t},setLoginEmail:function(e,t){e.loginEmail=t},setLoginPassword:function(e,t){e.loginPassword=t},setIsLoggedIn:function(e,t){e.isLoggedIn=t},SOCKET_CONNECT:function(e){e.isConnected=!0},SOCKET_DISCONNECT:function(e){e.isConnected=!1}},actions:{logout:function(e){var t=e.commit;return Object(r["a"])().get("/users/logout").then(function(e){console.log(e),200===e.status&&(console.log("user logged out"),t("setUser",null),t("setIsLoggedIn",!1),t("SOCKET_DISCONNECT",!1),t("setLoginEmail",null),t("setLoginPassword",null),a["a"].push("/login"))}).catch(function(e){console.log(e)})},register:function(e){var t=e.commit,n=e.state;return t("setRegisterErrors",null),Object(r["a"])().post("/users/register",{email:n.registerEmail,password:n.registerPassword,confirmedPassword:n.registerConfirmedPassword,username:n.registerUsername,firstname:n.registerFirstname,lastname:n.registerLastname,avatar:n.registerAvatar,university:n.registerUniversity,role:n.registerRole}).then(function(e){var r=e.data;if(200===r.status&&r.success)alert("user created"),console.log(r),a["a"].push("/login");else if(400===r.status){var s=r.errors,o=s.map(function(e){return e.msg});console.log(o),t("setRegisterErrors",o),console.log(n.registerErrors)}}).catch(function(){})},login:function(e){var t=e.commit,n=e.state;return t("setLoginError",null),Object(r["a"])().post("/users/login",{email:n.loginEmail,password:n.loginPassword}).then(function(e){var n=e.data;n.user?(console.log(n),t("setIsLoggedIn",!0),t("setUser",n.user),a["a"].push("/home")):(t("setLoginError",n.message),a["a"].push("/login"))}).catch(function(){})},socket_connect:function(e){var t=e.commit;t("SOCKET_CONNECT",!0)},socket_disconnect:function(e){var t=e.commit;t("SOCKET_DISCONNECT",!0)}},getters:{isLoggedIn:function(e){return!!e.isLoggedIn},isConnected:function(e){return!!e.isConnected}}}},1:function(e,t){},"41cb":function(e,t,n){"use strict";n("7f7f");var a=n("2b0e"),r=n("8c4f"),s=n("0e74");a["default"].use(r["a"]);var o=new r["a"]({mode:"history",base:"/",routes:[{path:"/home",name:"home",component:function(){return n.e("about").then(n.bind(null,"bb51"))},meta:{requiresAuth:!0}},{path:"/register",name:"register",component:function(){return n.e("chunk-5f6d44de").then(n.bind(null,"73cf"))}},{path:"/login",name:"login",component:function(){return n.e("chunk-44ab29d6").then(n.bind(null,"a55b"))}},{path:"/createClass",name:"CreateClass",component:function(){return n.e("chunk-2d0e1d93").then(n.bind(null,"7bd6"))},meta:{requiresAuth:!0}},{path:"/class /:roomID",name:"Timeline",component:function(){return n.e("chunk-a86eb644").then(n.bind(null,"f67a"))},meta:{requiresAuth:!0}},{path:"/student/viz",name:"StudentViz",component:function(){return n.e("chunk-46f15231").then(n.bind(null,"50d4"))},meta:{requiresAuth:!0}},{path:"/teacher",name:"Teacher",component:function(){return n.e("chunk-5b120bcb").then(n.bind(null,"024b"))},meta:{requiresAuth:!0}},{path:"/roomsList",name:"roomsList",component:function(){return n.e("chunk-d57f0dc4").then(n.bind(null,"1bb5"))},meta:{requiresAuth:!0}}]});o.beforeEach(function(e,t,n){console.log("navigation to ".concat(e.name," from ").concat(t.name)),e.meta.requiresAuth?s["a"].getters.isLoggedIn?n():n({name:"login"}):n()}),t["a"]=o},4678:function(e,t,n){var a={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-SG":"cdab","./en-SG.js":"cdab","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-nz":"6f50","./en-nz.js":"6f50","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-tw":"90ea","./zh-tw.js":"90ea"};function r(e){var t=s(e);return n(t)}function s(e){var t=a[e];if(!(t+1)){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}return t}r.keys=function(){return Object.keys(a)},r.resolve=s,e.exports=r,r.id="4678"},"56d7":function(e,t,n){"use strict";n.r(t);n("cadf"),n("551c"),n("f751"),n("097d");var a=n("8055"),r=n.n(a),s=n("f87c"),o=n("31bd"),i=n("ce5b"),c=n.n(i),l=(n("bf40"),n("c1df")),u=n.n(l),d=n("2b0e"),f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("v-app",[n("HeaderBar"),n("div",{staticClass:"pa-0 contentStyle"},[n("router-view",{staticClass:"containerMain"})],1),n("BottomNav",{staticClass:"hidden-sm-and-up"})],1)],1)},m=[],b=n("41cb"),v=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-toolbar",{staticStyle:{height:"64px","background-color":"#231846"},attrs:{app:"",fixed:"",dark:""}},[n("v-avatar",{attrs:{size:"36px"}}),this.user?n("v-toolbar-title",[e._v("Coucou "+e._s(this.user.username))]):n("v-toolbar-title",[e._v("Welcome To Omnilive")]),n("v-spacer"),n("v-toolbar-items",{staticClass:"hidden-xs-only"},[e.isLoggedIn?n("v-btn",{attrs:{flat:"",to:"/roomsList"}},[n("v-icon",{staticClass:"mr-2"},[e._v("account_box")]),e._v("\n      Classes\n    ")],1):e._e(),e.isLoggedIn?n("v-btn",{attrs:{flat:"",to:"/home"}},[n("v-icon",{staticClass:"mr-2"},[e._v("home")]),e._v("\n      Home\n    ")],1):e._e(),e.isLoggedIn&&"teacher"===this.user.role?n("CreateRoom"):e._e(),e.isLoggedIn?e._e():n("v-btn",{attrs:{flat:"",to:"/register"}},[n("v-icon",{staticClass:"mr-2"},[e._v("account_box")]),e._v("\n      Register\n    ")],1),e.isLoggedIn?e._e():n("v-btn",{attrs:{flat:"",to:"/login"}},[n("v-icon",{staticClass:"mr-2"},[e._v("fingerprint")]),e._v("\n      Login\n    ")],1),e.isLoggedIn?n("v-btn",{attrs:{flat:"",to:"/login"},on:{click:e.logout}},[n("v-icon",{staticClass:"mr-2"},[e._v("exit_to_app")]),e._v("\n      Logout\n    ")],1):e._e()],1)],1)},g=[],h=n("cebc"),p=n("2f62"),j=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-layout",{attrs:{row:"","justify-center":""}},[n("v-dialog",{attrs:{width:"300px",height:"70%"},scopedSlots:e._u([{key:"activator",fn:function(t){var a=t.on;return[n("v-btn",e._g({attrs:{flat:""}},a),[e._v("Create Class")])]}}]),model:{value:e.dialog,callback:function(t){e.dialog=t},expression:"dialog"}},[n("v-card",[n("v-card-title",[n("span",{staticClass:"headline"},[e._v("Create your class")])]),n("v-card-text",[n("v-form",{attrs:{enctype:"mutlipart/form-data"}},[n("v-container",{attrs:{"grid-list-md":""}},[n("v-layout",{attrs:{wrap:""}},[n("v-flex",{attrs:{xs12:""}},[n("v-text-field",{attrs:{label:"Name of the Course*",required:""},model:{value:e.courseName,callback:function(t){e.courseName=t},expression:"courseName"}})],1),n("v-flex",{attrs:{xs12:""}},[n("v-textarea",{attrs:{"auto-grow":"",box:"",label:"Description"},model:{value:e.description,callback:function(t){e.description=t},expression:"description"}})],1),n("v-flex",[n("v-dialog",{ref:"dialog1",attrs:{"return-value":e.startDate,persistent:"",lazy:"","full-width":"",width:"290px"},on:{"update:returnValue":function(t){e.startDate=t},"update:return-value":function(t){e.startDate=t}},scopedSlots:e._u([{key:"activator",fn:function(t){var a=t.on;return[n("v-text-field",e._g({attrs:{label:"Picker in dialog","prepend-icon":"event",readonly:""},model:{value:e.startDate,callback:function(t){e.startDate=t},expression:"startDate"}},a))]}}]),model:{value:e.modal1,callback:function(t){e.modal1=t},expression:"modal1"}},[n("v-date-picker",{attrs:{scrollable:""},model:{value:e.startDate,callback:function(t){e.startDate=t},expression:"startDate"}},[n("v-spacer"),n("v-btn",{attrs:{flat:"",color:"primary"},on:{click:function(t){e.modal1=!1}}},[e._v("Cancel")]),n("v-btn",{attrs:{flat:"",color:"primary"},on:{click:function(t){return e.$refs.dialog1.save(e.startDate)}}},[e._v("OK")])],1)],1),n("v-dialog",{ref:"dialog2",attrs:{"return-value":e.startTime,persistent:"",lazy:"","full-width":"",width:"290px"},on:{"update:returnValue":function(t){e.startTime=t},"update:return-value":function(t){e.startTime=t}},scopedSlots:e._u([{key:"activator",fn:function(t){var a=t.on;return[n("v-text-field",e._g({attrs:{label:"Picker in dialog","prepend-icon":"access_time",readonly:""},model:{value:e.startTime,callback:function(t){e.startTime=t},expression:"startTime"}},a))]}}]),model:{value:e.modal2,callback:function(t){e.modal2=t},expression:"modal2"}},[e.modal2?n("v-time-picker",{attrs:{"full-width":"",format:"24hr"},model:{value:e.startTime,callback:function(t){e.startTime=t},expression:"startTime"}},[n("v-spacer"),n("v-btn",{attrs:{flat:"",color:"primary"},on:{click:function(t){e.modal2=!1}}},[e._v("Cancel")]),n("v-btn",{attrs:{flat:"",color:"primary"},on:{click:function(t){return e.$refs.dialog2.save(e.startTime)}}},[e._v("OK")])],1):e._e()],1),n("div",[e._v("Début du cours le "+e._s(e.startDate)+" à "+e._s(e.startTime))])],1),n("v-spacer"),n("v-flex",[n("v-dialog",{ref:"dialog3",attrs:{"return-value":e.endDate,persistent:"",lazy:"","full-width":"",width:"290px"},on:{"update:returnValue":function(t){e.endDate=t},"update:return-value":function(t){e.endDate=t}},scopedSlots:e._u([{key:"activator",fn:function(t){var a=t.on;return[n("v-text-field",e._g({attrs:{label:"Picker in dialog","prepend-icon":"event",readonly:""},model:{value:e.endDate,callback:function(t){e.endDate=t},expression:"endDate"}},a))]}}]),model:{value:e.modal3,callback:function(t){e.modal3=t},expression:"modal3"}},[n("v-date-picker",{attrs:{scrollable:""},model:{value:e.endDate,callback:function(t){e.endDate=t},expression:"endDate"}},[n("v-spacer"),n("v-btn",{attrs:{flat:"",color:"primary"},on:{click:function(t){e.modal3=!1}}},[e._v("Cancel")]),n("v-btn",{attrs:{flat:"",color:"primary"},on:{click:function(t){return e.$refs.dialog3.save(e.endDate)}}},[e._v("OK")])],1)],1),n("v-dialog",{ref:"dialog4",attrs:{"return-value":e.endTime,persistent:"",lazy:"","full-width":"",width:"290px"},on:{"update:returnValue":function(t){e.endTime=t},"update:return-value":function(t){e.endTime=t}},scopedSlots:e._u([{key:"activator",fn:function(t){var a=t.on;return[n("v-text-field",e._g({attrs:{label:"Picker in dialog","prepend-icon":"access_time",readonly:""},model:{value:e.endTime,callback:function(t){e.endTime=t},expression:"endTime"}},a))]}}]),model:{value:e.modal4,callback:function(t){e.modal4=t},expression:"modal4"}},[e.modal4?n("v-time-picker",{attrs:{"full-width":"",format:"24hr"},model:{value:e.endTime,callback:function(t){e.endTime=t},expression:"endTime"}},[n("v-spacer"),n("v-btn",{attrs:{flat:"",color:"primary"},on:{click:function(t){e.modal4=!1}}},[e._v("Cancel")]),n("v-btn",{attrs:{flat:"",color:"primary"},on:{click:function(t){return e.$refs.dialog4.save(e.endTime)}}},[e._v("OK")])],1):e._e()],1),n("div",[e._v("Fin du cours le "+e._s(e.endDate)+" à "+e._s(e.endTime))])],1)],1),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"blue darken-1",flat:""},on:{click:function(t){e.dialog=!1}}},[e._v("Close")]),n("v-btn",{attrs:{color:"blue darken-1",flat:""},on:{click:e.submit}},[e._v("Save")])],1),this.Error?n("v-alert",{attrs:{value:!0,type:"error"}},[e._v(e._s(this.Error)+"\n            ")]):e._e()],1),n("small",[e._v("*indicates required field")])],1)],1)],1)],1)],1)},_=[],k=n("0a0d"),y=n.n(k),C=n("ba6a"),O={data:function(){return{dialog:!1,dialog1:!1,dialog2:!1,dialog3:!1,dialog4:!1,modal1:!1,modal2:!1,modal3:!1,modal4:!1,created_by:"",courseName:"",description:"",startDate:"",endDate:"",startTime:"",endTime:"",Error:"",createSuccess:"",selectedFile:null}},computed:Object(h["a"])({},Object(p["e"])("authentication",["user"]),Object(p["c"])("authentication",["isLoggedIn","isConnected"]),Object(p["d"])("authentication",["SOCKET_CONNECT","SOCKET_DISCONNECT"]),Object(p["b"])("authentication",["socket_connect","socket_disconnect"])),methods:{submit:function(e){var t=this,n=u()(this.startDate+" "+this.startTime).format("X"),a=u()(this.endDate+" "+this.endTime).format("X"),r=y()()/1e3;console.log("timestamp",r),a<=n?this.Error="l'horaire de fin du cours est antérieur au début du cours":n<=r?this.Error="la date de début de cours est déjà passée":e?(console.log("date",r),Object(C["a"])().post("/rooms",{authorID:this.user.userID,authorLastname:this.user.lastname,authorFirstname:this.user.firstname,authorUsername:this.user.username,title:this.courseName,description:this.description,avatar:this.avatar,startClass:n,endClass:a}).then(function(e){var n=e.data;if(200===n.status&&n.success)alert("class created"),console.log(n);else if(400===n.status){var a=n.errors,r=a.map(function(e){return e.msg});t.Error=r}}).catch(function(){}),this.$socket.open(),console.log("opening socket"),this.dialog=!1,this.$socket.emit("createRoom",{created_by:this.user.userID,room:this.courseName,description:this.description,timestamp:r,startClass:n,endClass:a}),this.$router.push("/rommsList")):console.log("unauthorized"),this.$router.push("/about")}}},E=O,x=n("2877"),T=Object(x["a"])(E,j,_,!1,null,null,null),w=T.exports,D={name:"HeaderBar",components:{CreateRoom:w},computed:Object(h["a"])({},Object(p["c"])("authentication",["isLoggedIn","isConnected"]),Object(p["e"])("rooms",["rooms"]),Object(p["e"])("authentication",["user"])),methods:Object(h["a"])({},Object(p["b"])("authentication",["logout"]),{leaveRoom:function(){this.$socket.emit("leave",{room:this.room},console.log(this.user.username))}})},L=D,S=Object(x["a"])(L,v,g,!1,null,null,null),N=S.exports,R=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-bottom-nav",{attrs:{app:"",active:e.bottomNav,value:!0,fixed:"",color:"#231846"},on:{"update:active":function(t){e.bottomNav=t}}},[e.isLoggedIn?e._e():n("v-btn",{attrs:{color:"teal",flat:"",value:"fingerprint",to:"/login",fingerprint:""}},[n("span",{staticStyle:{color:"#B39DDB"}},[e._v("Login")]),n("v-icon",{staticStyle:{color:"#B39DDB"}},[e._v("fingerprint")])],1),e.isLoggedIn?e._e():n("v-btn",{attrs:{color:"teal",flat:"",value:"account_box",to:"/register"}},[n("span",{staticStyle:{color:"#B39DDB"}},[e._v("Register")]),n("v-icon",{staticStyle:{color:"#B39DDB"}},[e._v("account_box")])],1),e.isLoggedIn&&"teacher"===this.user.role?n("v-btn",[n("CreateRoom",{staticClass:"createRooms"}),n("v-icon",[e._v("home")])],1):e._e(),e.isLoggedIn?n("v-btn",{attrs:{color:"teal",flat:"",value:"account_box",to:"/roomsList"}},[n("span",[e._v("Classes")]),n("v-icon",[e._v("account_box")])],1):e._e(),e.isLoggedIn?n("v-btn",{attrs:{color:"teal",flat:"",value:"home",to:"/about",fingerprint:""}},[n("span",[e._v("Acceuil")]),n("v-icon",[e._v("home")])],1):e._e(),e.isLoggedIn?n("v-btn",{attrs:{color:"teal",flat:"",to:"/login",value:"exit_to_app"},on:{click:e.logout}},[n("span",[e._v("Logout")]),n("v-icon",[e._v("exit_to_app")])],1):e._e()],1)},I=[],z={name:"BottomNav",components:{CreateRoom:w},data:function(){return{bottomNav:"recent"}},computed:Object(h["a"])({},Object(p["c"])("authentication",["isLoggedIn","isConnected"]),Object(p["e"])("rooms",["rooms"]),Object(p["e"])("authentication",["user"])),methods:Object(h["a"])({},Object(p["b"])("authentication",["logout"]))},P=z,A=(n("9b63"),Object(x["a"])(P,R,I,!1,null,null,null)),B=A.exports;n("bc3a");var U={components:{HeaderBar:N,BottomNav:B}},K=U,$=(n("5c0b"),Object(x["a"])(K,f,m,!1,null,null,null)),q=$.exports,F=n("0e74"),V={namespaced:!0,state:{rooms:[],tags:[]},actions:{fetchRooms:function(e){var t=e.commit;return Object(C["a"])().get("/rooms").then(function(e){var n=e.data;t("setRooms",n.results)})},fetchRoomsByDate:function(e){var t=e.commit;return Object(C["a"])().get("/rooms/startDate").then(function(e){var n=e.data;t("setRooms",n.results)})},fetchRoomsOfTheDay:function(e){var t=e.commit;return Object(C["a"])().get("/rooms/classOfTheDay").then(function(e){var n=e.data;t("setRooms",n.results)})},fetchMyRooms:function(e,t){var n=e.commit;return console.log("/rooms/myRooms/".concat(t)),Object(C["a"])().get("/rooms/myRooms/".concat(t)).then(function(e){var t=e.data;n("setRooms",t.results)})},socket_event:function(e,t){var n=e.commit;n("SOCKET_EVENT",t)}},getters:{},mutations:{SOCKET_EVENT:function(e,t){e.tags=t},appendRoom:function(e,t){e.rooms.push(t)},setRooms:function(e,t){e.rooms=t}}};d["default"].use(p["a"]);var M=new p["a"].Store({strict:!0,modules:{authentication:F["a"],rooms:V},mutations:{},actions:{},plugins:[]});d["default"].prototype.moment=u.a,d["default"].use(c.a),Object(o["sync"])(M,b["a"]);var H=r()(Object({NODE_ENV:"production",BASE_URL:"/"}).SOCKET_CONNECT,{autoConnect:!1});d["default"].use(s["a"],H,{store:M}),d["default"].config.productionTip=!1,new d["default"]({router:b["a"],store:M,render:function(e){return e(q)}}).$mount("#app")},5816:function(e,t,n){},"5c0b":function(e,t,n){"use strict";var a=n("5e27"),r=n.n(a);r.a},"5e27":function(e,t,n){},"9b63":function(e,t,n){"use strict";var a=n("5816"),r=n.n(a);r.a},ba6a:function(e,t,n){"use strict";var a=n("bc3a"),r=n.n(a);t["a"]=function(){return r.a.create({baseURL:Object({NODE_ENV:"production",BASE_URL:"/"}).AXIOS_BASE_URL,withCredentials:!0,timeout:2e4})}}});
//# sourceMappingURL=app.31fddaca.js.map