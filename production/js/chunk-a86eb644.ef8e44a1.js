(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a86eb644"],{"1fab":function(t,e,s){},"715b":function(t,e,s){"use strict";var a=s("1fab"),n=s.n(a);n.a},f67a:function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("div",{staticStyle:{height:"inherit"}},[s("div",{staticClass:"text-center",staticStyle:{padding:"40px 9% 0"}},[s("v-menu",{attrs:{"offset-y":""},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[s("v-btn",t._g({attrs:{color:"#463e54"}},a),[s("v-icon",{attrs:{left:""}},[t._v("expand_more")]),s("span",[t._v("Participants")])],1)]}}])},[s("v-list",[s("v-list-tile",{on:{click:function(e){return t.filterTagsReset()}}},[t._v("all")])],1),t._l(t.participants,function(e){return s("v-list",{key:e.id},[s("v-list-tile",{on:{click:function(s){return t.filterTags(e.userID)}}},[t._v(t._s(e.username))])],1)})],2)],1),s("div",{staticStyle:{display:"flex","flex-direction":"column","justify-content":"flex-end","align-items":"center",height:"80%"}},[s("div",{staticStyle:{"overflow-x":"auto","text-align":"center",width:"80%",position:"relative",height:"275px"}},[s("div",{staticClass:"timeline"},[s("transition",{attrs:{name:"fade"}},["blue"===this.activeIndexStyle[0].backgroundColor?s("div",{key:"blue",style:this.activeIndexStyle[0]},[s("div",[s("p",{staticStyle:{padding:"20px 10px 0"}},[t._v("At "+t._s(t.moment.utc(1e3*(this.activeIndexStyle[0].time-this.roomInfos[0].startClass)).format("HH:mm:ss"))+":")]),s("p",[t._v(t._s(this.activeIndexStyle[0].username))]),s("p",{staticStyle:{padding:"0 10px 10px"}},[t._v("had a question")])]),s("v-icon",{staticClass:"alignCancel",on:{click:function(e){return t.closeModal()}}},[t._v("cancel")])],1):"red"===this.activeIndexStyle[0].backgroundColor?s("div",{key:"red",style:this.activeIndexStyle[0]},[s("div",[s("p",{staticStyle:{padding:"20px 10px 0"}},[t._v("At "+t._s(t.moment.utc(1e3*(this.activeIndexStyle[0].time-this.roomInfos[0].startClass)).format("HH:mm:ss"))+":")]),s("p",[t._v(t._s(this.activeIndexStyle[0].username))]),s("p",{staticStyle:{padding:"0 10px 10px"}},[t._v("didn't understand")])]),s("v-icon",{staticClass:"alignCancel",on:{click:function(e){return t.closeModal()}}},[t._v("cancel")])],1):"yellow"===this.activeIndexStyle[0].backgroundColor?s("div",{key:"yellow",style:this.activeIndexStyle[0]},[s("div",[s("p",{staticStyle:{padding:"20px 10px 0"}},[t._v("At "+t._s(t.moment.utc(1e3*(this.activeIndexStyle[0].time-this.roomInfos[0].startClass)).format("HH:mm:ss"))+":")]),s("p",[t._v(t._s(this.activeIndexStyle[0].username))]),s("p",{staticStyle:{padding:"0 10px 10px"}},[t._v("needs more infos")])]),s("v-icon",{staticClass:"alignCancel",on:{click:function(e){return t.closeModal()}}},[t._v("cancel")])],1):"green"===this.activeIndexStyle[0].backgroundColor?s("div",{key:"green",style:this.activeIndexStyle[0]},[s("div",[s("p",{staticStyle:{padding:"20px 10px 0"}},[t._v("At "+t._s(t.moment.utc(1e3*(this.activeIndexStyle[0].time-this.roomInfos[0].startClass)).format("HH:mm:ss"))+":")]),s("p",[t._v(t._s(this.activeIndexStyle[0].username))]),s("p",{staticStyle:{padding:"0 10px 10px"}},[t._v("loves it !")])]),s("v-icon",{staticClass:"alignCancel",on:{click:function(e){return t.closeModal()}}},[t._v("cancel")])],1):s("div",{style:this.activeIndexStyle[0]})]),t._l(t.tagsStyle,function(e,a){return s("div",{key:e.id,style:e,on:{click:function(e){return t.showModal(a)}}})})],2)])])])])},n=[],i=s("cebc"),o=s("ba6a"),c={name:"Timeline",data:function(){return{roomInfos:[],classDuration:"",tags:[],tagsRef:[],activeIndex:"",activeIndexStyle:[{}],participants:[]}},mounted:function(){var t=this.$store.state.route.params.roomID;this.fetchRoom(t),this.fetchParticipants(t)},computed:{tagsStyle:function(){var t=this;return this.tags.map(function(e){return Object(i["a"])({},e,{backgroundColor:e.color,top:"-30px",left:"".concat((e.time-t.roomInfos[0].startClass)*(5400/t.classDuration)/54,"%"),height:"20px",width:"5px",position:"absolute",cursor:"pointer"})})},tagModal:function(){var t=this;return this.tags.map(function(e){return Object(i["a"])({},e,{color:"black",backgroundColor:e.color,user:"".concat(e.userID),top:"-160px",height:"100px",width:"250px",position:"absolute",left:"".concat(((e.time-t.roomInfos[0].startClass)*(5400/t.classDuration)-125)/54,"%"),display:"flex",justifyContent:"space-around",borderRadius:"15px"})})}},methods:{fetchRoom:function(t){var e=this;Object(o["a"])().get("/rooms/timeline/".concat(t),{}).then(function(s){var a=s.data,n=s.err;if(n)console.log(n);else if(200===a.status){console.log("data",a);var i=a;console.log("roomData",i);var o=i.content1[0],c=o.startClass,l=o.endClass,r=o.authorID,d=o.authorFirstname,u=o.authorLastname,v=o.authorUsername,p=o.title;console.log(c),console.log(l),e.roomInfos.push({roomID:t,authorID:r,authorFirstname:d,authorLastname:u,authorUsername:v,title:p,startClass:c,endClass:l});var h=l-c;e.classDuration=h,e.tags=i.content2,e.tagsRef=i.content2,console.log("this tags before",e.tags)}}).catch(function(){})},fetchParticipants:function(t){var e=this;Object(o["a"])().get("/rooms/participants/".concat(t),{}).then(function(t){var s=t.data,a=t.err;a?console.log(a):200===s.status&&(console.log(s.results),e.participants=s.results)}).catch(function(){})},showModal:function(t){this.activeIndex=t;var e=this.tagModal[this.activeIndex];this.activeIndexStyle[0]?this.activeIndexStyle.splice(0,1,e):this.activeIndexStyle.push(e),this.activeIndexStyle[0].display="flex"},closeModal:function(){this.activeIndexStyle[0].display="none"},filterTags:function(t){console.log("participantsID",t),this.tags=this.tagsRef,this.tags=this.tags.filter(function(e){return e.userID===t}),console.log("new tags",this.tags)},filterTagsReset:function(){this.tags=this.tagsRef}}},l=c,r=(s("715b"),s("2877")),d=Object(r["a"])(l,a,n,!1,null,null,null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-a86eb644.ef8e44a1.js.map