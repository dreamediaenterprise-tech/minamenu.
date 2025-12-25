const data = {
  main: [
    ["Spaghetti (Large)",1200,"https://i.pinimg.com/736x/22/6c/0e/226c0eb094603fb64fd328c53b673f2d.jpg"],
    ["Pansit (Large)",1200,"https://i.pinimg.com/736x/d5/ba/d6/d5bad6cd56327d7857b225cb5913b31c.jpg"],
    ["Shanghai (100 pcs)",900,"https://i.pinimg.com/736x/a5/7a/da/a57ada9962153de831f02e5d2f643797.jpg"],
    ["Menudo",1500,"https://i.pinimg.com/736x/c4/a4/52/c4a4522cdc59f29e0470094ea8f0f259.jpg"],
    ["Buttered Shrimp",1500,"https://i.pinimg.com/736x/88/b7/45/88b745b36c8ff8b15b834cdbec9b50e3.jpg"],
    ["Kaldereta",1300,"https://i.pinimg.com/1200x/6f/1d/35/6f1d35d7a3afa50bd70072af8bd2b072.jpg"],
    ["Pork BBQ (10 pcs)",800,"https://i.pinimg.com/1200x/33/23/c4/3323c4dc60d03f54f2490d8fa9bb3d62.jpg"],
    ["Chicken BBQ (10 pcs)",800,"https://i.pinimg.com/1200x/5b/13/fb/5b13fbf77cd6a984e3fa59ccee4cc7b3.jpg"]
  ],
  veg:[
    ["Chop Suey",700,"https://i.pinimg.com/736x/97/c8/75/97c8750bdaacf86c61b0db741ab31232.jpg"]
  ],
  dessert:[
    ["Buko Salad",350,"https://i.pinimg.com/1200x/2b/22/47/2b2247d85fedef4b2976e9b30ef40bf2.jpg"],
    ["Buko Pandan",350,"https://i.pinimg.com/1200x/b5/cd/61/b5cd61c76ebef2eba4ab6301879bb032.jpg"]
  ]
};

let cart={};

function build(section,id){
  const el=document.getElementById(id);
  section.forEach((i,idx)=>{
    cart[i[0]]=0;
    el.innerHTML+=`
    <div class="menu-card">
      <img src="${i[2]}">
      <div class="menu-info">
        <h4>${i[0]}</h4>
        <div class="menu-price">₱${i[1]}</div>
        <div class="qty">
          <button onclick="qty('${i[0]}',${i[1]},-1)">−</button>
          <span id="q${i[0]}">0</span>
          <button onclick="qty('${i[0]}',${i[1]},1)">+</button>
        </div>
      </div>
    </div>`;
  });
}

build(data.main,"menuMain");
build(data.veg,"menuVeg");
build(data.dessert,"menuDessert");

function qty(name,price,val){
  cart[name]=Math.max(0,cart[name]+val);
  document.getElementById("q"+name).innerText=cart[name];
  render();
}

function render(){
  let total=0,txt=[];
  document.getElementById("orderList").innerHTML="";
  for(let k in cart){
    if(cart[k]>0){
      let sub=cart[k]*priceOf(k);
      total+=sub;
      txt.push(`${cart[k]} x ${k}`);
      document.getElementById("orderList").innerHTML+=`<div>${cart[k]} × ${k} — ₱${sub}</div>`;
    }
  }
  document.getElementById("total").innerText=total;
  document.getElementById("orderDetails").value=txt.join(", ");
}

function priceOf(name){
  for(let cat in data){
    for(let i of data[cat]){
      if(i[0]===name) return i[1];
    }
  }
}

function selectPayment(m){
  document.getElementById("paymentHidden").value=m;
  document.getElementById("gcashBox").style.display = m==="GCash" ? "block" : "none";
}

function toggleMode(){
  document.body.classList.toggle("light");
}
