import{r as t,j as e,c as I}from"./index-fa3c997d.js";import{p as Q}from"./paymentImage-1c1c593e.js";const V="_popup_nksug_2",X="_open_nksug_17",Z="_popupInner_nksug_22",D="_closing_nksug_34",L="_option_nksug_113",ee="_price_nksug_168",se="_name_nksug_174",ne="_checkbox_nksug_190",l={popup:V,open:X,popupInner:Z,"slide-in":"_slide-in_nksug_1","fade-in":"_fade-in_nksug_1",closing:D,"fade-out":"_fade-out_nksug_1","slide-out":"_slide-out_nksug_1","close-btn":"_close-btn_nksug_75","input-group":"_input-group_nksug_93","option-group":"_option-group_nksug_113",option:L,"order-btn":"_order-btn_nksug_126","no-line-break":"_no-line-break_nksug_163",price:ee,name:se,checkbox:ne},oe="_popup_td4t6_1",ie="_open_td4t6_16",ce="_popupInner_td4t6_21",le="_close_td4t6_32",f={popup:oe,open:ie,popupInner:ce,close:le},te=({onClose:b,userData:p,price:r,selectedLanguage:h})=>{const[c,n]=t.useState(!0);return t.useEffect(()=>{console.log(p),p&&p.balance===0&&p.username===""||p.balance>=r&&n(!1)},[]),e.jsx("div",{className:f.popup,children:e.jsxs("div",{className:f.popupInner,children:[c&&e.jsxs("div",{children:[e.jsx("img",{src:Q,alt:"Payment Image",style:{maxHeight:"12em"}}),e.jsxs("p",{children:[h==="chinese"?"你需要付":"You need to pay"," ",e.jsxs("span",{style:{fontWeight:"bold"},children:["¥",r]})]})]}),e.jsx("h2",{children:h==="chinese"?"订单成功！":"Order Successful!"}),e.jsx("p",{children:h==="chinese"?"您的订单已成功下达。":"Your order has been placed successfully."}),!c&&e.jsx("div",{children:e.jsxs("p",{children:[h==="chinese"?"你还剩":"You have"," ",e.jsxs("span",{style:{fontWeight:"bold"},children:["¥",p.balance-r]})," ",h==="chinese"?"在你帐号里":"Left in your account"]})}),e.jsx("button",{onClick:b,className:f.close,children:h==="chinese"?"返回":"Go back"})]})})},he=({isOpen:b,onClose:p,name:r,originalPrice:h,userData:c,selectedLanguage:n})=>{const[C,v]=t.useState(!1),[w,y]=t.useState(!1),[S,B]=t.useState("cold"),[x,z]=t.useState("medium"),[d,M]=t.useState([]),[k,N]=t.useState(""),[j,E]=t.useState(""),[u,_]=t.useState(h),[P,$]=t.useState(""),[T,R]=t.useState(!1),O=["Crispy cereal in milk(classic)","Crispy cereal in milk(honey)","Crispy cereal in milk(chocolate)","Classic flavored Porridge","Chocolate flavored Porridge"],H=["Crispy cereal in milk(classic)","Crispy cereal in milk(honey)","Crispy cereal in milk(chocolate)","Classic flavored Porridge","Chocolate flavored Porridge"],U=["Crispy cereal in milk(classic)","Crispy cereal in milk(honey)","Crispy cereal in milk(chocolate)","Cocoa","Matcha milk","Matcha boba","Tai Red Tea","Coconut Water","Milk tea","Jasmine Milktea","Boba","Refreshing babyblue drink","Pure milk"],W=["Classic flavored Porridge","Chocolate flavored Porridge"],Y=["Crispy cereal in milk(classic)","Crispy cereal in milk(honey)","Crispy cereal in milk(chocolate)","Classic flavored Porridge","Chocolate flavored Porridge"];t.useEffect(()=>{c&&(N(c.username),E(c.username))},[c]);const g=o=>{const a=o.target.value;z(a);let s=h;a==="large"&&(s+=3),d.forEach(i=>{i==="oatmilkSubstitution"||i==="boba"?s+=1:i==="extraExpressoShot"?s+=2:i==="redBean"&&(s+=1)}),_(s)},F=o=>{const a=o.target.checked;R(a);let s=h;a&&(s-=1),d.forEach(i=>{i==="oatmilkSubstitution"||i==="boba"?s+=1:i==="extraExpressoShot"?s+=2:i==="redBean"&&(s+=1)}),_(s)},m=o=>{const a=d.includes(o)?d.filter(i=>i!==o):[...d,o];M(a);let s=h;x==="large"&&(s+=3),a.forEach(i=>{i==="oatmilkSubstitution"||i==="boba"?s+=1:i==="extraExpressoShot"?s+=2:i==="redBean"&&(s+=1)}),_(s)},J=async()=>{let o;c&&c.balance===0&&c.username===""?o=0:c.balance>=u?o=c.balance-u:o=c.balance;const a={name:r,temperature:S,selectedSize:x,selectedToppings:d,firstName:k,lastName:j,price:u,comments:P,useCup:T,balance:o};try{const s=q("access_token");console.log(a);const i=await fetch("/api/orders",{method:"POST",credentials:"include",headers:{"Content-Type":"application/json",Authorization:`Bearer ${s}`},body:JSON.stringify(a)});i.ok||console.error("Network response was not ok");const K=await i.json();console.log("Order placed successfully:",K),y(!0)}catch(s){console.error("Error placing order:",s)}},A=o=>{v(!0),setTimeout(()=>{p(o),v(!1)},300)},G=o=>{y(!1),p(o),window.location.href="/"},q=o=>{var i;const s=`; ${document.cookie}`.split(`; ${o}=`);if(s.length===2)return(i=s.pop())==null?void 0:i.split(";").shift()};return e.jsx("div",{className:I(l.popup,{[l.open]:b,[l.closing]:C}),children:e.jsxs("div",{className:I(l.popupInner,{[l.closing]:C}),children:[w&&e.jsx(te,{isOrdered:!0,onClose:G,userData:c,price:u,selectedLanguage:n}),e.jsxs("div",{children:[e.jsx("button",{className:l["close-btn"],onClick:A,children:n==="chinese"?"关闭":"Close"}),e.jsx("p",{className:l.name,children:r})]}),e.jsx("h2",{children:n==="chinese"?"选择选项":"Select Options"}),e.jsx("div",{className:"option",children:e.jsxs("label",{children:[n==="chinese"?"温度:":"Temperature:",e.jsxs("select",{value:S,onChange:o=>B(o.target.value),children:[!U.includes(r)&&e.jsx("option",{value:"hot",children:n==="chinese"?"热":"Hot"}),!W.includes(r)&&e.jsx("option",{value:"cold",children:n==="chinese"?"冷":"Cold"}),!Y.includes(r)&&e.jsx("option",{value:"normal",children:n==="chinese"?"正常":"Normal"})]})]})}),!O.includes(r)&&e.jsx("div",{className:"option",children:e.jsxs("label",{children:[n==="chinese"?"大小:":"Size:",e.jsxs("select",{value:x,onChange:g,children:[e.jsx("option",{value:"small",children:n==="chinese"?"小":"Small"}),e.jsx("option",{value:"medium",children:n==="chinese"?"中":"Medium"}),e.jsx("option",{value:"large",children:n==="chinese"?"大":"Large"})]})]})}),O.includes(r)&&e.jsx("div",{className:"option",children:e.jsxs("label",{children:[n==="chinese"?"大小:":"Size:",e.jsx("select",{value:x,onChange:g,children:e.jsx("option",{value:"medium",children:n==="chinese"?"中":"Medium"})})]})}),!H.includes(r)&&e.jsx("div",{className:"option",children:e.jsxs("label",{children:[n==="chinese"?"配料":"Toppings:",e.jsxs("div",{children:[e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",value:"oatmilkSubstitution",className:l.checkbox,checked:d.includes("oatmilkSubstitution"),onChange:()=>m("oatmilkSubstitution")}),e.jsx("span",{className:"no-line-break",children:n==="chinese"?"燕麦奶更换":"Oat Milk Substitution"})]}),"fi ",e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",value:"boba",className:l.checkbox,checked:d.includes("boba"),onChange:()=>m("boba")}),e.jsx("span",{className:"no-line-break",children:n==="chinese"?"珍珠":"Boba"})]}),e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",value:"extraExpressoShot",className:l.checkbox,checked:d.includes("extraExpressoShot"),onChange:()=>m("extraExpressoShot"),disabled:!0}),e.jsx("span",{className:"no-line-break",children:e.jsx("s",{children:n==="chinese"?"外加一份浓缩":"Extra Espresso Shot"})})]}),e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",value:"redBean",className:l.checkbox,checked:d.includes("redBean"),onChange:()=>m("redBean")}),e.jsx("span",{className:"no-line-break",children:n==="chinese"?"红豆":"Red Bean"})]})]})]})}),e.jsx("div",{className:"option",children:e.jsxs("label",{children:[n==="chinese"?"名":"First Name:",e.jsx("input",{type:"text",value:k,onChange:o=>N(o.target.value)})]})}),e.jsx("div",{className:"option",children:e.jsxs("label",{children:[n==="chinese"?"姓":"Last Name:",e.jsx("input",{type:"text",value:j,onChange:o=>E(o.target.value)})]})}),e.jsx("div",{className:"option",children:e.jsxs("label",{children:[e.jsx("input",{type:"checkbox",checked:T,onChange:F,className:l.checkbox}),e.jsx("span",{className:"no-line-break",children:n==="chinese"?"用自己的杯子":"Use own cup"})]})}),e.jsx("div",{className:"option",children:e.jsx("label",{children:e.jsx("textarea",{value:P,onChange:o=>$(o.target.value),placeholder:n==="chinese"?"备注":"Comments",style:{resize:"none"}})})}),e.jsx("button",{onClick:J,className:l["order-btn"],disabled:k===""||j==="",children:e.jsx("span",{children:n==="chinese"?"点单":"Place Order"})}),e.jsx("div",{children:e.jsxs("p",{className:l.price,children:[n==="chinese"?"总价":"Total price:",u]})})]})})};export{he as O};
