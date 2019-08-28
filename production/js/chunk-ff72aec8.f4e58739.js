(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ff72aec8"],{"368e":function(e,t,s){"use strict";var r=s("a2f7"),a=s.n(r);a.a},"73cf":function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("v-container",[s("v-layout",{staticStyle:{height:"auto"},attrs:{row:"",wrap:""}},[s("v-flex",{staticStyle:{"margin-top":"14vh","margin-bottom":"5vh"},attrs:{xs8:"","offset-xs2":""}},[s("h1",[e._v("Register")]),s("br"),s("v-form",{directives:[{name:"show",rawName:"v-show",value:1===e.step,expression:"step === 1"}],ref:"form1",attrs:{autocomplete:"off","lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[s("v-text-field",{staticClass:"elevation-24",attrs:{label:"Enter your email*",value:e.registerEmail,rules:e.emailRules,required:""},on:{input:e.setRegisterEmail},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}}),s("br"),s("v-text-field",{staticClass:"elevation-24",attrs:{label:"Enter a username*",value:e.registerUsername,rules:e.usernameRules,required:""},on:{input:e.setRegisterUsername},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),s("br"),s("small",{staticStyle:{color:"#f6f6e5"}},[e._v("*indicates required field")]),s("br"),s("br"),s("div",{staticStyle:{display:"flex","justify-content":"flex-end"}},[s("v-btn",{staticClass:"btnStyle",on:{click:function(t){return t.preventDefault(),e.next1()}}},[e._v("Next")])],1)],1),s("v-form",{directives:[{name:"show",rawName:"v-show",value:2===e.step,expression:"step === 2"}],ref:"form2",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[s("v-text-field",{staticClass:"elevation-24",attrs:{label:"Enter your firstname",value:e.registerFirstname},on:{input:e.setRegisterFirstname}}),s("br"),s("v-text-field",{staticClass:"elevation-24",attrs:{label:"Enter your lastname",value:e.registerLastname},on:{input:e.SetRegisterLastname}}),s("br"),s("small",{staticStyle:{color:"#f6f6e5"}},[e._v("*indicates required field")]),s("br"),s("br"),s("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[s("v-btn",{staticClass:"btnStyle",on:{click:function(t){return t.preventDefault(),e.prev()}}},[e._v("Previous")]),s("v-btn",{staticClass:"btnStyle",on:{click:function(t){return t.preventDefault(),e.next2()}}},[e._v("Next")])],1)],1),s("v-form",{directives:[{name:"show",rawName:"v-show",value:3===e.step,expression:"step === 3"}],ref:"form3",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[s("v-text-field",{staticClass:"elevation-24",attrs:{label:"Enter your university",value:e.registerUniversity},on:{input:e.setRegisterUniversity}}),s("br"),s("v-select",{staticClass:"elevation-24",attrs:{items:e.role,label:"Enter your status*",value:e.registerRole,rules:[function(e){return!!e||"Role is required"}],required:""},on:{input:e.setRegisterRole}}),s("br"),s("small",{staticStyle:{color:"#f6f6e5"}},[e._v("*indicates required field")]),s("br"),s("br"),s("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[s("v-btn",{staticClass:"btnStyle",on:{click:function(t){return t.preventDefault(),e.prev()}}},[e._v("Previous")]),s("v-btn",{staticClass:"btnStyle",on:{click:function(t){return t.preventDefault(),e.next3()}}},[e._v("Next")])],1)],1),s("v-form",{directives:[{name:"show",rawName:"v-show",value:4===e.step,expression:"step === 4"}],ref:"form4",attrs:{"lazy-validation":""},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[s("v-text-field",{staticClass:"elevation-24",attrs:{label:"Enter your password*",type:"password",value:e.registerPassword,rules:e.passwordRules,required:""},on:{input:e.setRegisterPassword},model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),s("br"),s("v-text-field",{staticClass:"elevation-24",attrs:{label:"Confirm your password*",type:"password",value:e.registerConfirmedPassword,rules:[e.passwordConfirmationRule],required:""},on:{input:e.setRegisterConfirmedPassword},model:{value:e.confirmedPassword,callback:function(t){e.confirmedPassword=t},expression:"confirmedPassword"}}),s("br"),s("small",{staticStyle:{color:"#f6f6e5"}},[e._v("*indicates required field")]),s("br"),s("br"),s("div",{staticStyle:{display:"flex","justify-content":"space-between"}},[s("v-btn",{staticClass:"btnStyle",on:{click:function(t){return t.preventDefault(),e.prev()}}},[e._v("Previous")]),s("v-btn",{staticClass:"btnStyle",attrs:{disabled:!e.valid},on:{click:function(t){return e.validate()}}},[s("v-icon",{staticClass:"mr-2"},[e._v("fingerprint")]),e._v("Register")],1)],1)],1)],1)],1)],1)},a=[],i=(s("7f7f"),s("cebc")),n=s("2f62"),l={name:"register",data:function(){return{step:1,selectedFile:null,role:["student","teacher"],valid:!0,email:"",emailRules:[function(e){return!!e||"E-mail is required"},function(e){return/.+@.+\..+/.test(e)||"E-mail must be valid"}],username:"",usernameRules:[function(e){return!!e||"Username is required"},function(e){return e&&e.length>=5||"Username must be at least 5 characters"},function(e){return e&&e.length<=20||"Username must be less than 20 characters"}],password:"",passwordRules:[function(e){return!!e||"password is required"},function(e){return/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.* )(?=.*[^a-zA-Z0-9]).{8,}$/.test(e)||"Your Password must include at least one lowercase character, one uppercase character, one number, and one special character"},function(e){return e&&e.length>=8||"Password must be at least 8 characters"},function(e){return e&&e.length<=50||"Password must be less than 50 characters"}],confirmedPassword:""}},computed:Object(i["a"])({},Object(n["e"])("authentication",["registerEmail","registerUsername","registerPassword","registerConfirmedPassword","registerFirstname","registerLastname","registerAvatar","registerUniversity","registerRole","registerErrors"]),{passwordConfirmationRule:function(){var e=this;return function(){return e.password===e.confirmedPassword||"Passwords must match"}}}),methods:Object(i["a"])({onChooseFile:function(){this.$refs.imageUpload.click()},onFileSelected:function(e){var t=e.target.files;console.log("files",t);var s=t[0].name;console.log("filename",s),this.selectedFile=s,console.log("this selected",this.selectedFile)}},Object(n["d"])("authentication",["setRegisterEmail","setRegisterPassword","setRegisterConfirmedPassword","setRegisterUsername","setRegisterFirstname","SetRegisterLastname","setRegisterAvatar","setRegisterUniversity","setRegisterRole","setRegisterErrors"]),Object(n["b"])("authentication",["register"]),{prev:function(){this.step--},next1:function(){this.$refs.form1.validate()&&this.step++},next2:function(){this.$refs.form2.validate()&&this.step++},next3:function(){this.$refs.form3.validate()&&this.step++},validate:function(){this.$refs.form4.validate()&&this.register()}})},o=l,c=(s("368e"),s("2877")),u=Object(c["a"])(o,r,a,!1,null,"84bb1030",null);t["default"]=u.exports},a2f7:function(e,t,s){}}]);
//# sourceMappingURL=chunk-ff72aec8.f4e58739.js.map