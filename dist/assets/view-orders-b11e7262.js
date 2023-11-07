import{r as i,j as e,L as x}from"./index-01b9b1ce.js";const g="_header_cymkk_53",p={"orders-table-container":"_orders-table-container_cymkk_1","orders-table":"_orders-table_cymkk_1",header:g},y=({})=>{const[h,o]=i.useState([]),[c,m]=i.useState(null),[j,l]=i.useState(!1);i.useEffect(()=>{u()},[]);const u=async()=>{l(!0);try{const t=await fetch("/api/admin/orders");t.ok||console.error("Network response was not ok");const a=(await t.json()).data.map(n=>({id:n.ID,order_time:n.Order_time,first_name:n.First_name,last_name:n.Last_name,coffee_type:n.Coffee_type,temperature:n.Temperature,toppings:n.Toppings,size:n.Size,price:parseFloat(n.Price),comments:n.Comments,cup:n.Cup,charles:n.Charles}));l(!1),o(a)}catch(t){l(!1),console.error("Error fetching order data:",t)}},d=t=>{m(t)},r=(t,s,a)=>{const n=[...h];n[a][s]=t.target.value,o(n),f(n[a])},f=async t=>{try{(await fetch("/api/admin/updateOrder",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)})).ok||console.error("Network response was not ok")}catch(s){console.error("Error updating order:",s)}},_=()=>h.map((t,s)=>e.jsxs("tr",{onClick:()=>d(s),children:[e.jsx("td",{children:t.id}),e.jsx("td",{children:t.order_time}),e.jsx("td",{children:c===s?e.jsx("input",{value:t.first_name,onChange:a=>r(a,"first_name",s)}):t.first_name}),e.jsx("td",{children:c===s?e.jsx("input",{value:t.last_name,onChange:a=>r(a,"last_name",s)}):t.last_name}),e.jsx("td",{children:c===s?e.jsx("input",{value:t.coffee_type,onChange:a=>r(a,"coffee_type",s)}):t.coffee_type}),e.jsx("td",{children:c===s?e.jsx("input",{value:t.temperature,onChange:a=>r(a,"temperature",s)}):t.temperature}),e.jsx("td",{children:c===s?e.jsx("input",{value:t.toppings||"",onChange:a=>r(a,"toppings",s)}):t.toppings}),e.jsx("td",{children:c===s?e.jsx("input",{value:t.size,onChange:a=>r(a,"size",s)}):t.size}),e.jsx("td",{children:c===s?e.jsx("input",{value:t.price||"",onChange:a=>r(a,"price",s)}):t.price}),e.jsx("td",{children:c===s?e.jsx("input",{value:t.comments||"",onChange:a=>r(a,"comments",s)}):t.comments}),e.jsx("td",{children:c===s?e.jsx("input",{value:t.cup||"",onChange:a=>r(a,"cup",s)}):t.cup}),e.jsx("td",{children:c===s?e.jsx("input",{value:t.charles,onChange:a=>r(a,"charles",s)}):t.charles})]},t.id));return e.jsxs("div",{className:p["orders-table-container"],children:[j&&e.jsx(x,{}),e.jsx("h2",{className:"header",children:"Orders Data"}),e.jsxs("table",{className:p["orders-table"],children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"ID"}),e.jsx("th",{children:"Order Time"}),e.jsx("th",{children:"First Name"}),e.jsx("th",{children:"Last Name"}),e.jsx("th",{children:"Type"}),e.jsx("th",{children:"Temperature"}),e.jsx("th",{children:"Toppings"}),e.jsx("th",{children:"Size"}),e.jsx("th",{children:"Price"}),e.jsx("th",{children:"Comments"}),e.jsx("th",{children:"Cup"}),e.jsx("th",{children:"CHARLES"})]})}),e.jsx("tbody",{children:_()})]})]})};export{y as ViewOrders};