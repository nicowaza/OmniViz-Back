(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a86eb644"],{"1fab":function(t,e,a){},"715b":function(t,e,a){"use strict";var n=a("1fab"),s=a.n(n);s.a},f67a:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticStyle:{display:"flex","flex-direction":"column","justify-content":"flex-end","align-items":"center",height:"100%"}},[a("div",{staticStyle:{"overflow-x":"scroll",width:"80%",position:"relative",height:"28%"}},[a("div",{staticClass:"timeline"},[a("transition",{attrs:{name:"fade"}},["blue"===this.activeIndexStyle[0].backgroundColor?a("div",{key:"blue",style:this.activeIndexStyle[0]},[a("p",{staticClass:"centerText"},[t._v(t._s(this.activeIndexStyle[0].user)+" had a question")]),a("v-icon",{staticClass:"alignCancel",on:{click:function(e){return t.closeModal()}}},[t._v("cancel")])],1):"red"===this.activeIndexStyle[0].backgroundColor?a("div",{key:"red",style:this.activeIndexStyle[0]},[a("p",{staticClass:"centerText"},[t._v(t._s(this.activeIndexStyle[0].user)+" didn't understand")]),a("v-icon",{staticClass:"alignCancel",on:{click:function(e){return t.closeModal()}}},[t._v("cancel")])],1):"yellow"===this.activeIndexStyle[0].backgroundColor?a("div",{key:"yellow",style:this.activeIndexStyle[0]},[a("p",{staticClass:"centerText"},[t._v(t._s(this.activeIndexStyle[0].user)+" needs more infos")]),a("v-icon",{staticClass:"alignCancel",on:{click:function(e){return t.closeModal()}}},[t._v("cancel")])],1):"green"===this.activeIndexStyle[0].backgroundColor?a("div",{key:"green",style:this.activeIndexStyle[0]},[a("p",{staticClass:"centerText"},[t._v(t._s(this.activeIndexStyle[0].user)+" loves it ! ")]),a("v-icon",{staticClass:"alignCancel",on:{click:function(e){return t.closeModal()}}},[t._v("cancel")])],1):a("div",{style:this.activeIndexStyle[0]})]),t._l(t.tagsStyle,function(e,n){return a("div",{key:e.id,style:e,on:{click:function(e){return t.showModal(n)}}})})],2)])])])},s=[],o=a("cebc"),i=a("ba6a"),c={name:"Timeline",data:function(){return{roomInfos:[],classDuration:"",tags:[],activeIndex:"",activeIndexStyle:[{}]}},mounted:function(){var t=this.$store.state.route.params.roomID;this.fetchRoom(t)},computed:{tagsStyle:function(){var t=this;return this.tags.map(function(e){return Object(o["a"])({},e,{backgroundColor:e.color,top:"-30px",left:"".concat((e.time-t.roomInfos[0].startClass)*(1800/t.classDuration)/18,"%"),height:"20px",width:"5px",position:"absolute",cursor:"pointer"})})},tagModal:function(){var t=this;return this.tags.map(function(e){return Object(o["a"])({},e,{color:"black",backgroundColor:e.color,user:"".concat(e.userID),top:"-125px",height:"75px",width:"130px",position:"absolute",left:"".concat(((e.time-t.roomInfos[0].startClass)*(1800/t.classDuration)-62.5)/18,"%"),display:"flex",justifyContent:"space-around",borderRadius:"15px"})})}},methods:{fetchRoom:function(t){var e=this;Object(i["a"])().get("/rooms/".concat(t),{}).then(function(a){var n=a.data,s=a.err;if(s)console.log(s);else if(200===n.status){console.log("data",n);var o=n;console.log("roomData",o);var i=o.content1[0],c=i.startClass,l=i.endClass,r=i.authorID,u=i.authorFirstname,d=i.authorLastname,h=i.authorUsername,v=i.title;console.log(c),console.log(l),e.roomInfos.push({roomID:t,authorID:r,authorFirstname:u,authorLastname:d,authorUsername:h,title:v,startClass:c,endClass:l});var f=l-c;e.classDuration=f,e.tags=o.content2,console.log("this tags before",e.tags),e.newTagArray(),console.log("this tag after",e.tags)}}).catch(function(){})},showModal:function(t){this.activeIndex=t;var e=this.tagModal[this.activeIndex];this.activeIndexStyle[0]?this.activeIndexStyle.splice(0,1,e):this.activeIndexStyle.push(e)},closeModal:function(){this.activeIndexStyle[0].display="none"}}},l=c,r=(a("715b"),a("2877")),u=Object(r["a"])(l,n,s,!1,null,null,null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-a86eb644.b7ed30b1.js.map