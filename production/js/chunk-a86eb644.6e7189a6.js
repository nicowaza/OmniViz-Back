(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a86eb644"],{"1fab":function(t,e,s){},"715b":function(t,e,s){"use strict";var n=s("1fab"),a=s.n(n);a.a},f67a:function(t,e,s){"use strict";s.r(e);var n=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticStyle:{height:"inherit"}},[s("div",{staticClass:"text-center",staticStyle:{padding:"40px 9% 0"}},[s("v-menu",{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[s("v-btn",t._g({attrs:{color:"#463e54"}},n),[s("v-icon",{attrs:{left:""}},[t._v("expand_more")]),s("span",[t._v("Participants")])],1)]}}])},[s("v-list",[s("v-list-tile",{on:{click:function(e){return t.filterTagsReset()}}},[t._v("all")])],1),t._l(t.participants,function(e){return s("v-list",{key:e.id},[s("v-list-tile",{on:{click:function(s){return t.filterTags(e.userID)}}},[t._v(t._s(e.username))])],1)})],2)],1),s("div",{staticStyle:{display:"flex","flex-direction":"column","justify-content":"flex-end","align-items":"center",height:"80%"}},[s("div",{staticStyle:{"overflow-x":"scroll",width:"80%",position:"relative",height:"240px"}},[s("div",{staticClass:"timeline"},[s("transition",{attrs:{name:"fade"}},["blue"===this.activeIndexStyle[0].backgroundColor?s("div",{key:"blue",style:this.activeIndexStyle[0]},[s("p",{staticClass:"centerText"},[t._v("At "+t._s(t.moment(1e3*this.activeIndexStyle[0].time).format("HH:mm:ss"))+": "+t._s(this.activeIndexStyle[0].username)+" had a question")]),s("v-icon",{staticClass:"alignCancel",on:{click:function(e){return t.closeModal()}}},[t._v("cancel")])],1):"red"===this.activeIndexStyle[0].backgroundColor?s("div",{key:"red",style:this.activeIndexStyle[0]},[s("p",{staticClass:"centerText"},[t._v("At "+t._s(t.moment(1e3*this.activeIndexStyle[0].time).format("HH:mm:ss"))+": "+t._s(this.activeIndexStyle[0].username)+" didn't understand ")]),s("v-icon",{staticClass:"alignCancel",on:{click:function(e){return t.closeModal()}}},[t._v("cancel")])],1):"yellow"===this.activeIndexStyle[0].backgroundColor?s("div",{key:"yellow",style:this.activeIndexStyle[0]},[s("p",{staticClass:"centerText"},[t._v("At "+t._s(t.moment(1e3*this.activeIndexStyle[0].time).format("HH:mm:ss"))+": "+t._s(this.activeIndexStyle[0].username)+" needs more infos")]),s("v-icon",{staticClass:"alignCancel",on:{click:function(e){return t.closeModal()}}},[t._v("cancel")])],1):"green"===this.activeIndexStyle[0].backgroundColor?s("div",{key:"green",style:this.activeIndexStyle[0]},[s("p",{staticClass:"centerText"},[t._v("At "+t._s(t.moment(1e3*this.activeIndexStyle[0].time).format("HH:mm:ss"))+": "+t._s(this.activeIndexStyle[0].username)+" loves it ! ")]),s("v-icon",{staticClass:"alignCancel",on:{click:function(e){return t.closeModal()}}},[t._v("cancel")])],1):s("div",{style:this.activeIndexStyle[0]})]),t._l(t.tagsStyle,function(e,n){return s("div",{key:e.id,style:e,on:{click:function(e){return t.showModal(n)}}})})],2)])])])])},a=[],i=s("cebc"),o=s("ba6a"),c={name:"Timeline",data:function(){return{roomInfos:[],classDuration:"",tags:[],tagsRef:[],activeIndex:"",activeIndexStyle:[{}],participants:[]}},mounted:function(){var t=this.$store.state.route.params.roomID;this.fetchRoom(t),this.fetchParticipants(t)},computed:{tagsStyle:function(){var t=this;return this.tags.map(function(e){return Object(i["a"])({},e,{backgroundColor:e.color,top:"-30px",left:"".concat((e.time-t.roomInfos[0].startClass)*(1800/t.classDuration)/18,"%"),height:"20px",width:"5px",position:"absolute",cursor:"pointer"})})},tagModal:function(){var t=this;return this.tags.map(function(e){return Object(i["a"])({},e,{color:"black",backgroundColor:e.color,user:"".concat(e.userID),top:"-140px",height:"auto",width:"130px",position:"absolute",left:"".concat(((e.time-t.roomInfos[0].startClass)*(1800/t.classDuration)-62.5)/18,"%"),display:"flex",justifyContent:"space-around",borderRadius:"15px"})})}},methods:{fetchRoom:function(t){var e=this;Object(o["a"])().get("/rooms/timeline/".concat(t),{}).then(function(s){var n=s.data,a=s.err;if(a)console.log(a);else if(200===n.status){console.log("data",n);var i=n;console.log("roomData",i);var o=i.content1[0],c=o.startClass,l=o.endClass,r=o.authorID,u=o.authorFirstname,d=o.authorLastname,h=o.authorUsername,v=o.title;console.log(c),console.log(l),e.roomInfos.push({roomID:t,authorID:r,authorFirstname:u,authorLastname:d,authorUsername:h,title:v,startClass:c,endClass:l});var f=l-c;e.classDuration=f,e.tags=i.content2,e.tagsRef=i.content2,console.log("this tags before",e.tags)}}).catch(function(){})},fetchParticipants:function(t){var e=this;Object(o["a"])().get("/rooms/participants/".concat(t),{}).then(function(t){var s=t.data,n=t.err;n?console.log(n):200===s.status&&(console.log(s.results),e.participants=s.results)}).catch(function(){})},showModal:function(t){this.activeIndex=t;var e=this.tagModal[this.activeIndex];this.activeIndexStyle[0]?this.activeIndexStyle.splice(0,1,e):this.activeIndexStyle.push(e),this.activeIndexStyle[0].display="flex"},closeModal:function(){this.activeIndexStyle[0].display="none"},filterTags:function(t){console.log("participantsID",t),this.tags=this.tagsRef,this.tags=this.tags.filter(function(e){return e.userID===t}),console.log("new tags",this.tags)},filterTagsReset:function(){this.tags=this.tagsRef}}},l=c,r=(s("715b"),s("2877")),u=Object(r["a"])(l,n,a,!1,null,null,null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-a86eb644.6e7189a6.js.map