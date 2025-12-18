let cart = [];
let total = 0;

function addToCart(name, price) {
    cart.push({ name, price });
    total += price;
    updateUI();
}

function updateUI() {
    // Update Display sa Sticky Bar
    document.getElementById('totalDisplay').innerText = '₱' + total.toLocaleString();
    
    // Update Hidden Inputs para sa Formspree email
    document.getElementById('totalPriceHidden').value = '₱' + total.toLocaleString();
    
    let summaryText = "ORDER SUMMARY:\n";
    cart.forEach((item, index) => {
        summaryText += `${index + 1}. ${item.name} - ₱${item.price.toLocaleString()}\n`;
    });
    
    document.getElementById('orderSummary').value = summaryText;
}
