(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0674d2f8"],{"12c5":function(t,e,o){},"1bb5":function(t,e,o){"use strict";o.r(e);var s=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",[o("v-container",{staticStyle:{"padding-bottom":"64px"}},[o("div",{staticStyle:{width:"auto"}},[o("div",{staticClass:"text-center"},[o("v-menu",{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var s=e.on;return[o("v-btn",t._g({attrs:{color:"#463e54"}},s),[o("v-icon",{attrs:{left:""}},[t._v("expand_more")]),o("span",[t._v("Filter by")])],1)]}}])},[o("v-list",[o("v-list-tile",{on:{click:function(e){return t.fetchRooms()}}},[t._v("Date of creation")]),o("v-list-tile",{on:{click:function(e){return t.fetchRoomsByDate()}}},[t._v("Class start Date")]),o("v-list-tile",{on:{click:function(e){return t.fetchRoomsOfTheDay()}}},[t._v("Classes of the day")]),o("v-list-tile",{on:{click:function(e){return t.fetchMyRooms(t.user.userID)}}},[t._v("My Classes")])],1)],1)],1),o("div",{staticStyle:{display:"flex","flex-wrap":"wrap","justify-content":"space-around"}},t._l(t.paginatedDatas,function(e,s){return o("div",{key:e.id},[o("v-card",{staticClass:"elevation-24"},[o("v-img",{attrs:{height:"100px",src:"https://cdn.vuetifyjs.com/images/cards/docks.jpg"}},[o("v-card-title",{staticStyle:{color:"white","font-size":"20px","text-transform":"uppercase"}},[t._v(t._s(e.title))])],1),o("v-layout",{staticStyle:{"margin-top":"15px"}},[o("v-flex",[o("h2",{staticStyle:{padding:"15px"}},[t._v("teacher: "+t._s(e.authorUsername))])]),o("v-spacer"),o("v-spacer"),o("v-flex",{staticStyle:{"align-self":"center","padding-right":"15px"}},[o("v-avatar",{attrs:{size:"56px"}},[o("img",{attrs:{src:"https://avatars0.githubusercontent.com/u/9064066?v=4&s=460",alt:"Avatar"}})])],1)],1),o("h3",{staticStyle:{"padding-left":"15px",margin:"10px 0"}},[t._v("Day:  "+t._s(t.moment(1e3*e.startClass).format("Do MMM")))]),o("div",{staticStyle:{display:"flex",margin:"10px 0"}},[o("div",{staticStyle:{"padding-left":"15px"}},[t._v("begining: "+t._s(t.moment(1e3*e.startClass).format("HH mm"))+" ")]),o("div",{staticStyle:{"padding-left":"15px"}},[t._v("finishing: "+t._s(t.moment(1e3*e.endClass).format("HH mm"))+"\n              ")])]),o("h3",{staticStyle:{"padding-left":"15px"}},[t._v("Subject: ")]),o("p",{staticStyle:{height:"60px",width:"210px",overflow:"auto",padding:"5px 15px 15px 15px","margin-bottom":"0"}},[t._v(t._s(e.description))]),o("v-layout",{attrs:{"justify-space-around":""}},[o("div",[t.isValidTime(s)?o("v-btn",{on:{click:function(o){return t.join(e.roomID,e.title,e.authorID,e.authorLastname,e.authorFirstname)}}},[t._v("Join\n                ")]):o("v-btn",{on:{click:function(o){return t.viewRoom(e.roomID)}}},[t._v("Timeline")])],1),o("div",[o("v-btn",[t._v("edit")])],1)])],1),o("br")],1)}),0),o("div",{staticStyle:{display:"flex","justify-content":"space-around"}},[o("v-btn",{attrs:{disabled:0===t.pageNumber},on:{click:t.prevPage}},[t._v("\n            Previous\n        ")]),o("v-btn",{attrs:{disabled:t.pageNumber>=t.pageCount-1},on:{click:t.nextPage}},[t._v("\n            Next\n        ")])],1)])])],1)},n=[],i=o("0a0d"),a=o.n(i),r=o("cebc"),c=o("2f62"),l={name:"roomsList",data:function(){return{roomInfos:[],pageNumber:0,size:6}},mounted:function(){console.log("mounted rooms",this.rooms),!1===this.isConnected?(this.$socket.open(),this.connect(),console.log("opening socket"),console.log("user looged in",this.isLoggedIn)):console.log("user logged ?",this.isLoggedIn)},computed:Object(r["a"])({},Object(c["e"])("rooms",["rooms"]),Object(c["e"])("authentication",["user"]),Object(c["c"])("authentication",["isLoggedIn","isConnected"]),{pageCount:function(){console.log(this.rooms.length);var t=this.rooms.length,e=this.size;return Math.ceil(t/e)},paginatedDatas:function(){var t=this.pageNumber*this.size,e=t+this.size;return console.log("paginated rooms",this.rooms),this.rooms.slice(t,e)}}),methods:Object(r["a"])({},Object(c["d"])("rooms",["setRooms"]),Object(c["b"])("rooms",["fetchRooms","fetchRoomsByDate","fetchRoomsOfTheDay","fetchMyRooms","connect"]),{join:function(t,e,o,s,n){console.log("room name :",e),console.log("author :",o),console.log("author last name",s),this.$socket.emit("join",{roomID:t,roomName:e,createdBy:o,authorLastname:s,authorFirstname:n}),this.user?"student"===this.user.role?this.$router.push("/student/viz"):this.$router.push("/teacher/".concat(t)):alert("unauthorized: you are not authentified")},viewRoom:function(t){this.$router.push("/rooms/".concat(t))},roomCreation:function(t){console.log("room creation data",t),this.roomInfos.push(t)},isValidTime:function(t){console.log("i ==",t);var e=a()()/1e3;return console.log("date",e),e>this.paginatedDatas[t].startClass&&e<this.paginatedDatas[t].endClass},nextPage:function(){this.pageNumber+=1},prevPage:function(){this.pageNumber-=1}})},u=l,d=(o("9416"),o("2877")),m=Object(d["a"])(u,s,n,!1,null,"4dd738c4",null);e["default"]=m.exports},9416:function(t,e,o){"use strict";var s=o("12c5"),n=o.n(s);n.a}}]);
//# sourceMappingURL=chunk-0674d2f8.f55ac020.js.map