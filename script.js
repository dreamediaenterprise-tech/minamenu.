let cart = {};
let total = 0;

function changeQty(name, price, change) {
    if (!cart[name]) cart[name] = { qty: 0, price: price };
    cart[name].qty += change;
    if (cart[name].qty < 0) cart[name].qty = 0;
    document.getElementById(`qty-${name}`).innerText = cart[name].qty;
    calculateTotal();
}

function calculateTotal() {
    total = 0;
    for (let item in cart) {
        total += cart[item].qty * cart[item].price;
    }
    document.getElementById('totalDisplay').innerText = '₱' + total.toLocaleString();
}

function showReview() {
    if (total === 0) return alert("Pumili muna ng pagkain!");
    let listHTML = "";
    let summaryText = "ORDER SUMMARY:\n";
    for (let item in cart) {
        if (cart[item].qty > 0) {
            listHTML += `<p>${cart[item].qty}x ${item} - ₱${(cart[item].qty * cart[item].price).toLocaleString()}</p>`;
            summaryText += `${cart[item].qty}x ${item} (₱${(cart[item].qty * cart[item].price).toLocaleString()})\n`;
        }
    }
    document.getElementById('reviewList').innerHTML = listHTML;
    document.getElementById('modalTotal').innerText = total.toLocaleString();
    document.getElementById('orderSummary').value = summaryText;
    document.getElementById('totalPriceHidden').value = '₱' + total.toLocaleString();
    document.getElementById('reviewModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('reviewModal').style.display = 'none';
}
