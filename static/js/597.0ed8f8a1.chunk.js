"use strict";(self.webpackChunkmy_first_app=self.webpackChunkmy_first_app||[]).push([[597],{94597:function(e,s,t){t.r(s),t.d(s,{default:function(){return X}});var i=t(1413),r=t(72791),o=t(78687),n=t(29439),d="ProfileInfo_profile__DKHaQ",a="ProfileInfo_infoBlock__cfsGP",l="ProfileInfo_photoBlock__rkBMR",u="ProfileInfo_contact__Oa830",c="ProfileInfo_key__tdQe2",f="ProfileInfo_aboutMeBlock__UZxU-",p="ProfileInfo_field__CkngA",h="ProfileInfo_hideUnput__L12Nu",x=t(22696),j=t(25998),m=t(80184),v=function(e){var s=(0,r.useState)(!1),t=(0,n.Z)(s,2),i=t[0],o=t[1],d=(0,r.useState)(e.status),a=(0,n.Z)(d,2),l=a[0],u=a[1];return(0,m.jsxs)("div",{children:[!i&&(0,m.jsx)("div",{children:(0,m.jsxs)("span",{onClick:function(){e.userId||o(!0)},children:[(0,m.jsx)("b",{children:"\u0421\u0442\u0430\u0442\u0443\u0441 - "}),e.status||"\u043f\u0443\u0441\u0442\u043e"]})}),i&&(0,m.jsxs)("div",{children:[(0,m.jsx)("input",{onChange:function(e){u(e.currentTarget.value)},autoFocus:!0,defaultValue:e.status}),(0,m.jsx)("button",{onClick:function(){o(!1),e.updateUserProfileStatus(l)},children:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c"})]})]})},b=t(22067),P=t(5550),_=t(56139),I=t(90704),k=t(56204),g=t(64541),M=(0,P.DT)(14),N=(0,P.DT)(30),y=(0,P.DT)(40),S=function(e){var s=e.profile,t=e.ownerId,i=e.updateAboutMe,o=e.userId,d=e.key,a=e.status,l=e.updateUserProfileStatus,u=(0,r.useState)(!1),c=(0,n.Z)(u,2),f=c[0],p=c[1];return(0,m.jsx)("div",{children:f?(0,m.jsx)("div",{children:(0,m.jsx)(Z,{profile:s,updateAboutMe:i,editModeOff:function(){p(!1)}},d)}):(0,m.jsxs)("div",{children:[" ",(0,m.jsx)(A,{profile:s,userId:o,editModeOn:function(){p(!0)},status:a,updateUserProfileStatus:l,ownerId:t},d)]})})},U=function(e){var s=e.contactTitle,t=e.contactValue;return(0,m.jsxs)("div",{children:[" ",(0,m.jsx)("b",{children:s}),": ",t," "]})},A=function(e){var s=e.profile,t=e.userId,i=e.editModeOn,r=e.key,o=e.ownerId,n=e.status,d=e.updateUserProfileStatus;return(0,m.jsxs)("div",{children:[!t&&(0,m.jsx)("label",{htmlFor:"editAboutMe",children:"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c"}),!t&&(0,m.jsx)("button",{onClick:i,id:"editAboutMe",style:{opacity:0},children:"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c"}),(0,m.jsx)("div",{children:(0,m.jsx)(v,{userId:t,ownerId:o,status:n,updateUserProfileStatus:d},r)}),(0,m.jsxs)("div",{children:[(0,m.jsx)("b",{children:"\u041a\u0442\u043e \u044f - "}),s.fullName]}),(0,m.jsxs)("div",{children:[(0,m.jsx)("b",{children:"\u041e\u0431\u043e \u043c\u043d\u0435 - "})," ",s.aboutMe]}),(0,m.jsxs)("div",{children:[(0,m.jsx)("b",{children:"\u0412 \u043f\u043e\u0438\u0441\u043a\u0430\u0445 \u0440\u0430\u0431\u043e\u0442\u044b - "}),s.lookingForAJob?"\u0414\u0430":"\u041d\u0435\u0442"]}),(0,m.jsxs)("div",{children:[(0,m.jsx)("b",{children:"\u041c\u0435\u0441\u0442\u043e \u0440\u0430\u0431\u043e\u0442\u044b - "}),s.lookingForAJobDescription]}),(0,m.jsxs)("div",{children:[(0,m.jsx)("b",{children:"\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b: "}),Object.keys(s.contacts).map((function(e){return(0,m.jsxs)("div",{className:u,children:[(0,m.jsx)(U,{contactTitle:e,contactValue:s.contacts[e]||"\u041e\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442"})," "]},e)}))]})]})},Z=function(e){var s=e.updateAboutMe,t=e.profile,i=e.editModeOff;return(0,m.jsx)(C,{onSubmit:function(e){s(e).then((function(){i()}))},initialValues:t,profile:t})},C=(0,I.Z)({form:"aboutMe",enableReinitialize:!0})((function(e){var s=e.handleSubmit,t=e.profile,i=e.error;return(0,m.jsxs)("form",{onSubmit:s,children:[(0,m.jsxs)("div",{children:[(0,m.jsxs)("div",{className:f,children:[(0,m.jsx)("div",{className:c,children:"\u041a\u0442\u043e \u044f"}),(0,m.jsx)("div",{className:p,children:(0,m.jsx)(_.Z,{name:"fullName",component:k.Vb,validate:[P.C1,M],fieldType:"input"})})]}),(0,m.jsxs)("div",{className:f,children:[(0,m.jsx)("div",{className:c,children:" \u0418\u0449\u0443 \u0440\u0430\u0431\u043e\u0442\u0443 - "}),(0,m.jsx)("div",{className:p,children:(0,m.jsx)(_.Z,{name:"lookingForAJob",component:k.Vb,type:"checkbox",fieldType:"input"})})]}),(0,m.jsxs)("div",{className:f,children:[(0,m.jsx)("div",{className:c,children:"\u041c\u0435\u0441\u0442\u043e \u0440\u0430\u0431\u043e\u0442\u044b -"}),(0,m.jsx)("div",{className:p,children:(0,m.jsx)(_.Z,{name:"lookingForAJobDescription",validate:[P.C1,M],component:k.Vb,fieldType:"input"})})]}),(0,m.jsxs)("div",{className:f,children:[(0,m.jsx)("div",{className:c,children:" \u041e\u0431\u043e \u043c\u043d\u0435 - "}),(0,m.jsx)("div",{className:p,children:(0,m.jsx)(_.Z,{name:"aboutMe",component:k.Vb,validate:[P.C1,N],fieldType:"input"})})]})]}),(0,m.jsxs)("div",{children:[(0,m.jsx)("b",{children:"\u041a\u043e\u043d\u0442\u0430\u043a\u0442\u044b: "}),Object.keys(t.contacts).map((function(e){return(0,m.jsxs)("div",{className:u,children:[(0,m.jsx)("div",{className:c,children:e}),(0,m.jsx)("div",{className:p,children:(0,m.jsx)(_.Z,{validate:[y],name:"contacts."+e,component:k.Vb,fieldType:"input",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0432\u0430\u0448 - "+e})})]},e)}))]}),i&&(0,m.jsxs)("div",{className:b.Z.formSummaryError,children:[" ",i," "]}),(0,m.jsx)("button",{children:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c"})]})})),w=r.memo((function(e){console.log("\u041f\u0415\u0420\u0415\u0420\u0418\u0421\u041e\u0412\u041a\u0410");var s=(0,r.useState)(!1),t=(0,n.Z)(s,2),i=t[0],o=t[1],u=(0,r.useState)(!1),c=(0,n.Z)(u,2),f=(c[0],c[1]);if(!e.profile)return(0,m.jsx)(j.Z,{});return(0,m.jsx)("div",{children:(0,m.jsxs)("div",{className:d,children:[(0,m.jsxs)("div",{className:l,children:[!e.userId&&(0,m.jsx)("label",{htmlFor:"upload-photo",children:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u043d\u043e\u0432\u043e\u0435 \u0444\u043e\u0442\u043e"}),(0,m.jsx)("img",{src:e.profile.photos.large||x}),i&&(0,m.jsx)("div",{style:{border:"2px",color:"red"},children:" \u0424\u0430\u0439\u043b \u043d\u0435 \u0434\u043e\u043b\u0436\u0435\u043d \u043f\u0440\u0435\u0432\u044b\u0448\u0430\u0442\u044c 4\u041c\u0411 "}),!e.userId&&(0,m.jsx)("input",{className:h,id:"upload-photo",onChange:function(s){if(s.target.files[0].size>=4e6)return o(!0);f(!0),s.target.files.length&&(e.updateUserPhoto(s.target.files[0]),o(!1),f(!1))},type:"file"})]}),(0,m.jsxs)("div",{className:a,children:[(0,m.jsx)("div",{}),(0,m.jsx)("div",{children:(0,m.jsx)(S,{profile:e.profile,userId:e.userId,ownerId:e.ownerId,updateAboutMe:e.updateAboutMe,editModeAboutMe:e.editModeAboutMe,status:e.userStatus,updateUserProfileStatus:e.updateUserProfileStatus},e.key)})]})]})})})),B=(t(45803),{MyPostsClass:"MyPosts_MyPostsClass__nRfqi",inputBlock:"MyPosts_inputBlock__jOkuq",textBlock:"MyPosts_textBlock__gFI2h",btnBlock:"MyPosts_btnBlock__9MDle"}),F="Post_postContainer__rhE20",T="Post_imgContainer__wsgdn",D="Post_msgContainer__FFWET",O="Post_btnContainer__GjFL1",E="Post_likeBtn__lItlp",L="Post_shareBtn__rCBE9",V="Post_delBtn__Akvj9",q=t(9410),z=r.memo((function(e){return(0,m.jsxs)("div",{className:F,children:[(0,m.jsxs)("div",{className:T,children:[" ",(0,m.jsx)("img",{src:e.img})]}),(0,m.jsx)("div",{className:D,children:e.message}),(0,m.jsxs)("div",{className:O,children:[(0,m.jsxs)("div",{className:E,children:[e.likesCount,(0,m.jsx)(q.ZP,{ghost:!0,size:"small",onClick:function(){var s=e.postId;e.addLike(s)},type:"default",children:"\u2764\ufe0f"})," "]}),(0,m.jsxs)("div",{className:L,children:[e.share,(0,m.jsx)(q.ZP,{ghost:!0,size:"small",type:"default",children:"\u2709"})]})]}),(0,m.jsx)("div",{className:V,children:(0,m.jsx)(q.ZP,{onClick:function(){var s=e.postId;e.deletePost(s)},type:"default",ghost:!0,children:"\u274c"})})]},e.postId)})),J=(t(85078),t(96342)),R=t(69558),G=function(e){var s=(0,r.useState)(!1),t=(0,n.Z)(s,2),i=t[0],o=t[1],d=J.Z.useForm(),a=(0,n.Z)(d,1)[0],l=e.profilePage.posts.map((function(s){return(0,m.jsx)(z,{postId:s.id,message:s.message,likesCount:s.likesCount,share:s.share,img:s.imgSrc,addLike:e.addLike,deletePost:e.deletePost},s.id)})),u=Number(e.router.params.userId||e.ownerUserId);document.getElementById("addNewPost");return u?null:(0,m.jsx)("div",{className:B.profile,children:(0,m.jsxs)("div",{className:B.MyPostsClass,children:[(0,m.jsx)("h3",{children:"\u041c\u043e\u0438 \u043f\u043e\u0441\u0442\u044b (\u0425\u0430\u0440\u0434\u043a\u043e\u0434 \u0411\u0435\u0437 API)"}),(0,m.jsx)("div",{children:(0,m.jsxs)(J.Z,{className:B.inputBlock,onFinish:function(s){e.addPost(s.postInput),a.resetFields(["postInput"]),o(!1)},onFinishFailed:function(e){console.log("Failed:",e)},form:a,children:[(0,m.jsx)(J.Z.Item,{name:"postInput",className:B.textBlock,children:(0,m.jsx)(R.Z,{name:"postInput",showCount:!0,maxLength:600,placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435",onInput:function(e){!function(e){o(""!=e)}(e.currentTarget.value)}})}),(0,m.jsx)(J.Z.Item,{className:B.btnBlock,children:(0,m.jsx)(q.ZP,{disabled:1!=i,className:B.btnBlock,htmlType:"submit",children:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c"})})]})}),(0,m.jsx)("div",{children:l})]})})},H=t(39108),Q=t(87781),W=t(95721),$=(0,Q.qC)((0,o.$j)((function(e){return{profilePage:e.profilePage,isAuth:e.auth.isAuth,ownerId:e.auth.id}}),{addPost:g.q2,addLike:g.dE,deletePost:g.fR}),W.E,H.D)(G),K=function(e){return(0,m.jsxs)("div",{children:[(0,m.jsx)(w,{profile:e.profile,userId:e.userId,ownerId:e.ownerId,userStatus:e.userStatus,updateUserProfileStatus:e.updateUserProfileStatus,updateAboutMe:e.updateAboutMe,savePhoto:e.savePhoto,updateUserPhoto:e.updateUserPhoto,editModeAboutMe:e.editModeAboutMe},e.key),(0,m.jsx)($,{})]})},Y=t(57689);var X=(0,Q.qC)((0,o.$j)((function(e){return{profile:e.profilePage.profile,userStatus:e.profilePage.profileStatus,ownerUserId:e.auth.id,editModeAboutMe:e.profilePage.editModeAboutMe,key:e.profilePage.key}}),{getUserProfile:g.et,getUserProfileStatus:g.WO,updateUserProfileStatus:g.lF,updateAboutMe:g.LY,getUserAboutMe:g.ap,updateUserPhoto:g.DO,maxLengthCreator:P.DT}),(function(e){return function(s){var t=(0,Y.TH)(),r=(0,Y.s0)(),o=(0,Y.UO)();return(0,m.jsx)(e,(0,i.Z)((0,i.Z)({},s),{},{router:{location:t,navigate:r,params:o}}))}}),H.D)((function(e){var s=function(){var s=e.router.params.userId||e.ownerUserId;e.getUserProfile(s),e.getUserProfileStatus(s),e.getUserAboutMe(s)};return(0,r.useEffect)((function(){s()}),[e.router.params.userId]),(0,r.useEffect)((function(){s()}),[]),(0,m.jsx)("div",{children:(0,r.createElement)(K,(0,i.Z)((0,i.Z)({},e),{},{profile:e.profile,userId:e.router.params.userId,ownerId:e.ownerUserId,userStatus:e.userStatus,updateUserProfileStatus:e.updateUserProfileStatus,updateAboutMe:e.updateAboutMe,updateUserPhoto:e.updateUserPhoto,editModeAboutMe:e.editModeAboutMe,key:e.key}))})}))}}]);
//# sourceMappingURL=597.0ed8f8a1.chunk.js.map