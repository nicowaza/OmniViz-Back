(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8f303796"],{"50d4":function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("v-container",{staticClass:"StdContainer",attrs:{"fill-height":""}},[s("v-layout",{attrs:{"align-center":"","justify-center":""}},[s("studentBtn")],1)],1)},o=[],a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"btnContainer"},[s("div",{staticStyle:{"text-align":"left","padding-left":"15px",color:"#f6f6e5"}},[s("h3",[t._v("TEACHER: ")]),s("p",[t._v(t._s(this.rooms[0].authorFirstname)+" "+t._s(this.rooms[0].authorLastname))]),s("h3",[t._v("CLASS:  ")]),s("p",[t._v(t._s(this.rooms[0].title))])]),s("div",{staticClass:"btnRow1"},[s("v-btn",{staticClass:"button btnGreen",attrs:{id:"btnGreen",round:"",light:""},on:{click:function(e){return t.clickTag("green")}}},[s("span",{staticClass:"text-wrap"},[t._v("GOT IT !")])]),s("v-btn",{staticClass:"button btnRed",attrs:{id:"btnRed"},on:{click:function(e){return t.clickTag("red")}}},[s("span",{staticClass:"text-wrap"},[t._v("NOT UNDERSTOOD")])])],1),s("div",{staticClass:"btnRow2"},[s("v-btn",{staticClass:"button btnBlue",attrs:{id:"btnBlue"},on:{click:function(e){return t.clickTag("blue")}}},[s("span",{staticClass:"text-wrap"},[t._v("MORE INFO")])]),s("v-btn",{staticClass:"button btnYellow",attrs:{id:"btnYellow"},on:{click:function(e){return t.clickTag("yellow")}}},[s("span",{staticClass:"text-wrap"},[t._v("INTERESTING")])])],1)])},i=[],c=s("0a0d"),r=s.n(c),u=s("cebc"),l=s("2f62"),d=s("41cb"),h={name:"StudentBtn",props:{},data:function(){return{messages:[],participants:[],students:[],teacher:[],roomInfos:""}},beforeDestroy:function(){this.$socket.emit("leave"),this.$socket.close()},beforeCreate:function(){!1===this.isLoggedIn&&d["a"].push("/login")},mounted:function(){var t=this,e=this.$store.state.route.params.roomID;this.fetchRoomsById(e).then(function(){t.roomInfos=t.rooms})},computed:Object(u["a"])({},Object(l["e"])("authentication",["user"]),Object(l["e"])("rooms",["rooms"]),Object(l["c"])("authentication",["isLoggedIn","isConnected"])),sockets:{joiningEvent:function(t){console.log("data :",t);var e=t.room,s={username:t.username,id:t.user_id,role:t.user_role},n=this.user.userID,o=t.user_id;console.log(n),console.log(o),o===n?this.messages.push("You've joined ".concat(e)):this.messages.push(t.message),this.participants.push({username:t.username,id:t.user_id,role:t.user_role}),"teacher"===s.role?this.teacher.push(s):"student"===s.role&&this.students.push(s)},leavingEvent:function(t){console.log("leaving data :",t),this.messages.push(t.message),this.participants=this.participants.filter(function(e){return e.id!==t.user_id}),this.students=this.students.filter(function(e){return e.id!==t.user_id})},closeRoom:function(t){console.log("classe fermée :",t),this.$socket.close(),alert("Cette classe a été fermée par ".concat(this.teacher.username)),d["a"].push("/roomsList")}},methods:Object(u["a"])({},Object(l["d"])("rooms",["setRooms"]),Object(l["b"])("rooms",["fetchRoomsById"]),{clickTag:function(t){var e=r()()/1e3;console.log(e),this.$socket.emit("tag",{tag:t,timestamp:e})}})},f=h,m=(s("d35b"),s("2877")),p=Object(m["a"])(f,a,i,!1,null,"24041ce9",null),b=p.exports,g={name:"studentViz",components:{StudentBtn:b}},v=g,_=(s("e376"),Object(m["a"])(v,n,o,!1,null,null,null));e["default"]=_.exports},a3fb:function(t,e,s){},c620:function(t,e,s){},d35b:function(t,e,s){"use strict";var n=s("a3fb"),o=s.n(n);o.a},e376:function(t,e,s){"use strict";var n=s("c620"),o=s.n(n);o.a}}]);
//# sourceMappingURL=chunk-8f303796.2ed80689.js.map