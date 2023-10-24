import{j as s,r as _,c as A}from"./index-bc29a6f4.js";import{p as N}from"./paymentImage-1c1c593e.js";const k="_popup_ms6y5_1",C="_close_ms6y5_14",$="_button_ms6y5_22",w="_popupInner_ms6y5_33",c={popup:k,close:C,button:$,popupInner:w,"slide-in":"_slide-in_ms6y5_1","fade-in":"_fade-in_ms6y5_1"},S="_popup_18016_2",T="_open_18016_16",g="_popupInner_18016_20",d={popup:S,open:T,popupInner:g},B=({selectedLanguage:o,onClose:e,amount:t})=>s.jsx("div",{className:d.popup,children:s.jsxs("div",{className:d.popupInner,children:[s.jsxs("div",{children:[s.jsx("img",{src:N,alt:"Payment Image",style:{maxHeight:"12em"}}),s.jsxs("p",{children:[o==="chinese"?"你需要付":"You need to pay"," ",s.jsxs("span",{style:{fontWeight:"bold"},children:["¥",t]})]})]}),s.jsx("h2",{children:o==="chinese"?"已添加金额":"Amount Added!"}),s.jsx("p",{children:o==="chinese"?"金额已成功添加到您的账户。":"The amount has been added to your account successfully."}),s.jsx("button",{onClick:e,className:d.closeBtn,children:o==="chinese"?"返回":"Go back"})]})}),F="_popup_18016_2",E="_open_18016_16",G="_popupInner_18016_20",r={popup:F,open:E,popupInner:G},M=({onClose:o,selectedLanguage:e})=>s.jsx("div",{className:r.popup,children:s.jsxs("div",{className:r.popupInner,children:[s.jsx("h2",{children:e==="chinese"?"null":"This shouldn't happen"}),s.jsx("p",{children:e==="chinese"?"null":"You shouldn't see this page if you do contact me(shawn)."}),s.jsx("button",{onClick:o,className:r.closeBtn,children:e==="chinese"?"返回":"Go back"})]})}),Y=({className:o,onClose:e,selectedLanguage:t})=>{const[p,x]=_.useState(""),[l,a]=_.useState({adding:!1,success:!1,failed:!1}),j=n=>{e(n)},y=async()=>{const n=I("access_token"),i=await fetch("/api/addMoneyToAcc",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${n}`},credentials:"include",body:JSON.stringify({amount:p})});i.ok?f():i.status===400?u():(u(),console.error(`Error: ${i.statusText}`))},f=()=>{a(()=>({adding:!0,success:!0,failed:!1}))},u=()=>{a(()=>({adding:!0,success:!1,failed:!0}))},b=n=>{e(n),window.location.href="/"},v=n=>{e(n),window.location.href="/"},I=n=>{var m;const h=`; ${document.cookie}`.split(`; ${n}=`);if(h.length===2)return(m=h.pop())==null?void 0:m.split(";").shift()};return s.jsx("div",{className:A(c.root,o),children:s.jsxs("div",{className:c.popup,children:[l.adding&&s.jsxs(s.Fragment,{children:[l.success&&s.jsx("div",{children:s.jsx(B,{onClose:b,selectedLanguage:t,amount:p})}),l.failed&&s.jsx("div",{children:s.jsx(M,{onClose:v,selectedLanguage:t})})]}),s.jsxs("div",{className:c.popupInner,children:[s.jsx("button",{onClick:j,className:c.close,children:t==="chinese"?"关闭":"Close"}),s.jsx("label",{children:t==="chinese"?"数量:":"Amount:"}),s.jsx("br",{}),s.jsx("input",{id:"amount",type:"text",value:p,onChange:n=>x(n.target.value),required:!0}),s.jsx("br",{}),s.jsx("button",{id:"registrationButton",className:c.button,type:"button",onClick:y,children:t==="chinese"?"添加金额到帐户！":"Add amount to account!"})]})]})})};export{Y as AddMoneyToAcc};