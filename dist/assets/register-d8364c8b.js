import{j as s,r as i,c as I,L as N}from"./index-bc29a6f4.js";const w="_popup_6drke_1",C="_close_6drke_14",S="_button_6drke_22",g="_popupInner_6drke_32",r={popup:w,close:C,button:S,popupInner:g,"slide-in":"_slide-in_6drke_1","fade-in":"_fade-in_6drke_1"},R="_popup_18016_2",$="_open_18016_16",F="_popupInner_18016_20",a={popup:R,open:$,popupInner:F},T=({onClose:t,selectedLanguage:n})=>s.jsx("div",{className:a.popup,children:s.jsxs("div",{className:a.popupInner,children:[s.jsx("h2",{children:n==="chinese"?"账号已存在":"Account already exist"}),s.jsx("p",{children:n==="chinese"?"尝试另一个用户名和密码。":"Try another username and password."}),s.jsx("button",{onClick:t,className:a.closeBtn,children:n==="chinese"?"返回":"Go back"})]})}),B="_popup_18016_2",E="_open_18016_16",P="_popupInner_18016_20",l={popup:B,open:E,popupInner:P},q=({onClose:t,selectedLanguage:n})=>s.jsx("div",{className:l.popup,children:s.jsxs("div",{className:l.popupInner,children:[s.jsx("h2",{children:n==="chinese"?"注册成功":"Account Registered!"}),s.jsx("p",{children:n==="chinese"?"您的帐户已注册成功。":"Your account is registered successfully."}),s.jsx("button",{onClick:t,className:l.closeBtn,children:n==="chinese"?"返回":"Go back"})]})}),G=({className:t,onClose:n,selectedLanguage:o})=>{const[d,_]=i.useState(""),[u,j]=i.useState(""),[f,c]=i.useState(!1),[p,h]=i.useState({registered:!1,success:!1,failed:!1}),m=e=>{n(e)},b=async()=>{c(!0);try{const e=await fetch("/api/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:d,password:u})});e.ok?(c(!1),y()):e.status===400?(c(!1),x()):(c(!1),x(),console.error(`Error: ${e.statusText}`))}finally{}},y=()=>{h(()=>({registered:!0,success:!0,failed:!1}))},x=()=>{h(()=>({registered:!0,success:!1,failed:!0}))},k=e=>{n(e),window.location.href="/"},v=e=>{n(e),window.location.href="/"};return s.jsxs("div",{className:I(r.root,t),children:[f&&s.jsx(N,{}),s.jsxs("div",{className:r.popup,children:[p.registered&&s.jsxs(s.Fragment,{children:[p.success&&s.jsx("div",{children:s.jsx(q,{onClose:k,selectedLanguage:o})}),p.failed&&s.jsx("div",{children:s.jsx(T,{onClose:v,selectedLanguage:o})})]}),s.jsxs("div",{className:r.popupInner,children:[s.jsx("button",{onClick:m,className:r.close,children:o==="chinese"?"关闭":"Close"}),s.jsx("label",{children:o==="chinese"?"用户名:":"Username:"}),s.jsx("br",{}),s.jsx("input",{id:"username",type:"text",value:d,onChange:e=>_(e.target.value),required:!0}),s.jsx("br",{}),s.jsx("label",{children:o==="chinese"?"密码:":"Password:"}),s.jsx("br",{}),s.jsx("input",{id:"password",type:"test",value:u,onChange:e=>j(e.target.value),required:!0}),s.jsx("br",{}),s.jsx("button",{id:"registrationButton",className:r.button,type:"button",onClick:b,children:o==="chinese"?"注册账号！":"Register account!"})]})]})]})};export{G as Register};
