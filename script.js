let orderList = [];
let grandTotal = 0;

function addToCart(itemName, unitPrice) {
    let quantity = prompt(`How many ${itemName} would you like to order?`, "1");
    
    if (quantity !== null && quantity > 0) {
        let qty = parseInt(quantity);
        let subtotal = unitPrice * qty;
        
        // I-record ang order sa listahan
        orderList.push(`${qty}x ${itemName} (₱${subtotal.toLocaleString()})`);
        grandTotal += subtotal;
        
        // I-update ang screen display
        document.getElementById('totalDisplay').innerText = grandTotal.toLocaleString();
        
        // I-save ang detalye para sa Netlify Email Notification
        document.getElementById('orderSummary').value = orderList.join('\n');
        document.getElementById('totalPriceHidden').value = "₱" + grandTotal.toLocaleString();
        
        // Small entertaining confirmation
        alert(`✨ Brilliant choice! ${qty} ${itemName} added to your order.`);
    }
}