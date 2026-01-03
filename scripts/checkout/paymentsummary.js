import { cart } from '../../data/cart.js';
import { deliveryoptions } from '../../data/deliveryoptions.js';
import { getproduct } from '../../data/product.js';

function cartquantity() {

  let cartquantity = 0;

  cart.forEach((cartitem) => {
    cartquantity += cartitem.quantity;
  })
  
  return cartquantity;
}
export function renderpaymentsummary() {
  let html = '';
  let itemprice = Number(itemtotal());
  let shippingprice = Number(shippingtotal());
  let totalprice = Number((itemprice + shippingprice).toFixed(2));
  let tax = Number((totalprice / 10).toFixed(2));
  let finalprice = (totalprice + tax).toFixed(2);
  console.log(finalprice);


  html += `
          <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartquantity()}):</div>
            <div class="payment-summary-money">$${itemprice}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">${shippingprice}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${totalprice}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${tax}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${finalprice}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button> `
  document.querySelector('.payment-summary').innerHTML = html;
}



function itemtotal() {
  let itemtotal = 0;
  cart.forEach(element => {
    let product = getproduct(element.productId);
    itemtotal += ((product.priceCents / 100).toFixed(2)) * element.quantity;
  });
  return itemtotal;
}

function shippingtotal() {
  let shippingprice = 0;
  cart.forEach((element) => {
    deliveryoptions.forEach((deliveryoption) => {
      if (element.deliveryOptionId === deliveryoption.id) {
        shippingprice += deliveryoption.priceCents;
      }
    })
  })
  return ((shippingprice / 100).toFixed(2));
}

