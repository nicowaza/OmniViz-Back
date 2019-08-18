(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-404a9970"],{"024b":function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",{attrs:{"fill-height":""}},[s("v-layout",{staticStyle:{height:"auto"},attrs:{"align-center":"","justify-center":""}},[s("TeacherDisplay")],1)],1)},o=[],r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"1s"}},[n("v-container",{staticStyle:{display:"flex","justify-content":"space-around"}},[n("div",[n("h3",[t._v("TEACHER: ")]),n("p",[t._v(t._s(this.rooms[0].authorFirstname)+" "+t._s(this.rooms[0].authorLastname))]),n("h3",[t._v("CLASS:  ")]),n("p",[t._v(t._s(this.rooms[0].title))])]),n("v-btn",{attrs:{color:"red"},on:{click:function(e){return t.closeRoom()}}},[t._v("close")])],1),n("v-container",{staticClass:"test",staticStyle:{height:"100%",display:"flex","justify-content":"space-around","flex-wrap":"wrap","margin-top":"0px"}},[n("div",[t.alerts.includes("red")?n("div",[n("RedBtn",{staticClass:"wiggle"})],1):n("div",{staticClass:"elevation-24"},[n("GreenBtn")],1),n("audio",{attrs:{id:"audio",controls:"",loop:""}},[n("source",{attrs:{src:s("06bf"),type:"audio/mpeg"}}),t._v("\n        Your browser does not support the audio element.\n        ")]),n("br"),n("br")]),n("div",{staticClass:"elevation-24",attrs:{id:"chatbox"}},t._l(t.messages,function(e){return n("div",{key:e.id,staticStyle:{padding:"5px 0"}},[n("p",{staticStyle:{margin:"5px 0"}},[t._v(t._s(e))])])}),0)])],1)},a=[],i=s("0a0d"),c=s.n(i),l=(s("ac6a"),s("cebc")),u=s("2f62"),m=s("c1df"),d=s.n(m),h=s("41cb"),f=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},v=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"button btnRed textAlign"},[t._v("I DON'T GET IT")])])}],g={name:"RedBtn"},p=g,b=(s("349b"),s("2877")),_=Object(b["a"])(p,f,v,!1,null,null,null),y=_.exports,T=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"button btnBlue textAlign"},[t._v(t._s(this.tags.username)+" has a question")])])},L=[],S={name:"BlueBtn",computed:Object(l["a"])({},Object(u["e"])("rooms",["tags"])),data:function(){return{}}},j=S,x=(s("c141"),Object(b["a"])(j,T,L,!1,null,"3462b4ee",null)),B=x.exports,E=function(){var t=this,e=t.$createElement;t._self._c;return t._m(0)},C=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticClass:"elevation-24 btn btnGreen textAlign"},[t._v("Everything's ok")])])}],O={name:"GreenBtn"},A=O,D=(s("5cde"),Object(b["a"])(A,E,C,!1,null,null,null)),I=D.exports,R={name:"TeacherDisplay",components:{RedBtn:y,BlueBtn:B,GreenBtn:I},data:function(){return{messages:[],roomInfos:[],welcomes:[],alerts:[],events:[],students:[],teacher:[],host:[]}},mounted:function(){var t=this,e=this.$store.state.route.params.roomID;this.fetchRoomsById(e).then(function(){t.roomInfos.push(t.rooms),t.rooms[0].authorID===t.user.userID&&t.messages.push("You've joined ".concat(t.rooms[0].title)),"teacher"===t.user.role&&t.teacher.push(t.user)}),this.scrollToBottom()},computed:Object(l["a"])({},Object(u["e"])("authentication",["user"]),Object(u["e"])("rooms",["rooms"]),Object(u["c"])("authentication",["isLoggedIn","isConnected"])),beforeDestroy:function(){this.$socket.close()},sockets:{joiningEvent:function(t){console.log("data :",t.roomData);var e=t.roomData.roomName;console.log("room",e);var s={username:t.username,id:t.user_id,role:t.user_role},n=this.user.userID,o=t.user_id;console.log("logged user id",n),console.log("conncected user id",o),o!==n&&this.messages.push(t.message),"student"===s.role&&this.students.push(s)},leavingEvent:function(t){this.messages.push(t.message),this.students=this.students.filter(function(e){return e.id!==t.user_id})},roomCreation:function(t){console.log("room creation data",t),this.roomInfos.push(t)},event:function(t){var e=this;if(this.events.push({tag:t.color,timestamp:t.time,username:t.username}),"blue"===t.color){this.alerts.push(t.color);var s=d()(1e3*t.time).format("HH:mm:ss");console.log("time",s),this.messages.push("At ".concat(s,": ").concat(t.username," has a question ")),window.navigator.vibrate(6e3),setTimeout(this.resetAlerts(),6e3)}console.log("this alert tags()",this.alertTags()),console.log("this alerts",this.alerts),console.log(t),this.alertTags()&&this.alertTags().forEach(function(t){var s=e.alerts;s.push(t),e.playAudio(),setTimeout(function(){e.resetAlerts(),e.pauseAudio()},6e3),e.events=e.events.filter(function(e){return e.tag!==t})})}},methods:Object(l["a"])({},Object(u["d"])("rooms",["setRooms"]),Object(u["b"])("rooms",["fetchRoomsById"]),{scrollToBottom:function(){var t=document.getElementById("chatbox");t.scrollTop=t.scrollHeight},alertTags:function(){var t=this;return["red"].filter(function(e){return t.events.filter(function(t){return c()()/1e3-t.timestamp<3e4}).filter(function(t){return t.tag===e}).length>t.students.length/2})},closeRoom:function(t){alert("Vous allez fermer ce cours"),this.$socket.emit("closeRoom",console.log("fermeture"),{data:t}),h["a"].push("/about")},resetAlerts:function(){var t=this.alerts;console.log("reset this alerts",t),console.log("setime out"),t.splice(0,1)},playAudio:function(){var t=document.getElementById("audio");t.play()},pauseAudio:function(){var t=document.getElementById("audio");t.pause(),t.currentTime=0}})},w=R,k=(s("aed0"),Object(b["a"])(w,r,a,!1,null,"4aa967ed",null)),G=k.exports,M={components:{TeacherDisplay:G},name:"Teacher"},$=M,H=Object(b["a"])($,n,o,!1,null,null,null);e["default"]=H.exports},"06bf":function(t,e,s){t.exports=s.p+"media/Wrong-alert-beep-sound.579e2f7c.mp3"},"257a":function(t,e,s){},"349b":function(t,e,s){"use strict";var n=s("491f"),o=s.n(n);o.a},"491f":function(t,e,s){},"4d15":function(t,e,s){},"5cde":function(t,e,s){"use strict";var n=s("4d15"),o=s.n(n);o.a},ac6a:function(t,e,s){for(var n=s("cadf"),o=s("0d58"),r=s("2aba"),a=s("7726"),i=s("32e9"),c=s("84f2"),l=s("2b4c"),u=l("iterator"),m=l("toStringTag"),d=c.Array,h={CSSRuleList:!0,CSSStyleDeclaration:!1,CSSValueList:!1,ClientRectList:!1,DOMRectList:!1,DOMStringList:!1,DOMTokenList:!0,DataTransferItemList:!1,FileList:!1,HTMLAllCollection:!1,HTMLCollection:!1,HTMLFormElement:!1,HTMLSelectElement:!1,MediaList:!0,MimeTypeArray:!1,NamedNodeMap:!1,NodeList:!0,PaintRequestList:!1,Plugin:!1,PluginArray:!1,SVGLengthList:!1,SVGNumberList:!1,SVGPathSegList:!1,SVGPointList:!1,SVGStringList:!1,SVGTransformList:!1,SourceBufferList:!1,StyleSheetList:!0,TextTrackCueList:!1,TextTrackList:!1,TouchList:!1},f=o(h),v=0;v<f.length;v++){var g,p=f[v],b=h[p],_=a[p],y=_&&_.prototype;if(y&&(y[u]||i(y,u,d),y[m]||i(y,m,p),c[p]=d,b))for(g in n)y[g]||r(y,g,n[g],!0)}},aed0:function(t,e,s){"use strict";var n=s("257a"),o=s.n(n);o.a},c141:function(t,e,s){"use strict";var n=s("d643"),o=s.n(n);o.a},d643:function(t,e,s){}}]);
//# sourceMappingURL=chunk-404a9970.7b7720db.js.map