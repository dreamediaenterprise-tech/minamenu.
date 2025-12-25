const items=[
 {n:"Spaghetti (Large)",p:1200,i:"https://i.pinimg.com/736x/22/6c/0e/226c0eb094603fb64fd328c53b673f2d.jpg"},
 {n:"Pansit (Large)",p:1200,i:"https://i.pinimg.com/736x/d5/ba/d6/d5bad6cd56327d7857b225cb5913b31c.jpg"},
 {n:"Shanghai (100 pcs)",p:900,i:"https://i.pinimg.com/736x/a5/7a/da/a57ada9962153de831f02e5d2f643797.jpg"},
 {n:"Menudo",p:1500,i:"https://i.pinimg.com/736x/c4/a4/52/c4a4522cdc59f29e0470094ea8f0f259.jpg"},
 {n:"Buttered Shrimp",p:1500,i:"https://i.pinimg.com/736x/88/b7/45/88b745b36c8ff8b15b834cdbec9b50e3.jpg"},
 {n:"Kaldereta",p:1300,i:"https://i.pinimg.com/1200x/6f/1d/35/6f1d35d7a3afa50bd70072af8bd2b072.jpg"},
 {n:"Pininyahang Manok",p:1200,i:"https://i.pinimg.com/736x/c6/8c/f2/c68cf2223eac3c9ff5f3482e9f641b15.jpg"},
 {n:"Fried Chicken",p:1100,i:"https://i.pinimg.com/1200x/56/9e/a5/569ea58daee1a54a60e37545afc9310f.jpg"},
 {n:"Afritada Chicken",p:1200,i:"https://i.pinimg.com/1200x/c2/1f/38/c21f384030a47c8eac2d6228572cd213.jpg"},
 {n:"Sisig",p:900,i:"https://i.pinimg.com/736x/74/59/3b/74593bd7b7641c6d3b57553f1bf77aa6.jpg"},
 {n:"Lechon Kawali",p:1100,i:"https://i.pinimg.com/1200x/08/52/8b/08528bc58cf9100e657a47d55007613f.jpg"},
 {n:"Kare-kare",p:1400,i:"https://i.pinimg.com/1200x/7d/49/1e/7d491edfe4e64368ba8406c9380f3784.jpg"},
 {n:"Pork BBQ",p:800,i:"https://i.pinimg.com/1200x/33/23/c4/3323c4dc60d03f54f2490d8fa9bb3d62.jpg"},
 {n:"Chicken BBQ",p:800,i:"https://i.pinimg.com/1200x/5b/13/fb/5b13fbf77cd6a984e3fa59ccee4cc7b3.jpg"},
 {n:"Chop Suey",p:700,i:"https://i.pinimg.com/736x/97/c8/75/97c8750bdaacf86c61b0db741ab31232.jpg"},
 {n:"Maja Blanca",p:500,i:"https://i.pinimg.com/1200x/d0/5e/c4/d05ec437d15f0b8d81a49ea07e39f20e.jpg"},
 {n:"Leche Flan",p:100,i:"https://i.pinimg.com/1200x/c6/97/6f/c6976fa9306f92076a1153259634164b.jpg"},
 {n:"Puto Cheese",p:300,i:"https://i.pinimg.com/1200x/f1/8d/a8/f18da80beb16d7736448c375624bd091.jpg"},
 {n:"Buko Salad",p:350,i:"https://i.pinimg.com/1200x/2b/22/47/2b2247d85fedef4b2976e9b30ef40bf2.jpg"},
 {n:"Buko Pandan",p:350,i:"https://i.pinimg.com/1200x/b5/cd/61/b5cd61c76ebef2eba4ab6301879bb032.jpg"}
];

const grid=document.getElementById("menuGrid");
const orderList=document.getElementById("orderList");
const totalEl=document.getElementById("total");
const orderDetails=document.getElementById("orderDetails");
const paymentHidden=document.getElementById("paymentHidden");

let cart={};

items.forEach((item,i)=>{
 cart[i]=0;
 grid.innerHTML+=`
  <div class="menu-card">
    <img src="${item.i}">
    <div class="menu-info">
      <h4>${item.n}</h4>
      <div class="menu-price">₱${item.p}</div>
      <div class="qty">
        <button onclick="updateQty(${i},-1)">−</button>
        <span id="q${i}">0</span>
        <button onclick="updateQty(${i},1)">+</button>
      </div>
    </div>
  </div>`;
});

window.updateQty=(i,v)=>{
 cart[i]=Math.max(0,cart[i]+v);
 document.getElementById("q"+i).textContent=cart[i];
 renderOrder();
};

function renderOrder(){
 orderList.innerHTML="";
 let total=0,details=[];
 items.forEach((it,i)=>{
  if(cart[i]>0){
    let sub=cart[i]*it.p;
    total+=sub;
    orderList.innerHTML+=`<div>${cart[i]} × ${it.n} — ₱${sub}</div>`;
    details.push(`${cart[i]} x ${it.n}`);
  }
 });
 totalEl.textContent=total;
 orderDetails.value=details.join(", ");
}

window.toggleGCash=(show)=>{
 document.getElementById("gcashBox").style.display=show?"block":"none";
 paymentHidden.value=show?"GCash":"COD";
};
